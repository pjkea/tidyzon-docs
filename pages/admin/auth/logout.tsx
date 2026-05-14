import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function AdminLogoutPage() {
  return (
    <>
      <Head><title>Admin Logout — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="POST"
        path="/v1/admin/auth/logout"
        title="Admin Logout"
        description="Invalidate the current admin session by signing out the user from Cognito."
      />

      <ResponseExplorer
        responses={[
          {
            status: 200,
            label: 'OK',
            fields: [
              { name: 'message', type: 'string', description: '"Logout successful"' },
            ],
            sample: `{ "message": "Logout successful" }`,
          },
          { status: 401, label: 'Unauthorized', description: 'Missing or invalid token.' },
        ]}
      />

      <TryItPanel
        method="POST"
        path="/v1/admin/auth/logout"
        auth="admin"
      />
    </>
  )
}
