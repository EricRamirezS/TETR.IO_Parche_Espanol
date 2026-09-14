#!/usr/bin/env node
// Publica un paquete en Microsoft Edge Add-ons usando la API v1.1
// (https://learn.microsoft.com/microsoft-edge/extensions-chromium/publish/api/using-addons-api).
//
// Variables de entorno requeridas:
//   EDGE_PRODUCT_ID        (de la URL del panel del producto en Partner Center)
//   EDGE_CLIENT_ID         (registro de app en Microsoft Entra ID)
//   EDGE_CLIENT_SECRET
//   EDGE_ACCESS_TOKEN_URL  (la URL exacta que Partner Center muestra al dar de alta el acceso API)
//
// Uso: node publish-edge.mjs <ruta-al-zip>

import { readFileSync } from 'node:fs';

const { EDGE_CLIENT_ID, EDGE_CLIENT_SECRET, EDGE_ACCESS_TOKEN_URL, EDGE_PRODUCT_ID } = process.env;
const packagePath = process.argv[2];

if (!packagePath) {
  console.error('Uso: node publish-edge.mjs <ruta-al-zip>');
  process.exit(1);
}
for (const [k, v] of Object.entries({ EDGE_CLIENT_ID, EDGE_CLIENT_SECRET, EDGE_ACCESS_TOKEN_URL, EDGE_PRODUCT_ID })) {
  if (!v) {
    console.error(`Falta la variable de entorno ${k}.`);
    process.exit(1);
  }
}

const API = 'https://api.addons.microsoftedge.microsoft.com';

async function getToken() {
  // Si falla con invalid_scope (registro antiguo de Partner Center), cambia "scope" por "resource" (ver README).
  const body = new URLSearchParams({
    client_id: EDGE_CLIENT_ID,
    client_secret: EDGE_CLIENT_SECRET,
    grant_type: 'client_credentials',
    scope: 'https://api.addons.microsoftedge.microsoft.com/.default',
  });
  const res = await fetch(EDGE_ACCESS_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!res.ok) throw new Error(`No se pudo obtener el token (${res.status}): ${await res.text()}`);
  const json = await res.json();
  return json.access_token;
}

async function uploadPackage(token) {
  const zip = readFileSync(packagePath);
  const res = await fetch(`${API}/v1/products/${EDGE_PRODUCT_ID}/submissions/draft/package`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/zip' },
    body: zip,
  });
  if (res.status !== 202) throw new Error(`Fallo al subir el paquete (${res.status}): ${await res.text()}`);
  const operationLocation = res.headers.get('location');
  if (!operationLocation) throw new Error('La respuesta no trae la URL de la operación (header Location).');
  return operationLocation;
}

async function waitForUpload(token, operationUrl) {
  for (let i = 0; i < 30; i++) {
    const res = await fetch(operationUrl, { headers: { Authorization: `Bearer ${token}` } });
    const json = await res.json();
    console.log(`  estado: ${json.status}`);
    if (json.status === 'Succeeded') return;
    if (json.status === 'Failed') throw new Error('La validación del paquete falló: ' + JSON.stringify(json.message ?? json));
    await new Promise((r) => setTimeout(r, 10000));
  }
  throw new Error('Tiempo de espera agotado subiendo el paquete.');
}

async function publish(token) {
  const res = await fetch(`${API}/v1/products/${EDGE_PRODUCT_ID}/submissions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ notes: 'Publicado automáticamente desde GitHub Actions.' }),
  });
  if (res.status !== 202) throw new Error(`Fallo al publicar (${res.status}): ${await res.text()}`);
  console.log('Enviado a revisión de Microsoft. Operación:', res.headers.get('location'));
}

const token = await getToken();
console.log('Token obtenido.');
const op = await uploadPackage(token);
console.log('Paquete subido; esperando validación…');
await waitForUpload(token, op);
console.log('Paquete validado. Publicando…');
await publish(token);
console.log('Listo.');
