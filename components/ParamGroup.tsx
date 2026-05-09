'use client'
import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { ParamsCard } from './ParamsCard'

interface Param {
  name: string
  type: string
  required?: boolean
  description?: string
  default?: string | number | boolean
}

interface ParamGroupProps {
  title: string
  optional?: boolean
  params: Param[]
  defaultOpen?: boolean
}

export function ParamGroup({ title, optional, params, defaultOpen = false }: ParamGroupProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden mb-3">
      <button
        className="w-full flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-800 text-left"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
          {title}
        </span>
        {optional && (
          <span className="text-xs text-slate-500 dark:text-slate-500 normal-case tracking-normal font-normal">
            (optional)
          </span>
        )}
      </button>
      {open && (
        <div className="px-4 py-3">
          <ParamsCard title="" params={params} />
        </div>
      )}
    </div>
  )
}
