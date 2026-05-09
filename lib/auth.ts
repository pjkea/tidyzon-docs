const ADMIN_TOKEN_KEY = 'tidyzon_admin_token'
const ADMIN_TOKEN_EXPIRY_KEY = 'tidyzon_admin_token_expiry'

export function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null
  const expiry = sessionStorage.getItem(ADMIN_TOKEN_EXPIRY_KEY)
  if (expiry && Date.now() > parseInt(expiry, 10)) {
    sessionStorage.removeItem(ADMIN_TOKEN_KEY)
    sessionStorage.removeItem(ADMIN_TOKEN_EXPIRY_KEY)
    return null
  }
  return sessionStorage.getItem(ADMIN_TOKEN_KEY)
}

export function setAdminToken(token: string, expiresInMs = 3600_000): void {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(ADMIN_TOKEN_KEY, token)
  sessionStorage.setItem(ADMIN_TOKEN_EXPIRY_KEY, String(Date.now() + expiresInMs))
}

export function clearAdminToken(): void {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(ADMIN_TOKEN_KEY)
  sessionStorage.removeItem(ADMIN_TOKEN_EXPIRY_KEY)
}

export async function loginAdmin(
  email: string,
  password: string,
  baseUrl: string
): Promise<{ token: string; error?: never } | { token?: never; error: string }> {
  try {
    const res = await fetch(`${baseUrl}/v1/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    const token = data?.token?.id_token
    if (!token) return { error: data?.message ?? 'Login failed' }
    setAdminToken(token)
    return { token }
  } catch (e) {
    return { error: String(e) }
  }
}
