import React from 'react'
import clsx from 'clsx'

export interface Param {
  name: string
  type: string
  required?: boolean
  description?: string
  default?: string | number | boolean
  enum?: string[]
  example?: string
}

interface ParamRowProps {
  param: Param
}

function ParamRow({ param }: ParamRowProps) {
  return (
    <div className="p-4 flex flex-col sm:flex-row sm:items-start gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <code className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {param.name}
          </code>
          <span className="text-xs text-slate-500 dark:text-slate-400">{param.type}</span>
          {param.required ? (
            <span className="text-xs text-red-500 font-medium">required</span>
          ) : (
            <span className="text-xs text-slate-400">optional</span>
          )}
        </div>
        {param.description && (
          <p className="text-sm text-slate-600 dark:text-slate-400">{param.description}</p>
        )}
        {param.default !== undefined && (
          <p className="text-xs text-slate-400 mt-1">
            Default: <code className="text-slate-600 dark:text-slate-300">{String(param.default)}</code>
          </p>
        )}
        {param.enum && (
          <div className="flex flex-wrap gap-1 mt-1">
            {param.enum.map(v => (
              <code key={v} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded">
                {v}
              </code>
            ))}
          </div>
        )}
      </div>
      {param.example !== undefined && (
        <div className="sm:w-44 shrink-0">
          <code className="text-xs text-slate-500 dark:text-slate-400">{String(param.example)}</code>
        </div>
      )}
    </div>
  )
}

interface Props {
  title: string
  params: Param[]
  className?: string
}

export function ParamsCard({ title, params, className }: Props) {
  if (!params || params.length === 0) return null

  return (
    <div className={clsx('mt-8', className)}>
      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">{title}</h2>
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/30 shadow-sm divide-y divide-slate-100 dark:divide-slate-700">
        {params.map(p => (
          <ParamRow key={p.name} param={p} />
        ))}
      </div>
    </div>
  )
}
