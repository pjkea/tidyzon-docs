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
