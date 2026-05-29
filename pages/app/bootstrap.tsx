import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'

export default function AppBootstrapPage() {
  return (
    <>
      <Head><title>App Bootstrap — App — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/app/bootstrap"
        title="App Bootstrap"
        description="Returns startup AppVariables and the prioritised, audience-filtered list of Message-of-the-Day (MOTD) messages for the signed-in user. Called once after login, during the splash/loading window."
      />

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Authentication
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Requires a Cognito <code className="font-mono text-xs">id_token</code> in the{' '}
          <code className="font-mono text-xs">Authorization: Bearer</code> header. Audience targeting is derived
          from the token (user id + role) — never from the request.
        </p>
      </section>

      <ParamsCard
        title="Request Headers"
        params={[
          { name: 'Authorization', type: 'string', required: true,  description: 'Bearer <id_token>.' },
          { name: 'If-None-Match', type: 'string', required: false, description: 'Optional ETag from a prior response. If unchanged, the endpoint returns 304 with an empty body.' },
        ]}
      />

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Request Example
        </h3>
        <pre className="bg-slate-900 dark:bg-black text-slate-100 text-xs font-mono p-3 rounded overflow-x-auto">
{`GET /v1/app/bootstrap
Authorization: Bearer <id_token>`}
        </pre>
      </section>

      <ResponseExplorer
        responses={[
          {
            status: 200,
            label: 'OK — bootstrap payload',
            sample: `{
  "success": true,
  "data": {
    "appvariables": {
      "known": { "istestmode": true, "max_upload_mb": 5 },
      "extra": { "promo_banner": "summer25" }
    },
    "motd": [
      {
        "id": 42,
        "version": 3,
        "priority": 100,
        "ismodal": true,
        "message": "<h3>Updated Terms &amp; Conditions</h3><p>Please review and accept.</p>",
        "document_url": "https://www.tidyzon.com/terms/",
        "showinbrowser": false,
        "requiresacceptance": true,
        "blocking": true,
        "startdatetime": "2026-05-28T00:00:00Z",
        "enddatetime": "2026-06-30T00:00:00Z"
      }
    ]
  }
}`,
            fields: [
              { name: 'success',                 type: 'boolean',  description: 'Always true on a 200.' },
              { name: 'data.appvariables.known', type: 'object',   description: 'Typed subset of startup config the apps understand (e.g. istestmode).' },
              { name: 'data.appvariables.extra', type: 'object',   description: 'Arbitrary forward-compatible config bag.' },
              { name: 'data.motd',               type: 'object[]', description: 'Applicable messages, highest priority first. Empty array when none apply.' },
              { name: 'data.motd[].id',                 type: 'integer', description: 'Message id — pass to /accept and /dismiss.' },
              { name: 'data.motd[].version',            type: 'integer', description: 'Message version. A bump re-surfaces a previously dismissed/accepted message.' },
              { name: 'data.motd[].priority',           type: 'integer', description: 'Higher is shown first.' },
              { name: 'data.motd[].ismodal',            type: 'boolean', description: 'true → blocking modal; false → dismissible banner.' },
              { name: 'data.motd[].message',            type: 'string',  description: 'Server-sanitised HTML body. Render in a JS-disabled WebView.' },
              { name: 'data.motd[].document_url',       type: 'string',  description: 'Optional "View document" link (e.g. T&C).' },
              { name: 'data.motd[].showinbrowser',      type: 'boolean', description: 'When document_url is set: true → system browser, false → in-app WebView.' },
              { name: 'data.motd[].requiresacceptance', type: 'boolean', description: 'true → show acceptance checkbox; client must call /accept.' },
              { name: 'data.motd[].blocking',           type: 'boolean', description: 'If requiresacceptance and not accepted, the app stays gated.' },
              { name: 'data.motd[].startdatetime',      type: 'string',  description: 'ISO 8601 start of the active window.' },
              { name: 'data.motd[].enddatetime',        type: 'string',  description: 'ISO 8601 end of the active window.' },
            ],
          },
          { status: 304, label: 'Not Modified — payload unchanged (matched If-None-Match)' },
          { status: 401, label: 'Unauthorized — missing or invalid token' },
          { status: 404, label: 'Not Found — user profile not found' },
          { status: 500, label: 'Internal Server Error' },
        ]}
      />

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Audience targeting
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
          Each message has one <code className="font-mono text-xs">audience_type</code>; only matching messages are returned:
        </p>
        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1.5">
          <li><code className="font-mono text-xs">all</code> — every signed-in user.</li>
          <li><code className="font-mono text-xs">customers</code> / <code className="font-mono text-xs">providers</code> — by role.</li>
          <li><code className="font-mono text-xs">single_user</code> — one specific user id.</li>
          <li><code className="font-mono text-xs">first_time</code> — first login (login_count ≤ 1).</li>
          <li><code className="font-mono text-xs">customer_completed_job_24h</code> — customer with a job completed in the last 24h.</li>
          <li><code className="font-mono text-xs">provider_completed_job_4h</code> — provider with a job completed in the last 4h.</li>
          <li><code className="font-mono text-xs">customer_dormant_2w</code> — returning customer after &gt;14 days.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Notes
        </h3>
        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1.5">
          <li>Messages already dismissed or accepted <em>at the current version</em> are suppressed. Bumping a message&apos;s version re-surfaces it.</li>
          <li><code className="font-mono text-xs">message</code> HTML is sanitised server-side on write; clients should still sanitise on render and use a JS-disabled WebView (defense in depth).</li>
          <li>The client should treat any non-200/304 as &quot;startup data unavailable&quot; and block app entry with a retry, per the product spec.</li>
        </ul>
      </section>
    </>
  )
}
