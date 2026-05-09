import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function AdminRefreshPage() {
  return (
    <>
      <Head><title>Refresh Token — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="POST"
        path="/v1/admin/auth/refresh"
        title="Refresh Token"
        description="Exchange a valid refresh_token for a new id_token and access_token without requiring credentials."
      />

      <ParamsCard
        title="Body"
        params={[
          { name: 'refresh_token', type: 'string', required: true, description: 'The refresh_token returned by the login endpoint' },
        ]}
      />

      <ResponseExplorer
        responses={[
          {
            status: 200,
            label: 'OK',
            fields: [
              { name: 'message', type: 'string' },
              {
                name: 'token', type: 'object', fields: [
                  { name: 'id_token', type: 'string', description: 'New JWT ID token' },
                  { name: 'access_token', type: 'string' },
                  { name: 'expires_in', type: 'number' },
                  { name: 'token_type', type: 'string' },
                ],
              },
            ],
          },
          { status: 401, label: 'Unauthorized', description: 'Refresh token is expired or invalid.' },
        ]}
      />

      <TryItPanel
        method="POST"
        path="/v1/admin/auth/refresh"
        auth="public"
        bodyFields={[
          { name: 'refresh_token', type: 'string', placeholder: 'eyJ...' },
        ]}
      />
    </>
  )
}
