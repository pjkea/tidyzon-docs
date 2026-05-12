import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function UpdateAdminUserPage() {
  return (
    <>
      <Head><title>Update Admin User — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="POST"
        path="/v1/admin/admin-users/{adminid}/update"
        title="Update Admin User"
        description="Updates profile fields for an admin user."
      />

      <ParamsCard
        title="Path Parameters"
        params={[{ name: 'adminid', type: 'integer', required: true }]}
      />

      <ParamsCard
        title="Body Parameters"
        params={[
          { name: 'firstname', type: 'string' },
          { name: 'lastname', type: 'string' },
          { name: 'phonenumber', type: 'string' },
          { name: 'city', type: 'string' },
          { name: 'state', type: 'string' },
          { name: 'profileimageurl', type: 'string' },
        ]}
      />

      <ResponseExplorer
        responses={[
          {
            status: 200,
            label: 'OK',
            sample: `{
  "message": "Admin user updated successfully",
  "data": {
    "userid": 9,
    "email": "nsafulansahk@gmail.com",
    "roleid": 5,
    "rolename": "Super Admin",
    "isactive": 1,
    "firstname": "Kwamena",
    "lastname": "Essiful-Ansah",
    "full_name": "Kwamena Essiful-Ansah",
    "city": "Atlanta",
    "state": "Georgia",
    "updatedat": "May 12, 2026 10:00 AM"
  }
}`,
            fields: [
              { name: 'message', type: 'string' },
              { name: 'data', type: 'object', description: 'Updated admin user object' },
            ],
          },
          { status: 404, label: 'Not Found' },
        ]}
      />

      <TryItPanel
        method="POST"
        path="/v1/admin/admin-users/{adminid}/update"
        auth="admin"
        pathFields={[{ name: 'adminid', type: 'number', placeholder: '1' }]}
        bodyFields={[
          { name: 'firstname', type: 'string' },
          { name: 'lastname', type: 'string' },
          { name: 'phonenumber', type: 'string' },
          { name: 'city', type: 'string' },
          { name: 'state', type: 'string' },
          { name: 'profileimageurl', type: 'string' },
        ]}
      />
    </>
  )
}
