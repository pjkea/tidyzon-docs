import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'

export default function RateAndTipPage() {
  return (
    <>
      <Head><title>Rate Provider &amp; Tip — User App — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="POST"
        path="/v1/user/requests/ratings"
        title="Rate Provider & Tip"
        description="Records the customer's rating/review for a completed order and, when a tip is included, charges it off-session to the card used at checkout. The tip is recorded as a separate payment (100% to the provider) and never blocks the rating."
      />

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Authentication
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Requires a Cognito <code className="font-mono text-xs">id_token</code> in the{' '}
          <code className="font-mono text-xs">Authorization: Bearer</code> header. The caller must be the customer on the order.
        </p>
      </section>

      <ParamsCard
        title="Request Body"
        params={[
          { name: 'orderid',        type: 'integer', required: true,  description: 'The completed order being rated.' },
          { name: 'rating',         type: 'integer', required: true,  description: 'Star rating, 1–5.' },
          { name: 'review',         type: 'string',  required: false, description: 'Optional free-text review.' },
          { name: 'tip_amount',     type: 'number',  required: false, description: 'Absolute tip in dollars. Takes precedence over tip_percentage.' },
          { name: 'tip_percentage', type: 'integer', required: false, description: 'Tip as a percent (0–100) of the captured service total. Used only if tip_amount is absent.' },
        ]}
      />

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Request Example
        </h3>
        <pre className="bg-slate-900 dark:bg-black text-slate-100 text-xs font-mono p-3 rounded overflow-x-auto">
{`POST /v1/user/requests/ratings
Authorization: Bearer <id_token>
Content-Type: application/json

{
  "orderid": 45,
  "rating": 5,
  "review": "Excellent, thank you!",
  "tip_amount": 5
}`}
        </pre>
      </section>

      <ResponseExplorer
        responses={[
          {
            status: 201,
            label: 'Created — rating saved (tip charged)',
            sample: `{
  "message": "Rating submitted successfully",
  "rating_id": 44,
  "requestid": 146,
  "orderid": 45,
  "rating": 5,
  "tip_amount": 5.0,
  "tip_percentage": null,
  "tip": {
    "tip_status": "charged",
    "tip_payment_intent": "pi_3Abc...",
    "tip_amount": 5.0
  }
}`,
            fields: [
              { name: 'rating_id',            type: 'integer', description: 'Id of the created rating row.' },
              { name: 'requestid',            type: 'integer', description: 'Request behind the order.' },
              { name: 'orderid',              type: 'integer', description: 'Echo of the order.' },
              { name: 'rating',               type: 'integer', description: 'Echo of the rating.' },
              { name: 'tip',                  type: 'object',  description: 'Tip charge outcome (see tip_status).' },
              { name: 'tip.tip_status',       type: 'string',  description: '"charged" (success), "failed" (declined/no card), "skipped" (zero tip), or "none" (no tip sent).' },
              { name: 'tip.tip_payment_intent', type: 'string', description: 'Stripe PaymentIntent id when charged.' },
              { name: 'tip.tip_amount',       type: 'number',  description: 'Charged tip in dollars.' },
              { name: 'tip.reason',           type: 'string',  description: 'On failure: card_declined | no_saved_card | no_stripe_customer | stripe_error.' },
            ],
          },
          { status: 400, label: 'Bad Request — missing orderid/rating, or rating out of 1–5 range, or invalid tip' },
          { status: 401, label: 'Unauthorized — missing or invalid token' },
          { status: 403, label: 'Forbidden — not the customer for this order' },
          { status: 404, label: 'Not Found — order, user, or provider not found' },
          { status: 409, label: 'Conflict — already rated this provider for this order' },
          { status: 500, label: 'Internal Server Error' },
        ]}
      />

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Notes
        </h3>
        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1.5">
          <li>The tip is charged <strong>off-session</strong> to the card used at checkout — no card re-entry by the customer.</li>
          <li>Tip is best-effort: if the charge fails, the rating is still saved and <code className="font-mono text-xs">tip.tip_status</code> is <code className="font-mono text-xs">"failed"</code> — surface a retry, don&apos;t block the rating.</li>
          <li>Send either <code className="font-mono text-xs">tip_amount</code> or <code className="font-mono text-xs">tip_percentage</code>; omit both for a rating with no tip.</li>
          <li>The tip is recorded as a separate <code className="font-mono text-xs">tip</code> payment (100% provider pass-through), finalised by the backend webhook.</li>
        </ul>
      </section>
    </>
  )
}
