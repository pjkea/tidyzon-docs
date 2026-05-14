import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function ListServiceTypesPage() {
  return (
    <>
      <Head><title>List Service Types — Tidyzon API Docs</title></Head>
      <EndpointHero
        method="GET"
        path="/v1/admin/service-types"
        title="List Service Types"
        description="Returns all service types (packages) available on the platform, including inactive ones."
      />
      <ResponseExplorer
        responses={[{
          status: 200, label: 'OK',
          fields: [
            { name: 'message', type: 'string' },
            {
              name: 'data', type: 'object', fields: [
                {
                  name: 'service_types', type: 'array', fields: [
                    { name: 'servicetypeid', type: 'integer' },
                    { name: 'name', type: 'string' },
                    { name: 'description', type: 'string' },
                    { name: 'price', type: 'number' },
                    { name: 'active', type: 'boolean' },
                    { name: 'duration', type: 'string' },
                    { name: 'currency', type: 'string' },
                    { name: 'providerCount', type: 'integer' },
                    { name: 'status', type: 'string' },
                  ],
                },
              ],
            },
          ],
          sample: `[
  {
    "id": 15,
    "name": "Interior Wash",
    "duration": "15 mins",
    "basePrice": 29.99,
    "isActive": true,
    "displayorder": 10,
    "currency": "USD",
    "providerCount": 2,
    "status": "active"
  },
  {
    "id": 1,
    "name": "Speed Wash",
    "duration": "30 mins",
    "basePrice": 49.99,
    "isActive": true,
    "displayorder": 1,
    "currency": "USD",
    "providerCount": 0,
    "status": "active"
  },
  {
    "id": 2,
    "name": "Deluxe Wash",
    "duration": "2hrs 30mins",
    "basePrice": 155.0,
    "isActive": true,
    "displayorder": 2,
    "currency": "USD",
    "providerCount": 0,
    "status": "active"
  }
]`,
        }]}
      />
      <TryItPanel method="GET" path="/v1/admin/service-types" auth="admin" />
    </>
  )
}
