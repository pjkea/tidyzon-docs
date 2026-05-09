export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE ??
  'https://25p5ndzk5j.execute-api.us-east-1.amazonaws.com/dev'

export interface ApiResponse {
  status: number
  body: unknown
  durationMs: number
  ok: boolean
}

export async function callApi(
  method: string,
  path: string,
  token: string | null,
  query?: Record<string, string>,
  body?: unknown
): Promise<ApiResponse> {
  const url = new URL(BASE_URL + path)
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== '') url.searchParams.set(k, v)
    })
  }

  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const start = performance.now()
  const res = await fetch(url.toString(), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  const durationMs = Math.round(performance.now() - start)
  const responseBody = await res.json().catch(() => null)
  return { status: res.status, body: responseBody, durationMs, ok: res.ok }
}

export function buildCurl(
  method: string,
  path: string,
  token: string | null,
  query?: Record<string, string>,
  body?: unknown
): string {
  const url = new URL(BASE_URL + path)
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== '') url.searchParams.set(k, v)
    })
  }
  const parts = [`curl -X ${method} '${url.toString()}'`]
  if (token) parts.push(`  -H 'Authorization: Bearer ${token}'`)
  parts.push(`  -H 'Content-Type: application/json'`)
  if (body) parts.push(`  -d '${JSON.stringify(body)}'`)
  return parts.join(' \\\n')
}
