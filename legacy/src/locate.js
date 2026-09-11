'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

function windowsCandidates() {
  const bases = [
    process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'Programs', 'tetrio-desktop'),
    process.env.PROGRAMFILES && path.join(process.env.PROGRAMFILES, 'tetrio-desktop'),
    process.env['PROGRAMFILES(X86)'] && path.join(process.env['PROGRAMFILES(X86)'], 'tetrio-desktop'),
  ];
  return bases.filter(Boolean).map((b) => path.join(b, 'resources', 'app.asar'));
}

function darwinCandidates() {
  const home = os.homedir();
  return [
    '/Applications/TETR.IO.app/Contents/Resources/app.asar',
    path.join(home, 'Applications/TETR.IO.app/Contents/Resources/app.asar'),
  ];
}

function linuxCandidates() {
  const home = os.homedir();
  return [
    '/opt/TETR.IO/resources/app.asar',
    '/opt/tetrio-desktop/resources/app.asar',
    '/usr/lib/tetrio-desktop/resources/app.asar',
    '/usr/lib64/tetrio-desktop/resources/app.asar',
    '/usr/share/tetrio-desktop/resources/app.asar',
    path.join(home, '.local/share/tetrio-desktop/resources/app.asar'),
  ];
}

// The recommended way to use the patcher is to drop the executable into the
// TETR.IO application folder and double-click it. These paths are relative to
// the executable's own location so that "just works" with no arguments.
function selfDirCandidates() {
  let exeDir;
  try {
    exeDir = path.dirname(process.execPath);
  } catch {
    return [];
  }
  return [
    path.join(exeDir, 'resources', 'app.asar'), // exe in the app root (Windows/Linux)
    path.join(exeDir, 'app.asar'), // exe inside resources/
    path.join(exeDir, 'Contents', 'Resources', 'app.asar'), // exe next to a .app's contents
    path.join(exeDir, '..', 'Resources', 'app.asar'), // exe inside TETR.IO.app/Contents/MacOS
    path.join(exeDir, 'TETR.IO.app', 'Contents', 'Resources', 'app.asar'), // exe beside the .app
  ];
}

function candidates() {
  const osList =
    process.platform === 'win32'
      ? windowsCandidates()
      : process.platform === 'darwin'
        ? darwinCandidates()
        : linuxCandidates();
  return [...selfDirCandidates(), ...osList];
}

function resolveExplicit(input) {
  const p = path.resolve(input);
  let st;
  try {
    st = fs.statSync(p);
  } catch {
    throw new Error(`No existe la ruta: ${p}`);
  }
  if (st.isDirectory()) {
    // Se acepta: la carpeta de la app, su carpeta resources o un bundle .app de macOS.
    const tries = [
      path.join(p, 'app.asar'),
      path.join(p, 'resources', 'app.asar'),
      path.join(p, 'Contents', 'Resources', 'app.asar'),
    ];
    const found = tries.find((t) => fs.existsSync(t));
    if (!found) throw new Error(`No se encontró app.asar dentro de ${p}`);
    return found;
  }
  return p;
}

function locateAsar(explicit) {
  if (explicit) return resolveExplicit(explicit);
  const list = candidates();
  const found = list.find((c) => fs.existsSync(c));
  if (found) return found;
  const err = new Error(
    'No se encontró una instalación de TETR.IO automáticamente.\n' +
      'Indica la ubicación a mano:\n' +
      '  --asar "<ruta a app.asar, a la carpeta resources o a TETR.IO.app>"\n\n' +
      'Se buscó en:\n' +
      list.map((c) => '  - ' + c).join('\n')
  );
  err.code = 'ENOTFOUND';
  throw err;
}

module.exports = { locateAsar, candidates };
