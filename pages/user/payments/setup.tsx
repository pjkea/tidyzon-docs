import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'

export default function SetupPaymentSheetPage() {
  return (
    <>
      <Head><title>Setup Payment Sheet — User App — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="POST"
        path="/payment-sheet"
        title="Setup Payment Sheet"
        description="Ensures the signed-in user has a Stripe customer (creating one if needed) and returns a SetupIntent + CustomerSession client secret for the mobile PaymentSheet / CustomerSheet. Call this once before Create Checkout Session — Checkout needs the customer to exist."
      />

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Authentication
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Requires a Cognito <code className="font-mono text-xs">id_token</code> in the{' '}
          <code className="font-mono text-xs">Authorization: Bearer</code> header. The Stripe customer is tied to the
          user derived from the token.
        </p>
      </section>

      <ParamsCard
        title="Request Body"
        params={[
          { name: '(none)', type: '—', required: false, description: 'No body required — send {}. Identity comes from the token.' },
        ]}
      />

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Request Example
        </h3>
        <pre className="bg-slate-900 dark:bg-black text-slate-100 text-xs font-mono p-3 rounded overflow-x-auto">
{`POST /payment-sheet
Authorization: Bearer <id_token>
Content-Type: application/json

{}`}
        </pre>
      </section>

      <ResponseExplorer
        responses={[
          {
            status: 200,
            label: 'OK — customer ready',
            sample: `{
  "setupIntentId": "seti_1ABC...",
  "setupIntent": "seti_1ABC..._secret_...",
  "customerSessionClientSecret": "cuss_secret_...",
  "stripeCustomerId": "cus_ABC123",
  "userId": 9
}`,
            fields: [
              { name: 'setupIntentId',               type: 'string', description: 'SetupIntent id.' },
              { name: 'setupIntent',                 type: 'string', description: 'SetupIntent client secret.' },
              { name: 'customerSessionClientSecret', type: 'string', description: 'CustomerSession client secret (cuss_secret_...). Pass to the mobile SDK CustomerConfiguration in place of the ephemeral key.' },
              { name: 'stripeCustomerId',            type: 'string', description: 'The Stripe customer id (cus_...) used by Create Checkout Session.' },
              { name: 'userId',                      type: 'integer', description: 'The signed-in user id.' },
            ],
          },
          { status: 401, label: 'Unauthorized — missing or invalid token' },
          { status: 500, label: 'Internal Server Error' },
        ]}
      />

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Notes
        </h3>
        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1.5">
          <li>If the user already has a valid Stripe customer it is reused; otherwise a new one is created automatically.</li>
          <li><strong>No <code className="font-mono text-xs">ephemeralKey</code> is returned.</strong> On the current Stripe API version (<code className="font-mono text-xs">2025-09-30.clover</code>) an ephemeral key can no longer list payment methods or retrieve a SetupIntent (returns <code className="font-mono text-xs">403 more_permissions_required</code>). The mobile SDK must use <code className="font-mono text-xs">customerSessionClientSecret</code> with its <code className="font-mono text-xs">CustomerConfiguration</code> instead, on an SDK version that supports CustomerSession.</li>
          <li>The CustomerSession enables both the <code className="font-mono text-xs">mobile_payment_element</code> (PaymentSheet — add a card) and <code className="font-mono text-xs">customer_sheet</code> (manage saved cards) components.</li>
          <li>To display the user&apos;s saved cards (e.g. on a request summary), call <a href="/user/payments/methods" className="text-sky-600 dark:text-sky-400 underline">List Saved Cards</a> — do not list them client-side via the Stripe SDK.</li>
          <li>You no longer need the user to save a card up front for the live flow — Checkout collects the card. The customer object just needs to exist.</li>
          <li>Required before <a href="/user/payments/checkout-session" className="text-sky-600 dark:text-sky-400 underline">Create Checkout Session</a>, which returns <code className="font-mono text-xs">400 No Stripe customer found</code> otherwise.</li>
        </ul>
      </section>
    </>
  )
}
