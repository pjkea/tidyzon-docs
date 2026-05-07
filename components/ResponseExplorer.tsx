'use client'
import React, { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { CopyButton } from './CopyButton'
import clsx from 'clsx'

export interface ResponseField {
  name: string
  type: string
  description?: string
  nullable?: boolean
  fields?: ResponseField[]
}

interface FieldRowProps {
  field: ResponseField
  depth?: number
}

function FieldRow({ field, depth = 0 }: FieldRowProps) {
  const [open, setOpen] = useState(false)
  const hasChildren = field.fields && field.fields.length > 0

  return (
    <>
      <div
        className={clsx(
          'flex items-start gap-2 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50',
          depth > 0 && 'border-l-2 border-slate-100 dark:border-slate-700'
        )}
        style={{ paddingLeft: `${16 + depth * 20}px` }}
      >
        {hasChildren && (
          <button
            onClick={() => setOpen(o => !o)}
            className="shrink-0 mt-0.5 text-slate-400"
          >
            {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        )}
        {!hasChildren && <span className="w-3.5 shrink-0" />}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <code className="text-sm font-semibold text-slate-800 dark:text-slate-200">{field.name}</code>
            <span className="text-xs text-slate-500">{field.type}</span>
            {field.nullable && <span className="text-xs text-slate-400">nullable</span>}
          </div>
          {field.description && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{field.description}</p>
          )}
        </div>
      </div>
      {open && hasChildren && field.fields!.map(f => (
        <FieldRow key={f.name} field={f} depth={depth + 1} />
      ))}
    </>
  )
}

interface StatusTabProps {
  code: number | string
  active: boolean
  onClick: () => void
}

function StatusTab({ code, active, onClick }: StatusTabProps) {
  const color = String(code).startsWith('2')
    ? 'text-emerald-600 dark:text-emerald-400'
    : String(code).startsWith('4')
    ? 'text-amber-600 dark:text-amber-400'
    : 'text-red-600 dark:text-red-400'

  return (
    <button
      onClick={onClick}
      className={clsx(
        'px-3 py-1.5 text-sm font-mono font-semibold rounded-md transition-all',
        active
          ? 'bg-slate-100 dark:bg-slate-700 ' + color
          : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
      )}
    >
      {code}
    </button>
  )
}

interface ResponseTabContent {
  status: number | string
  description?: string
  fields?: ResponseField[]
  sample?: object | string
}

interface Props {
  responses: ResponseTabContent[]
}

export function ResponseExplorer({ responses }: Props) {
  const [active, setActive] = useState(0)
  const current = responses[active]

  const sampleStr = current.sample
    ? typeof current.sample === 'string'
      ? current.sample
      : JSON.stringify(current.sample, null, 2)
    : null

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Responses</h2>
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        {/* Status tabs */}
        <div className="flex items-center gap-1 px-4 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          {responses.map((r, i) => (
            <StatusTab key={i} code={r.status} active={i === active} onClick={() => setActive(i)} />
          ))}
        </div>

        {/* Description */}
        {current.description && (
          <p className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700">
            {current.description}
          </p>
        )}

        {/* Response fields */}
        {current.fields && current.fields.length > 0 && (
          <div>
            <p className="px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide border-b border-slate-100 dark:border-slate-700">
              Response Body
            </p>
            <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {current.fields.map(f => <FieldRow key={f.name} field={f} />)}
            </div>
          </div>
        )}

        {/* Sample JSON */}
        {sampleStr && (
          <div className="border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800 dark:bg-slate-900">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Sample Response</span>
              <CopyButton text={sampleStr} label="Copy" className="text-slate-400 hover:text-slate-200" />
            </div>
            <pre className="px-4 py-4 text-sm font-mono text-slate-300 bg-slate-800 dark:bg-slate-900 overflow-x-auto leading-relaxed">
              {sampleStr}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
