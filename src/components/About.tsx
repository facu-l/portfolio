export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-zinc-100 mb-8">Sobre mí</h2>

        <div className="space-y-4 text-zinc-400 leading-relaxed">
          <p>
            Soy estudiante de Ingeniería en Sistemas en Argentina, enfocado en
            desarrollo web. Trabajo con React, TypeScript y Node.js para
            construir aplicaciones reales desde el diseño hasta el deploy.
          </p>
          <p>
            Me interesa escribir código limpio, aprender buenas prácticas y
            entender el criterio detrás de cada decisión técnica. Actualmente
            profundizando en estructuras de datos, orientación a objetos y
            arquitectura de software.
          </p>
        </div>

        <a
          href="/cv.pdf"
          download
          className="inline-block mt-8 px-5 py-2.5 border border-zinc-700 hover:border-blue-500 text-zinc-300 hover:text-blue-400 text-sm font-medium rounded-lg transition-colors"
        >
          Descargar CV →
        </a>
      </div>
    </section>
  )
}
