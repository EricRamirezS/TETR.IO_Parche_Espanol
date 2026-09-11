# TETR.IO en Español (extensión de navegador)

Traduce la versión web de TETR.IO (**tetr.io**, jugado en el navegador) al
español automáticamente, sin tener que pegar nada en la consola. Usa el mismo
`Assets/translation.js` que el parcheador de escritorio — una sola traducción,
dos formas de aplicarla.

## ¿Por qué una extensión y no "detectarlo desde el parcheador"?

Un programa de escritorio no puede alcanzar una pestaña de un navegador ya
abierto ni ejecutar código en su consola — los navegadores lo bloquean
deliberadamente por seguridad (si cualquier programa pudiera inyectar JS en tus
pestañas, sería una puerta trasera enorme). La única forma soportada de
inyectar código automáticamente en una página es que **algo dentro del propio
navegador** lo haga: una extensión (o un userscript de Tampermonkey). Por eso
esto es una extensión aparte del `.exe`, no una función del parcheador.

## Costos: ¿hay que pagar?

**No, no hace falta pagar nada.** Solo la publicación *pública* en la Chrome
Web Store tiene una cuota única (~5 USD, de por vida, no por extensión). Para
uso propio o para compartirlo con la comunidad hay alternativas gratis:

| Dónde | Costo | Cómo |
|---|---|---|
| **Chrome / Edge / Brave** (modo desarrollador) | Gratis | "Cargar descomprimida" — ver abajo. Es lo más rápido. |
| **Firefox** (temporal) | Gratis | `about:debugging` → "Cargar complemento temporal". Se borra al cerrar Firefox. |
| **Firefox, permanente, sin listar** | Gratis | Subir como *Unlisted* a addons.mozilla.org: Mozilla la firma pero no aparece en las búsquedas públicas. Da un `.xpi` instalable siempre. |
| **Microsoft Edge Add-ons** | Gratis | A diferencia de Chrome, publicar en la tienda de Edge no tiene cuota. |
| **Chrome Web Store** (listado público) | ~5 USD una vez | Solo si quieres que aparezca en las búsquedas de la Chrome Web Store. |

## Probarla ahora mismo (gratis, 1 minuto)

**Chrome / Edge / Brave:**
1. Ve a `chrome://extensions` (o `edge://extensions`).
2. Activa **«Modo de desarrollador»** (esquina superior derecha).
3. **«Cargar descomprimida»** → elige esta carpeta (`browser-extension/`).
4. Abre o recarga tetr.io. Se traduce solo.

**Firefox:**
1. `about:debugging#/runtime/this-firefox`
2. **«Cargar complemento temporal…»** → elige `browser-extension/manifest.json`.
3. Abre o recarga tetr.io.
   *(Se desinstala al cerrar Firefox; para algo permanente, ver la opción "Unlisted" de arriba.)*

## Actualizar la traducción

Tras editar `Assets/translation.js` (la misma fuente que usa el `.exe` de
escritorio):

```sh
./browser-extension/sync.sh      # o sync.ps1 en Windows
```

Copia el archivo a `browser-extension/content.js`. `build.sh` / `build.ps1` ya
lo hacen automáticamente. Luego, en `chrome://extensions`, pulsa el icono de
recargar (↻) de la extensión — no hace falta reinstalarla.

## Publicar de verdad

Hay un workflow que lo automatiza todo: **`.github/workflows/publish-extension.yml`**.
Se dispara a mano (pestaña *Actions* → *Publicar extensión de navegador* →
*Run workflow*) o subiendo una etiqueta `ext-vX.Y.Z`. Cada tienda necesita un
alta manual **una sola vez** (crear la ficha y sacar las credenciales); después
todo lo hace el workflow.

Si a alguna tienda todavía no le has configurado las credenciales, el workflow
la saltaría con error. Para desactivar temporalmente el job de una tienda sin
tocar el archivo: *Settings → Secrets and variables → Actions → Variables* →
crea `PUBLISH_CHROME` / `PUBLISH_EDGE` / `PUBLISH_FIREFOX` con valor `false`.

