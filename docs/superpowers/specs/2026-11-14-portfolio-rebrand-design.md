# Rebranding del portfolio · Brief de diseño

**Fecha:** 2026-11-14 · **Estado:** pendiente de aprobación · **Sitio actual:** facundolambertucci.vercel.app

## 1. Intención

El portfolio existe para **conseguir entrevistas como Junior Full Stack Developer** (Argentina y remoto, full-time o part-time, disponible ya). Un recruiter tiene que entender el perfil y llegar al CV y al email en segundos; un líder técnico tiene que poder evaluar el trabajo: qué hizo Facundo, qué decidió y dónde está el código que lo prueba.

Regla editorial que gobierna todo (ya vigente en `content/about.ts`): **un curso listado es una afirmación; un repo que se puede abrir es evidencia.** Nada de experiencia, métricas ni capacidades inventadas.

### Objetivos
- Perfil, disponibilidad, CV y email visibles sin scroll.
- Cada proyecto muestra: problema, rol propio, 2-3 decisiones técnicas con link al código, resultado verificable (sitio en vivo o repo).
- Sitio completo en inglés y en español.

### No-objetivos
- Conseguir clientes freelance (eso es Falber Studio, que queda separado).
- Mostrar volumen de proyectos.
- Modo claro (ver decisión 4.6).

### Anti-objetivos (fracaso aunque funcione)
- Que parezca una copia del sitio de Falber Studio.
- Que algo del sitio no se pueda defender en una entrevista.
- Que una versión de idioma quede desactualizada respecto de la otra.
- Animaciones que demoren la lectura.

## 2. Enfoques considerados

| Enfoque | Qué es | Por qué sí / no |
|---|---|---|
| **A. Casebook** ✅ elegido | Cuaderno de ingeniería: cada proyecto es un caso con decisiones verificables. Monocromo + un acento + mono para datos técnicos. Movimiento mínimo. | Encaja con la evidencia más fuerte (calidad de decisiones), da preguntas de entrevista, escanea rápido. Trade-off: menos impacto visual inicial. |
| B. Poster | Estética de Falber Studio: tipografía gigante, scroll fijado. | Memorable, pero lento de escanear, pesado en celular y se confunde con el estudio. |
| C. README | Una página densa tipo CV. | Rápido y barato de mantener, pero no muestra criterio visual y se parece a todos. |

## 3. Posicionamiento y mensaje

- **Rol:** Junior Full Stack Developer. En el titular va solo "Full Stack Developer"; el nivel ("Junior") se dice en la línea de estado, la bio y Contact (decisión del 2026-11-25: en el h1 se leía como descuento antes de la evidencia).
- **Frase de valor (EN):** "I build web apps end to end, from the database rules to the interface, and keep them under test."
- **Frase de valor (ES):** "Construyo aplicaciones web de punta a punta, desde las reglas de la base de datos hasta la interfaz, y las mantengo bajo tests."
- **Estado (EN):** "Open to work · Argentina & remote · Full-time or part-time" (ES equivalente). Disponibilidad inmediata se dice en Contact, no en el hero (límite de 4 elementos del hero).
- **Personalidad:** precisa, honesta, cercana.
- **Relación con Falber Studio:** misma persona, distinta marca. El estudio no se muestra como logro; una línea en About: "I also take on small freelance projects." FALBER (la tienda) sí es evidencia central.
- **Uso de IA (frase acordada, va en el caso FALBER):** "Built with an AI-assisted workflow: I made and documented the architecture decisions (more than 120 in the decision log), reviewed every change, and kept the business rules under test so that generated code couldn't silently break them."
- **Bio:** se reescribe. Se elimina "building toward AI engineering as a deeper specialization" (mismo problema que la sección Currently Learning que ya se sacó). Se corrige "Full Stack" respaldándolo con FALBER, y en CEF se mantiene la aclaración de que el backend Rust fue de un compañero.

