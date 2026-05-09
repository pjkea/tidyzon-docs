interface Param {
  name: string
  type: string
  required?: boolean
  description?: string
  default?: string | number | boolean
  example?: string | number | boolean
}

interface ParamsCardProps {
  title: string
  params: Param[]
}

export function ParamsCard({ title, params }: ParamsCardProps) {
  if (!params || params.length === 0) return null
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">
        {title}
      </h3>
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden divide-y divide-slate-200 dark:divide-slate-700">
        {params.map((p) => (
          <div key={p.name} className="flex gap-4 px-4 py-3 bg-white dark:bg-slate-900">
            <div className="w-40 shrink-0">
              <code className="text-sm font-mono font-medium text-slate-900 dark:text-slate-100">
                {p.name}
              </code>
              {p.required && (
                <span className="ml-1.5 text-xs text-red-500 font-medium">required</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded font-mono">
                  {p.type}
                </span>
                {p.default !== undefined && (
                  <span className="text-xs text-slate-500 dark:text-slate-500">
                    default: <code className="font-mono">{String(p.default)}</code>
                  </span>
                )}
              </div>
              {p.description && (
                <p className="text-sm text-slate-600 dark:text-slate-400">{p.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
