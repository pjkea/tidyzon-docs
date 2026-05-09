'use client'
import { useState } from 'react'
import { ChevronDown, ChevronRight, Send, LogIn } from 'lucide-react'
import { callApi, buildCurl, BASE_URL } from '@/lib/api-client'
import { getAdminToken, loginAdmin } from '@/lib/auth'
import { CopyButton } from './CopyButton'

interface TryItField {
  name: string
  type: 'string' | 'number' | 'boolean' | 'date'
  placeholder?: string
  required?: boolean
}

interface TryItPanelProps {
  method: string
  path: string
  auth?: 'admin' | 'public'
  queryFields?: TryItField[]
  pathFields?: TryItField[]
  bodyFields?: TryItField[]
  defaultEmail?: string
  defaultPassword?: string
}

export function TryItPanel({
  method,
  path,
  auth = 'admin',
  queryFields = [],
  pathFields = [],
  bodyFields = [],
  defaultEmail = 'nsafulansahk@gmail.com',
  defaultPassword = 'NewSecurePass123!',
}: TryItPanelProps) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState(defaultEmail)
  const [password, setPassword] = useState(defaultPassword)
  const [authError, setAuthError] = useState('')
  const [isAuthed, setIsAuthed] = useState(false)

  const initQuery = Object.fromEntries(queryFields.map((f) => [f.name, '']))
  const initPath = Object.fromEntries(pathFields.map((f) => [f.name, '']))
  const initBody = Object.fromEntries(bodyFields.map((f) => [f.name, '']))

  const [queryValues, setQueryValues] = useState<Record<string, string>>(initQuery)
  const [pathValues, setPathValues] = useState<Record<string, string>>(initPath)
  const [bodyValues, setBodyValues] = useState<Record<string, string>>(initBody)

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ status: number; body: unknown; durationMs: number } | null>(null)
  const [curlStr, setCurlStr] = useState('')

  const handleLogin = async () => {
    setAuthError('')
    const res = await loginAdmin(email, password, BASE_URL)
    if (res.error) { setAuthError(res.error); return }
    setIsAuthed(true)
  }

  const resolvePath = () => {
    let resolved = path
    Object.entries(pathValues).forEach(([k, v]) => {
      resolved = resolved.replace(`{${k}}`, encodeURIComponent(v))
    })
    return resolved
  }

  const missingPathParams = pathFields.filter((f) => !pathValues[f.name]?.trim())

  const handleSend = async () => {
    const token = auth === 'admin' ? getAdminToken() : null
    if (auth === 'admin' && !token) { setAuthError('Not authenticated — log in first'); return }
    if (missingPathParams.length > 0) {
      setAuthError(`Fill in required path param${missingPathParams.length > 1 ? 's' : ''}: ${missingPathParams.map(f => f.name).join(', ')}`)
      return
    }
    setAuthError('')
    setLoading(true)
    setResult(null)

    const resolvedPath = resolvePath()
    const body = bodyFields.length
      ? Object.fromEntries(Object.entries(bodyValues).filter(([, v]) => v !== ''))
      : undefined

    try {
      const res = await callApi(method, resolvedPath, token, queryValues, body)
      setResult(res)
      setCurlStr(buildCurl(method, resolvedPath, token, queryValues, body))
    } finally {
      setLoading(false)
    }
  }

  const statusColor = (s: number) =>
    s < 300 ? 'text-emerald-500' : s < 500 ? 'text-amber-500' : 'text-red-500'

  return (
    <div className="border border-brand-200 dark:border-brand-800 rounded-lg overflow-hidden mb-8">
      <button
        className="w-full flex items-center gap-2 px-4 py-3 bg-brand-50 dark:bg-brand-900/20 text-left"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        <span className="text-sm font-semibold text-brand-700 dark:text-brand-400">Try It!</span>
        <span className="ml-2 text-xs text-brand-500 dark:text-brand-500">
          Live calls to <strong>dev</strong> API
        </span>
      </button>

      {open && (
        <div className="p-4 space-y-4">
          {/* Auth */}
          {auth === 'admin' && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Admin Login
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                  className="flex-1 px-3 py-1.5 text-sm border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  className="flex-1 px-3 py-1.5 text-sm border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                />
                <button
                  onClick={handleLogin}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-brand-600 hover:bg-brand-700 text-white rounded transition-colors"
                >
                  <LogIn size={13} /> Login
                </button>
              </div>
              {isAuthed && !authError && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400">Authenticated</p>
              )}
              {authError && <p className="text-xs text-red-500">{authError}</p>}
            </div>
          )}

          {/* Path params */}
          {pathFields.length > 0 && (
            <FieldGroup
              title="Path Parameters"
              fields={pathFields}
              values={pathValues}
              onChange={(k, v) => setPathValues((prev) => ({ ...prev, [k]: v }))}
            />
          )}

          {/* Query params */}
          {queryFields.length > 0 && (
            <FieldGroup
              title="Query Parameters"
              fields={queryFields}
              values={queryValues}
              onChange={(k, v) => setQueryValues((prev) => ({ ...prev, [k]: v }))}
            />
          )}

          {/* Body */}
          {bodyFields.length > 0 && (
            <FieldGroup
              title="Body"
              fields={bodyFields}
              values={bodyValues}
              onChange={(k, v) => setBodyValues((prev) => ({ ...prev, [k]: v }))}
            />
          )}

          {/* Send */}
          <button
            onClick={handleSend}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-sm font-medium rounded transition-colors"
          >
            <Send size={13} />
            {loading ? 'Sending…' : 'Send Request'}
          </button>

          {/* Result */}
          {result && (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className={`text-sm font-bold ${statusColor(result.status)}`}>
                  {result.status}
                </span>
                <span className="text-xs text-slate-500">{result.durationMs}ms</span>
                <CopyButton text={JSON.stringify(result.body, null, 2)} />
                {curlStr && (
                  <CopyButton text={curlStr} />
                )}
              </div>
              <pre className="code-block text-xs max-h-64 overflow-y-auto">
                {JSON.stringify(result.body, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function FieldGroup({
  title,
  fields,
  values,
  onChange,
}: {
  title: string
  fields: { name: string; type: string; placeholder?: string }[]
  values: Record<string, string>
  onChange: (key: string, value: string) => void
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {title}
      </p>
      {fields.map((f) => (
        <div key={f.name} className="flex items-center gap-2">
          <label className="w-36 text-xs font-mono text-slate-600 dark:text-slate-400 shrink-0">
            {f.name}
          </label>
          <input
            type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'}
            value={values[f.name] ?? ''}
            onChange={(e) => onChange(f.name, e.target.value)}
            placeholder={f.placeholder ?? f.name}
            className="flex-1 px-3 py-1.5 text-sm border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
          />
        </div>
      ))}
    </div>
  )
}
