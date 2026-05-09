import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function AdminProfilePage() {
  return (
    <>
      <Head><title>Admin Profile — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/admin/profile"
        title="Get Admin Profile"
        description="Returns the profile of the currently authenticated admin user derived from their JWT token."
      />

      <ResponseExplorer
        responses={[{
          status: 200, label: 'OK',
          fields: [
            { name: 'message', type: 'string' },
            {
              name: 'data', type: 'object', fields: [
                { name: 'email', type: 'string' },
                { name: 'firstname', type: 'string' },
                { name: 'lastname', type: 'string' },
                { name: 'role', type: 'string', description: 'admin | super_admin' },
                { name: 'created_at', type: 'string' },
              ],
            },
          ],
        }]}
      />

      <TryItPanel method="GET" path="/v1/admin/profile" auth="admin" />
    </>
  )
}
