import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function GetServiceTypePage() {
  return (
    <>
      <Head><title>Get Service Type — Tidyzon API Docs</title></Head>
      <EndpointHero method="GET" path="/v1/admin/service-types/{servicetypeid}" title="Get Service Type" description="Returns a single service type by ID." />
      <ParamsCard title="Path Parameters" params={[{ name: 'servicetypeid', type: 'integer', required: true }]} />
      <ResponseExplorer responses={[{
        status: 200, label: 'OK',
        fields: [
          { name: 'message', type: 'string' },
          {
            name: 'data', type: 'object', fields: [
              { name: 'servicetypeid', type: 'integer' },
              { name: 'name', type: 'string' },
              { name: 'description', type: 'string' },
              { name: 'price', type: 'number' },
              { name: 'active', type: 'boolean' },
              { name: 'sort_order', type: 'integer' },
              { name: 'duration', type: 'string' },
              { name: 'currency', type: 'string' },
              { name: 'providerCount', type: 'integer' },
              { name: 'status', type: 'string' },
            ],
          },
        ],
        sample: `{
  "id": 1,
  "name": "Speed Wash",
  "duration": "30 mins",
  "basePrice": 49.99,
  "isActive": true,
  "displayorder": 1,
  "currency": "USD",
  "providerCount": 0,
  "status": "active"
}`,
      }]} />
      <TryItPanel method="GET" path="/v1/admin/service-types/{servicetypeid}" auth="admin"
        pathFields={[{ name: 'servicetypeid', type: 'number', placeholder: '1' }]}
      />
    </>
  )
}
