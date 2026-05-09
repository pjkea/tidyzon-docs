import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function RequestOverviewPage() {
  return (
    <>
      <Head><title>Request Overview & Receipt — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/admin/requests/{requestid}"
        title="Request Overview & Receipt"
        description="Returns a formatted receipt breakdown of a service request, including itemised pricing per asset, tips, and any discounts. This is the same GET /requests/{requestid} endpoint — the receipt is part of the response."
      />

      <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-sm text-amber-800 dark:text-amber-300">
        The overview and receipt data is returned from the main request detail endpoint (<code className="font-mono text-xs">GET /v1/admin/requests/{'{requestid}'}</code>). The lambda <strong>request_overview_receipt_admin</strong> handles the receipt sub-view within that route.
      </div>

      <ParamsCard
        title="Path Parameters"
        params={[
          { name: 'requestid', type: 'integer', required: true },
        ]}
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
                  { name: 'requestid', type: 'integer' },
                  { name: 'subtotal', type: 'number' },
                  { name: 'tip', type: 'number' },
                  { name: 'discount', type: 'number' },
                  { name: 'total', type: 'number' },
                  { name: 'payment_method', type: 'string' },
                  {
                    name: 'line_items', type: 'array', fields: [
                      { name: 'label', type: 'string' },
                      { name: 'amount', type: 'number' },
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
        path="/v1/admin/requests/{requestid}"
        auth="admin"
        pathFields={[{ name: 'requestid', type: 'number', placeholder: '1' }]}
      />
    </>
  )
}
