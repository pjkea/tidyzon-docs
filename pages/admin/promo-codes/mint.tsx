import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function MintPromoCodePage() {
  return (
    <>
      <Head><title>Mint Promo Code — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="POST"
        path="/v1/admin/promo-codes"
        title="Mint Promo Code"
        description="Create one or more customer-facing promotion codes against an existing Stripe coupon. The discount RULE (percent/amount, expiry, caps) is defined as a Coupon in the Stripe dashboard; this endpoint mints the code strings and mirrors them locally for reporting. Stripe validates and applies the discount at checkout."
      />

      <ParamsCard title="Body" params={[
        { name: 'coupon_id', type: 'string', required: true, description: 'Stripe coupon ID (e.g. "JH3H7dSq"). NOT a promotion code id (promo_…). Find it on the coupon page in the Stripe dashboard.' },
        { name: 'code', type: 'string', description: 'Custom code string (e.g. "SPRING25"). Omit to let Stripe auto-generate. Must be unique in the Stripe account; case-insensitive to the customer.' },
        { name: 'quantity', type: 'integer', description: 'How many codes to mint (1–100). Must omit "code" when > 1 (auto-generated batch).' },
        { name: 'valid_end_date', type: 'string', description: 'YYYY-MM-DD. Sets the Stripe expires_at and the local valid_end_date. Defaults to +30 days.' },
        { name: 'issued_to_email', type: 'string', description: 'Optional, stored locally for reporting.' },
        { name: 'issued_to_phone', type: 'string', description: 'Optional, stored locally for reporting.' },
      ]} />

      <ResponseExplorer responses={[{
        status: 201, label: 'Created',
        fields: [
          { name: 'minted', type: 'integer', description: 'Number of codes created' },
          {
            name: 'codes', type: 'array', fields: [
              { name: 'promo_code_id', type: 'integer', description: 'Local promo_codes row id' },
              { name: 'code', type: 'string' },
              { name: 'promotion_code_id', type: 'string', description: 'Stripe promotion code id (promo_…)' },
              { name: 'coupon_id', type: 'string' },
              { name: 'active', type: 'boolean' },
              { name: 'valid_end_date', type: 'string' },
              { name: 'max_redemptions', type: 'integer', description: 'null = unlimited' },
            ],
          },
        ],
        sample: `{
  "minted": 1,
  "codes": [
    {
      "promo_code_id": 1,
      "code": "MINTTEST1",
      "promotion_code_id": "promo_1Tj26v8x7377q4RYpj4telbp",
      "coupon_id": "JH3H7dSq",
      "active": true,
      "valid_end_date": "2026-07-16",
      "max_redemptions": null
    }
  ]
}`,
      }, {
        status: 400, label: 'Bad Request',
        fields: [{ name: 'error', type: 'string' }, { name: 'message', type: 'string' }],
        sample: `{ "error": "coupon not found in the active Stripe account/mode", "coupon_id": "JH3H7dSq" }`,
      }]} />

      <TryItPanel method="POST" path="/v1/admin/promo-codes" auth="admin"
        bodyFields={[
          { name: 'coupon_id', type: 'string', placeholder: 'JH3H7dSq' },
          { name: 'code', type: 'string', placeholder: 'SPRING25' },
          { name: 'quantity', type: 'number', placeholder: '1' },
          { name: 'valid_end_date', type: 'string', placeholder: '2026-07-16' },
        ]}
      />
    </>
  )
}
