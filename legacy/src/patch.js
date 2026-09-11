'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const asar = require('@electron/asar');

function readHeader(asarPath) {
  return JSON.parse(asar.getRawHeader(asarPath).headerString);
}

function collectFiles(header) {
  const out = [];
  (function walk(node, prefix) {
    for (const [name, value] of Object.entries(node.files || {})) {
      const p = (prefix ? prefix + '/' : '') + name;
      if (value.files) walk(value, p);
      else out.push({ path: p, unpacked: !!value.unpacked });
    }
  })(header, '');
  return out;
}

/*
 * Minimal set of directories to hand to `unpackDir` so the rebuilt archive
 * reproduces the same unpacked layout as `referenceAsar`. For a stock TETR.IO
 * this resolves to ["node_modules/register-scheme"].
 */
function deriveUnpackDirs(referenceAsar) {
  let files;
  try {
    files = collectFiles(readHeader(referenceAsar));
  } catch {
    return [];
  }
  const unpacked = files.filter((f) => f.unpacked);
  if (!unpacked.length) return [];

  const fullyUnpacked = (dir) => {
    const inside = files.filter((f) => f.path === dir || f.path.startsWith(dir + '/'));
    return inside.length > 0 && inside.every((f) => f.unpacked);
  };

  const dirs = new Set();
  for (const f of unpacked) {
    let cand = path.posix.dirname(f.path);
    while (cand && cand !== '.') {
      const parent = path.posix.dirname(cand);
      if (parent && parent !== '.' && fullyUnpacked(parent)) cand = parent;
      else break;
    }
    dirs.add(cand && cand !== '.' ? cand : f.path);
  }
  return [...dirs];
}

function unpackDirGlob(dirs) {
  if (!dirs.length) return undefined;
  if (dirs.length === 1) return dirs[0];
  return '{' + dirs.join(',') + '}';
}

function readPkg(asarPath) {
  try {
    return JSON.parse(asar.extractFile(asarPath, 'package.json').toString('utf8'));
  } catch {
    return null;
  }
}

function isTetrio(asarPath) {
  const pkg = readPkg(asarPath);
  return !!pkg && pkg.name === 'tetrio-desktop';
}

function currentPreload(asarPath) {
  try {
    return asar.extractFile(asarPath, 'preload.js').toString('utf8');
  } catch {
    return '';
  }
}

// 'patched' | 'stock' | 'unknown' -- estado del app.asar indicado.
function detectState(asarPath, sentinel) {
  const p = currentPreload(asarPath);
  if (!p) return 'unknown';
  return p.includes(sentinel) ? 'patched' : 'stock';
}

/*
 * Given a preload.js body, return the part that is TETR.IO's own code -- i.e.
 * everything before the injection boundary line. If the file was never patched
 * (no sentinel) the whole thing is returned unchanged.
 */
function stockPortion(preloadText, sentinel) {
  const lines = preloadText.split(/\r?\n/);
  const i = lines.findIndex((l) => l.includes(sentinel));
  if (i === -1) return { stock: preloadText, wasPatched: false };
  return { stock: lines.slice(0, i).join('\n').replace(/\s+$/, ''), wasPatched: true };
}

/*
 * True if `candidate` already contains a verbatim chunk of `translation` --
 * i.e. it is a translation build with no boundary marker (a hand-made patch),
 * so appending our translation to it would duplicate the whole thing.
 */
function containsInjection(candidate, translation) {
  const norm = (s) => s.replace(/\s+/g, ' ').trim();
  const hay = norm(candidate);
  const t = norm(translation);
  for (const frac of [0.15, 0.5, 0.85]) {
    const probe = t.slice(Math.floor(t.length * frac), Math.floor(t.length * frac) + 240);
    if (probe.length > 120 && hay.includes(probe)) return true;
  }
  return false;
}

function copyDir(src, dst) {
  fs.cpSync(src, dst, { recursive: true });
}

