# Registro de cambios

Cambios notables de este proyecto, en español. Formato inspirado en
[Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

Cada versión publicada (tag `vX.Y.Z`) tiene su propia sección `## [X.Y.Z] - AAAA-MM-DD`
más abajo. El workflow de **Release** extrae automáticamente la sección que
coincide con el tag que se está publicando y la usa como cuerpo de las notas
de lanzamiento en GitHub — por eso el encabezado de cada versión debe escribirse
exactamente como `## [X.Y.Z] - AAAA-MM-DD` (sin texto extra en esa misma línea).

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

### Corregido
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
  Al publicar una versión, mueve lo de "Sin publicar" a una seccion nueva
  con este formato exacto (el workflow de Release busca este encabezado
  literal para extraer las notas del tag correspondiente):

  ## [X.Y.Z] - AAAA-MM-DD

  ### Añadido
  - ...

  ### Corregido
  - ...
-->

