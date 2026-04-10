import { projects } from '../data/projects';
import type { Project } from '../types';

function PorjectCard({title, description, stack, imageUrl, githubUrl, demoUrl}: Project) {
    return (
        <article className="group flex flex-col">

            {/*Imagen con hover: sube levemente y se opaca un poco*/}
            <div className="overflow-hidden rounded-xl mb-4">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full aspect-video object cover transition-all duration-300 group-hover:scale-[1.03] group-hover:opacity-80"
                    />
                ) : (
                    <div className="w-full aspect-video bg-zinc-800 rounded-xl" />
                )}
            </div>

            {/* Info debajo de la imagen */}
            <h3 className="text-zinc-100 font-bold text-lg mb-1">{title}</h3>
            <p className="text-zinc-500 text-sm mb-3">{description}</p>

            {/* Stack badges*/}
            <div className="flex flex-wrap gap-2 mb-4">
                {stack.map((tech) => (
                    <span
                        key={tech}
                        className="text-xs px-2.5 py-1 border border-zinc-700 text-zinc-400 rounded-full"
                    >
                        {tech}
                    </span>
                ))} 
            </div>  

            {/* Botones */}
            <div className="flex gap-3 mt-auto">
                <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 text-sm rounded-lg transition-colors"
                >
                    Code
                </a>
                {demoUrl && (
                    <a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-accent text-zinc-950 font-semibold text-sm rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Ver Web ↗
                    </a>
                )}
            </div>
        </article>
    );
}

export default function Projects() {
    return (
        <section id="projects" className="py-24 px-6">
            <div className="max-w-5xl mx-auto">

                {/* Label */}
                <div className="flex items-center gap-2 mb-12">
                    <span className="text-accent text-xl">•</span>
                    <h2 className="text-zinc-100 text-2xl font-bold">Proyectos</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <PorjectCard key={project.title} {...project} />
                    ))}
                </div>

            </div>
        </section>    
    );
}