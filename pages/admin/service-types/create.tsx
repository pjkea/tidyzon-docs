import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function CreateServiceTypePage() {
  return (
    <>
      <Head><title>Create Service Type — Tidyzon API Docs</title></Head>

      <div className="mb-10">
        <EndpointHero method="POST" path="/v1/admin/service-types" title="Create Service Type" description="Create a new service package available for customers to select." />
        <ParamsCard title="Body" params={[
          { name: 'name', type: 'string', required: true },
          { name: 'description', type: 'string' },
          { name: 'price', type: 'number', required: true },
          { name: 'sort_order', type: 'integer', description: 'Display order in the app (lower = first)' },
        ]} />
        <ResponseExplorer responses={[{
          status: 201, label: 'Created',
          fields: [
            { name: 'message', type: 'string' },
            { name: 'data', type: 'object', fields: [{ name: 'servicetypeid', type: 'integer' }] },
          ],
          sample: `{ "message": "Service type created successfully", "data": { "servicetypeid": 16 } }`,
        }]} />
        <TryItPanel method="POST" path="/v1/admin/service-types" auth="admin"
          bodyFields={[
            { name: 'name', type: 'string', placeholder: 'Full Exterior Wash' },
            { name: 'price', type: 'number', placeholder: '25.00' },
            { name: 'sort_order', type: 'number', placeholder: '1' },
          ]}
        />
      </div>

      <div className="mb-10">
        <EndpointHero method="PUT" path="/v1/admin/service-types/{servicetypeid}" title="Update Service Type" description="Update fields on an existing service type." />
        <ParamsCard title="Path Parameters" params={[{ name: 'servicetypeid', type: 'integer', required: true }]} />
        <ParamsCard title="Body" params={[
          { name: 'name', type: 'string' },
          { name: 'description', type: 'string' },
          { name: 'price', type: 'number' },
          { name: 'sort_order', type: 'integer' },
        ]} />
        <ResponseExplorer responses={[{ status: 200, label: 'OK', fields: [{ name: 'message', type: 'string' }], sample: `{ "message": "Service type updated successfully" }` }]} />
        <TryItPanel method="PUT" path="/v1/admin/service-types/{servicetypeid}" auth="admin"
          pathFields={[{ name: 'servicetypeid', type: 'number', placeholder: '1' }]}
          bodyFields={[{ name: 'name', type: 'string' }, { name: 'price', type: 'number' }]}
        />
      </div>

      <div>
        <EndpointHero method="PUT" path="/v1/admin/service-types/{servicetypeid}/toggle" title="Toggle Service Type" description="Enable or disable a service type (makes it visible/hidden to customers)." />
        <ParamsCard title="Path Parameters" params={[{ name: 'servicetypeid', type: 'integer', required: true }]} />
        <ResponseExplorer responses={[{ status: 200, label: 'OK', fields: [{ name: 'message', type: 'string' }, { name: 'active', type: 'boolean' }], sample: `{ "message": "Service type toggled successfully", "active": false }` }]} />
        <TryItPanel method="PUT" path="/v1/admin/service-types/{servicetypeid}/toggle" auth="admin"
          pathFields={[{ name: 'servicetypeid', type: 'number', placeholder: '1' }]}
        />
      </div>
    </>
  )
}
