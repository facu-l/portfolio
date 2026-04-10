export default function Hero() {
    return (
        <section
            id="hero"
            className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        >
            {/* Etiqueta superior */}
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-4">
                Hola, soy 
            </p>

            {/* Nombre - lo mas importante visualmente */}
            <h1 className="text-6xl sm:text-7xl font-extrabold text-zinc-100 mb-4 leading-tight">
                Facundo<br />Lambertucci
            </h1>

            {/* Titulo profesional */}
            <p className="text-xl text-zinc-400 mb-10">
                Desarrollador Full Stack
            </p>

            {/* Botones CTA */}
            <div className="flex gap-4 flex-wrap justify-center">
                <a
                    href="#projects"
                    className="px-6 py-3 bg-accent text-zinc-950 font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                    Ver Proyectos
                </a>
                <a
                    href="#contact"
                    className="px-6 py-3 border border-zinc-700 text-zinc-300 font-semibold rounded-lg hover:borderg-zinc-400 transition-colors"
                >
                    Contactame
                </a>
            </div>

            {/* Links sociales */}
            <div className="flex gap-6 mt-14">
                <a
                    href="https://github.com/facu-l"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-zinc-200 text-sm transition-colors"
                >
                    GitHub
                </a>
                <a
                    href="https://www.linkedin.com/in/facundolambertucci/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-zinc-200 text-sm transition-colors"
                >
                    LinkedIn
                </a>
            </div>
        </section>
    );
}