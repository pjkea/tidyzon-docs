import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function GetProviderPage() {
  return (
    <>
      <Head><title>Get Provider — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/admin/providers/{tidyspid}"
        title="Get Provider Detail"
        description="Full profile of a single provider including personal info, vehicle, verification status, onboarding progress, ratings, and recent orders."
      />

      <ParamsCard
        title="Path Parameters"
        params={[
          { name: 'tidyspid', type: 'integer', required: true, description: 'The provider\'s internal ID' },
        ]}
      />

      <ResponseExplorer
        responses={[
          {
            status: 200,
            label: 'OK',
            sample: `{
  "message": "Provider details retrieved successfully",
  "data": {
    "provider_id": 494,
    "user": {
      "user_id": 1770,
      "username": "jkessiful@gmail.com",
      "email": "jkessiful@gmail.com",
      "role_id": 2,
      "is_active": 1,
      "user_created_at": "April 28, 2026 06:44 PM"
    },
    "profile": {
      "first_name": "Joseph",
      "last_name": "Ansah",
      "phone_number": "+10249795541",
      "address": {
        "street_address_1": null,
        "city": null,
        "state": null,
        "country_id": 190,
        "formatted_address": null,
        "latitude": null,
        "longitude": null
      },
      "verification": { "email_verified": true, "phone_verified": false }
    },
    "provider_status": {
      "is_available": 1,
      "is_background_verified": false,
      "is_equipment_verified": false,
      "is_test": false,
      "last_availability_update": "May 12, 2026 01:39 PM",
      "created_at": "April 28, 2026 06:44 PM",
      "updated_at": "May 12, 2026 01:39 PM"
    },
    "statistics": {
      "account_period": "1 Week",
      "completed_services": "New",
      "rating_count": 0,
      "avg_rating": "new"
    },
    "ratings": [],
    "recent_requests": []
  }
}`,
            fields: [
              { name: 'message', type: 'string' },
              {
                name: 'data', type: 'object', fields: [
                  { name: 'tidyspid', type: 'integer' },
                  { name: 'firstname', type: 'string' },
                  { name: 'lastname', type: 'string' },
                  { name: 'email', type: 'string' },
                  { name: 'phone', type: 'string' },
                  { name: 'status', type: 'string' },
                  { name: 'available', type: 'boolean' },
                  { name: 'background_verified', type: 'boolean' },
                  { name: 'equipment_verified', type: 'boolean' },
                  { name: 'rating', type: 'number' },
                  { name: 'total_orders', type: 'integer' },
                  { name: 'profile_image', type: 'string' },
                  { name: 'created_at', type: 'string' },
                  {
                    name: 'vehicle', type: 'object', fields: [
                      { name: 'make', type: 'string' },
                      { name: 'model', type: 'string' },
                      { name: 'year', type: 'integer' },
                      { name: 'color', type: 'string' },
                      { name: 'license_plate', type: 'string' },
                    ],
                  },
                  {
                    name: 'onboarding', type: 'object', fields: [
                      { name: 'documents_submitted', type: 'boolean' },
                      { name: 'background_check_status', type: 'string' },
                      { name: 'quiz_passed', type: 'boolean' },
                      { name: 'washkit_assigned', type: 'boolean' },
                    ],
                  },
                ],
              },
            ],
          },
          { status: 404, label: 'Not Found' },
        ]}
      />

      <TryItPanel
        method="GET"
        path="/v1/admin/providers/{tidyspid}"
        auth="admin"
        pathFields={[
          { name: 'tidyspid', type: 'number', placeholder: '494' },
        ]}
      />
    </>
  )
}
