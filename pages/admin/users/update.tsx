import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function UpdateUserPage() {
  return (
    <>
      <Head><title>Update User — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="PUT"
        path="/v1/admin/users/{userid}"
        title="Update User Profile"
        description="Update a customer's profile fields. Only provided fields are updated; omitted fields are left unchanged."
      />

      <ParamsCard
        title="Path Parameters"
        params={[
          { name: 'userid', type: 'integer', required: true },
        ]}
      />

      <ParamsCard
        title="Body"
        params={[
          { name: 'firstname', type: 'string' },
          { name: 'lastname', type: 'string' },
          { name: 'phone', type: 'string' },
          { name: 'status', type: 'string', description: 'active | dormant | inactive' },
        ]}
      />

      <ResponseExplorer
        responses={[
          {
            status: 200,
            label: 'OK',
            fields: [
              { name: 'message', type: 'string', description: '"User updated successfully"' },
            ],
            sample: `{ "message": "User updated successfully" }`,
          },
          { status: 404, label: 'Not Found' },
        ]}
      />

      <TryItPanel
        method="PUT"
        path="/v1/admin/users/{userid}"
        auth="admin"
        pathFields={[{ name: 'userid', type: 'number', placeholder: '9' }]}
        bodyFields={[
          { name: 'firstname', type: 'string' },
          { name: 'lastname', type: 'string' },
          { name: 'status', type: 'string', placeholder: 'active' },
        ]}
      />
    </>
  )
}
