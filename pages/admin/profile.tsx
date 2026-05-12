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
          sample: `{
  "message": "Profile loaded successfully",
  "user": {
    "userid": 9,
    "email": "nsafulansahk@gmail.com",
    "username": "nsafulansahk@gmail.com",
    "firstname": "Kwamena",
    "lastname": "Essiful-Ansah",
    "phonenumber": "+233249795541",
    "roleid": 5,
    "rolename": "Super Admin",
    "address": {
      "streetaddress1": "265 Peachtree Center Ave NE, Atlanta, GA 30303, USA",
      "city": "Illinois",
      "state": "Chicago",
      "countryid": 1
    },
    "permissions": [
      "view_users", "edit_users", "manage_settings", "delete_users",
      "manage_roles", "view_requests", "manage_providers"
    ]
  }
}`,
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
