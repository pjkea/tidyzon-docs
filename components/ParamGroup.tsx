'use client'
import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { ParamsCard, Param } from './ParamsCard'
import clsx from 'clsx'

interface Props {
  title: string
  params: Param[]
  defaultOpen?: boolean
  optional?: boolean
}

export function ParamGroup({ title, params, defaultOpen = false, optional = false }: Props) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="mt-4 rounded-lg border border-slate-200 dark:border-slate-700">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
            {title}
          </span>
          {optional && (
            <span className="text-xs text-slate-400 normal-case font-normal">optional</span>
          )}
        </div>
        <ChevronDown
          size={16}
          className={clsx('text-slate-400 transition-transform', open && 'rotate-180')}
        />
      </button>
      {open && (
        <div className="divide-y divide-slate-100 dark:divide-slate-700 border-t border-slate-200 dark:border-slate-700">
          {params.map(p => (
            <div key={p.name} className="px-4 py-3">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <code className="text-sm font-semibold text-slate-800 dark:text-slate-200">{p.name}</code>
                <span className="text-xs text-slate-500">{p.type}</span>
                {p.required
                  ? <span className="text-xs text-red-500 font-medium">required</span>
                  : <span className="text-xs text-slate-400">optional</span>
                }
              </div>
              {p.description && <p className="text-sm text-slate-600 dark:text-slate-400">{p.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
