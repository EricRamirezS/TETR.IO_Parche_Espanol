## Descarga

| Sistema | Archivo |
|---|---|
| Windows | [tetrio-es-patcher-windows-x64.exe](https://github.com/${REPO}/releases/download/${TAG}/tetrio-es-patcher-windows-x64.exe) |
| macOS (Apple Silicon) | [tetrio-es-patcher-macos-arm64.zip](https://github.com/${REPO}/releases/download/${TAG}/tetrio-es-patcher-macos-arm64.zip) |
| macOS (Intel) | [tetrio-es-patcher-macos-x64.zip](https://github.com/${REPO}/releases/download/${TAG}/tetrio-es-patcher-macos-x64.zip) |
| Linux (x64) | [tetrio-es-patcher-linux-x64](https://github.com/${REPO}/releases/download/${TAG}/tetrio-es-patcher-linux-x64) |
| Linux (ARM64) | [tetrio-es-patcher-linux-arm64](https://github.com/${REPO}/releases/download/${TAG}/tetrio-es-patcher-linux-arm64) |

¿Juegas en el navegador (tetr.io) en vez de la app de escritorio? Ese `.exe`
no te sirve — hay una [extensión de navegador](https://github.com/${REPO}/tree/main/browser-extension)
aparte, gratis, con la misma traducción.

## Avisos

* No reportes errores a osk/TETR.IO mientras uses este parche. Es una
  modificación no oficial, sin relación con el desarrollador del juego —
  reportar con el parche activo solo genera confusión y puede jugar en tu
  contra.
* Este parche **solo cambia texto de la interfaz** en tu propia máquina. No
  toca la lógica del juego ni da ninguna ventaja competitiva. Aun así, sigue
  siendo una modificación no oficial: úsala bajo tu propia responsabilidad.
* Actualizar TETR.IO reemplaza `app.asar` y el juego vuelve a quedar en
  inglés — es normal. Abre el asistente y pulsa **«Aplicar»** de nuevo;
  detecta la versión nueva sola.

## Instalación

Descarga el archivo de tu sistema (arriba) y **cierra TETR.IO** antes de empezar.

* **Windows:** doble clic en el `.exe`. Si aparece *"Windows protegió tu PC"*:
  **Más información → Ejecutar de todas formas** (no está firmado, no es
  peligroso).
* **macOS:** descomprime el `.zip`. La primera vez, **clic derecho en la app
  → Abrir → Abrir** (no está firmada por un desarrollador identificado).
* **Linux:** dale permiso de ejecución (`chmod +x`) y ábrelo.

Guía completa, con capturas y solución de problemas, en el
[README](https://github.com/${REPO}#cómo-usarlo).

## Deshacer

Vuelve a abrir la aplicación y pulsa **«Deshacer el parche»**. Restaura el
`app.asar` original desde la copia de seguridad que se guardó la primera vez.

## Registro de cambios

<!--CHANGELOG-->

---

Verifica la integridad de tu descarga con las sumas SHA-256 adjuntas en
`SHA256SUMS.txt`.
