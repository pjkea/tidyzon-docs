import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function GetPaymentPage() {
  return (
    <>
      <Head><title>Get Payment — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/admin/payments/{paymentid}"
        title="Get Payment"
        description="Returns full details of a single payment record."
      />

      <ParamsCard
        title="Path Parameters"
        params={[{ name: 'paymentid', type: 'integer', required: true }]}
      />

      <ResponseExplorer
        responses={[
          {
            status: 200,
            label: 'OK',
            fields: [
              { name: 'message', type: 'string' },
              {
                name: 'data', type: 'object', fields: [
                  { name: 'paymentid', type: 'integer' },
                  { name: 'requestid', type: 'integer' },
                  { name: 'amount', type: 'number' },
                  { name: 'tip', type: 'number' },
                  { name: 'currency', type: 'string' },
                  { name: 'status', type: 'string' },
                  { name: 'payment_method', type: 'string' },
                  { name: 'gateway_reference', type: 'string' },
                  { name: 'created_at', type: 'string' },
                  {
                    name: 'customer', type: 'object', fields: [
                      { name: 'userid', type: 'integer' },
                      { name: 'name', type: 'string' },
                      { name: 'email', type: 'string' },
                    ],
                  },
                ],
              },
            ],
          },
            sample: `{
  "message": "Payment retrieved successfully",
  "data": {
    "paymentid": 1,
    "requestid": 1,
    "amount": 41.12,
    "tip": 0.0,
    "currency": "USD",
    "status": "completed",
    "payment_method": "card",
    "gateway_reference": "ch_3PabcXYZ",
    "created_at": "May 12, 2026 09:41 AM",
    "customer": {
      "userid": 2,
      "name": "Otabil Odoom",
      "email": "engineeringcaldarmallafrica@gmail.com"
    }
  }
}`,
          },
          { status: 404, label: 'Not Found' },
        ]}
      />

      <TryItPanel
        method="GET"
        path="/v1/admin/payments/{paymentid}"
        auth="admin"
        pathFields={[{ name: 'paymentid', type: 'number', placeholder: '1' }]}
      />
    </>
  )
}