## 4. Jerarquía del contenido

### 4.1 Home (`/[lang]`)
1. **Navbar:** nombre con punto lima · Work · Skills · About · Contact · selector EN/ES · "CV".
2. **Hero:** rol + frase de valor + estado + CTAs `Download CV` (primario) y email con copiar al portapapeles (secundario). Foto real en B/N a la derecha (abajo en celular).
3. **Work:** dos casos, cada uno con resumen, stack, links y **una** tarjeta de decisión destacada, más link "Read the case study".
4. **Skills:** agrupadas, y cada grupo dice **dónde se usó** con link (ver 4.4).
5. **About:** bio, cómo trabajo (tests, decisiones documentadas, IA con revisión), Educación (UNLP + 2 certificaciones; Talento Tech con "View the API" → articulos-api), línea freelance.
6. **Contact:** email visible y copiable, CV ES/EN, LinkedIn, GitHub, "Available now". El formulario Web3Forms queda debajo como opción secundaria.

### 4.2 Proyectos (orden y criterio)
| # | Caso | Qué demuestra | Links |
|---|---|---|---|
| 1 | **FALBER: la tienda y su sistema interno** (proyecto solo, en producción). Incluye Decant Manager como segunda mitad del caso. | Full stack solo: modelo de datos, reglas en la base, seguridad, tests; Python con dinero exacto. | falber.com.ar · github.com/facu-l/landing-falber · github.com/facu-l/decant-manager |
| 2 | **CEF Gym Management System** (equipo de 5, cliente real). | Trabajo en equipo con Git Flow y code review; pagos con Mercado Pago, créditos de clases, asistencia por QR (lado cliente; backend Rust de un compañero). | sistema-cef.vercel.app · github.com/canizafa/sistema-cef |

**Fuera:** Personal Trainer Landing (evidencia más débil, FALBER la cubre), Worldcup Predictions (abandonado), appointments-api (esqueleto de 2 commits). **articulos-api** no es tarjeta: es evidencia en Educación y Skills.

### 4.3 Decisiones para las tarjetas (fuente real, no inventar)
FALBER, del `docs/FALBER_documento_maestro.md`:
- Stock solo cambia vía `stock_movements`; pedidos solo vía la RPC `create_order` (reglas en Postgres). → migración 0001.
- Idempotencia de pedidos: `orders.request_id` único (decisión 8).
- Precios siempre del servidor, nunca del carrito en `localStorage` (decisión 39).
- Tres clientes de Supabase; `service_role` solo en servidor con `server-only` (decisión 19).
- Policies con `(select public.is_admin())` y un test que lo vigila (decisión 74).

Decant Manager, del README y los tests:
- Dinero como `Decimal` guardado como TEXT, sin flotantes (`test_money.py`).
- Costo FIFO por lote (`test_fifo.py`).
- Ventas que se anulan, nunca se borran; cada lote y venta guarda la cotización de su día.
- Migraciones versionadas con `PRAGMA user_version` y un test por migración.

CEF: las decisiones se redactan a partir del case study actual (`content/projects.ts`) y del repo; **Facundo valida cada una antes de publicar**.

Home: 1 decisión por caso. Página del caso: 3 decisiones (FALBER puede llevar 3 de la tienda + 2 de Decant Manager).

### 4.4 Skills con evidencia
Cada grupo lleva "Used in" con link: Frontend → FALBER, CEF · Backend / Data → FALBER (Postgres, RLS, RPC), Decant Manager (Python, SQLite) · Java → articulos-api ("course project") · Testing → Vitest, Playwright, PGlite, pytest · Tools → Git, GitHub Actions (CI de FALBER), Vercel, Netlify. Skills sin evidencia pública (ej. Express) se quitan o se listan sin destacar.

