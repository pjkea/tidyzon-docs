'use client'
import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { CopyButton } from './CopyButton'

export interface ResponseField {
  name: string
  type: string
  description?: string
  fields?: ResponseField[]
}

export interface ResponseEntry {
  status: number
  label?: string
  description?: string
  fields?: ResponseField[]
  sample?: string
}

interface ResponseExplorerProps {
  responses: ResponseEntry[]
}

function FieldRow({ field, depth = 0 }: { field: ResponseField; depth?: number }) {
  const [open, setOpen] = useState(false)
  const hasChildren = field.fields && field.fields.length > 0
  const indent = depth * 16

  return (
    <>
      <div
        className="flex items-start gap-2 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 last:border-0"
        style={{ paddingLeft: `${16 + indent}px` }}
      >
        {hasChildren ? (
          <button
            onClick={() => setOpen((o) => !o)}
            className="mt-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 shrink-0"
          >
            {open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
          </button>
        ) : (
          <span className="w-[13px] shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <code className="text-sm font-mono font-medium text-slate-900 dark:text-slate-100">
              {field.name}
            </code>
            <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded font-mono">
              {field.type}
            </span>
          </div>
          {field.description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{field.description}</p>
          )}
        </div>
      </div>
      {open && hasChildren && field.fields!.map((f) => (
        <FieldRow key={f.name} field={f} depth={depth + 1} />
      ))}
    </>
  )
}

function statusColor(status: number) {
  if (status < 300) return 'text-emerald-600 dark:text-emerald-400'
  if (status < 500) return 'text-amber-600 dark:text-amber-400'
  return 'text-red-600 dark:text-red-400'
}

export function ResponseExplorer({ responses }: ResponseExplorerProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [showSample, setShowSample] = useState(false)
  const active = responses[activeIdx]

  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">
        Responses
      </h3>
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
          {responses.map((r, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                i === activeIdx
                  ? 'border-brand-500 text-brand-600 dark:text-brand-400 bg-white dark:bg-slate-800'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <span className={statusColor(r.status)}>{r.status}</span>
              {r.label && <span className="ml-1.5 text-slate-400">{r.label}</span>}
            </button>
          ))}
          <div className="flex-1" />
          {active?.sample && (
            <button
              onClick={() => setShowSample((s) => !s)}
              className="px-4 py-2.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              {showSample ? 'Hide sample' : 'View sample'}
            </button>
          )}
        </div>

        {/* Description */}
        {active?.description && (
          <div className="px-4 py-2 bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400">
            {active.description}
          </div>
        )}

        {/* Field tree */}
        {!showSample && active?.fields && active.fields.length > 0 && (
          <div>
            {active.fields.map((f) => (
              <FieldRow key={f.name} field={f} />
            ))}
          </div>
        )}

        {/* Sample JSON */}
        {showSample && active?.sample && (
          <div className="relative">
            <div className="absolute top-2 right-2 z-10">
              <CopyButton text={active.sample} />
            </div>
            <pre className="code-block rounded-none text-xs overflow-x-auto max-h-96 overflow-y-auto">
              {active.sample}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
