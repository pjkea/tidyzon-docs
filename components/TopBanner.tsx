'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { SearchModal } from './SearchModal'
import { Search } from 'lucide-react'

export function TopBanner() {
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center px-4 gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-md bg-brand-600 flex items-center justify-center text-white text-xs font-bold">
            T
          </div>
          <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
            Tidyzon API
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">Docs</span>
        </Link>

        <div className="flex-1" />

        {/* Search trigger */}
        <button
          onClick={() => setSearchOpen(true)}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
        >
          <Search size={13} />
          <span>Search</span>
          <kbd className="ml-2 text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">⌘K</kbd>
        </button>

        <ThemeToggle />
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
