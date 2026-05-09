import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function ProviderActivitiesPage() {
  return (
    <>
      <Head><title>Provider Summary — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/admin/providers/summary"
        title="Provider Summary Cards"
        description="Aggregate statistics for the provider management dashboard — total counts, verification breakdown, and availability."
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
    </>
  )
}
