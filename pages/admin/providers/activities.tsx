import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function ProviderActivitiesPage() {
  return (
    <>
      <Head><title>Provider Summary & Activities — Tidyzon API Docs</title></Head>

      <div className="mb-10">
        <EndpointHero
          method="GET"
          path="/v1/admin/providers/summary"
          title="Provider Summary Cards"
          description="Aggregate provider statistics for the dashboard."
        />
        <ResponseExplorer
          responses={[
            {
              status: 200,
              label: 'OK',
              sample: `{
  "message": "Provider summary retrieved successfully",
  "data": {
    "total_providers": 13,
    "active_providers": 8,
    "inactive_providers": 5,
    "verified_providers": 0,
    "pending_verification": 13,
    "new_providers_last_30_days": 5,
    "average_rating": 0.0,
    "availability_distribution": [
      { "status": "Available", "count": 8 },
      { "status": "Unavailable", "count": 5 }
    ]
  }
}`,
              fields: [
                { name: 'message', type: 'string' },
                {
                  name: 'data', type: 'object', fields: [
                    { name: 'total_providers', type: 'integer' },
                    { name: 'active_providers', type: 'integer' },
                    { name: 'dormant_providers', type: 'integer' },
                    { name: 'inactive_providers', type: 'integer' },
                    { name: 'background_verified', type: 'integer' },
                    { name: 'equipment_verified', type: 'integer' },
                    { name: 'available_now', type: 'integer' },
                  ],
                },
              ],
            },
            { status: 401, label: 'Unauthorized' },
          ]}
        />
        <TryItPanel
          method="GET"
          path="/v1/admin/providers/summary"
          auth="admin"
        />
      </div>

      <div>
        <EndpointHero
          method="GET"
          path="/v1/admin/providers/activities"
          title="List Provider Activities"
          description="Paginated list of provider order/request activities."
        />
        <ParamsCard
          title="Query Parameters"
          params={[
            { name: 'tidyspid', type: 'integer' },
            { name: 'status', type: 'integer' },
            { name: 'date_from', type: 'string' },
            { name: 'date_to', type: 'string' },
            { name: 'page', type: 'integer', default: 1 },
            { name: 'page_size', type: 'integer', default: 20 },
          ]}
        />
        <ResponseExplorer
          responses={[
            {
              status: 200,
              label: 'OK',
              sample: `{
  "message": "Provider activities retrieved successfully",
  "data": [
    {
      "activity_id": 1,
      "activity_type": "order",
      "tidyspid": 494,
      "provider_name": "Joseph Ansah",
      "reference_id": 1,
      "status": 3,
      "status_name": "completed",
      "address": "376G+P3C, Techiman-Tamale Rd, Kintampo, Ghana",
      "source": "order",
      "scheduleddatetime": null,
      "createdat": "May 12, 2026 01:41 PM"
    }
  ],
  "pagination": { "total": 6, "page": 1, "page_size": 20, "pages": 1 }
}`,
              fields: [
                { name: 'message', type: 'string' },
                {
                  name: 'data', type: 'array', fields: [
                    { name: 'activity_id', type: 'integer' },
                    { name: 'activity_type', type: 'string' },
                    { name: 'tidyspid', type: 'integer' },
                    { name: 'provider_name', type: 'string' },
                    { name: 'reference_id', type: 'integer' },
                    { name: 'status', type: 'integer' },
                    { name: 'status_name', type: 'string' },
                    { name: 'address', type: 'string' },
                    { name: 'source', type: 'string' },
                    { name: 'scheduleddatetime', type: 'string' },
                    { name: 'createdat', type: 'string' },
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
          path="/v1/admin/providers/activities"
          auth="admin"
          queryFields={[
            { name: 'tidyspid', type: 'number' },
            { name: 'status', type: 'number' },
            { name: 'date_from', type: 'string' },
            { name: 'date_to', type: 'string' },
            { name: 'page', type: 'number', placeholder: '1' },
            { name: 'page_size', type: 'number', placeholder: '20' },
          ]}
        />
      </div>
    </>
  )
}
