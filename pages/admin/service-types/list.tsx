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
                    { name: 'sort_order', type: 'integer' },
                  ],
                },
              ],
            },
          ],
        }]}
      />
      <TryItPanel method="GET" path="/v1/admin/service-types" auth="admin" />
    </>
  )
}
