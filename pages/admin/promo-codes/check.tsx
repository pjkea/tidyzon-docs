import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function CheckPromoCodePage() {
  return (
    <>
      <Head><title>Check Promo Code — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/admin/promo-codes/{code}"
        title="Check Promo Code"
        description="Look up a single promo code by its string and return its coupon info plus derived status flags. Useful for admin verification — Stripe still enforces validity at checkout regardless of these flags."
      />

      <ParamsCard title="Path Parameters" params={[
        { name: 'code', type: 'string', required: true, description: 'The code string (case-insensitive), e.g. "MINTTEST1".' },
      ]} />

      <ResponseExplorer responses={[{
        status: 200, label: 'OK',
        fields: [
          { name: 'code', type: 'string' },
          { name: 'redemption_count', type: 'integer' },
          { name: 'redemption_allowed', type: 'integer' },
          { name: 'valid_end_date', type: 'string' },
          { name: 'discount_type_id', type: 'integer', description: '1 = percent, 2 = amount' },
          { name: 'discount_value', type: 'string' },
          { name: 'is_expired', type: 'boolean', description: 'valid_end_date < today' },
          { name: 'is_used_up', type: 'boolean', description: 'redemption_count >= redemption_allowed' },
          { name: 'is_active', type: 'boolean', description: 'status active AND not expired AND not used up' },
        ],
        sample: `{
  "promo_code_id": 1,
  "code": "MINTTEST1",
  "status_id": 0,
  "valid_start_date": "2026-06-16",
  "valid_end_date": "2026-07-16",
  "redemption_count": 0,
  "redemption_allowed": 2147483647,
  "promotion_name": "Second Purchase",
  "stripe_coupon_id": "JH3H7dSq",
  "discount_type_id": 1,
  "discount_value": "5.00",
  "is_expired": false,
  "is_used_up": false,
  "is_active": true
}`,
      }, {
        status: 404, label: 'Not Found',
        fields: [{ name: 'error', type: 'string' }, { name: 'code', type: 'string' }],
        sample: `{ "error": "code not found", "code": "NOPE" }`,
      }]} />

      <TryItPanel method="GET" path="/v1/admin/promo-codes/{code}" auth="admin"
        pathFields={[{ name: 'code', type: 'string', placeholder: 'MINTTEST1' }]}
      />
    </>
  )
}