### 4.5 Rutas e idiomas
- `/en` y `/es`; `/` redirige por `Accept-Language` (fallback `/en`). Selector visible en la navbar.
- Contenido en `content/en/*.ts` y `content/es/*.ts` con el mismo tipo; **test que falla si los dos idiomas no tienen las mismas claves**.
- `hreflang` + `alternates` en metadata, sitemap con ambos idiomas.
- Páginas de caso: `/[lang]/work/falber` y `/[lang]/work/gym-management-system`. **Redirect 308** de la URL vieja `/work/gym-management-system` → `/en/work/gym-management-system`.
- Capturas con UI en español: caption traducido en cada idioma.

### 4.6 Decisiones de producto tomadas por el diseñador (corregibles)
- **Solo dark** en esta versión (Facundo pidió dark como base; un modo claro duplica el QA visual sin ayudar al objetivo).
- **Disponibilidad** dicha en Contact, no en el hero.
- **Foto real**, no avatar ilustrado (el avatar es la marca del estudio; una cara real genera más confianza en un proceso de selección).

## 5. Dirección visual

**Design read:** portfolio de desarrollador para recruiters y líderes técnicos, lenguaje editorial-técnico, monocromo con un acento, Next.js + Tailwind v4 + CSS nativo. **Diales:** variance 6 · motion 3 · density 4.

### Color (tokens en `globals.css`)
| Token | Valor | Uso |
|---|---|---|
| `--color-background` | `#0c0d0f` | fondo |
| `--color-surface` | `#141518` | tarjetas de decisión, footer |
| `--color-border` | `#24262b` | líneas |
| `--color-foreground` | `#eef0f2` | texto principal, botón primario |
| `--color-muted` | `#8b9099` | texto secundario (verificar AA ≥ 4.5:1) |
| `--color-accent` | `#c8f03c` | **solo** lo verificable o clickeable: subrayado de links, "Decision N", punto final, indicador de estado, foco |

Reglas: el lima nunca va de fondo con texto claro; si hay fondo lima, el texto es `--color-background`. Un solo acento en toda la página.

### Tipografía
- **Schibsted Grotesk** (400/600/800): titulares y texto. Titulares 800 con tracking negativo.
- **JetBrains Mono** (400/500): datos técnicos (stack, rutas de archivos, nombres de tablas, links a commits, estado).
- Carga con `next/font`. Se reemplaza Inter (`app/fonts/Inter-*.woff`).
- Firma: punto final en lima en el nombre y en los títulos de sección y de proyecto.

### Forma y composición
- Radios: superficies 4px, botones en píldora. Esa es la regla completa, sin excepciones.
- Hero asimétrico (texto 1.5fr / foto 1fr) que en celular pasa a una columna. Ancho máximo ~1180px, gutter 16px en celular.
- Sin glow, sin gradientes decorativos, sin eyebrows en cada sección (máximo 1 cada 3), sin guion largo en el copy visible.
- Las secciones no repiten la misma familia de layout.

### Imágenes
- Capturas reales: FALBER (nuevas, desde falber.com.ar), Decant Manager (`docs/screenshots/` del repo, con datos de demo), CEF (las existentes en `public/proyectos/`).
- `next/image` con dimensiones explícitas; la foto del hero con `priority`.
- OG image regenerada con la nueva identidad (`app/opengraph-image.tsx`), una por idioma.

## 6. Movimiento y microinteracciones

**Criterio:** cada animación tiene que comunicar jerarquía, feedback o un cambio de estado. Si no se puede justificar en una frase, se saca.

