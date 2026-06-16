import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function TogglePromoCodePage() {
  return (
    <>
      <Head><title>Toggle Promo Code — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="POST"
        path="/v1/admin/promo-codes/{id}/toggle"
        title="Toggle Promo Code"
        description="Enable or disable a promo code. Stripe is flipped first (PromotionCode.modify active=…), then the local status, so the two never desync. A disabled code is rejected at checkout."
      />

      <ParamsCard title="Path Parameters" params={[
        { name: 'id', type: 'integer', required: true, description: 'The local promo_code_id (from mint/list).' },
      ]} />

      <ResponseExplorer responses={[{
        status: 200, label: 'OK',
        fields: [
          { name: 'promo_code_id', type: 'integer' },
          { name: 'active', type: 'boolean', description: 'New active state after the toggle' },
        ],
        sample: `{ "promo_code_id": 1, "active": false }`,
      }, {
        status: 404, label: 'Not Found',
        fields: [{ name: 'error', type: 'string' }],
        sample: `{ "error": "code not found" }`,
      }]} />

      <TryItPanel method="POST" path="/v1/admin/promo-codes/{id}/toggle" auth="admin"
        pathFields={[{ name: 'id', type: 'number', placeholder: '1' }]}
      />
    </>
  )
}
