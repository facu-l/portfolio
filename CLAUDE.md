# Portfolio — Facundo Lambertucci

## Contexto del proyecto
Portfolio para mostrar a entrevistadores y recruiters.
Transmitir: desarrollador ordenado, prolijo, proactivo, con criterio de diseño.
Repo: github.com/facu-l/portfolio


## Stack
- React + Vite + TypeScript + Tailwind CSS v4
- Deploy automático en Vercel (cada push a main)

## Estructura de carpetas
src/
├── components/   → Hero, About, Projects, Skills, Contact
├── data/
│   └── projects.ts     → datos de proyectos separados del JSX
├── types/
│   └── index.ts        → interfaces TypeScript (Project, Skill)
├── App.tsx
├── main.tsx
└── index.css

## Secciones del portfolio
1. Hero — nombre, título, botones "Ver proyectos" y "Contactame"
2. About — descripción breve + link a CV descargable
3. Projects — cards con nombre, descripción, stack y links
4. Skills — tecnologías reales que manejo
5. Contact — email, LinkedIn, GitHub

## Proyectos a mostrar
- appointments-api: API REST con Node.js + TypeScript (en desarrollo, sin imagen)
- Landing personal trainer: React + Vite + Tailwind, cliente real (imagen: personaltrainerludmila.png)

## Referencia visual
Template Irene (irene-template.framer.website) — inspeccionado con browser-use el 2026-04-09.
Screenshots guardados en `reference/irene/` (01-hero.png → 06-contact.png).

### Navbar
- Logo (nombre) izquierda, links derecha
- Sin fondo, transparente sobre el negro
- Link activo con punto debajo en acento

### Hero
- Tipografía gigante bold uppercase, ocupa todo el viewport
- Primera línea blanca, segunda línea en lima (`#F2F983`), tercera blanca
- Sin imagen — solo texto centrado y grande

### About
- Label `• About` izquierda con bullet como prefijo (~30% del ancho)
- Texto descriptivo + botón CTA a la derecha (~70%)
- Layout 2 columnas, mucho espacio negativo

### Recent Work (Projects)
- Label `• Recent Work` izquierda + año a la derecha (`2019—2024`)
- Grid 2 columnas, imágenes cuadradas/rectangulares SIN bordes redondeados
- Título del proyecto + categoría en gris debajo de la imagen

### Skills
- Label `• Skills` izquierda
- Cada skill: título grande de categoría + párrafo descriptivo a la derecha
- Sin badges, sin íconos — puro texto, transmite criterio

### Contact
- Bloque oscuro separado visualmente del resto
- Texto enorme bold uppercase: "LET'S WORK TOGETHER"
- Email grande debajo con bullet y acento lima: `• HI@IRENE.COM`

### Reglas generales
- Fondo negro puro (`zinc-950`)
- Tipografía bold uppercase en todos los títulos y labels
- Bullet `•` en acento lima como prefijo de cada sección
- Mucho espacio negativo entre secciones
- Layout siempre de 2 columnas: label izq, contenido der

## Decisiones de diseño tomadas
- SPA con scroll entre secciones (sin React Router)
- Dark mode por defecto
- Tailwind para todos los estilos, sin CSS custom salvo excepciones
- Datos de proyectos separados del JSX (src/data/projects.ts)
- Tipografía Geist (Google Fonts), bold + uppercase en títulos
- Acento: `#F2F983` (lima), registrado como `--color-accent` en `@theme`
- Skills: título + descripción por categoría (no badges individuales)
- Foto del autor en el Hero (a la derecha del nombre)
- Animación "barrido" en navbar → dejar para el final

## Extra a Modo de trabajo
Estoy aprendiendo mientras construyo. Para cada cambio:
1. Explicame qué estás haciendo y por qué
2. Mostrá el código con comentarios que expliquen las decisiones
3. Si hay varias formas de hacerlo, explicá cuál elegiste y por qué
4. Después de implementar, decime qué aprendí en esta sesión

## Convenciones de commits
Antes de hacer commits o cualquier movimiento con Git mostrame lo que se construyó y preguntame si seguimos con el commit
Formato: type(scope): description
Tipos válidos: feat, fix, refactor, docs, test, chore, style
Ejemplo: feat(hero): add hero section with name and CTA buttons

## Lo que falta construir (en orden)
1. ~~Limpiar archivos base de Vite~~ ✅
2. ~~Definir tipos en src/types/index.ts~~ ✅
3. ~~Cargar datos en src/data/projects.ts y src/data/skills.ts~~ ✅
4. ~~Construir Hero.tsx~~ ✅ (pendiente: ajustar uppercase + foto)
5. ~~Construir Projects.tsx~~ ✅
6. Construir Navbar.tsx → primero, define el marco visual
7. Ajustar Hero.tsx → uppercase, foto a la derecha, layout 2 columnas
8. Construir About.tsx → layout 2 col estilo Irene
9. Construir Skills.tsx → título grande + descripción por categoría
10. Construir Contact.tsx → label izq, links der, CTA grande
11. Ensamblar todo en App.tsx
12. Agregar animación "barrido" en navbar
13. Agregar CV en public/cv.pdf

