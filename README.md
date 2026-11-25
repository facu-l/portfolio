# Portfolio — Facundo Lambertucci

Portfolio personal para conseguir entrevistas como **Junior Full Stack
Developer**, en inglés (`/en`) y español (`/es`). Cada proyecto se presenta como
un caso con decisiones técnicas que linkean al código que las prueba. Sin
backend: el formulario de contacto va directo a Web3Forms.

**Producción:** https://facundolambertucci.vercel.app
**Decisiones de diseño y contenido:** [docs/superpowers/specs/2026-11-14-portfolio-rebrand-design.md](docs/superpowers/specs/2026-11-14-portfolio-rebrand-design.md)

## Stack

| Qué | Con qué |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack, `proxy.ts`) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4: **sin `tailwind.config.ts`**, los tokens viven en `@theme` dentro de [app/globals.css](app/globals.css) |
| Tipografía | Schibsted Grotesk (titulares y texto) + JetBrains Mono (datos técnicos), con `next/font/local` desde [app/fonts/](app/fonts/) (OFL). No se usa `next/font/google`: con la caché fría, Turbopack 16.3.2 falla el build al bajarlas |
| Tests | Vitest + Testing Library + jsdom |
| Formulario | Web3Forms |
| Deploy | Vercel |

## Setup

```bash
npm install
cp .env.example .env.local   # y completar las variables (ver abajo)
npm run dev                  # http://localhost:3000 (redirige a /en o /es)
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
| `NEXT_PUBLIC_SITE_URL` | URL absoluta del sitio: metatags de Open Graph, hreflang, `robots.txt` y `sitemap.xml` | Cae a `http://localhost:3000`. La tarjeta al compartir el link apunta a localhost y no carga |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Envío del formulario de contacto | Contact muestra los links directos en vez del formulario |

> **`NEXT_PUBLIC_` se reemplaza en tiempo de BUILD, no de runtime.** Agregar o
> cambiar una de estas variables en Vercel **no hace nada hasta que redeployés**.

La access key de Web3Forms **es pública por diseño**: viaja en el body de un POST
desde el navegador. Está en una variable de entorno para poder rotarla sin tocar
código, no para esconderla.

## Dos idiomas

- Todas las páginas viven bajo [app/[lang]/](app/[lang]/): `/en`, `/es` y
  `/[lang]/work/[slug]`. Se generan estáticas en el build. Un idioma inexistente
  da 404 y un caso inexistente muestra el 404 del idioma
  ([app/[lang]/not-found.tsx](app/[lang]/not-found.tsx)).
- [proxy.ts](proxy.ts) hace dos cosas: manda `/` al idioma del navegador
  (`Accept-Language`, 307) y normaliza mayúsculas (`/ES/...` → `/es/...`, 308).
  Conserva el query string. Ninguna URL ya canónica pasa por ahí.
- **Todo el texto** está en [content/en.ts](content/en.ts) y
  [content/es.ts](content/es.ts), con la forma de `SiteContent`
  ([content/types.ts](content/types.ts)). Si a un idioma le falta una clave, no
  compila. [content/i18n.test.ts](content/i18n.test.ts) cubre lo que el tipo no
  ve: mismos casos, misma cantidad de decisiones, mismos links, ningún texto
  vacío y ningún guion largo.
- La URL vieja `/work/gym-management-system` redirige (308) a la versión en
  inglés, desde [next.config.ts](next.config.ts).

> **Al editar copy: siempre en los dos archivos.** Y cada decisión técnica tiene
> que seguir probada por el link que la acompaña.

## La tarjeta al compartir el link

[app/[lang]/opengraph-image.tsx](app/[lang]/opengraph-image.tsx) genera en el
build una imagen de 1200×630 por idioma. Lee el rol y el estado del contenido y
los colores de [content/brand.ts](content/brand.ts) (un test los mantiene
iguales a `globals.css`).

**Satori, el motor que convierte ese JSX en PNG, no soporta woff2**, que es lo
que entrega `next/font`. Por eso las fuentes de la tarjeta salen de los paquetes
`@fontsource/*` (dependencias de desarrollo, traen `.woff`). Nunca viajan al
navegador.

> **Las plataformas cachean la tarjeta.** Si cambiaste la imagen, forzá el
> refresco desde el debugger de LinkedIn antes de compartir el link en serio.

## Estructura

```
app/
  globals.css                    EL SISTEMA DE DISEÑO (tokens @theme)
  sitemap.ts, robots.ts          con hreflang para los dos idiomas
  [lang]/
    layout.tsx                   <html lang>, fuentes, metadata
    page.tsx                     home: Hero, Work, Skills, About, Contact
    opengraph-image.tsx          tarjeta por idioma
    work/[slug]/page.tsx         página de cada caso
proxy.ts                         "/" -> "/en" o "/es"
lib/locale.ts                    idiomas, negociación, cambio de idioma
content/                         todo el texto (en.ts, es.ts) y la config
components/                      un componente por sección + primitivas
public/proyectos/                capturas de los proyectos
```

**Regla de dependencia:** las páginas leen el contenido con `getContent(lang)` y
se lo pasan a los componentes como props. Los componentes no saben de idiomas:
reciben texto. Por eso se testean en los dos idiomas sin simular Next.

**Regla de estilos:** ningún hexadecimal ni número mágico en el JSX. Si hace
falta un valor que no existe, se agrega primero como token en `globals.css`. El
lima (`--color-accent`) marca solo lo verificable o clickeable.

## Client Components

Cinco, y cada uno tiene su razón escrita en el archivo:

| Componente | Por qué necesita el navegador |
|---|---|
| [StickyHeader.tsx](components/StickyHeader.tsx) | Observa el scroll para compactar el header |
| [LanguageSwitcher.tsx](components/LanguageSwitcher.tsx) | Lee la ruta actual para ofrecer la misma página en el otro idioma |
| [CopyEmailButton.tsx](components/CopyEmailButton.tsx) | Portapapeles y feedback de "copiado" |
| [ContactForm.tsx](components/ContactForm.tsx) | Estado de envío del formulario |
| [Reveal.tsx](components/Reveal.tsx) | `IntersectionObserver` para la aparición al scroll |

Todo lo demás es Server Component y no viaja como JavaScript al navegador.

`"use client"` es una **frontera, no una etiqueta**: se hereda hacia abajo por el
árbol de imports, no por el de JSX. Por eso `Reveal` puede envolver una sección
entera sin volverla cliente.

### La aparición al scroll, en tres piezas

1. [globals.css](app/globals.css) oculta los bloques `[data-reveal]`, pero dentro
   de `@media (scripting: enabled) and (prefers-reduced-motion: no-preference)`.
   Con JavaScript apagado, o con movimiento reducido, se ve todo desde el inicio.
2. [revealAboveFold.ts](components/revealAboveFold.ts) es un script inline al
   final del `<body>`. Corre **antes del primer pintado** y marca los bloques que
   ya estaban a la vista para que aparezcan de una.
3. `Reveal` anima el resto cuando entran al viewport.

## Documentación relacionada

- [Brief de diseño](docs/superpowers/specs/2026-11-14-portfolio-rebrand-design.md):
  posicionamiento, jerarquía, dirección visual, criterio de movimiento
- [Plan de implementación](docs/superpowers/plans/2026-11-14-portfolio-rebrand.md)
- [TODOS.md](TODOS.md): trabajo diferido a propósito, con el disparador concreto
  que lo volvería a poner sobre la mesa
