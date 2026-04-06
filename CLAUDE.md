# Portfolio — Facundo Lambertucci

## Contexto del proyecto
Portfolio personal deployado en Vercel. URL: portfolio-facu-l.vercel.app
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
- appointments-api: API REST con Node.js + TypeScript
- Landing personal trainer: React + Vite + Tailwind, cliente real
- quick-builds: colección de micro-proyectos web

## Decisiones de diseño tomadas
- SPA con scroll entre secciones (sin React Router)
- Dark mode por defecto
- Tailwind para todos los estilos, sin CSS custom salvo excepciones
- Datos de proyectos separados del JSX (src/data/projects.ts)
- Sin animaciones complejas, solo fade-in al hacer scroll

## Convenciones de commits
Formato: type(scope): description
Tipos válidos: feat, fix, refactor, docs, test, chore, style
Ejemplo: feat(hero): add hero section with name and CTA buttons

## Lo que falta construir (en orden)
1. ~~Limpiar archivos base de Vite (App.css, assets/react.svg, public/vite.svg)~~ ✅ Hecho
2. Definir tipos en src/types/index.ts
3. Cargar datos en src/data/projects.ts
4. Construir componentes en orden: Hero → About → Projects → Skills → Contact
5. Agregar formulario de contacto con Web3Forms
