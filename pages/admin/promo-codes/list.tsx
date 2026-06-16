import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function ListPromoCodesPage() {
  return (
    <>
      <Head><title>List Promo Codes — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/admin/promo-codes"
        title="List Promo Codes"
        description="Returns the most recent minted promo codes (up to 500) with their coupon info and derived status flags. This is the local mirror — Stripe remains the source of truth and enforcer."
      />

      <ResponseExplorer responses={[{
        status: 200, label: 'OK',
        fields: [
          {
            name: 'codes', type: 'array', fields: [
              { name: 'promo_code_id', type: 'integer' },
              { name: 'code', type: 'string' },
              { name: 'status_id', type: 'integer', description: '0 = active, 1 = disabled' },
              { name: 'valid_start_date', type: 'string' },
              { name: 'valid_end_date', type: 'string' },
              { name: 'redemption_count', type: 'integer', description: 'Times used (synced from webhook)' },
              { name: 'redemption_allowed', type: 'integer', description: 'Cap (2147483647 = unlimited)' },
              { name: 'promotion_name', type: 'string', description: 'From the coupon' },
              { name: 'stripe_coupon_id', type: 'string' },
              { name: 'discount_type_id', type: 'integer', description: '1 = percent, 2 = amount' },
              { name: 'discount_value', type: 'string' },
              { name: 'is_expired', type: 'boolean' },
              { name: 'is_used_up', type: 'boolean' },
              { name: 'is_active', type: 'boolean' },
            ],
          },
        ],
        sample: `{
  "codes": [
    {
      "promo_code_id": 1,
      "code": "MINTTEST1",
      "status_id": 0,
      "valid_start_date": "2026-06-16",
      "valid_end_date": "2026-07-16",
      "redemption_count": 1,
      "redemption_allowed": 2147483647,
      "promotion_name": "Second Purchase",
      "stripe_coupon_id": "JH3H7dSq",
      "discount_type_id": 1,
      "discount_value": "5.00",
      "is_expired": false,
      "is_used_up": false,
      "is_active": true
    }
  ]
}`,
      }]} />

      <TryItPanel method="GET" path="/v1/admin/promo-codes" auth="admin" />
    </>
  )
}
