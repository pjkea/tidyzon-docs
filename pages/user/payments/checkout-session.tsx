import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'

export default function CreateCheckoutSessionPage() {
  return (
    <>
      <Head><title>Create Checkout Session — User App — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="POST"
        path="/checkout-session"
        title="Create Checkout Session"
        description="Opens a Stripe Checkout Session (manual-capture hold) for a service request. Stripe renders the promo-code field, applies the discount, and computes tax; the app opens Checkout with the returned handle. Replaces the old PaymentSheet + /payment-intent flow for the live payment."
      />

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Authentication
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Requires a Cognito <code className="font-mono text-xs">id_token</code> in the{' '}
          <code className="font-mono text-xs">Authorization: Bearer</code> header. The request must belong to the
          signed-in user. Ensure the user has a Stripe customer first by calling{' '}
          <a href="/user/payments/setup" className="text-sky-600 dark:text-sky-400 underline">Setup Payment Sheet</a>{' '}
          (<code className="font-mono text-xs">POST /payment-sheet</code>) — otherwise this returns{' '}
          <code className="font-mono text-xs">400 No Stripe customer found</code>.
        </p>
      </section>

      <ParamsCard
        title="Request Body"
        params={[
          { name: 'requestId',   type: 'integer', required: true,  description: 'The service request to pay for.' },
          { name: 'ui_mode',     type: 'string',  required: false, description: 'How Checkout is presented: "embedded" (default) or "hosted".' },
          { name: 'return_url',  type: 'string',  required: false, description: 'Required for ui_mode=embedded. App deep link / return page. Use the literal token {CHECKOUT_SESSION_ID}; Stripe substitutes the real id.' },
          { name: 'success_url', type: 'string',  required: false, description: 'Required for ui_mode=hosted. Where Stripe redirects after payment. Supports {CHECKOUT_SESSION_ID}.' },
          { name: 'cancel_url',  type: 'string',  required: false, description: 'Optional (hosted). Where Stripe redirects if the customer cancels.' },
          { name: 'idempotency_key', type: 'string', required: false, description: 'Optional. If omitted the backend keys on the request, so repeat calls return the same still-open session.' },
        ]}
      />

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Request Example
        </h3>
        <pre className="bg-slate-900 dark:bg-black text-slate-100 text-xs font-mono p-3 rounded overflow-x-auto">
{`// hosted — app opens Stripe's hosted page in an in-app browser tab
POST /checkout-session
Authorization: Bearer <id_token>
Content-Type: application/json

{
  "requestId": 146,
  "ui_mode": "hosted",
  "success_url": "tidyzon://checkout/done?session_id={CHECKOUT_SESSION_ID}",
  "cancel_url": "tidyzon://checkout/cancel"
}

// embedded — app mounts Stripe's embedded Checkout component
{
  "requestId": 146,
  "ui_mode": "embedded",
  "return_url": "tidyzon://checkout/return?session_id={CHECKOUT_SESSION_ID}"
}`}
        </pre>
      </section>

      <ResponseExplorer
        responses={[
          {
            status: 200,
            label: 'OK — session created',
            sample: `{
  "requestId": 146,
  "checkout_session_id": "cs_test_a1b2c3...",
  "ui_mode": "hosted",
  "client_secret": null,
  "url": "https://checkout.stripe.com/c/pay/cs_test_a1b2c3...",
  "status": "open",
  "amount_subtotal": 42.99,
  "amount_discount": 0,
  "amount_tax": 0,
  "amount_total": 42.99,
  "currency": "USD",
  "automatic_tax_status": "requires_location_inputs"
}`,
            fields: [
              { name: 'requestId',            type: 'integer', description: 'Echo of the request.' },
              { name: 'checkout_session_id',  type: 'string',  description: 'Stripe Checkout Session id (cs_...).' },
              { name: 'ui_mode',              type: 'string',  description: '"embedded" or "hosted" — matches the request.' },
              { name: 'client_secret',        type: 'string',  description: 'Present for embedded (mount Stripe Embedded Checkout); null for hosted.' },
              { name: 'url',                  type: 'string',  description: 'Present for hosted (open in an in-app browser); null for embedded.' },
              { name: 'status',               type: 'string',  description: 'Session status ("open").' },
              { name: 'amount_subtotal',      type: 'number',  description: 'Pre-tax amount in dollars (already ÷100).' },
              { name: 'amount_discount',      type: 'number',  description: 'Always 0 here — the promo is entered later inside Checkout. Treat the total as pre-promo.' },
              { name: 'amount_tax',           type: 'number',  description: 'Tax in dollars. 0 until a usable address is known (automatic_tax_status="complete"); computed when the address is entered in Checkout.' },
              { name: 'amount_total',         type: 'number',  description: 'Total in dollars (pre-promo).' },
              { name: 'currency',             type: 'string',  description: 'ISO currency, e.g. "USD".' },
              { name: 'automatic_tax_status', type: 'string',  description: '"complete" (tax computed) or "requires_location_inputs" (collected in Checkout). null if Stripe Tax is disabled.' },
            ],
          },
          { status: 400, label: 'Bad Request — missing requestId / invalid ui_mode / missing return_url|success_url / no request / no pricing / no Stripe customer / no chargeable lines' },
          { status: 401, label: 'Unauthorized — missing or invalid token' },
          { status: 403, label: 'Forbidden — request does not belong to this user' },
          { status: 502, label: 'Bad Gateway — Stripe unreachable, retry' },
          { status: 500, label: 'Internal Server Error' },
        ]}
      />

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Client flow
        </h3>
        <ol className="list-decimal list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1.5">
          <li>Ensure a Stripe customer exists (<code className="font-mono text-xs">POST /payment-sheet</code>).</li>
          <li>At the summary screen, call this endpoint and display <code className="font-mono text-xs">amount_subtotal</code> / <code className="font-mono text-xs">amount_total</code>.</li>
          <li>Open Checkout via <code className="font-mono text-xs">url</code> (hosted) or <code className="font-mono text-xs">client_secret</code> (embedded).</li>
          <li>The customer enters the promo code in Stripe&apos;s UI and pays — this authorizes a <strong>hold</strong> (captured automatically at job completion).</li>
          <li>On return, show a &quot;processing / booked&quot; state and read request status.</li>
        </ol>
      </section>

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Notes
        </h3>
        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1.5">
          <li><strong>Don&apos;t build your own promo or tax field.</strong> Stripe Checkout renders the promo input and computes tax. <code className="font-mono text-xs">amount_discount</code> is 0 in this response.</li>
          <li><strong>Don&apos;t mark the request paid from the app.</strong> The backend webhook is the source of truth — it records the hold (booked) and later the capture (paid).</li>
          <li>It is a <strong>manual-capture hold</strong>: nothing is captured at payment time; capture happens when the provider completes the job.</li>
          <li><code className="font-mono text-xs">{'{CHECKOUT_SESSION_ID}'}</code> is a literal token Stripe substitutes into your return/success URL.</li>
          <li>Stop calling <code className="font-mono text-xs">POST /payment-intent</code> for the live flow.</li>
        </ul>
      </section>
    </>
  )
}
