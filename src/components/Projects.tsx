import { projects } from '../data/projects'
import type { Project } from '../types'

function ProjectCard({ title, description, stack, githubUrl, demoUrl }: Project) {
  return (
    <article className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4 hover:border-zinc-700 transition-colors">
      <h3 className="text-zinc-100 font-semibold text-lg">{title}</h3>

      <p className="text-zinc-400 text-sm leading-relaxed flex-1">{description}</p>

      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2.5 py-1 bg-zinc-800 text-zinc-400 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4 pt-2">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          GitHub →
        </a>
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Demo →
          </a>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-zinc-100 mb-12">Proyectos</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}
