import { CopyButton } from './CopyButton'

interface WSEventCardProps {
  direction: 'send' | 'receive'
  action: string
  description: string
  payload?: string
  example: string
  notes?: string
}

const DIRECTION_LABEL: Record<WSEventCardProps['direction'], string> = {
  send: 'Client → Server',
  receive: 'Server → Client',
}

const DIRECTION_CLASS: Record<WSEventCardProps['direction'], string> = {
  send: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  receive: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
}

export function WSEventCard({
  direction,
  action,
  description,
  payload,
  example,
  notes,
}: WSEventCardProps) {
  return (
    <div className="mb-6 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-900">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60">
        <span
          className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded ${DIRECTION_CLASS[direction]}`}
        >
          {DIRECTION_LABEL[direction]}
        </span>
        <code className="text-sm font-mono font-semibold text-slate-900 dark:text-slate-100">
          {action}
        </code>
      </div>

      <div className="px-4 py-3">
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{description}</p>

        {payload && (
          <>
            <div className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-500 font-semibold mb-1">
              Payload
            </div>
            <div className="relative mb-3">
              <pre className="bg-slate-900 dark:bg-black text-slate-100 text-xs font-mono p-3 rounded overflow-x-auto">
                <code>{payload}</code>
              </pre>
              <div className="absolute top-2 right-2">
                <CopyButton text={payload} />
              </div>
            </div>
          </>
        )}

        <div className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-500 font-semibold mb-1">
          Example
        </div>
        <div className="relative">
          <pre className="bg-slate-900 dark:bg-black text-slate-100 text-xs font-mono p-3 rounded overflow-x-auto">
            <code>{example}</code>
          </pre>
          <div className="absolute top-2 right-2">
            <CopyButton text={example} />
          </div>
        </div>

        {notes && (
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-500 italic">{notes}</p>
        )}
      </div>
    </div>
  )
}
