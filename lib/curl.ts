const BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'https://25p5ndzk5j.execute-api.us-east-1.amazonaws.com/dev'

export function buildCurlCommand(
  method: string,
  path: string,
  queryParams?: Record<string, string>,
  body?: Record<string, unknown>,
  token?: string
): string {
  let url = BASE + path
  const qs = queryParams ? Object.entries(queryParams).filter(([, v]) => v).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&') : ''
  if (qs) url += '?' + qs

  const lines = [`curl -s -X ${method.toUpperCase()} '${url}'`]
  if (token) lines.push(`  -H 'Authorization: Bearer ${token}'`)
  if (body && Object.keys(body).length > 0) {
    lines.push(`  -H 'Content-Type: application/json'`)
    lines.push(`  -d '${JSON.stringify(body)}'`)
  }
  lines.push(`  | python3 -m json.tool`)
  return lines.join(' \\\n')
}
