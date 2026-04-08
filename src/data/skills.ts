import type { Skill } from '../types'

export const skills: Skill[] = [
  // Languages
  { name: 'Java', category: 'languages' },
  { name: 'TypeScript', category: 'languages' },
  { name: 'JavaScript', category: 'languages' },

  // Frontend
  { name: 'React', category: 'frontend' },
  { name: 'Vite', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'HTML', category: 'frontend' },
  { name: 'CSS', category: 'frontend' },

  // Backend
  { name: 'Node.js', category: 'backend' },
  { name: 'Express', category: 'backend' },
  { name: 'PostgreSQL', category: 'backend' },
  { name: 'REST APIs', category: 'backend' },

  // Tools
  { name: 'Git', category: 'tools' },
  { name: 'GitHub', category: 'tools' },
  { name: 'Vercel', category: 'tools' },
  { name: 'VS Code', category: 'tools' },
]

export const categoryLabels: Record<Skill['category'], string> = {
  languages: 'Lenguajes',
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Herramientas',
}
