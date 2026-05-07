'use client'
import React, { useState, useCallback } from 'react'
import { ChevronDown, PlayCircle, Loader2, Copy } from 'lucide-react'
import clsx from 'clsx'
import { Param } from './ParamsCard'
import { CopyButton } from './CopyButton'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE ?? 'https://25p5ndzk5j.execute-api.us-east-1.amazonaws.com/dev'

const ADMIN_CREDS = { email: 'nsafulansahk@gmail.com', password: 'NewSecurePass123!' }
const USER_CREDS  = { identifier: 'nsafulansahk@gmail.com', password: 'NewSecurePass123!' }

async function getAdminToken(): Promise<string> {
  const cached = sessionStorage.getItem('tidyzon_admin_token')
  if (cached) return cached
  const res = await fetch(`${BASE_URL}/v1/admin/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ADMIN_CREDS),
  })
  const data = await res.json()
  const token = data?.token?.id_token ?? ''
  if (token) sessionStorage.setItem('tidyzon_admin_token', token)
  return token
}

async function getUserToken(): Promise<string> {
  const cached = sessionStorage.getItem('tidyzon_user_token')
  if (cached) return cached
  const res = await fetch(`${BASE_URL}/v1/auth/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(USER_CREDS),
  })
  const data = await res.json()
  const token = data?.token?.id_token ?? ''
  if (token) sessionStorage.setItem('tidyzon_user_token', token)
  return token
}

function buildCurl(method: string, url: string, token: string, body?: string): string {
  const parts = [`curl -s -X ${method} '${url}'`]
  if (token) parts.push(`  -H 'Authorization: Bearer ${token}'`)
  if (body && body !== '{}') {
    parts.push(`  -H 'Content-Type: application/json'`)
    parts.push(`  -d '${body}'`)
  }
  return parts.join(' \\\n')
}

interface Props {
  method: string
  path: string
  auth: 'admin' | 'user' | 'public'
  pathParams?: Param[]
  queryParams?: Param[]
  bodyParams?: Param[]
  sampleQuery?: Record<string, string | number | boolean>
  sampleBody?: Record<string, unknown>
}

