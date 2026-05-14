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
        sample: `{
  "message": "Statement retrieved successfully",
  "data": {
    "statementid": 1,
    "provider_name": "Randy Odoom",
    "period_start": "2026-05-01",
    "period_end": "2026-05-07",
    "total_amount": 24.49,
    "status": "paid",
    "paid_at": "May 14, 2026 10:00 AM",
    "reference": "WIRE-20260514-001",
    "transactions": [
      { "transactionid": 1, "type": "payout", "amount": 24.49, "created_at": "May 12, 2026 09:41 AM" }
    ]
  }
}`,
      }]} />
      <TryItPanel method="GET" path="/v1/admin/statements/{statementid}" auth="admin"
        pathFields={[{ name: 'statementid', type: 'number', placeholder: '1' }]}
      />
    </>
  )
}
