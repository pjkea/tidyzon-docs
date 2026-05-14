import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function ProviderExtrasPage() {
  return (
    <>
      <Head><title>Provider Extras — Tidyzon API Docs</title></Head>

      <div className="mb-10">
        <EndpointHero
          method="GET"
          path="/v1/admin/providers/{tidyspid}/locations"
          title="Provider Location History"
          description="Returns all saved locations associated with a provider."
        />
        <ParamsCard
          title="Path Parameters"
          params={[{ name: 'tidyspid', type: 'integer', required: true }]}
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
                      name: 'providers', type: 'array', fields: [
                        { name: 'id', type: 'string' },
                        { name: 'entityType', type: 'string' },
                        { name: 'name', type: 'string' },
                        { name: 'email', type: 'string' },
                        { name: 'phone', type: 'string' },
                        { name: 'status', type: 'string' },
                        { name: 'lastPing', type: 'string' },
                        { name: 'coordinates', type: 'object', fields: [
                          { name: 'lat', type: 'number' }, { name: 'lng', type: 'number' },
                        ]},
                      ],
                    },
                  ],
                },
              ],
              sample: `{
  "providers": [
    {
      "id": "1",
      "entityType": "provider",
      "name": "Randy Odoom",
      "email": "randyodoom19@gmail.com",
      "phone": "+11273787677",
      "serviceType": null,
      "location": null,
      "status": "online",
      "verified": false,
      "rating": null,
      "completedJobs": 1,
      "joinDate": "February 23, 2026 09:52 AM",
      "lastActive": "March 22, 2026 08:48 PM",
      "lastPing": "May 12, 2026 05:13 PM",
      "coordinates": { "lat": 5.7203952, "lng": -0.328613 }
    }
  ]
}`,
            },
          ]}
        />
        <TryItPanel
          method="GET"
          path="/v1/admin/providers/{tidyspid}/locations"
          auth="admin"
          pathFields={[{ name: 'tidyspid', type: 'number', placeholder: '494' }]}
        />
      </div>

      <div>
        <EndpointHero
          method="POST"
          path="/v1/admin/providers/washkit/{washkitid}/status"
          title="Update Washkit Status"
          description="Assign or change the status of a washkit (e.g. mark as active, inactive, or assigned to a provider)."
        />
        <ParamsCard
          title="Path Parameters"
          params={[{ name: 'washkitid', type: 'integer', required: true }]}
        />
        <ParamsCard
          title="Body"
          params={[
            { name: 'status', type: 'string', required: true, description: 'New washkit status' },
            { name: 'tidyspid', type: 'integer', description: 'Provider to assign the washkit to' },
          ]}
        />
        <ResponseExplorer
          responses={[
            {
              status: 200,
              label: 'OK',
              fields: [{ name: 'message', type: 'string' }],
              sample: `{ "message": "Washkit status updated successfully" }`,
            },
          ]}
        />
        <TryItPanel
          method="POST"
          path="/v1/admin/providers/washkit/{washkitid}/status"
          auth="admin"
          pathFields={[{ name: 'washkitid', type: 'number', placeholder: '1' }]}
          bodyFields={[
            { name: 'status', type: 'string', placeholder: 'active' },
            { name: 'tidyspid', type: 'number' },
          ]}
        />
      </div>
    </>
  )
}