Para generar el `.zip` (manifest.json + content.js + icons/, sincronizado con
la traducción actual): `./package.ps1` (Windows) o `./package.sh` — queda en
`browser-extension/dist/tetrio-es-extension.zip` (no se sube al repo, es un
archivo de compilación).

### Chrome Web Store

1. Sube el `.zip` de esta carpeta (`./package.ps1` / `./package.sh`)
   **una vez a mano** en el
   [panel de desarrollador](https://chrome.google.com/webstore/devconsole)
   (ya pagaste la cuota). Anota el **ID de la extensión** (aparece en la URL
   del panel del ítem).
2. En [Google Cloud Console](https://console.cloud.google.com/): crea/elige un
   proyecto → *APIs & Services* → habilita **"Chrome Web Store API"** →
   *Credentials* → *Create credentials* → *OAuth client ID* → tipo **Desktop app**.
   Anota **Client ID** y **Client secret**.
3. Genera un **refresh token** una vez, con esas credenciales, en el
   [OAuth Playground de Google](https://developers.google.com/oauthplayground):
   engranaje (⚙) → marca *"Use your own OAuth credentials"* → pega tu Client
   ID/Secret → en el paso 1 pon el *scope* `https://www.googleapis.com/auth/chromewebstore`
   → *Authorize* → inicia sesión con la cuenta del panel de desarrollador →
   paso 2, *Exchange authorization code for tokens* → copia el **Refresh token**.
4. *Secrets* de GitHub (`Settings → Secrets and variables → Actions → New repository secret`):
   - `CHROME_EXTENSION_ID`
   - `CHROME_CLIENT_ID`
   - `CHROME_CLIENT_SECRET`
   - `CHROME_REFRESH_TOKEN`

### Microsoft Edge Add-ons

1. Regístrate gratis en el
   [Partner Center de Edge](https://partner.microsoft.com/dashboard/microsoftedge/).
2. Sube el `.zip` (`./package.ps1` / `./package.sh`) **una vez a mano** para crear la ficha (pide descripción,
   categoría, al menos una captura de pantalla y un icono — no vienen en este
   repo todavía, habrá que crearlos). Anota el **Product ID** (URL del panel
   del producto).
3. Da de alta acceso a la API: en Partner Center, *Publish API settings* del
   producto (o *Account settings → Users*) → sigue el flujo para registrar una
   app de **Microsoft Entra ID** (Azure AD). Anota:
   - **Client ID**
   - **Client secret**
   - La **Access token URL** exacta que te muestra esa misma pantalla (incluye
     tu *tenant id*; cópiala tal cual, no la inventes).
4. *Secrets* de GitHub:
   - `EDGE_PRODUCT_ID`
   - `EDGE_CLIENT_ID`
   - `EDGE_CLIENT_SECRET`
   - `EDGE_ACCESS_TOKEN_URL`

   `publish-edge.mjs` usa `scope` (API v1.1 actual). Si el token falla con
   `invalid_scope`, tu registro es del flujo antiguo: cambia en ese archivo
   `scope: '...'` por `resource: 'https://api.addons.microsoftedge.microsoft.com'`.

### Firefox (addons.mozilla.org)

1. Crea una cuenta gratis en <https://addons.mozilla.org/developers/>.
2. Genera credenciales de API en
   <https://addons.mozilla.org/developers/addon/api/key/>: te da un
   **JWT issuer** y un **JWT secret**.
3. *Secrets* de GitHub:
   - `FIREFOX_JWT_ISSUER`
   - `FIREFOX_JWT_SECRET`

   No hace falta alta manual previa: `web-ext sign --channel=unlisted` crea la
   ficha la primera vez, usando el `gecko.id` fijo de `manifest.json` (no lo
   cambies luego, o Mozilla lo tratará como una extensión distinta). El canal
   *unlisted* no pasa por la cola de revisión pública: valida y firma
   automáticamente en minutos, y da un `.xpi` descargable como artefacto del
   workflow.

## Estado

`manifest.json` (Manifest V3, compatible con Chrome/Edge/Firefox 109+) inyecta
`content.js` en `https://tetr.io/*`. Sin iconos todavía — no son obligatorios
para "cargar descomprimida" ni para Firefox, pero Chrome y Edge sí los piden en
el alta manual inicial de la ficha.
