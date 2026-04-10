import type { Skill } from '../types';

export const skills: Skill[] = [
    // Lenguajes
    { name: 'Java', category: 'languages' },
    { name: 'TypeScript', category: 'languages' },
    { name: 'JavaScript', category: 'languages' },
    { name: 'Python', category: 'languages' },
    { name: 'SQL', category: 'languages' },

    // Frontend
    { name: 'React', category: 'frontend' },
    { name: 'Tailwind CSS', category: 'frontend' },
    { name: 'Vite', category: 'frontend' },

    // Backend
    { name: 'Node.js', category: 'backend' },
    { name: 'Express', category: 'backend' },
    
    // Tools
    { name: 'Git', category: 'tools' },
    { name: 'GitHub', category: 'tools' },
    { name: 'Vercel', category: 'tools' },
]

export const categoryLabels: Record<Skill['category'], string> = {
    languages: 'Lenguajes',
    frontend: 'Frontend',
    backend: 'Backend',
    tools: 'Herramientas',
};