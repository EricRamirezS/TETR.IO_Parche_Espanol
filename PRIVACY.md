# Política de privacidad — TETR.IO en Español

**Última actualización:** 2026-09-11

Esta extensión traduce al español la interfaz de [tetr.io](https://tetr.io).
Es un proyecto de la comunidad, no oficial ni afiliado a TETR.IO ni a su
desarrollador (osk).

## Qué datos recopila

**Ninguno.** La extensión no recopila, transmite, vende ni almacena ningún
dato personal, de navegación ni de uso.

Concretamente:

- **No hace peticiones de red.** No se comunica con ningún servidor, propio ni
  de terceros — ni siquiera para comprobar actualizaciones.
- **No usa cookies, `localStorage`, `sessionStorage` ni ningún otro
  almacenamiento**, del navegador ni remoto.
- **No hay analítica ni seguimiento** (sin Google Analytics ni nada similar).
- **No lee ni transmite tu cuenta de TETR.IO**, tu progreso, tus partidas ni
  ningún otro dato del sitio.
- **No accede a ninguna otra página.** Solo se ejecuta dentro de
  `https://tetr.io/*`; no tiene permiso sobre el resto de tu navegación.

## Qué hace exactamente

Un content script busca en la página los textos de la interfaz (menús,
botones, logros, mensajes del sistema) y los reemplaza por su traducción al
español, incluido el contenido que aparece dinámicamente mientras usas el
sitio. Es una modificación puramente visual del DOM, hecha enteramente en tu
navegador — nada de esto sale de tu equipo.

## Código

El código es abierto y auditable:
<https://github.com/EricRamirezS/TETR.IO_Parche_Espanol/tree/main/browser-extension>

## Contacto

Dudas sobre esta política: abre un *issue* en el repositorio de arriba.
