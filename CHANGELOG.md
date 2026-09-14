# Registro de cambios

Cambios notables de este proyecto, en español. Formato inspirado en
[Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

Mientras se trabaja, los cambios se anotan bajo **`## [Sin publicar]`**. Al
publicar un tag `vX.Y.Z`, el workflow de **Release** archiva esa sección solo
— la renombra a `## [X.Y.Z] - AAAA-MM-DD`, la usa como cuerpo de las notas de
lanzamiento en GitHub, deja una `[Sin publicar]` vacía lista para lo
siguiente, y publica ese cambio de vuelta en `main`. No hace falta editar
este archivo a mano antes de taguear.

## [Sin publicar]

### Añadido
- Cobertura de traducción muy ampliada en `tetrio.js`/la extensión: modales de
  cuenta (cerrar sesión, cambiar nombre, verificación en dos pasos, reportes),
  moderación (advertencias, DEVTOOLS, evasión de baneos), errores de conexión
  y servidor, notificaciones (regalos de Supporter, invitaciones, mods
  desbloqueados/dominados), y textos dibujados en canvas con bitmap font
  (cuenta regresiva "preparados/listos/¡ya!", pisos de la Torre Zenith,
  avisos de Battle Royale, contador de jugadores en línea).
- Traducción completa de nombres de teclas: la tabla de controles
  personalizados y las dos tablas de referencia (estándar y WASD) ahora
  muestran los nombres en español para todo el teclado, no solo las teclas
  usadas por defecto.
- Soporte de imágenes de reemplazo en formato **WebP** (además de PNG/JPG/SVG),
  con clave independiente de la extensión del archivo — reduce
  significativamente el peso de `translation.js`.
- La extensión de navegador ya tiene icono propio (`icons/icon{16,32,48,128}.png`)
  y está publicada públicamente en la Chrome Web Store y en
  addons.mozilla.org (Firefox, canal *listed*).

### Corregido
- `Assets/build-translation.ps1` dejaba el directorio de trabajo de
  PowerShell en `Assets/` si algo fallaba a mitad de script, rompiendo las
  rutas relativas del script que lo llamaba (`sync.ps1`). Se corrigió ahí y
  en el resto de scripts `.ps1` del repo con el mismo patrón (restaurar la
  ubicación original dentro de un `try`/`finally`).
- Varios bugs de traducción "silenciosa" que dejaban texto en inglés sin que
  se notara a simple vista: expresiones regulares con espacios de más,
  handlers que sobrescribían contenido ya traducido por el propio juego
  (ej. el nombre de usuario en el modal de cuenta duplicada), y casos donde
  un mismo texto tiene una variante "pasado" y una "futuro" pero el código
  solo cubría una de las dos.
- Corregidas claves de objeto duplicadas en el diccionario de traducciones
  que el motor de JavaScript resolvía en silencio a favor de la última
  definición, dejando la primera sin efecto.

<!--
  No hace falta tocar nada aqui al publicar: el workflow de Release archiva
  "[Sin publicar]" solo (ver .github/workflows/release.yml). Durante el
  desarrollo, agrega entradas bajo "## [Sin publicar]" con este formato:

  ### Añadido
  - ...

  ### Corregido
  - ...
-->

