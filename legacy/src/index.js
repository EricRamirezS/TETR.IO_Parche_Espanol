#!/usr/bin/env node
'use strict';

const { execFileSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { locateAsar } = require('./locate');
const { patch, restore, detectState } = require('./patch');

let embedded;
try {
  embedded = require('./payload.generated.js');
} catch {
  console.error('Falta src/payload.generated.js. Ejecuta "npm run gen" primero.');
  process.exit(1);
}

const PACKAGED = !!process.pkg; // true when running as a built single-file executable

function parseArgs(argv) {
  const opts = {
    asar: null,
    restore: false,
    dryRun: false,
    yes: false,
    resign: true,
    relaunched: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--asar' || a === '-a') opts.asar = argv[++i];
    else if (a.startsWith('--asar=')) opts.asar = a.slice('--asar='.length);
    else if (a === '--restore') opts.restore = true;
    else if (a === '--dry-run' || a === '-n') opts.dryRun = true;
    else if (a === '--yes' || a === '-y') opts.yes = true;
    else if (a === '--no-resign') opts.resign = false;
    else if (a === '--relaunched') opts.relaunched = true; // interno: relanzado con permisos
    else if (a === '--help' || a === '-h') opts.help = true;
    // Una ruta suelta (p. ej. al arrastrar la carpeta de TETR.IO sobre el .exe)
    // se toma como --asar.
    else if (!a.startsWith('-') && !opts.asar) opts.asar = a;
    else {
      console.error(`Argumento no reconocido: ${a}`);
      opts.help = true;
    }
  }
  return opts;
}

const HELP = `Traducción al español de TETR.IO Desktop  (tetrio-es-patcher v${embedded.version})

Modo normal: copia este programa dentro de la carpeta de TETR.IO y ábrelo con
doble clic. Aparece un menú para aplicar o deshacer la traducción; si hace
falta, pedirá permisos de administrador.

Uso avanzado (terminal):
  tetrio-es-patcher [opciones]

Opciones:
  -a, --asar <ruta>   Ruta a app.asar, a la carpeta resources o a TETR.IO.app
                      (por defecto: detecta la instalación automáticamente)
  -n, --dry-run       Muestra qué cambiaría, sin escribir nada
  -y, --yes           No pedir confirmación
      --restore       Restaura app.asar desde app.original.asar y termina
      --no-resign     Solo macOS: no volver a firmar la app tras el parche
  -h, --help          Muestra esta ayuda

La primera vez se guarda app.original.asar (+ .unpacked) junto a app.asar.
`;

function forceUtf8Console() {
  if (process.platform !== 'win32') return;
  try {
    execFileSync('chcp.com', ['65001'], { stdio: 'ignore' });
  } catch {
    /* si falla, los acentos pueden verse raros; no es crítico */
  }
}

function interactive() {
  if (process.env.TETRIO_ES_ASSUME_TTY) return true; // solo para pruebas
  return !!(process.stdin.isTTY && process.stdout.isTTY);
}

// Espera a que el usuario pulse ENTER. En Windows/macOS la ventana se cierra
// sola al terminar (doble clic), así que hay que retenerla para que se lea el
// resultado. En Linux se asume que se ejecuta desde una terminal.
function waitEnter(prompt) {
  return new Promise((resolve) => {
    if (!interactive()) return resolve();
    if (prompt) process.stdout.write(prompt);
    process.stdin.resume();
    process.stdin.once('data', () => {
      process.stdin.pause();
      resolve();
    });
  });
}

function pause() {
  if (process.platform === 'linux' || !interactive()) return Promise.resolve();
  return waitEnter('\nPulsa ENTER para cerrar esta ventana...');
}

// Lee una línea de texto del usuario. Devuelve null si no hay terminal.
function readLine(promptText) {
  return new Promise((resolve) => {
    if (!interactive()) return resolve(null);
    process.stdout.write(promptText);
    process.stdin.setEncoding('utf8');
    process.stdin.resume();
    process.stdin.once('data', (d) => {
      process.stdin.pause();
      resolve(String(d).replace(/[\r\n]+$/, ''));
    });
  });
}

// Normaliza lo que el usuario pega o arrastra: quita comillas del Explorador/
// Finder y los escapes de espacio de Finder.
function cleanPath(s) {
  if (!s) return s;
  s = s.trim();
  if (s.length >= 2 && ((s[0] === '"' && s.endsWith('"')) || (s[0] === "'" && s.endsWith("'")))) {
    s = s.slice(1, -1);
  }
  if (process.platform !== 'win32') s = s.replace(/\\ /g, ' ');
  return s.trim();
}

function findInstructions() {
  if (process.platform === 'win32') {
    return [
      'Cómo encontrar la carpeta de TETR.IO en Windows:',
      '  1. Clic derecho en el acceso directo de TETR.IO  ->  "Abrir ubicación del archivo".',
      '     (o búscala en  C:\\Users\\TU_USUARIO\\AppData\\Local\\Programs\\tetrio-desktop )',
      '  2. Dentro verás una carpeta llamada  "resources".',
      '  3. Dentro de "resources" está el archivo  "app.asar".',
    ];
  }
  if (process.platform === 'darwin') {
    return [
      'Cómo encontrar app.asar en macOS:',
      '  1. Abre la carpeta Aplicaciones y localiza  "TETR.IO".',
      '  2. Clic derecho sobre él  ->  "Mostrar contenido del paquete".',
      '  3. Entra en  Contents  ->  Resources.  Ahí está  "app.asar".',
    ];
  }
  return [
    'Dónde suele estar app.asar en Linux:',
    '  /opt/TETR.IO/resources/app.asar',
    '  /usr/lib/tetrio-desktop/resources/app.asar',
  ];
}

// Localiza app.asar; si falla y hay terminal, pide al usuario que lo indique.
async function resolveAsar(opts, log) {
  try {
    return locateAsar(opts.asar);
  } catch (firstErr) {
    if (opts.asar) log('\n' + firstErr.message);
    else log('\nNo se encontró TETR.IO automáticamente.');

    if (!interactive() || opts.relaunched) {
      const e = new Error(opts.asar ? firstErr.message : 'No se encontró la instalación de TETR.IO.');
      e.code = 'ENOTFOUND';
      throw e;
    }

    log('');
    for (const line of findInstructions()) log(line);
    log('');
    log('Arrastra esa carpeta (o el propio archivo app.asar) a esta ventana,');
    log('o pega la ruta, y pulsa ENTER.');

    for (let intento = 1; intento <= 3; intento++) {
      const ans = cleanPath(await readLine('\nRuta (vacío = cancelar): '));
      if (!ans) break;
      try {
        const found = locateAsar(ans);
        opts._locatedInteractively = true;
        return found;
      } catch (e) {
        log('  ✗ ' + e.message);
      }
    }
    const e = new Error('No se pudo localizar app.asar.');
    e.code = 'ENOTFOUND';
    throw e;
  }
}

function canWriteDir(dir) {
  if (process.env.TETRIO_ES_FORCE_ELEVATE) return false; // solo para pruebas
  const probe = path.join(dir, `.tetrio-es-write-test-${process.pid}`);
  try {
    fs.writeFileSync(probe, 'x');
    fs.rmSync(probe, { force: true });
    return true;
  } catch {
    return false;
  }
}

// Relanza este mismo ejecutable con permisos elevados. Devuelve:
//   { detached: true }  -> se abrió otra ventana; este proceso debe terminar
//   { detached: false } -> ya se ejecutó (su salida se muestra aquí)
function relaunchElevated(forwardArgs) {
  const self = process.execPath;

  if (process.env.TETRIO_ES_NOELEVATE) {
    // Solo para pruebas: no eleva, muestra lo que haría.
    console.log('[noelevate] ' + [self, ...forwardArgs].join(' '));
    return { detached: true };
  }

  if (process.platform === 'win32') {
    const list = forwardArgs.map((a) => "'" + String(a).replace(/'/g, "''") + "'").join(',');
    const cmd =
      `Start-Process -FilePath '${self.replace(/'/g, "''")}'` +
      (forwardArgs.length ? ` -ArgumentList ${list}` : '') +
      ' -Verb RunAs';
    try {
      execFileSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', cmd], {
        stdio: ['ignore', 'ignore', 'pipe'],
      });
    } catch (e) {
      const s = String(e.stderr || e.message || '');
      if (/canceled|cancelled|denied/i.test(s)) throw new Error('cancelaste la ventana de permisos (UAC)');
      throw new Error(s.trim() || 'no se pudo elevar permisos');
    }
    return { detached: true };
  }

  if (process.platform === 'darwin') {
    const q = (s) => "'" + String(s).replace(/'/g, "'\\''") + "'";
    const inner = [self, ...forwardArgs].map(q).join(' ') + ' 2>&1';
    const script =
      `do shell script ${JSON.stringify(inner)} with administrator privileges ` +
      `with prompt "tetrio-es-patcher necesita permiso para modificar TETR.IO"`;
    let out;
    try {
      out = execFileSync('osascript', ['-e', script], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    } catch (e) {
      const s = String(e.stderr || e.message || '');
      if (/User canceled|-128/i.test(s)) throw new Error('cancelaste la solicitud de contraseña');
      throw new Error(s.trim() || 'no se pudo elevar permisos');
    }
    if (out) process.stdout.write(out.endsWith('\n') ? out : out + '\n');
    return { detached: false };
  }

  // Linux: pkexec (diálogo gráfico) o sudo (terminal).
  const runner = ['pkexec', 'sudo'].find((c) => {
    try {
      execFileSync('sh', ['-c', `command -v ${c}`], { stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  });
  if (!runner) throw new Error('instala pkexec o ejecútalo con sudo');
  const r = spawnSync(runner, [self, ...forwardArgs], { stdio: 'inherit' });
  if (r.status !== 0) throw new Error('cancelado o sin permisos');
  return { detached: false };
}

function maybeResign(asarPath, log) {
  if (process.platform !== 'darwin') return;
  const appDir = path.resolve(path.dirname(asarPath), '..', '..');
  if (!appDir.endsWith('.app')) return;
  try {
    log('  volviendo a firmar la app (ad-hoc)...');
    execFileSync('codesign', ['--force', '--deep', '--sign', '-', appDir], { stdio: 'pipe' });
    try {
      execFileSync('xattr', ['-cr', appDir], { stdio: 'pipe' });
    } catch {
      /* no crítico */
    }
    log('  firma OK');
  } catch (e) {
    log('! no se pudo firmar. Si macOS dice que la app está "dañada", ejecuta:');
    log(`    codesign --force --deep --sign - "${appDir}"`);
    log('  ' + String(e.stderr || e.message).trim());
  }
}

async function doWork(opts, asarPath, log) {
  if (opts.restore) {
    await restore({ asarPath, sentinel: embedded.sentinel, log });
    maybeResign(asarPath, log);
    log('\nListo. TETR.IO volvió a su idioma original.');
    return;
  }
  const translation = Buffer.from(embedded.translationB64, 'base64').toString('utf8');
  const res = await patch({
    asarPath,
    translation,
    banner: embedded.banner,
    sentinel: embedded.sentinel,
    dryRun: opts.dryRun,
    log,
  });
  if (res.changed) {
    if (opts.resign) maybeResign(asarPath, log);
    log('\n¡Listo! Abre TETR.IO y disfrútalo en español.');
    log('Para deshacerlo más adelante, vuelve a abrir este programa y elige la opción 2.');
  }
}

// Menú interactivo (doble clic). Devuelve 'exit' si el usuario elige salir.
// Fija opts.restore / opts._menuConfirmed según la elección.
async function chooseAction(opts, asarPath, log) {
  if (opts.yes || opts.dryRun || opts.restore || opts.relaunched || !interactive()) return;

  const state = detectState(asarPath, embedded.sentinel);
  log('');
  if (state === 'patched') log('Estado actual:  TETR.IO está EN ESPAÑOL (parche aplicado).');
  else if (state === 'stock') log('Estado actual:  TETR.IO está en su idioma original (inglés).');

  log('');
  log('¿Qué quieres hacer?');
  log('  [1]  Aplicar / actualizar la traducción al español');
  log('  [2]  Deshacer el parche y volver al idioma original');
  log('  [3]  Salir sin hacer cambios');

  const def = state === 'patched' ? '2' : '1';
  for (let i = 0; i < 3; i++) {
    const ans = (await readLine(`\nElige una opción [1/2/3] (Enter = ${def}): `) || '').trim() || def;
    if (ans === '1') {
      opts._menuConfirmed = true;
      return;
    }
    if (ans === '2') {
      opts.restore = true;
      opts._menuConfirmed = true;
      return;
    }
    if (ans === '3') {
      log('No se hizo ningún cambio.');
      return 'exit';
    }
    log('  Escribe 1, 2 o 3.');
  }
  return 'exit';
}

async function run() {
  forceUtf8Console();
  const opts = parseArgs(process.argv.slice(2));
  const log = (m) => console.log(m);

  if (opts.help) {
    process.stdout.write(HELP);
    return;
  }

  log(`== Traducción al español de TETR.IO Desktop  (v${embedded.version}) ==`);

  let asarPath;
  try {
    asarPath = await resolveAsar(opts, log);
  } catch (e) {
    console.error('\n' + e.message);
    console.error('Consejo: copia este programa DENTRO de la carpeta de TETR.IO, o indícalo con:');
    console.error('  tetrio-es-patcher --asar "RUTA A app.asar O A LA CARPETA resources"');
    process.exitCode = 2;
    await pause();
    return;
  }
  const resourcesDir = path.dirname(asarPath);
  log(`Instalación: ${path.dirname(resourcesDir)}`);

  // Menú al abrir con doble clic (sin haber pedido una acción concreta).
  const menu = await chooseAction(opts, asarPath, log);
  if (menu === 'exit') {
    await pause();
    return;
  }

  // Confirmación (una tecla) cuando se abrió con doble clic y no hubo menú.
  if (
    !opts.yes &&
    !opts.dryRun &&
    !opts.relaunched &&
    !opts._menuConfirmed &&
    !opts._locatedInteractively &&
    interactive() &&
    process.platform !== 'linux'
  ) {
    await waitEnter(
      (opts.restore
        ? '\nPulsa ENTER para restaurar el idioma original'
        : '\nPulsa ENTER para aplicar la traducción') + ' (o cierra la ventana para cancelar)... '
    );
  }

  // ¿Hace falta elevar permisos?
  if (!opts.dryRun && !canWriteDir(resourcesDir)) {
    if (opts.relaunched || !PACKAGED) {
      console.error(
        '\nNo se puede escribir en la carpeta de TETR.IO:\n  ' +
          resourcesDir +
          (process.platform === 'linux' ? '\nEjecútalo con sudo.' : '\nCierra TETR.IO por completo e inténtalo de nuevo.')
      );
      process.exitCode = 1;
      await pause();
      return;
    }
    log('\nSe necesitan permisos de administrador para modificar esta instalación...');
    const fwd = ['--asar', asarPath, '--relaunched', '--yes'];
    if (opts.restore) fwd.push('--restore');
    if (!opts.resign) fwd.push('--no-resign');
    try {
      const r = relaunchElevated(fwd);
      if (r.detached) log('Se abrió otra ventana con permisos de administrador; continúa ahí.');
    } catch (e) {
      console.error('\nNo se concedieron los permisos: ' + e.message);
      process.exitCode = 1;
    }
    await pause();
    return;
  }

  // Aplicar / restaurar.
  try {
    await doWork(opts, asarPath, log);
  } catch (e) {
    if (e.code === 'EACCES' || e.code === 'EPERM') {
      console.error('\nSin permisos para escribir. Cierra TETR.IO por completo e inténtalo de nuevo.');
    } else {
      console.error('\nNo se pudo completar: ' + e.message);
    }
    process.exitCode = 1;
  }
  await pause();
}

run().catch(async (e) => {
  console.error('Error inesperado: ' + (e && e.message ? e.message : e));
  process.exitCode = 1;
  await pause();
});
