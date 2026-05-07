'use client'
import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface Props {
  text: string
  label?: string
  className?: string
}

export function CopyButton({ text, label, className = '' }: Props) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700 transition-all ${className}`}
      title="Copy to clipboard"
    >
      {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
      {label && <span>{copied ? 'Copied!' : label}</span>}
    </button>
  )
}