export function TryItPanel({ method, path, auth, pathParams = [], queryParams = [], bodyParams = [], sampleQuery, sampleBody }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<{ status: number; body: string; ms: number } | null>(null)
  const [token, setToken] = useState('')
  const [tokenLoading, setTokenLoading] = useState(false)
  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {}
    if (sampleQuery) Object.entries(sampleQuery).forEach(([k, v]) => { init[`query_${k}`] = String(v) })
    if (sampleBody)  Object.entries(sampleBody).forEach(([k, v])  => { init[`body_${k}`]  = String(v) })
    return init
  })

  const login = useCallback(async () => {
    setTokenLoading(true)
    try {
      const t = auth === 'admin' ? await getAdminToken() : await getUserToken()
      setToken(t)
    } catch (e) {
      setToken('ERROR: ' + String(e))
    } finally {
      setTokenLoading(false)
    }
  }, [auth])

  const send = useCallback(async () => {
    setLoading(true)
    setResponse(null)
    try {
      let url = BASE_URL + path
      pathParams.forEach(p => {
        const val = values[`path_${p.name}`] || `:${p.name}`
        url = url.replace(`{${p.name}}`, encodeURIComponent(val))
      })
      const qs = queryParams
        .map(p => values[`query_${p.name}`] ? `${p.name}=${encodeURIComponent(values[`query_${p.name}`])}` : null)
        .filter(Boolean).join('&')
      if (qs) url += '?' + qs

      const headers: Record<string, string> = {}
      if (token) headers['Authorization'] = `Bearer ${token}`
      if (bodyParams.length > 0) headers['Content-Type'] = 'application/json'

      const rawBody = bodyParams.length > 0
        ? JSON.stringify(Object.fromEntries(bodyParams.map(p => [p.name, values[`body_${p.name}`] ?? ''])))
        : undefined

      const t0 = Date.now()
      const res = await fetch(url, { method, headers, body: rawBody })
      const ms = Date.now() - t0
      const text = await res.text()
      let prettyBody: string
      try { prettyBody = JSON.stringify(JSON.parse(text), null, 2) } catch { prettyBody = text }
      setResponse({ status: res.status, body: prettyBody, ms })
    } catch (e) {
      setResponse({ status: 0, body: String(e), ms: 0 })
    } finally {
      setLoading(false)
    }
  }, [method, path, pathParams, queryParams, bodyParams, token, values])

  const resolvedUrl = (() => {
    let url = BASE_URL + path
    pathParams.forEach(p => {
      url = url.replace(`{${p.name}}`, values[`path_${p.name}`] || `:${p.name}`)
    })
    const qs = queryParams.map(p => values[`query_${p.name}`] ? `${p.name}=${values[`query_${p.name}`]}` : null).filter(Boolean).join('&')
    return url + (qs ? '?' + qs : '')
  })()

  const curlCmd = buildCurl(method, resolvedUrl, token, bodyParams.length > 0 ? JSON.stringify(Object.fromEntries(bodyParams.map(p => [p.name, values[`body_${p.name}`] ?? '']))) : undefined)

  return (
    <div className="mt-6 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <div className="flex items-center gap-2">
          <PlayCircle size={16} className="text-blue-500" />
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Try It!</span>
          <span className="text-xs text-slate-400">— dev API</span>
        </div>
        <ChevronDown size={15} className={clsx('text-slate-400 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="divide-y divide-slate-100 dark:divide-slate-700 border-t border-slate-200 dark:border-slate-700">
          {/* Auth */}
          {auth !== 'public' && (
            <div className="px-4 py-3 flex items-center gap-3">
              <button
                onClick={login}
                disabled={tokenLoading}
                className="text-sm px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 flex items-center gap-1.5"
              >
                {tokenLoading && <Loader2 size={13} className="animate-spin" />}
                {token ? 'Re-authenticate' : `Login as ${auth}`}
              </button>
              {token && !token.startsWith('ERROR') && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">✓ Authenticated</span>
              )}
              {token.startsWith('ERROR') && (
                <span className="text-xs text-red-500">{token}</span>
              )}
            </div>
          )}

          {/* Path params */}
          {pathParams.length > 0 && (
            <div className="px-4 py-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Path Parameters</p>
              <div className="space-y-2">
                {pathParams.map(p => (
                  <div key={p.name} className="flex items-center gap-2">
                    <label className="text-sm font-mono text-slate-700 dark:text-slate-300 w-28 shrink-0">{p.name}</label>
                    <input
                      type="text"
                      value={values[`path_${p.name}`] ?? ''}
                      onChange={e => setValues(v => ({ ...v, [`path_${p.name}`]: e.target.value }))}
                      placeholder={p.example ? String(p.example) : p.name}
                      className="flex-1 text-sm px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Query params */}
          {queryParams.length > 0 && (
            <div className="px-4 py-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Query Parameters</p>
              <div className="space-y-2">
                {queryParams.map(p => (
                  <div key={p.name} className="flex items-center gap-2">
                    <label className="text-sm font-mono text-slate-600 dark:text-slate-400 w-28 shrink-0">{p.name}</label>
                    <input
                      type={p.type === 'int' || p.type === 'number' ? 'number' : 'text'}
                      value={values[`query_${p.name}`] ?? ''}
                      onChange={e => setValues(v => ({ ...v, [`query_${p.name}`]: e.target.value }))}
                      placeholder={p.example ? String(p.example) : p.default !== undefined ? String(p.default) : ''}
                      className="flex-1 text-sm px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Body params */}
          {bodyParams.length > 0 && (
            <div className="px-4 py-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Body</p>
              <div className="space-y-2">
                {bodyParams.map(p => (
                  <div key={p.name} className="flex items-center gap-2">
                    <label className="text-sm font-mono text-slate-600 dark:text-slate-400 w-28 shrink-0">{p.name}</label>
                    <input
                      type="text"
                      value={values[`body_${p.name}`] ?? ''}
                      onChange={e => setValues(v => ({ ...v, [`body_${p.name}`]: e.target.value }))}
                      placeholder={p.example ? String(p.example) : ''}
                      className="flex-1 text-sm px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Send button */}
          <div className="px-4 py-3 flex items-center gap-3">
            <button
              onClick={send}
              disabled={loading || (auth !== 'public' && !token)}
              className="text-sm px-4 py-2 rounded-md bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-white disabled:opacity-50 flex items-center gap-2 font-semibold"
            >
              {loading && <Loader2 size={14} className="animate-spin" />}
              Send Request
            </button>
            <CopyButton text={curlCmd} label="Copy as cURL" />
          </div>

          {/* Response */}
          {response && (
            <div className="border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-3">
                  <span className={clsx('text-sm font-semibold font-mono', response.status >= 200 && response.status < 300 ? 'text-emerald-400' : 'text-red-400')}>
                    {response.status || 'ERROR'}
                  </span>
                  <span className="text-xs text-slate-400">{response.ms}ms</span>
                </div>
                <CopyButton text={response.body} label="Copy" className="text-slate-400 hover:text-slate-200 dark:hover:text-slate-200" />
              </div>
              <pre className="px-4 py-4 text-xs font-mono text-slate-300 bg-slate-800 dark:bg-slate-900 overflow-x-auto max-h-96 leading-relaxed">
                {response.body}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
