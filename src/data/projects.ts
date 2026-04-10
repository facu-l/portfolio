import type { Project } from '../types';

export const projects: Project[] = [
    {
        title: 'API Gestión de Turnos',
        description: 'API REST para la gestión de turnos y clientes. Autenticación JWT, roles de usuario. En desarrollo.',
        stack: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL'],
        imageUrl: '',
        githubUrl: 'https://github.com/facu-l/appointments-api',
    },
    {
        title: 'Personal Trainer Landing Page',
        description: 'Landing page para cliente real. Diseño mobile-first, formulario de contacto funcional y deploy en Vercel.',
        stack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS'],
        imageUrl: '/images/personaltrainerludmila.png',
        githubUrl: 'https://github.com/facu-l/quick-builds/tree/main/personal-trainer-landing',
        demoUrl: 'https://ludmila-montes.vercel.app/',
    },
]
