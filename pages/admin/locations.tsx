import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

const providerLocationFields = [
  { name: 'id', type: 'string' },
  { name: 'entityType', type: 'string', description: '"provider"' },
  { name: 'name', type: 'string' },
  { name: 'email', type: 'string' },
  { name: 'phone', type: 'string' },
  { name: 'serviceType', type: 'string | null' },
  { name: 'location', type: 'string | null' },
  { name: 'status', type: 'string', description: 'online | offline' },
  { name: 'verified', type: 'boolean' },
  { name: 'rating', type: 'number | null' },
  { name: 'completedJobs', type: 'integer' },
  { name: 'joinDate', type: 'string' },
  { name: 'lastActive', type: 'string' },
  { name: 'lastPing', type: 'string' },
  { name: 'coordinates', type: 'object', fields: [{ name: 'lat', type: 'number' }, { name: 'lng', type: 'number' }] },
]

const userLocationFields = [
  { name: 'id', type: 'string' },
  { name: 'entityType', type: 'string', description: '"user"' },
  { name: 'name', type: 'string' },
  { name: 'email', type: 'string' },
  { name: 'phone', type: 'string' },
  { name: 'location', type: 'string | null' },
  { name: 'status', type: 'string', description: 'online | offline' },
  { name: 'joinDate', type: 'string' },
  { name: 'lastActive', type: 'string' },
  { name: 'coordinates', type: 'object', fields: [{ name: 'lat', type: 'number' }, { name: 'lng', type: 'number' }] },
]

export default function LocationsPage() {
  return (
    <>
      <Head><title>Locations — Tidyzon API Docs</title></Head>

      <div className="mb-10">
        <EndpointHero
          method="GET"
          path="/v1/admin/locations"
          title="All Locations"
          description="Returns all provider and user location records. Filter by ?type=providers or ?type=users."
        />
        <ParamsCard
          title="Query Parameters"
          params={[
            { name: 'type', type: 'string', description: 'Optional — providers or users' },
          ]}
        />
        <ResponseExplorer
          responses={[{
            status: 200, label: 'OK',
            fields: [
              { name: 'providers', type: 'array', fields: providerLocationFields },
              { name: 'users', type: 'array', fields: userLocationFields },
            ],
          }]}
        />
        <TryItPanel
          method="GET"
          path="/v1/admin/locations"
          auth="admin"
          queryFields={[{ name: 'type', type: 'string', placeholder: 'providers' }]}
        />
      </div>

      <div className="mb-10">
        <EndpointHero
          method="GET"
          path="/v1/admin/locations/{locationid}"
          title="Get Location"
          description="Returns a single location record by ID. Checks providers first, then users."
        />
        <ParamsCard
          title="Path Parameters"
          params={[{ name: 'locationid', type: 'string', required: true, description: 'Provider or user ID' }]}
        />
        <ResponseExplorer
          responses={[{
            status: 200, label: 'OK',
            fields: [
              { name: '(provider or user location object)', type: 'object', description: 'Same shape as provider or user entry in /v1/admin/locations' },
            ],
          }]}
        />
        <TryItPanel
          method="GET"
          path="/v1/admin/locations/{locationid}"
          auth="admin"
          pathFields={[{ name: 'locationid', type: 'string', placeholder: '494' }]}
        />
      </div>

      <div className="mb-10">
        <EndpointHero
          method="GET"
          path="/v1/admin/users/{userid}/locations"
          title="User Locations"
          description="All service location history for a specific user."
        />
        <ParamsCard
          title="Path Parameters"
          params={[{ name: 'userid', type: 'integer', required: true }]}
        />
        <ResponseExplorer
          responses={[{
            status: 200, label: 'OK',
            fields: [
              { name: 'users', type: 'array', fields: userLocationFields },
            ],
          }]}
        />
        <TryItPanel
          method="GET"
          path="/v1/admin/users/{userid}/locations"
          auth="admin"
          pathFields={[{ name: 'userid', type: 'number', placeholder: '1' }]}
        />
      </div>

      <div>
        <EndpointHero
          method="GET"
          path="/v1/admin/providers/{tidyspid}/locations"
          title="Provider Locations"
          description="All location records for a specific provider."
        />
        <ParamsCard
          title="Path Parameters"
          params={[{ name: 'tidyspid', type: 'integer', required: true }]}
        />
        <ResponseExplorer
          responses={[{
            status: 200, label: 'OK',
            fields: [
              { name: 'providers', type: 'array', fields: providerLocationFields },
            ],
          }]}
        />
        <TryItPanel
          method="GET"
          path="/v1/admin/providers/{tidyspid}/locations"
          auth="admin"
          pathFields={[{ name: 'tidyspid', type: 'number', placeholder: '494' }]}
        />
      </div>
    </>
  )
}
