import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function LocationsPage() {
  return (
    <>
      <Head><title>Locations — Tidyzon API Docs</title></Head>

      <div className="mb-10">
        <EndpointHero
          method="GET"
          path="/v1/admin/locations"
          title="List Locations"
          description="Returns all saved service locations (both customer and provider locations)."
        />
        <ParamsCard
          title="Query Parameters"
          params={[
            { name: 'type', type: 'string', description: 'customer | provider — filter by location type' },
            { name: 'limit', type: 'integer', default: 20 },
            { name: 'offset', type: 'integer', default: 0 },
          ]}
        />
        <ResponseExplorer
          responses={[{
            status: 200, label: 'OK',
            fields: [
              { name: 'message', type: 'string' },
              {
                name: 'data', type: 'object', fields: [
                  {
                    name: 'locations', type: 'array', fields: [
                      { name: 'locationid', type: 'integer' },
                      { name: 'type', type: 'string' },
                      { name: 'address', type: 'string' },
                      { name: 'latitude', type: 'number' },
                      { name: 'longitude', type: 'number' },
                      { name: 'owner_id', type: 'integer' },
                      { name: 'owner_name', type: 'string' },
                      { name: 'is_default', type: 'boolean' },
                    ],
                  },
                ],
              },
            ],
          }]}
        />
        <TryItPanel method="GET" path="/v1/admin/locations" auth="admin"
          queryFields={[{ name: 'type', type: 'string', placeholder: 'customer' }, { name: 'limit', type: 'number', placeholder: '20' }]}
        />
      </div>

      <div>
        <EndpointHero
          method="GET"
          path="/v1/admin/locations/{locationid}"
          title="Get Location"
          description="Returns detail for a single location including full address and coordinates."
        />
        <ParamsCard title="Path Parameters" params={[{ name: 'locationid', type: 'integer', required: true }]} />
        <ResponseExplorer
          responses={[{
            status: 200, label: 'OK',
            fields: [
              { name: 'message', type: 'string' },
              {
                name: 'data', type: 'object', fields: [
                  { name: 'locationid', type: 'integer' },
                  { name: 'address', type: 'string' },
                  { name: 'latitude', type: 'number' },
                  { name: 'longitude', type: 'number' },
                  { name: 'is_default', type: 'boolean' },
                  { name: 'created_at', type: 'string' },
                ],
              },
            ],
          }]}
        />
        <TryItPanel method="GET" path="/v1/admin/locations/{locationid}" auth="admin"
          pathFields={[{ name: 'locationid', type: 'number', placeholder: '1' }]}
        />
      </div>
    </>
  )
}
