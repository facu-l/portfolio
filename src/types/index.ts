export interface Project {
  title: string
  description: string
  stack: string[]
  githubUrl: string
  demoUrl?: string
}

export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'tools' | 'languages'
}
