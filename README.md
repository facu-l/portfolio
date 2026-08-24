# Portfolio — Facundo Lambertucci

Portfolio personal. Una sola página con secciones, más un case study en ruta
propia. Sin backend: el formulario de contacto va directo a Web3Forms.

**Producción:** https://facundolambertucci.vercel.app

## Stack

| Qué | Con qué |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 — **sin `tailwind.config.ts`**, los tokens viven en `@theme` dentro de [app/globals.css](app/globals.css) |
| Tipografía | Inter vía `next/font` (self-hosted, sin request a Google en runtime) |
| Tests | Vitest + Testing Library + jsdom |
| Formulario | Web3Forms |
| Deploy | Vercel |

## Setup

```bash
npm install
cp .env.example .env.local   # y completar las variables (ver abajo)
npm run dev                  # http://localhost:3000
```

## Comandos

```bash
npm run dev      # desarrollo
npm run build    # build de producción
npm start        # servir el build
npm test         # tests (una corrida)
npm run test:watch
npm run lint
```

## Variables de entorno

Van en `.env.local` para desarrollo y en **Project Settings → Environment
Variables** de Vercel para producción.

| Variable | Para qué | Si falta |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL absoluta del sitio: metatags de Open Graph, `robots.txt` y `sitemap.xml` | Cae a `http://localhost:3000`. La tarjeta al compartir el link apunta a localhost y no carga, y el sitemap declara URLs que no existen |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Envío del formulario de contacto | La sección Contact muestra los links sociales en vez del formulario |

> **`NEXT_PUBLIC_` se reemplaza en tiempo de BUILD, no de runtime.** Agregar o
> cambiar una de estas variables en Vercel **no hace nada hasta que redeployés**.
> Ya nos pasó una vez con `og:url`.

La access key de Web3Forms **es pública por diseño**: viaja en el body de un POST
desde el navegador y cualquiera puede verla en las devtools. No es un secret.
Está en una variable de entorno igual, para poder rotarla sin tocar código y para
no dejarla escrita en un repo público.

## La tarjeta al compartir el link

[app/opengraph-image.tsx](app/opengraph-image.tsx) genera en el build la imagen
de 1200×630 que dibujan WhatsApp, LinkedIn y Slack al pegar el link. Lee `SITE` y
`BRAND`, así que cambia sola cuando cambia el contenido o la paleta.

Los `.woff` de [app/fonts/](app/fonts/) están versionados porque **Satori —el
motor que convierte ese JSX en PNG— no soporta woff2**, que es lo que entrega
`next/font`. Son 60KB que nunca viajan al navegador: los usa solo el build.

> **Las plataformas cachean la tarjeta.** Una vez que LinkedIn o WhatsApp
> guardan la previsualización de una URL, no la vuelven a mirar aunque cambies el
> sitio. Si cambiaste la imagen, hay que forzar el refresco desde el debugger de
> cada plataforma antes de compartir el link en serio.

## Estructura

```
app/
  layout.tsx                          fuente, metadata, Open Graph
  page.tsx                            orden de las secciones
  globals.css                         EL SISTEMA DE DISEÑO (tokens @theme)
  work/gym-management-system/page.tsx case study
components/                           un componente por sección + primitivas
content/                              todo el texto y los datos, separados del JSX
public/proyectos/                     capturas de los proyectos
```

**Regla de dependencia:** los componentes importan de `content/`, nunca al revés.
Si un texto está escrito dentro del JSX, está en el lugar equivocado.

**Regla de estilos:** ningún hexadecimal ni número mágico en el JSX. Si hace
falta un valor que no existe, se agrega primero como token en `globals.css`.

## Client Components

Cuatro, y cada uno tiene su razón escrita en el archivo:

| Componente | Por qué necesita el navegador |
|---|---|
| [StickyHeader.tsx](components/StickyHeader.tsx) | Observa el scroll para compactar el header |
| [ContactForm.tsx](components/ContactForm.tsx) | Estado de envío del formulario |
| [Reveal.tsx](components/Reveal.tsx) | `IntersectionObserver` para la aparición al scroll |
| [SplitHeading.tsx](components/SplitHeading.tsx) | Anima el `<h2>` de cada sección letra por letra |

Todo lo demás es Server Component y no viaja como JavaScript al navegador.

`"use client"` es una **frontera, no una etiqueta**: se hereda hacia abajo por el
árbol de imports, no por el de JSX. Por eso `Reveal` puede envolver una sección
entera sin volverla cliente — la sección se renderiza en el servidor y le llega
como `children` ya armada.

Los dos últimos cargan su dependencia tarde. `SplitHeading` hace `await
import("animejs")` recién cuando la sección entra en pantalla, así que la
librería sale en su propio chunk y quien no scrollea nunca la descarga.

### La aparición al scroll, en tres piezas

Vale la pena saber que no es solo CSS:

1. [globals.css](app/globals.css) oculta los bloques `[data-reveal]`, pero dentro
   de `@media (scripting: enabled)`. Con JavaScript apagado la regla no aplica y
   se ve todo el contenido — un `opacity: 0` estático dejaría la página en blanco
   para un crawler.
2. [revealAboveFold.ts](components/revealAboveFold.ts) es un script inline al
   final del `<body>`. Corre **antes del primer pintado** y marca los bloques que
   ya estaban a la vista para que aparezcan de una, sin animarse. Sin él, lo que
   entra en el primer pantallazo queda en blanco hasta que React hidrata.
3. `Reveal` anima el resto cuando entran al viewport.

## Documentación relacionada

- [DESIGN.md](DESIGN.md) — por qué los tokens valen lo que valen, contraste
  verificado y las reglas que salen de esa tabla
- [TODOS.md](TODOS.md) — trabajo diferido a propósito, con el disparador
  concreto que lo volvería a poner sobre la mesa
