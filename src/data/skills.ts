import type { Skill } from '../types';

export const skills: Skill[] = [
    // Lenguajes
    { name: 'Java', category: 'languages', description: '' },
    { name: 'TypeScript', category: 'languages', description: '' },
    { name: 'JavaScript', category: 'languages', description: '' },
    { name: 'Python', category: 'languages', description: '' },
    { name: 'SQL', category: 'languages', description: '' },

    // Frontend
    { name: 'React', category: 'frontend', description: '' },
    { name: 'Tailwind CSS', category: 'frontend', description: '' },
    { name: 'Vite', category: 'frontend', description: '' },
    { name: 'HTML', category: 'frontend', description: '' },
    { name: 'CSS', category: 'frontend', description: '' },

    // Backend
    { name: 'Node.js', category: 'backend', description: '' },
    { name: 'Express', category: 'backend', description: '' },
    { name: 'PostgreSQL', category: 'backend', description: '' },
    { name: 'REST APIs', category: 'backend', description: '' },

    // Tools
    { name: 'Git', category: 'tools', description: '' },
    { name: 'GitHub', category: 'tools', description: '' },
    { name: 'Vercel', category: 'tools', description: '' },
    { name: 'VS Code', category: 'tools', description: '' },
]

export const categoryLabels: Record<Skill['category'], string> = {
    languages: 'Lenguajes',
    frontend: 'Frontend',
    backend: 'Backend',
    tools: 'Herramientas',
}
