import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function CreateAdminUserPage() {
  return (
    <>
      <Head><title>Create Admin User — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="POST"
        path="/v1/admin/admin-users"
        title="Create Admin User"
        description="Upgrades an existing customer account (roleid 1) to an admin role."
      />

      <ParamsCard
        title="Body Parameters"
        params={[
          { name: 'userid', type: 'integer', required: true, description: 'ID of the existing user to upgrade' },
          { name: 'roleid', type: 'integer', required: true, description: '4 for Admin, 5 for Super Admin' },
        ]}
      />

      <ResponseExplorer
        responses={[
          {
            status: 201,
            label: 'Created',
            fields: [
              { name: 'message', type: 'string' },
              {
                name: 'data', type: 'object', fields: [
                  { name: 'userid', type: 'integer' },
                  { name: 'email', type: 'string' },
                  { name: 'roleid', type: 'integer' },
                  { name: 'rolename', type: 'string' },
                  { name: 'isactive', type: 'integer' },
                  { name: 'firstname', type: 'string' },
                  { name: 'lastname', type: 'string' },
                  { name: 'full_name', type: 'string' },
                  { name: 'createdat', type: 'string' },
                ],
              },
            ],
          },
          { status: 400, label: 'Bad Request' },
        ]}
      />

      <TryItPanel
        method="POST"
        path="/v1/admin/admin-users"
        auth="admin"
        bodyFields={[
          { name: 'userid', type: 'number', placeholder: '42' },
          { name: 'roleid', type: 'number', placeholder: '4' },
        ]}
      />
    </>
  )
}
