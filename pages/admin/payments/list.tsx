import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function ListPaymentsPage() {
  return (
    <>
      <Head><title>List Payments — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/admin/payments"
        title="List Payments"
        description="Returns a paginated list of all payment records across the platform."
      />

      <ParamsCard
        title="Query Parameters"
        params={[
          { name: 'limit', type: 'integer', default: 20 },
          { name: 'offset', type: 'integer', default: 0 },
          { name: 'startdate', type: 'string', description: 'YYYY-MM-DD' },
          { name: 'enddate', type: 'string', description: 'YYYY-MM-DD' },
          { name: 'customerid', type: 'integer' },
        ]}
      />

      <ResponseExplorer
        responses={[
          {
            status: 200,
            label: 'OK',
            sample: `{
  "message": "Payments retrieved successfully",
  "data": {
    "payments": [
      {
        "paymentid": 10,
        "orderid": 5,
        "amount": 41.12,
        "status": "completed",
        "paymentgateway": "stripe",
        "transactionid": "txn_abc123",
        "createdat": "May 12, 2026 01:45 PM"
      }
    ],
    "pagination": { "limit": 20, "offset": 0, "total_count": 1, "returned_count": 1 },
    "statistics": { "total_transactions": 1, "total_amount": 41.12, "average_amount": 41.12 }
  }
}`,
            fields: [
              { name: 'message', type: 'string' },
              {
                name: 'data', type: 'object', fields: [
                  {
                    name: 'payments', type: 'array', fields: [
                      { name: 'paymentid', type: 'integer' },
                      { name: 'requestid', type: 'integer' },
                      { name: 'amount', type: 'number' },
                      { name: 'currency', type: 'string' },
                      { name: 'status', type: 'string' },
                      { name: 'payment_method', type: 'string' },
                      { name: 'customer_name', type: 'string' },
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
        path="/v1/admin/payments"
        auth="admin"
        queryFields={[
          { name: 'limit', type: 'number', placeholder: '20' },
          { name: 'offset', type: 'number', placeholder: '0' },
          { name: 'startdate', type: 'date' },
          { name: 'enddate', type: 'date' },
        ]}
      />
    </>
  )
}
