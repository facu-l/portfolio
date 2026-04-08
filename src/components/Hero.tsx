export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      <p className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-4">
        Hola, soy
      </p>

      <h1 className="text-5xl sm:text-6xl font-bold text-zinc-100 mb-4">
        Facundo Lambertucci
      </h1>

      <p className="text-xl sm:text-2xl text-zinc-400 mb-8">
        Desarrollador Full Stack
      </p>

      <p className="text-zinc-500 max-w-md mb-10 leading-relaxed">
        Estudiante de Ingeniería en Sistemas. Construyo aplicaciones web con
        React, TypeScript y Node.js.
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <a
          href="#projects"
          className="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-lg transition-colors"
        >
          Ver proyectos
        </a>
        <a
          href="#contact"
          className="px-6 py-3 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-zinc-100 font-medium rounded-lg transition-colors"
        >
          Contactame
        </a>
      </div>

      <div className="flex gap-6 mt-12">
        <a
          href="https://github.com/facu-l"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 hover:text-zinc-200 transition-colors text-sm"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/facundo-lambertucci"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 hover:text-zinc-200 transition-colors text-sm"
        >
          LinkedIn
        </a>
      </div>
    </section>
  )
}
