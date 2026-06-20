import Head from 'next/head'
import { CategoryHero } from '@/components/CategoryHero'
import { Receipt, CreditCard, Radar, UserCheck } from 'lucide-react'

export default function PaymentMatchingLifecyclePage() {
  return (
    <>
      <Head><title>Payment & Matching Lifecycle — User App — Tidyzon API Docs</title></Head>

      <CategoryHero
        title="Payment & Matching Lifecycle"
        subtitle="User App · End-to-end"
        description="How a live request goes from the summary screen to an assigned provider: pay places a HOLD, matching starts after the hold, and the card is only CHARGED when the job completes."
        features={[
          { icon: <Receipt size={16} />, title: '1 · Summary', description: 'Customer reviews the cart and price before anything is created.' },
          { icon: <CreditCard size={16} />, title: '2 · Pay = Hold', description: 'Checkout authorizes a hold. No money moves until the job is done.' },
          { icon: <Radar size={16} />, title: '3 · Matching', description: 'Matching to providers starts only after the hold is confirmed.' },
          { icon: <UserCheck size={16} />, title: '4 · Assigned', description: 'A provider accepts → REQUEST_ACCEPTED push → you have a provider.' },
        ]}
        quickLinks={[
          { label: 'Setup Payment Sheet', href: '/user/payments/setup' },
          { label: 'Create Checkout Session', href: '/user/payments/checkout-session' },
          { label: 'Rate & Tip', href: '/user/payments/rate-tip' },
        ]}
      />

      {/* The key correction */}
      <section className="mb-8">
        <div className="rounded-xl border border-amber-300 dark:border-amber-700/60 bg-amber-50 dark:bg-amber-900/20 p-5">
          <h3 className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-1.5">Read this first</h3>
          <p className="text-sm text-amber-900/90 dark:text-amber-100/80">
            Paying at Checkout does <strong>not</strong> charge the card. It places an{' '}
            <strong>authorization hold</strong> (funds reserved). The card is only{' '}
            <strong>charged (captured) when the provider completes the job.</strong> And matching to a
            provider starts <strong>after</strong> the hold is placed — the request sits as an unpaid draft
            until then. Real order: <em>summary → pay (hold) → match → provider assigned → service →
            capture (charged).</em>
          </p>
        </div>
      </section>

      {/* Flow diagram */}
      <section className="mb-8">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">
          The whole flow
        </h3>
        <pre className="bg-slate-900 dark:bg-black text-slate-100 text-xs font-mono p-4 rounded-lg overflow-x-auto leading-relaxed">
{`1. SUMMARY            show price
        │
        ▼
2. CREATE REQUEST     POST /create-service  → request_id, status 0 (DRAFT, NOT broadcast)
        │
        ▼
3. CHECKOUT (PAY)     POST /checkout-session → Stripe Checkout, AUTH HOLD placed
        │
        ▼
4. HOLD CONFIRMED     (Stripe webhook) draft → PENDING(1), matching PUBLISHED  ← matching starts here
        │
        ▼
5. MATCHING (~60s)    offers broadcast to providers; show "matching" UI + Cancel
        │                                   └─ no provider → push REQUEST_REJECTED → back to Summary
        ▼
6. PROVIDER ACCEPTS   push REQUEST_ACCEPTED, request → ASSIGNED(4)  ← you have a provider
        │
        ▼
7. SERVICE → COMPLETE provider finishes → HOLD is CAPTURED (card charged) → status 10`}
        </pre>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          This supersedes the older guidance to fire payment and <code className="font-mono">createServiceRequest</code> in
          parallel and start matching at request creation. Matching now begins <strong>after</strong> the hold is confirmed —
          start the matching animation when Checkout returns, not at request creation.
        </p>
      </section>

      {/* Steps */}
      <section className="mb-8">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">
          Step by step
        </h3>
        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100">1 · Summary</p>
            <p>Show the cart + price. On a failed match / retry, always return here — never skip back to payment or matching.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100">2 · Create request (unpaid draft)</p>
            <p><code className="font-mono text-xs">POST /create-service</code> returns <code className="font-mono text-xs">request_id</code> + <code className="font-mono text-xs">final_price</code>. The request is a <strong>draft (status 0)</strong> and is <strong>not</strong> broadcast. Store <code className="font-mono text-xs">request_id</code>; do <strong>not</strong> start the matching animation yet.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100">3 · Checkout — the hold</p>
            <p>Call <a href="/user/payments/setup" className="text-sky-600 dark:text-sky-400 underline">/payment-sheet</a> first, then <a href="/user/payments/checkout-session" className="text-sky-600 dark:text-sky-400 underline">/checkout-session</a>. Open Stripe Checkout (it owns the promo + tax fields). Completing it places the <strong>hold</strong>; the session expires in 31 min. Never mark the request paid from the app.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100">4 · Hold confirmed (backend)</p>
            <p>No app call. The Stripe webhook records the hold, flips the draft to <strong>PENDING (1)</strong>, and publishes the request to provider matching. Transition into the matching UI when Checkout returns.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100">5 · Matching (~60s)</p>
            <p>Offers are broadcast to providers (~60s window anchored to payment time). Show the matching animation with a <strong>Cancel</strong> button. No provider → push <code className="font-mono text-xs">REQUEST_REJECTED</code> → return to Summary / Try again.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100">6 · Provider assigned ✅</p>
            <p>Provider accepts → request → <strong>ASSIGNED (4)</strong>, customer push <code className="font-mono text-xs">REQUEST_ACCEPTED</code> (&quot;Service Accepted&quot;). Stop matching, go to tracking. The card is still only <strong>held</strong> here.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100">7 · Service → completion → capture</p>
            <p>When the provider completes the job, the hold is <strong>captured (card charged)</strong> and status becomes <strong>10 (COMPLETED)</strong>. Then optionally prompt for <a href="/user/payments/rate-tip" className="text-sky-600 dark:text-sky-400 underline">rating + tip</a>.</p>
          </div>
        </div>
      </section>

      {/* Status + push tables */}
      <section className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">Request status</h3>
          <div className="text-sm text-slate-600 dark:text-slate-400 font-mono space-y-1">
            <p><span className="text-slate-900 dark:text-slate-100">0</span> CREATED — unpaid draft (internal)</p>
            <p><span className="text-slate-900 dark:text-slate-100">1</span> PENDING — paid (held) → matching</p>
            <p><span className="text-slate-900 dark:text-slate-100">4</span> ASSIGNED — provider found</p>
            <p><span className="text-slate-900 dark:text-slate-100">6</span> EN_ROUTE — provider on the way</p>
            <p><span className="text-slate-900 dark:text-slate-100">8</span> ARRIVED</p>
            <p><span className="text-slate-900 dark:text-slate-100">9</span> STARTED — service in progress</p>
            <p><span className="text-slate-900 dark:text-slate-100">10</span> COMPLETED — card captured/charged</p>
            <p><span className="text-slate-900 dark:text-slate-100">2/3/5</span> REJECTED / TIMEOUT / CANCELLED</p>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">Push types (customer)</h3>
          <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
            <p><code className="font-mono text-xs text-slate-900 dark:text-slate-100">REQUEST_ACCEPTED</code> — a provider accepted → stop matching, go to tracking.</p>
            <p><code className="font-mono text-xs text-slate-900 dark:text-slate-100">REQUEST_REJECTED</code> — no provider / match ended → Summary / Try again.</p>
            <p className="text-xs">Drive UI from request status <em>and</em> these pushes — don&apos;t rely on push alone.</p>
          </div>
        </div>
      </section>
    </>
  )
}
