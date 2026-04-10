import type { Project } from '../types';

export const projects: Project[] = [
    {
        title: 'API Gestion de Turnos(en proceso)',
        description: 'REST API para la gestión de turnos y clientes',
        stack: ['Node.js', 'Express', 'TypeScript'],
        imageUrl: '',
        githubUrl: 'https://github.com/facu-l/appointments-api',
    },
    {
        title: 'Personal Trainer Landing Page',
        description: 'Landing page para un entrenador personal. Diseño mobile-first, formulario de contacto funcional',
        stack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS'],
        imageUrl: '/images/personaltrainerludmila.png',
        githubUrl: 'https://github.com/facu-l/quick-builds/tree/main/personal-trainer-landing',
        demoUrl: 'https://ludmila-montes.vercel.app/',
    },
]
