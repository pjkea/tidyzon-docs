import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function CreateStatementPage() {
  return (
    <>
      <Head><title>Create Statement — Tidyzon API Docs</title></Head>
      <EndpointHero method="POST" path="/v1/admin/statements" title="Create Statement" description="Create a new payout statement for a provider by grouping transactions over a billing period." />
      <ParamsCard title="Body" params={[
        { name: 'tidyspid', type: 'integer', required: true, description: 'Provider to create the statement for' },
        { name: 'period_start', type: 'string', required: true, description: 'YYYY-MM-DD' },
        { name: 'period_end', type: 'string', required: true, description: 'YYYY-MM-DD' },
        { name: 'notes', type: 'string' },
      ]} />
      <ResponseExplorer responses={[{
        status: 201, label: 'Created',
        fields: [
          { name: 'message', type: 'string' },
          { name: 'data', type: 'object', fields: [{ name: 'statementid', type: 'integer' }, { name: 'total_amount', type: 'number' }] },
        ],
      }]} />
      <TryItPanel method="POST" path="/v1/admin/statements" auth="admin"
        bodyFields={[
          { name: 'tidyspid', type: 'number', placeholder: '494' },
          { name: 'period_start', type: 'date' },
          { name: 'period_end', type: 'date' },
        ]}
      />
    </>
  )
}
