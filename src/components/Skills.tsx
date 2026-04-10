import { skills, categoryLabels } from '../data/skills'
import type { Skill } from '../types'

const categoryOrder: Skill['category'][] = ['languages', 'frontend', 'backend', 'tools']

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-zinc-100 mb-12">Skills</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {categoryOrder.map((category) => {
            const categorySkills = skills.filter((s) => s.category === category)
            return (
              <div key={category}>
                <h3 className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-4">
                  {categoryLabels[category]}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-lg"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
