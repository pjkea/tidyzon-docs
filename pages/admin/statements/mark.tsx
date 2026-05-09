import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function MarkStatementPage() {
  return (
    <>
      <Head><title>Mark Statement — Tidyzon API Docs</title></Head>

      <div className="mb-10">
        <EndpointHero
          method="PUT"
          path="/v1/admin/statements/{statementid}/mark-paid"
          title="Mark Statement Paid"
          description="Mark a provider payout statement as paid. Optionally record a bank reference."
        />
        <ParamsCard title="Path Parameters" params={[{ name: 'statementid', type: 'integer', required: true }]} />
        <ParamsCard title="Body" params={[{ name: 'reference', type: 'string', description: 'Bank transfer reference (optional)' }]} />
        <ResponseExplorer responses={[{ status: 200, label: 'OK', fields: [{ name: 'message', type: 'string' }] }]} />
        <TryItPanel method="PUT" path="/v1/admin/statements/{statementid}/mark-paid" auth="admin"
          pathFields={[{ name: 'statementid', type: 'number', placeholder: '1' }]}
          bodyFields={[{ name: 'reference', type: 'string' }]}
        />
      </div>

      <div>
        <EndpointHero
          method="PUT"
          path="/v1/admin/statements/{statementid}/mark-pending"
          title="Mark Statement Pending"
          description="Revert a statement back to pending status (e.g. if a payment was reversed)."
        />
        <ParamsCard title="Path Parameters" params={[{ name: 'statementid', type: 'integer', required: true }]} />
        <ResponseExplorer responses={[{ status: 200, label: 'OK', fields: [{ name: 'message', type: 'string' }] }]} />
        <TryItPanel method="PUT" path="/v1/admin/statements/{statementid}/mark-pending" auth="admin"
          pathFields={[{ name: 'statementid', type: 'number', placeholder: '1' }]}
        />
      </div>
    </>
  )
}
