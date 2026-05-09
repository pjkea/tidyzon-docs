import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function DeleteServiceTypePage() {
  return (
    <>
      <Head><title>Delete Service Type — Tidyzon API Docs</title></Head>
      <EndpointHero method="DELETE" path="/v1/admin/service-types/{servicetypeid}" title="Delete Service Type" description="Permanently remove a service type. Cannot delete if it has been used in any past requests." />
      <ParamsCard title="Path Parameters" params={[{ name: 'servicetypeid', type: 'integer', required: true }]} />
      <ResponseExplorer responses={[
        { status: 200, label: 'OK', fields: [{ name: 'message', type: 'string' }] },
        { status: 409, label: 'Conflict', description: 'Service type is referenced by existing requests.' },
      ]} />
      <TryItPanel method="DELETE" path="/v1/admin/service-types/{servicetypeid}" auth="admin"
        pathFields={[{ name: 'servicetypeid', type: 'number', placeholder: '1' }]}
      />
    </>
  )
}