async function patch({ asarPath, translation, banner, sentinel, dryRun, log }) {
  const resourcesDir = path.dirname(asarPath);
  const backupAsar = path.join(resourcesDir, 'app.original.asar');
  const unpackedDir = asarPath + '.unpacked';
  const backupUnpacked = backupAsar + '.unpacked';

  if (!isTetrio(asarPath)) {
    throw new Error(
      `${asarPath} no parece ser de TETR.IO (el "name" de package.json no es "tetrio-desktop").`
    );
  }

  const needsUnpackedDir = collectFiles(readHeader(asarPath)).some((f) => f.unpacked);
  if (needsUnpackedDir && !fs.existsSync(unpackedDir)) {
    throw new Error(
      `Falta la carpeta "${path.basename(unpackedDir)}" junto a app.asar. ` +
        'La instalación parece incompleta: reinstala TETR.IO e inténtalo de nuevo.'
    );
  }

  const livePreload = currentPreload(asarPath);
  const { wasPatched: alreadyPatched } = stockPortion(livePreload, sentinel);

  // Decide whether the existing backup is a usable pristine baseline.
  //  - none yet                 -> create from current app.asar
  //  - present, same version    -> keep it
  //  - present, older version   -> TETR.IO was updated; current app.asar is the
  //                                new stock file, so refresh the backup
  const liveVersion = (readPkg(asarPath) || {}).version || null;
  const backupExists = fs.existsSync(backupAsar);
  const backupVersion = backupExists ? (readPkg(backupAsar) || {}).version || null : null;
  const backupStale =
    backupExists && !alreadyPatched && backupVersion && liveVersion && backupVersion !== liveVersion;
  const writeBackup = !backupExists || backupStale;

  // Reproduce the stock unpacked layout. Use the pristine backup as reference
  // when we are keeping it; otherwise the current app.asar is our best reference.
  const refAsar = backupExists && !backupStale && !alreadyPatched ? backupAsar : asarPath;
  const unpackDirs = deriveUnpackDirs(refAsar);
  const glob = unpackDirGlob(unpackDirs);
  log(`  carpetas unpacked: ${unpackDirs.length ? unpackDirs.join(', ') : '(ninguna)'}`);

  // ----- copia de seguridad (coherente con su propia carpeta .unpacked) -----
  if (!backupExists && alreadyPatched) {
    log('! app.asar ya está parcheado y no hay copia app.original.asar.');
    log('  El preload.js original se recupera desde la línea divisoria, pero para');
    log('  tener una base totalmente limpia, reinstala TETR.IO antes de continuar.');
  }
  if (backupStale) {
    log(`! TETR.IO cambió de versión (${backupVersion} -> ${liveVersion}); actualizando app.original.asar.`);
  }
  if (!dryRun) {
    if (writeBackup) {
      fs.copyFileSync(asarPath, backupAsar);
      fs.rmSync(backupUnpacked, { recursive: true, force: true });
      log(`+ copia ${backupExists ? 'actualizada' : 'creada'}: ${backupAsar}`);
    } else {
      log(`= copia ya existente: ${backupAsar} (v${backupVersion || '?'})`);
    }
    // Manual/older backups (and freshly refreshed ones) may lack the .unpacked
    // sibling. Rebuild it from the live install so backupAsar + backupUnpacked
    // form a valid pair that `extractAll` and `--restore` can rely on.
    if (unpackDirs.length && !fs.existsSync(backupUnpacked)) {
      for (const dir of unpackDirs) {
        const from = path.join(unpackedDir, dir);
        if (fs.existsSync(from)) copyDir(from, path.join(backupUnpacked, dir));
      }
      log(`+ copia creada: ${backupUnpacked}`);
    }
  } else {
    log(
      writeBackup
        ? `+ se ${backupExists ? 'actualizaría' : 'crearía'} la copia: ${backupAsar}`
        : `= copia existente: ${backupAsar}`
    );
  }

  // Isolate TETR.IO's own preload.js. Prefer the pristine backup as the source;
  // fall back to stripping our boundary out of the live file.
  const stockSource =
    backupExists && !backupStale ? currentPreload(backupAsar) || livePreload : livePreload;
  const stockPreload = stockPortion(stockSource, sentinel).stock;

  if (containsInjection(stockPreload, translation)) {
    throw new Error(
      'No se pudo aislar el preload.js propio de TETR.IO: el archivo ya contiene una\n' +
        'traducción inyectada sin línea divisoria (¿un parche hecho a mano?).\n' +
        'Solución: reinstala TETR.IO (o ejecuta --restore) y vuelve a aplicar la traducción.'
    );
  }

  // Final preload.js = TETR.IO's own preload  +  boundary  +  our translation.
  const injected = stockPreload.replace(/\s+$/, '') + '\n\n\n' + banner + '\n' + translation;

  // ----- extract, inject, repack -----
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'tetrio-es-patch-'));
  try {
    asar.extractAll(asarPath, tmp);

    const target = path.join(tmp, 'preload.js');
    const before = fs.existsSync(target) ? fs.statSync(target).size : 0;
    fs.writeFileSync(target, injected, 'utf8');
    log(
      `  preload.js: ${before} B -> ${Buffer.byteLength(injected)} B ` +
        `(original ${Buffer.byteLength(stockPreload)} B + traducción ${Buffer.byteLength(translation)} B)`
    );

    if (dryRun) {
      log('DRY RUN -- no se modificó app.asar.');
      return { changed: false, backupAsar };
    }

    // Stage in the target directory so the final swap is a same-filesystem move.
    const stagedAsar = path.join(resourcesDir, '.app.asar.staged');
    const stagedUnpacked = stagedAsar + '.unpacked';
    fs.rmSync(stagedAsar, { force: true });
    fs.rmSync(stagedUnpacked, { recursive: true, force: true });

    await asar.createPackageWithOptions(tmp, stagedAsar, glob ? { unpackDir: glob } : {});

    fs.copyFileSync(stagedAsar, asarPath);
    fs.rmSync(stagedAsar, { force: true });

    fs.rmSync(unpackedDir, { recursive: true, force: true });
    if (fs.existsSync(stagedUnpacked)) {
      copyDir(stagedUnpacked, unpackedDir);
      fs.rmSync(stagedUnpacked, { recursive: true, force: true });
    }

    log(`+ escrito ${asarPath}`);
    return { changed: true, backupAsar };
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

async function restore({ asarPath, sentinel, log }) {
  const resourcesDir = path.dirname(asarPath);
  const backupAsar = path.join(resourcesDir, 'app.original.asar');
  const unpackedDir = asarPath + '.unpacked';
  const backupUnpacked = backupAsar + '.unpacked';

  if (fs.existsSync(backupAsar)) {
    fs.copyFileSync(backupAsar, asarPath);
    fs.rmSync(unpackedDir, { recursive: true, force: true });
    if (fs.existsSync(backupUnpacked)) copyDir(backupUnpacked, unpackedDir);
    log(`+ ${asarPath} restaurado desde ${backupAsar}`);
    return;
  }

  // Sin copia: quitamos nuestra inyección y dejamos el preload.js propio de TETR.IO.
  const { stock, wasPatched } = stockPortion(currentPreload(asarPath), sentinel);
  if (!wasPatched) {
    log('= no hay copia de seguridad ni marca de parche: no hay nada que restaurar.');
    return;
  }
  log(`! sin copia app.original.asar; quitando el bloque inyectado de preload.js`);
  const unpackDirs = deriveUnpackDirs(asarPath);
  const glob = unpackDirGlob(unpackDirs);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'tetrio-es-restore-'));
  try {
    asar.extractAll(asarPath, tmp);
    fs.writeFileSync(path.join(tmp, 'preload.js'), stock.replace(/\s+$/, '') + '\n', 'utf8');
    const stagedAsar = path.join(resourcesDir, '.app.asar.staged');
    fs.rmSync(stagedAsar, { force: true });
    fs.rmSync(stagedAsar + '.unpacked', { recursive: true, force: true });
    await asar.createPackageWithOptions(tmp, stagedAsar, glob ? { unpackDir: glob } : {});
    fs.copyFileSync(stagedAsar, asarPath);
    fs.rmSync(stagedAsar, { force: true });
    fs.rmSync(unpackedDir, { recursive: true, force: true });
    if (fs.existsSync(stagedAsar + '.unpacked')) {
      copyDir(stagedAsar + '.unpacked', unpackedDir);
      fs.rmSync(stagedAsar + '.unpacked', { recursive: true, force: true });
    }
    log(`+ ${asarPath} sin parche`);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

module.exports = { patch, restore, deriveUnpackDirs, isTetrio, stockPortion, detectState };
