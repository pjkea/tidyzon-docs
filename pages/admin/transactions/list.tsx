import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function ListTransactionsPage() {
  return (
    <>
      <Head><title>List Transactions — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/admin/transactions"
        title="List Transactions"
        description="Returns all financial transactions (provider payouts, credits, deductions)."
      />

      <ParamsCard
        title="Query Parameters"
        params={[
          { name: 'limit', type: 'integer', default: 20 },
          { name: 'offset', type: 'integer', default: 0 },
          { name: 'providerid', type: 'integer', description: 'Filter to a specific provider' },
          { name: 'type', type: 'string', description: 'payout | credit | deduction' },
        ]}
      />

      <ResponseExplorer
        responses={[
          {
            status: 200,
            label: 'OK',
            sample: `{
  "transactions": [
    {
      "transactionid": 1,
      "tidyspid": 494,
      "provider_name": "Joseph Ansah",
      "type": "payout",
      "amount": 35.00,
      "status": "completed",
      "description": "Weekly payout",
      "createdat": "May 10, 2026 12:00 PM"
    }
  ],
  "pagination": { "currentPage": 1, "totalCount": 1, "totalPages": 1, "limit": 20 }
}`,
            fields: [
              { name: 'message', type: 'string' },
              {
                name: 'data', type: 'object', fields: [
                  {
                    name: 'transactions', type: 'array', fields: [
                      { name: 'transactionid', type: 'integer' },
                      { name: 'type', type: 'string' },
                      { name: 'amount', type: 'number' },
                      { name: 'currency', type: 'string' },
                      { name: 'provider_name', type: 'string' },
                      { name: 'reference', type: 'string' },
                      { name: 'created_at', type: 'string' },
                    ],
                  },
                  {
                    name: 'pagination', type: 'object', fields: [
                      { name: 'total', type: 'integer' },
                      { name: 'limit', type: 'integer' },
                      { name: 'offset', type: 'integer' },
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
        path="/v1/admin/transactions"
        auth="admin"
        queryFields={[
          { name: 'limit', type: 'number', placeholder: '20' },
          { name: 'offset', type: 'number', placeholder: '0' },
          { name: 'providerid', type: 'number' },
        ]}
      />
    </>
  )
}
