import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function CreateTransactionPage() {
  return (
    <>
      <Head><title>Create Transaction — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="POST"
        path="/v1/admin/transactions"
        title="Create Transaction"
        description="Manually create a financial transaction for a provider (e.g. manual payout, credit, or deduction)."
      />
      <ParamsCard
        title="Body"
        params={[
          { name: 'tidyspid', type: 'integer', required: true, description: 'Provider to credit/debit' },
          { name: 'type', type: 'string', required: true, description: 'payout | credit | deduction' },
          { name: 'amount', type: 'number', required: true, description: 'Transaction amount' },
          { name: 'currency', type: 'string', default: 'GHS' },
          { name: 'reference', type: 'string', description: 'External reference or bank transfer ID' },
          { name: 'notes', type: 'string' },
        ]}
      />
      <ResponseExplorer
        responses={[{
          status: 201, label: 'Created',
          fields: [
            { name: 'message', type: 'string' },
            { name: 'data', type: 'object', fields: [{ name: 'transactionid', type: 'integer' }] },
          ],
        }]}
      />
      <TryItPanel
        method="POST"
        path="/v1/admin/transactions"
        auth="admin"
        bodyFields={[
          { name: 'tidyspid', type: 'number', placeholder: '494' },
          { name: 'type', type: 'string', placeholder: 'payout' },
          { name: 'amount', type: 'number', placeholder: '100.00' },
          { name: 'reference', type: 'string' },
          { name: 'notes', type: 'string' },
        ]}
      />
    </>
  )
}
