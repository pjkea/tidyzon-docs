import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function GetAdminUserPage() {
  return (
    <>
      <Head><title>Get Admin User — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/admin/admin-users/{adminid}"
        title="Get Admin User"
        description="Returns full profile of a single admin user by their userid."
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
                  { name: 'phonenumber', type: 'string' },
                  { name: 'profileimageurl', type: 'string' },
                  { name: 'city', type: 'string' },
                  { name: 'state', type: 'string' },
                  { name: 'createdat', type: 'string' },
                  { name: 'updatedat', type: 'string' },
                ],
              },
            ],
          },
          { status: 404, label: 'Not Found' },
        ]}
      />

      <TryItPanel
        method="GET"
        path="/v1/admin/admin-users/{adminid}"
        auth="admin"
        pathFields={[{ name: 'adminid', type: 'number', placeholder: '1' }]}
      />
    </>
  )
}
