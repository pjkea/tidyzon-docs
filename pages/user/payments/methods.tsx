import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'

export default function ListSavedCardsPage() {
  return (
    <>
      <Head><title>List Saved Cards — User App — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="POST"
        path="/customer-payment-methods"
        title="List Saved Cards"
        description="Returns the user's saved cards, read live from Stripe (server-side). Use this for any saved-card UI such as the request summary — do not list cards on the client via the Stripe SDK."
      />

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Authentication
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Requires a Cognito <code className="font-mono text-xs">id_token</code> in the{' '}
          <code className="font-mono text-xs">Authorization: Bearer</code> header.
        </p>
      </section>

      <ParamsCard
        title="Request Body"
        params={[
          { name: 'userId', type: 'integer', required: true, description: 'The user whose saved cards to list.' },
        ]}
      />

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Request Example
        </h3>
        <pre className="bg-slate-900 dark:bg-black text-slate-100 text-xs font-mono p-3 rounded overflow-x-auto">
{`POST /customer-payment-methods
Authorization: Bearer <id_token>
Content-Type: application/json

{ "userId": 9 }`}
        </pre>
      </section>

      <ResponseExplorer
        responses={[
          {
            status: 200,
            label: 'OK — saved cards',
            sample: `{
  "stripe_customer_id": "cus_ABC123",
  "payment_methods": [
    {
      "payment_method_id": "pm_1ABC...",
      "card_brand": "visa",
      "card_last4": "4242",
      "card_expiration": "08/2027",
      "is_default": true
    }
  ]
}`,
            fields: [
              { name: 'stripe_customer_id',            type: 'string | null', description: 'The Stripe customer id, or null if the user has no Stripe customer yet.' },
              { name: 'payment_methods',               type: 'array',         description: 'Saved cards. Empty array when there are none.' },
              { name: 'payment_methods[].payment_method_id', type: 'string',  description: 'Stripe PaymentMethod id (pm_...).' },
              { name: 'payment_methods[].card_brand',  type: 'string',        description: 'Card brand, e.g. visa, mastercard.' },
              { name: 'payment_methods[].card_last4',  type: 'string',        description: 'Last four digits.' },
              { name: 'payment_methods[].card_expiration', type: 'string',    description: 'Expiry as MM/YYYY.' },
              { name: 'payment_methods[].is_default',  type: 'boolean',       description: 'True if this is the customer’s default payment method (invoice_settings.default_payment_method).' },
            ],
          },
          { status: 400, label: 'Bad Request — missing userId' },
          { status: 500, label: 'Internal Server Error' },
        ]}
      />

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Notes
        </h3>
        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1.5">
          <li>Cards are read <strong>live from Stripe</strong> with the secret key, so cards saved through the mobile CustomerSheet appear immediately — there is no charge required first.</li>
          <li>This is the <strong>canonical list endpoint</strong>. Listing cards from the client with an ephemeral key is not supported on the current Stripe API version (returns <code className="font-mono text-xs">403</code>). There is no <code className="font-mono text-xs">GET /payments/methods</code> route.</li>
          <li>Returns an empty <code className="font-mono text-xs">payment_methods</code> array (not an error) when the user has no saved cards or no Stripe customer.</li>
          <li>To set up the customer / add a card, see <a href="/user/payments/setup" className="text-sky-600 dark:text-sky-400 underline">Setup Payment Sheet</a>.</li>
        </ul>
      </section>
    </>
  )
}
