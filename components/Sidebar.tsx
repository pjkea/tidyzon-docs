'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { sidebarConfig, SidebarItem } from '@/lib/sidebar-config'
import { MethodBadge } from './MethodBadge'

function SidebarGroup({
  item,
  depth = 0,
}: {
  item: Extract<SidebarItem, { type: 'group' }>
  depth?: number
}) {
  const router = useRouter()
  const isAnyActive = item.items.some(
    (i) => i.type === 'link' && router.pathname === i.href
  )
  const [open, setOpen] = useState(item.defaultOpen || isAnyActive)

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
          text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800
          transition-colors ${depth > 0 ? 'pl-5' : ''}`}
      >
        {open ? (
          <ChevronDown size={13} className="text-slate-400 shrink-0" />
        ) : (
          <ChevronRight size={13} className="text-slate-400 shrink-0" />
        )}
        {item.label}
      </button>
      {open && (
        <div className={`ml-${depth > 0 ? 5 : 3} mt-0.5`}>
          {item.items.map((child, i) => (
            <SidebarItemRenderer key={i} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

function SidebarItemRenderer({
  item,
  depth = 0,
}: {
  item: SidebarItem
  depth?: number
}) {
  const router = useRouter()

  if (item.type === 'divider') {
    return <div className="my-2 border-t border-slate-100 dark:border-slate-800" />
  }

  if (item.type === 'group') {
    return <SidebarGroup item={item} depth={depth} />
  }

  const isActive = router.pathname === item.href
  return (
    <Link
      href={item.href}
      className={`sidebar-link ${isActive ? 'active' : ''} ${depth > 0 ? 'pl-5' : ''}`}
    >
      {item.method && (
        <span className="shrink-0">
          <MethodBadge method={item.method} />
        </span>
      )}
      <span className="truncate">{item.label}</span>
    </Link>
  )
}

export function Sidebar() {
  return (
    <nav className="py-4 px-2 space-y-0.5">
      {sidebarConfig.map((item, i) => (
        <SidebarItemRenderer key={i} item={item} />
      ))}
    </nav>
  )
}
