import { LucideIcon } from 'lucide-react'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

interface CategoryHeroProps {
  title: string
  subtitle: string
  description: string
  features: Feature[]
  quickLinks?: { label: string; href: string }[]
}

export function CategoryHero({ title, subtitle, description, features, quickLinks }: CategoryHeroProps) {
  return (
    <div>
      {/* Hero banner */}
      <div className="relative rounded-xl overflow-hidden mb-8 bg-gradient-to-br from-slate-800 to-brand-900 p-8 text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-400 via-transparent to-transparent" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-xs font-medium px-3 py-1 rounded-full mb-3">
            {subtitle}
          </span>
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-white/70 max-w-xl text-base">{description}</p>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-brand-50 dark:bg-brand-900/30 rounded-lg text-brand-600 dark:text-brand-400">
                {f.icon}
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{f.title}</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{f.description}</p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      {quickLinks && quickLinks.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">
            Get Started
          </h3>
          <div className="flex flex-wrap gap-2">
            {quickLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-1.5 text-sm border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-400 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors"
              >
                {l.label} →
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
