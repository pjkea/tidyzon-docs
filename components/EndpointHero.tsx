import { MethodBadge } from './MethodBadge'
import { CopyButton } from './CopyButton'

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE ??
  'https://25p5ndzk5j.execute-api.us-east-1.amazonaws.com/dev'

interface EndpointHeroProps {
  method: string
  path: string
  title: string
  description?: string
}

export function EndpointHero({ method, path, title, description }: EndpointHeroProps) {
  const fullUrl = BASE_URL + path

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">{title}</h1>
      {description && (
        <p className="text-slate-600 dark:text-slate-400 mb-4 text-base">{description}</p>
      )}
      <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg">
        <MethodBadge method={method} />
        <code className="flex-1 text-sm text-slate-700 dark:text-slate-300 font-mono break-all">
          {fullUrl}
        </code>
        <CopyButton text={fullUrl} />
      </div>
    </div>
  )
}
