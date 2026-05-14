import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function GetTransactionPage() {
  return (
    <>
      <Head><title>Get Transaction — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/admin/transactions/{transactionid}"
        title="Get Transaction"
        description="Full detail of a single transaction record."
      />
      <ParamsCard title="Path Parameters" params={[{ name: 'transactionid', type: 'integer', required: true }]} />
      <ResponseExplorer
        responses={[{
          status: 200, label: 'OK',
          fields: [
            { name: 'message', type: 'string' },
            {
              name: 'data', type: 'object', fields: [
                { name: 'transactionid', type: 'integer' },
                { name: 'type', type: 'string' },
                { name: 'amount', type: 'number' },
                { name: 'currency', type: 'string' },
                { name: 'reference', type: 'string' },
                { name: 'notes', type: 'string' },
                { name: 'created_at', type: 'string' },
                {
                  name: 'provider', type: 'object', fields: [
                    { name: 'tidyspid', type: 'integer' },
                    { name: 'name', type: 'string' },
                  ],
                },
              ],
            },
          ],
          sample: `{
  "message": "Transaction retrieved successfully",
  "data": {
    "transactionid": 1,
    "type": "payout",
    "amount": 24.49,
    "currency": "GHS",
    "reference": "TXN-001-2026",
    "notes": "Weekly payout",
    "created_at": "May 12, 2026 09:41 AM",
    "provider": {
      "tidyspid": 1,
      "name": "Randy Odoom"
    }
  }
}`,
        }]}
      />
      <TryItPanel
        method="GET"
        path="/v1/admin/transactions/{transactionid}"
        auth="admin"
        pathFields={[{ name: 'transactionid', type: 'number', placeholder: '1' }]}
      />
    </>
  )
}
