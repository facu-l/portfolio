const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/facu-l',
    description: 'facu-l',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/facundo-lambertucci',
    description: 'facundo-lambertucci',
  },
  {
    label: 'Email',
    href: 'mailto:facuambertucci@gmail.com',
    description: 'facuambertucci@gmail.com',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-zinc-100 mb-4">Contacto</h2>
        <p className="text-zinc-400 mb-10">
          Estoy disponible para proyectos freelance, pasantías y oportunidades
          de trabajo. Escribime.
        </p>

        <div className="space-y-4">
          {links.map(({ label, href, description }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors group"
            >
              <span className="text-zinc-100 font-medium">{label}</span>
              <span className="text-zinc-500 group-hover:text-zinc-300 text-sm transition-colors">
                {description} →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
