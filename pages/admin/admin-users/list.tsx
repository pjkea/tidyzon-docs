import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function ListAdminUsersPage() {
  return (
    <>
      <Head><title>List Admin Users — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/admin/admin-users"
        title="List Admin Users"
        description="Returns a paginated list of all admin users (roleid 4 Admin and roleid 5 Super Admin)."
      />

      <ParamsCard
        title="Query Parameters"
        params={[
          { name: 'roleid', type: 'integer', description: 'Filter by role — 4 (Admin) or 5 (Super Admin)' },
          { name: 'isactive', type: 'integer', description: '0 or 1' },
          { name: 'search', type: 'string' },
          { name: 'page', type: 'integer', default: 1 },
          { name: 'page_size', type: 'integer', default: 20, description: 'Max 100' },
        ]}
      />

      <ResponseExplorer
        responses={[
          {
            status: 200,
            label: 'OK',
            sample: `{
  "message": "Admin users retrieved successfully",
  "data": [
    {
      "userid": 9,
      "email": "nsafulansahk@gmail.com",
      "roleid": 5,
      "rolename": "Super Admin",
      "isactive": 1,
      "firstname": "Kwamena",
      "lastname": "Essiful-Ansah",
      "full_name": "Kwamena Essiful-Ansah",
      "phonenumber": "+233249795541",
      "profileimageurl": null,
      "city": "Illinois",
      "state": "Chicago",
      "createdat": "February 24, 2026 09:36 AM",
      "updatedat": "May 12, 2026 09:40 AM"
    }
  ],
  "pagination": { "total": 1, "page": 1, "page_size": 20, "pages": 1 }
}`,
            fields: [
              { name: 'message', type: 'string' },
              {
                name: 'data', type: 'array', fields: [
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
              {
                name: 'pagination', type: 'object', fields: [
                  { name: 'total', type: 'integer' },
                  { name: 'page', type: 'integer' },
                  { name: 'page_size', type: 'integer' },
                  { name: 'pages', type: 'integer' },
                ],
              },
            ],
          },
          { status: 401, label: 'Unauthorized' },
        ]}
      />

      <TryItPanel
        method="GET"
        path="/v1/admin/admin-users"
        auth="admin"
        queryFields={[
          { name: 'roleid', type: 'number', placeholder: '4' },
          { name: 'isactive', type: 'number', placeholder: '1' },
          { name: 'search', type: 'string' },
          { name: 'page', type: 'number', placeholder: '1' },
          { name: 'page_size', type: 'number', placeholder: '20' },
        ]}
      />
    </>
  )
}
