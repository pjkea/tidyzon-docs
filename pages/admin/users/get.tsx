import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function GetUserPage() {
  return (
    <>
      <Head><title>Get User — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/admin/users/{userid}"
        title="Get User Profile"
        description="Retrieve the full profile of a single customer including their account status, contact info, and request history summary."
      />

      <ParamsCard
        title="Path Parameters"
        params={[
          { name: 'userid', type: 'integer', required: true, description: 'The user\'s internal ID' },
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
                name: 'data', type: 'object', fields: [
                  { name: 'userid', type: 'integer' },
                  { name: 'firstname', type: 'string' },
                  { name: 'lastname', type: 'string' },
                  { name: 'email', type: 'string' },
                  { name: 'phone', type: 'string' },
                  { name: 'status', type: 'string' },
                  { name: 'profile_image', type: 'string', description: 'S3 URL or null' },
                  { name: 'created_at', type: 'string' },
                  { name: 'total_requests', type: 'integer' },
                  { name: 'total_spent', type: 'number' },
                  {
                    name: 'assets', type: 'array', fields: [
                      { name: 'asset_id', type: 'integer' },
                      { name: 'make', type: 'string' },
                      { name: 'model', type: 'string' },
                      { name: 'color', type: 'string' },
                      { name: 'year', type: 'integer' },
                      { name: 'license_plate', type: 'string' },
                    ],
                  },
                ],
              },
            ],
          },
          { status: 404, label: 'Not Found', description: 'No user with the given userid.' },
        ]}
      />

      <TryItPanel
        method="GET"
        path="/v1/admin/users/{userid}"
        auth="admin"
        pathFields={[
          { name: 'userid', type: 'number', placeholder: '9' },
        ]}
      />
    </>
  )
}
