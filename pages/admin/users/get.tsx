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
            sample: `{
  "message": "User profile retrieved successfully",
  "data": {
    "user_id": 1,
    "username": "randyodoom19@gmail.com",
    "email": "randyodoom19@gmail.com",
    "role": { "role_id": 1, "role_name": "User" },
    "is_active": 1,
    "created_at": "February 23, 2026 09:52 AM",
    "updated_at": "May 10, 2026 10:50 PM",
    "statistics": {
      "account_period": "2 Months",
      "completed_services": "New",
      "avg_rating": "new"
    },
    "details": {
      "first_name": "Randy",
      "last_name": "Odoom",
      "phone_number": "+11273787677",
      "address": {
        "street_address_1": null,
        "city": null,
        "state": null,
        "country_id": 3,
        "formatted_address": null,
        "latitude": null,
        "longitude": null
      },
      "verification": {
        "email_verified": true,
        "phone_verified": false
      }
    },
    "recent_requests": []
  }
}`,
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
