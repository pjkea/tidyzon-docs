import React from 'react'

interface FeatureItem {
  icon: string
  title: string
  description: string
}

interface Props {
  title: string
  subtitle: string
  description: string
  badge: string
  badgeIcon: string
  features: FeatureItem[]
  accentColor?: string
}

export function CategoryHero({ title, subtitle, description, badge, badgeIcon, features, accentColor = 'blue' }: Props) {
  const colorMap: Record<string, { card: string; icon: string }> = {
    blue:   { card: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',   icon: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
    green:  { card: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400', icon: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' },
    purple: { card: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400', icon: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' },
    amber:  { card: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',  icon: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' },
  }
  const colors = colorMap[accentColor] ?? colorMap['blue']

  return (
    <div>
      {/* Hero banner */}
      <div className="relative w-full rounded-2xl overflow-hidden mb-10 shadow-lg bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-8 sm:p-12">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-blue-900/30" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-200 border border-blue-400/30 backdrop-blur-md uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">{badgeIcon}</span>
              {badge}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white max-w-2xl mb-3 tracking-tight">
            {title}
          </h1>
          <p className="text-slate-300 max-w-lg text-sm md:text-base font-medium leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mb-10">
        {features.map(f => (
          <div key={f.title} className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colors.card}`}>
              <span className="material-symbols-outlined text-2xl">{f.icon}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{f.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
