import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function GetStatementPage() {
  return (
    <>
      <Head><title>Get Statement — Tidyzon API Docs</title></Head>
      <EndpointHero method="GET" path="/v1/admin/statements/{statementid}" title="Get Statement" description="Returns full detail of a single provider payout statement including all transactions it covers." />
      <ParamsCard title="Path Parameters" params={[{ name: 'statementid', type: 'integer', required: true }]} />
      <ResponseExplorer responses={[{
        status: 200, label: 'OK',
        fields: [
          { name: 'message', type: 'string' },
          {
            name: 'data', type: 'object', fields: [
              { name: 'statementid', type: 'integer' },
              { name: 'provider_name', type: 'string' },
              { name: 'period_start', type: 'string' },
              { name: 'period_end', type: 'string' },
              { name: 'total_amount', type: 'number' },
              { name: 'status', type: 'string' },
              { name: 'paid_at', type: 'string' },
              { name: 'reference', type: 'string' },
              {
                name: 'transactions', type: 'array', fields: [
                  { name: 'transactionid', type: 'integer' },
                  { name: 'type', type: 'string' },
                  { name: 'amount', type: 'number' },
                  { name: 'created_at', type: 'string' },
                ],
              },
            ],
          },
        ],
      }]} />
      <TryItPanel method="GET" path="/v1/admin/statements/{statementid}" auth="admin"
        pathFields={[{ name: 'statementid', type: 'number', placeholder: '1' }]}
      />
    </>
  )
}
