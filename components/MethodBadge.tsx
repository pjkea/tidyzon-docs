import React from 'react'
import clsx from 'clsx'

const METHOD_STYLES: Record<string, string> = {
  GET:    'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-700',
  POST:   'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700',
  PUT:    'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-700',
  PATCH:  'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-700',
  DELETE: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/40 dark:text-red-300 dark:border-red-700',
}

interface Props {
  method: string
  size?: 'sm' | 'md'
}

export function MethodBadge({ method, size = 'md' }: Props) {
  const upper = method.toUpperCase()
  return (
    <span
      className={clsx(
        'font-mono font-semibold border rounded shrink-0 flex items-center',
        size === 'sm' ? 'text-xs px-1.5 py-0.5' : 'text-sm px-2 py-1.5',
        METHOD_STYLES[upper] ?? 'bg-slate-100 text-slate-800 border-slate-300'
      )}
    >
      {upper}
    </span>
  )
}
