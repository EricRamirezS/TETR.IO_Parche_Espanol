# tetrio-es-patcher

Aplicación de escritorio que traduce **TETR.IO Desktop al español**. Es un
asistente gráfico sencillo: elige *Aplicar* o *Deshacer* y listo. No hay que usar
la terminal ni instalar nada.

- **Un solo ejecutable**, sin dependencias. El runtime va dentro (no necesitas
  .NET, ni Node, ni nada).
- Windows, macOS y Linux.
- Guarda una copia de seguridad y permite volver al original en un clic.
- Pide permisos de administrador solo si hace falta (UAC en Windows, diálogo de
  contraseña en macOS).

La traducción se inyecta en `preload.js` dentro de `resources/app.asar`. Este
repositorio **no contiene código de TETR.IO**: el `preload.js` original se lee de
tu propia instalación al aplicar el parche (ver [Aviso legal](#aviso-legal)).

> **¿Juegas TETR.IO en el navegador (tetr.io) en vez de la app de escritorio?**
> Este `.exe` no la traduce — un programa de escritorio no puede inyectar código
> en una pestaña ya abierta. Para eso hay una **extensión de navegador** aparte
> (misma traducción), gratis:
>
> - **Chrome / Edge / Brave:** [Chrome Web Store](https://chromewebstore.google.com/detail/tetrio-en-español/bgnmapfkbjocebaofkoidigmhgkgilgp)
> - **Firefox / otros / instalación manual:** ver
>   [`browser-extension/`](browser-extension/README.md)

---

## Cómo usarlo

Descarga el archivo de tu sistema desde la
[última versión](../../releases/latest) y **cierra TETR.IO** antes de empezar.

### Windows

1. Descarga **`tetrio-es-patcher-windows-x64.exe`**.
2. Haz **doble clic**.
   - Si aparece *"Windows protegió tu PC"*: **Más información → Ejecutar de todas
     formas** (no está firmado, no es que sea peligroso).
3. Se abre el asistente:
   - Muestra la carpeta de TETR.IO detectada y si está en inglés o en español.
     Si no la encuentra, pulsa **«Cambiar carpeta…»** y elígela.
     *(Para dar con ella: clic derecho en el acceso directo de TETR.IO → «Abrir
     ubicación del archivo».)*
   - Pulsa **«Aplicar la traducción al español»**.
4. Si Windows pide permisos de administrador, acéptalos *(en la instalación
   normal, solo para tu usuario, no hace falta)*.
5. Cuando diga **«¡Listo!»**, abre TETR.IO.

### macOS

1. Descarga **`tetrio-es-patcher-macos-arm64.zip`** (Apple Silicon) o
   **`-macos-x64.zip`** (Intel) y ábrelo (se descomprime a **`Traducir TETR.IO.app`**).
2. La primera vez macOS lo bloquea por no estar firmado por un desarrollador
   identificado: **clic derecho en la app → Abrir → Abrir**.
   *(O Ajustes del Sistema → Privacidad y seguridad → «Abrir de todos modos».)*
3. En el asistente, pulsa **«Aplicar la traducción al español»**.
4. Escribe tu **contraseña** cuando el sistema la pida (para modificar
   `/Applications`).
5. Cuando termine, abre TETR.IO.

> Si macOS dijera que *«TETR.IO está dañado»*: en una Terminal,
> `sudo codesign --force --deep --sign - /Applications/TETR.IO.app`.

### Linux

1. Descarga **`tetrio-es-patcher-linux-x64`** (o `-arm64`).
2. Dale permiso de ejecución (`chmod +x`) y ábrelo. Si TETR.IO está en `/opt` o
   `/usr`, ejecútalo con permisos elevados (el asistente usa `pkexec`).

---

## Deshacer

Vuelve a abrir la aplicación y pulsa **«Deshacer el parche»**. Restaura
`app.asar` desde la copia `app.original.asar` que se guardó la primera vez.
*(Actualizar TETR.IO también deja el idioma como estaba; solo hay que volver a
aplicar el parche.)*

---

## Preguntas frecuentes

**¿Necesito instalar .NET / Node / algo?**
No. El ejecutable lo trae todo dentro.

**Actualicé TETR.IO y volvió al inglés.**
Normal: la actualización reemplaza `app.asar`. Abre la app y pulsa «Aplicar» otra
vez; detecta la versión nueva y refresca su copia de seguridad.

**¿Me pueden banear?**
Solo cambia textos de la interfaz en tu propia máquina y no da ninguna ventaja en
la partida. Aun así es una modificación no oficial: úsala bajo tu
responsabilidad.

**No encuentra TETR.IO.**
Pulsa «Cambiar carpeta…» y elige la carpeta de TETR.IO (o su subcarpeta
`resources`, donde está `app.asar`).

**«No se puede eliminar app.asar, está en uso» / TETR.IO seguía abierto.**
Si TETR.IO (o alguno de sus procesos) sigue en ejecución, el asistente lo
detecta y lo cierra automáticamente antes de tocar `app.asar` (lo verás en el
registro: «TETR.IO está abierto; cerrándolo…»). Si aun así falla, ciérralo tú
mismo (Administrador de tareas en Windows, Monitor de Actividad en macOS) y
vuelve a intentarlo; también puede ser un antivirus bloqueando el archivo un
instante — el asistente reintenta varios segundos antes de rendirse.

**TETR.IO instalado como Flatpak / Snap / AppImage.**
No se puede parchear una imagen de solo lectura. Habría que extraer `app.asar`,
indicárselo con «Cambiar carpeta…» y volver a montarlo a mano.

---

## Aviso legal

`Assets/translation.js` es trabajo de traducción propio; **no contiene código
fuente de TETR.IO**. El `preload.js` original al que se añade permanece en la
máquina de cada usuario y no se redistribuye aquí. TETR.IO es © osk. Si el
titular de los derechos lo solicita, esto se retira.
