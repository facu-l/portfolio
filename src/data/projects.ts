import type { Project } from '../types'

export const projects: Project[] = [
  {
    title: 'appointments-api',
    description:
      'API REST para gestión de turnos médicos. Autenticación JWT, roles de usuario y persistencia con PostgreSQL.',
    stack: ['Node.js', 'TypeScript', 'Express', 'PostgreSQL'],
    githubUrl: 'https://github.com/facu-l/appointments-api',
  },
  {
    title: 'Personal Trainer Landing',
    description:
      'Landing page para cliente real. Diseño mobile-first, formulario de contacto funcional y deploy en Vercel.',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/facu-l/portfolio',
    demoUrl: 'https://portfolio-facu-l.vercel.app',
  },
  {
    title: 'quick-builds',
    description:
      'Colección de micro-proyectos web: experimentos con HTML/CSS/JS, demos de APIs y pequeñas utilidades.',
    stack: ['HTML', 'CSS', 'JavaScript', 'React'],
    githubUrl: 'https://github.com/facu-l/quick-builds',
  },
]
