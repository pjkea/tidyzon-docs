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
                      name: 'locations', type: 'array', fields: [
                        { name: 'locationid', type: 'integer' },
                        { name: 'address', type: 'string' },
                        { name: 'latitude', type: 'number' },
                        { name: 'longitude', type: 'number' },
                        { name: 'is_default', type: 'boolean' },
                      ],
                    },
                  ],
                },
              ],
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
