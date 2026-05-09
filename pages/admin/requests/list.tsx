import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function ListRequestsPage() {
  return (
    <>
      <Head><title>List Requests — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/admin/requests"
        title="List Requests"
        description="Returns a paginated list of service requests. When providerid is supplied the query switches to an orders-based view showing that provider's assigned jobs."
      />

      <ParamsCard
        title="Query Parameters"
        params={[
          { name: 'status', type: 'integer', description: 'Filter by request status ID' },
          { name: 'scheduled', type: 'boolean', description: 'true = scheduled requests only; false = live/instant only' },
          { name: 'startdate', type: 'string', description: 'Filter from date (YYYY-MM-DD)' },
          { name: 'enddate', type: 'string', description: 'Filter to date (YYYY-MM-DD)' },
          { name: 'customerid', type: 'integer', description: 'Filter to a specific customer' },
          { name: 'providerid', type: 'integer', description: 'Filter to a specific provider (switches to orders query)' },
          { name: 'limit', type: 'integer', default: 50, description: 'Max 100' },
          { name: 'offset', type: 'integer', default: 0 },
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
                  {
                    name: 'requests', type: 'array', fields: [
                      { name: 'requestid', type: 'integer' },
                      { name: 'statusid', type: 'integer' },
                      { name: 'status_label', type: 'string' },
                      { name: 'scheduled', type: 'boolean' },
                      { name: 'scheduled_date', type: 'string' },
                      { name: 'created_at', type: 'string' },
                      { name: 'customer_name', type: 'string' },
                      { name: 'provider_name', type: 'string' },
                      { name: 'address', type: 'string' },
                      { name: 'total_price', type: 'number' },
                      { name: 'asset_count', type: 'integer' },
                    ],
                  },
                  {
                    name: 'pagination', type: 'object', fields: [
                      { name: 'total_count', type: 'integer' },
                      { name: 'limit', type: 'integer' },
                      { name: 'offset', type: 'integer' },
                    ],
                  },
                  {
                    name: 'statistics', type: 'object', fields: [
                      { name: 'total_requests', type: 'integer' },
                    ],
                  },
                ],
              },
            ],
          },
          { status: 401, label: 'Unauthorized' },
          { status: 403, label: 'Forbidden', description: 'Insufficient admin permissions.' },
        ]}
      />

      <TryItPanel
        method="GET"
        path="/v1/admin/requests"
        auth="admin"
        queryFields={[
          { name: 'limit', type: 'number', placeholder: '10' },
          { name: 'offset', type: 'number', placeholder: '0' },
          { name: 'startdate', type: 'date' },
          { name: 'enddate', type: 'date' },
          { name: 'customerid', type: 'number' },
          { name: 'providerid', type: 'number' },
        ]}
      />
    </>
  )
}
