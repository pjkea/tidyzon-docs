const METHOD_CLASSES: Record<string, string> = {
  GET: 'method-get',
  POST: 'method-post',
  PUT: 'method-put',
  PATCH: 'method-patch',
  DELETE: 'method-delete',
  WS: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
}

export function MethodBadge({ method }: { method: string }) {
  const cls = METHOD_CLASSES[method.toUpperCase()] ?? 'bg-slate-100 text-slate-600'
  return (
    <span
      className={`inline-block text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded ${cls}`}
    >
      {method.toUpperCase()}
    </span>
  )
}
