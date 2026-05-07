'use client'
import React from 'react'
import { MethodBadge } from './MethodBadge'
import { CopyButton } from './CopyButton'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE ?? 'https://25p5ndzk5j.execute-api.us-east-1.amazonaws.com/dev'

interface Props {
  method: string
  path: string
  title: string
  description?: string
}

export function EndpointHero({ method, path, title, description }: Props) {
  const fullUrl = `${BASE_URL}${path}`

  return (
    <div className="mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
        {title}
      </h1>

      {description && (
        <p className="text-slate-600 dark:text-slate-400 text-base mb-4 leading-relaxed">
          {description}
        </p>
      )}

      {/* Method + URL bar */}
      <div className="flex items-stretch rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
        <MethodBadge method={method} />
        <div className="flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-slate-800 font-mono text-sm flex-1 min-w-0 border-l border-slate-200 dark:border-slate-700">
          <span className="truncate text-slate-700 dark:text-slate-300">{path}</span>
          <CopyButton text={fullUrl} className="ml-2 shrink-0" />
        </div>
      </div>
    </div>
  )
}
