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
| `NEXT_PUBLIC_SITE_URL` | URL absoluta en las metatags de Open Graph | Cae a `http://localhost:3000` y el preview al compartir el link se rompe |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Envío del formulario de contacto | La sección Contact muestra los links sociales en vez del formulario |

> **`NEXT_PUBLIC_` se reemplaza en tiempo de BUILD, no de runtime.** Agregar o
> cambiar una de estas variables en Vercel **no hace nada hasta que redeployés**.
> Ya nos pasó una vez con `og:url`.

La access key de Web3Forms **es pública por diseño**: viaja en el body de un POST
desde el navegador y cualquiera puede verla en las devtools. No es un secret.
Está en una variable de entorno igual, para poder rotarla sin tocar código y para
no dejarla escrita en un repo público.

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

Solo dos, y cada uno tiene su razón escrita en el archivo:

- [components/StickyHeader.tsx](components/StickyHeader.tsx) — observa el scroll
- [components/ContactForm.tsx](components/ContactForm.tsx) — estado de envío

Todo lo demás es Server Component y no viaja como JavaScript al navegador.

## Documentación relacionada

- [DESIGN.md](DESIGN.md) — por qué los tokens valen lo que valen, contraste
  verificado y las reglas que salen de esa tabla
- [TODOS.md](TODOS.md) — trabajo diferido a propósito, con el disparador
  concreto que lo volvería a poner sobre la mesa
