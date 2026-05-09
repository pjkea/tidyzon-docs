import { ReactNode } from 'react'
import { TopBanner } from './TopBanner'
import { Sidebar } from './Sidebar'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <TopBanner />

      <div className="flex pt-14">
        {/* Sidebar */}
        <aside className="fixed left-0 top-14 bottom-0 w-64 overflow-y-auto border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hidden md:block">
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 md:ml-64 min-w-0">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