- **Carga:** fade + 8px de desplazamiento en el hero, escalonado, < 400ms en total. Una sola vez.
- **Scroll:** reveal sutil por sección (se conserva `Reveal` + `revealAboveFold`, ajustando duración y easing). Sin scroll secuestrado, sin pin, sin parallax.
- **Hover:** subrayado lima que crece en links; flecha ↗ que se desplaza 2px. 150ms, ease-out.
- **Copiar email:** el botón cambia a "Copied" con check, 1.5s, y se anuncia a lectores de pantalla (`aria-live`).
- **Botones:** `:active` con `scale(0.98)`.
- **Se elimina** la animación letra por letra de títulos (anime.js) y la dependencia `animejs`: demora la lectura y no comunica nada.
- Todo respeta `prefers-reduced-motion` (sin movimiento, solo estado final). Solo `transform` y `opacity`.
- Implementación en CSS (transiciones + IntersectionObserver ya existente). No se agrega Motion ni GSAP: con motion 3 no se justifica el peso.

**Skills de apoyo:** principios de Emil Kowalski para easing, duraciones y el feedback de copiar; ui-ux-pro-max como checklist de accesibilidad y UX en la revisión; 21st-ui solo si hace falta un componente puntual (ej. el selector de idioma), no como base visual.

## 7. Qué se conserva y qué cambia

| Se conserva | Cambia |
|---|---|
| Regla editorial "afirmación vs evidencia" | Paleta azul con glow → monocromo + lima |
| Separación contenido (`content/`) / componentes | Inter → Schibsted Grotesk + JetBrains Mono |
| Tests por componente (Vitest) y e2e (Playwright) | Hero centrado en el nombre → hero centrado en el rol + estado + CV/email |
| Case study de CEF con rol propio vs equipo | Proyectos: FALBER + Decant Manager pasa a ser el caso principal; sale la landing |
| Skip link, foco visible, `revealAboveFold` | Sin email visible → email visible y copiable |
| CV en ES y EN | Solo inglés → bilingüe con rutas `/en` `/es` |
| Formulario Web3Forms (honeypot) | Formulario pasa a ser secundario |
| SEO: robots, sitemap, OG | Bio sin la promesa de AI engineering |
| Foto real | Títulos animados con anime.js → se eliminan |

## 8. Restricciones

- Next.js 16.3: leer `node_modules/next/dist/docs/` antes de tocar routing, i18n o metadata (AGENTS.md avisa de cambios incompatibles).
- Tailwind v4 con tokens en `@theme` (ya es así).
- Sin backend propio; el sitio sigue siendo estático salvo el redirect por idioma.
- Accesibilidad: AA en todo el texto, foco visible en lima, `lang` correcto por ruta.
- Commits atómicos `type(scope): description` en inglés.
- `CLAUDE.md` del repo menciona `liquid-gooey` y un documento de diseño local no versionado: se actualiza para apuntar a este brief.

## 9. Entrega por partes (cada parte se verifica en escritorio y celular con gstack)

1. **Fundaciones:** tokens de color, tipografías, eliminar anime.js. Sin cambios de contenido.
2. **i18n:** rutas `/[lang]`, contenido duplicado en `en`/`es`, test de paridad, redirect, hreflang.
3. **Hero + navbar** con estado, CV, copiar email y selector de idioma.
4. **Work:** modelo de datos de caso + decisiones, tarjetas del home, página de caso FALBER (con Decant Manager), migración del caso CEF.
5. **Skills con evidencia + About** (bio nueva, cómo trabajo, Educación, línea freelance).
6. **Contact + footer + OG + sitemap**.
7. **QA final:** gstack en desktop (1440) y celular (375), Lighthouse, contraste, reduced motion, ambos idiomas.

## 10. Queda a criterio del implementador
- Redacción final del copy dentro de las reglas de este brief (Facundo revisa ambas versiones antes de publicar).
- Estructura exacta de tipos para `Decision` y `CaseStudy`.
- Qué capturas de FALBER tomar y cómo recortarlas.
- Componentes internos y nombres de archivo.

## 11. Pendientes de Facundo
- Validar las decisiones de CEF redactadas.
- Revisar el copy en ES y EN antes de publicar.
- Poder explicar sin mirar: por qué las reglas viven en la base, cómo funciona RLS acá y cómo se testean las migraciones.
