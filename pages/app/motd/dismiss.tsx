import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'

export default function DismissMotdPage() {
  return (
    <>
      <Head><title>Dismiss MOTD — App — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="POST"
        path="/v1/app/motd/{id}/dismiss"
        title="Dismiss MOTD"
        description={'Records "Don\'t show this again" for a message. The dismissal is persisted server-side so it applies across devices.'}
      />

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Authentication
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Requires a Cognito <code className="font-mono text-xs">id_token</code> in the{' '}
          <code className="font-mono text-xs">Authorization: Bearer</code> header. The dismissal is recorded
          against the user derived from the token.
        </p>
      </section>

      <ParamsCard
        title="Path Parameters"
        params={[
          { name: 'id', type: 'integer', required: true, description: 'The MOTD message id (from the bootstrap response).' },
        ]}
      />

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Request Example
        </h3>
        <pre className="bg-slate-900 dark:bg-black text-slate-100 text-xs font-mono p-3 rounded overflow-x-auto">
{`POST /v1/app/motd/42/dismiss
Authorization: Bearer <id_token>`}
        </pre>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">No request body.</p>
      </section>

      <ResponseExplorer
        responses={[
          {
            status: 200,
            label: 'OK — dismissal recorded',
            sample: `{
  "success": true,
  "data": {
    "dismissed": true
  }
}`,
            fields: [
              { name: 'success',         type: 'boolean', description: 'Always true on a 200.' },
              { name: 'data.dismissed',  type: 'boolean', description: 'Always true on success.' },
            ],
          },
          { status: 401, label: 'Unauthorized — missing or invalid token' },
          {
            status: 404,
            label: 'Not Found — message not found or expired',
            sample: `{ "success": false, "message": "Message not found or expired" }`,
          },
          { status: 500, label: 'Internal Server Error' },
        ]}
      />

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Notes
        </h3>
        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1.5">
          <li>Dismissal is recorded per <code className="font-mono text-xs">(user, message)</code> at the current message version.</li>
          <li>A dismissed message is suppressed in subsequent bootstrap responses until its version is bumped, at which point it re-surfaces.</li>
          <li>A blocking acceptance-required message cannot be dismissed away — use <code className="font-mono text-xs">/accept</code> instead.</li>
          <li>A 404 is returned cleanly for an unknown/expired id so the client does not get stuck.</li>
        </ul>
      </section>
    </>
  )
}
