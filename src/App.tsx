import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-100">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />

      <footer className="py-8 px-6 text-center text-zinc-600 text-sm border-t border-zinc-900">
        Facundo Lambertucci · {new Date().getFullYear()}
      </footer>
    </div>
  )
}
