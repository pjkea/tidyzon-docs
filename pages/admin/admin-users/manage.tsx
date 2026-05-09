import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function ManageAdminUserPage() {
  return (
    <>
      <Head><title>Disable / Enable / Delete Admin User — Tidyzon API Docs</title></Head>

      <div className="mb-10">
        <EndpointHero
          method="POST"
          path="/v1/admin/admin-users/{adminid}/disable"
          title="Disable Admin User"
          description="Deactivates an admin account (sets isactive = 0)."
        />
        <ParamsCard
          title="Path Parameters"
          params={[{ name: 'adminid', type: 'integer', required: true }]}
        />
        <ResponseExplorer
          responses={[
            {
              status: 200,
              label: 'OK',
              fields: [{ name: 'message', type: 'string' }],
            },
            { status: 404, label: 'Not Found' },
          ]}
        />
        <TryItPanel
          method="POST"
          path="/v1/admin/admin-users/{adminid}/disable"
          auth="admin"
          pathFields={[{ name: 'adminid', type: 'number', placeholder: '1' }]}
        />
      </div>

      <div className="mb-10">
        <EndpointHero
          method="POST"
          path="/v1/admin/admin-users/{adminid}/enable"
          title="Enable Admin User"
          description="Reactivates a disabled admin account."
        />
        <ParamsCard
          title="Path Parameters"
          params={[{ name: 'adminid', type: 'integer', required: true }]}
        />
        <ResponseExplorer
          responses={[
            {
              status: 200,
              label: 'OK',
              fields: [{ name: 'message', type: 'string' }],
            },
            { status: 404, label: 'Not Found' },
          ]}
        />
        <TryItPanel
          method="POST"
          path="/v1/admin/admin-users/{adminid}/enable"
          auth="admin"
          pathFields={[{ name: 'adminid', type: 'number', placeholder: '1' }]}
        />
      </div>

      <div>
        <EndpointHero
          method="POST"
          path="/v1/admin/admin-users/{adminid}/delete"
          title="Delete Admin User"
          description="Downgrades admin role back to customer (roleid 1)."
        />
        <ParamsCard
          title="Path Parameters"
          params={[{ name: 'adminid', type: 'integer', required: true }]}
        />
        <ResponseExplorer
          responses={[
            {
              status: 200,
              label: 'OK',
              fields: [{ name: 'message', type: 'string' }],
            },
            { status: 404, label: 'Not Found' },
          ]}
        />
        <TryItPanel
          method="POST"
          path="/v1/admin/admin-users/{adminid}/delete"
          auth="admin"
          pathFields={[{ name: 'adminid', type: 'number', placeholder: '1' }]}
        />
      </div>
    </>
  )
}
