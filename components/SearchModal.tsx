'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Fuse from 'fuse.js'
import { Search, X } from 'lucide-react'
import { searchIndex, SearchEntry } from '@/lib/search-index'
import { MethodBadge } from './MethodBadge'

const fuse = new Fuse(searchIndex, {
  keys: ['title', 'path', 'description', 'method'],
  threshold: 0.3,
  includeScore: true,
})

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchEntry[]>([])
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (open) {
      setQuery('')
      setResults([])
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    if (!query.trim()) {
      setResults(searchIndex.slice(0, 8))
      return
    }
    setResults(fuse.search(query).slice(0, 8).map((r) => r.item))
    setSelected(0)
  }, [query])

  const navigate = (href: string) => {
    router.push(href)
    onClose()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected((s) => Math.min(s + 1, results.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)) }
    if (e.key === 'Enter' && results[selected]) navigate(results[selected].href)
    if (e.key === 'Escape') onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
          <Search size={16} className="text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search endpoints…"
            className="flex-1 bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none text-sm"
          />
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X size={14} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {results.map((r, i) => (
            <button
              key={r.href + r.title}
              onClick={() => navigate(r.href)}
              className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors ${
                i === selected
                  ? 'bg-brand-50 dark:bg-brand-900/20'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {r.method ? (
                <span className="mt-0.5 shrink-0"><MethodBadge method={r.method} /></span>
              ) : (
                <span className="mt-0.5 w-10 shrink-0" />
              )}
              <div className="min-w-0">
                <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{r.title}</div>
                {r.path && (
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate">{r.path}</div>
                )}
                {r.description && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{r.description}</div>
                )}
              </div>
            </button>
          ))}
          {results.length === 0 && (
            <p className="text-sm text-slate-500 text-center py-6">No results for &quot;{query}&quot;</p>
          )}
        </div>

        <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3 text-xs text-slate-400">
          <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">↑↓</kbd> navigate
          <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">↵</kbd> open
          <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">esc</kbd> close
        </div>
      </div>
    </div>
  )
}
