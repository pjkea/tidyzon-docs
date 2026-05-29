import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'

export default function AcceptMotdPage() {
  return (
    <>
      <Head><title>Accept MOTD — App — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="POST"
        path="/v1/app/motd/{id}/accept"
        title="Accept MOTD"
        description="Records the signed-in user's acceptance of a message that requires acceptance (e.g. updated Terms & Conditions). This is the legal audit record."
      />

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Authentication
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Requires a Cognito <code className="font-mono text-xs">id_token</code> in the{' '}
          <code className="font-mono text-xs">Authorization: Bearer</code> header. The acceptance is recorded
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
{`POST /v1/app/motd/42/accept
Authorization: Bearer <id_token>`}
        </pre>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">No request body.</p>
      </section>

      <ResponseExplorer
        responses={[
          {
            status: 200,
            label: 'OK — acceptance recorded',
            sample: `{
  "success": true,
  "data": {
    "accepted": true,
    "version": 3
  }
}`,
            fields: [
              { name: 'success',          type: 'boolean', description: 'Always true on a 200.' },
              { name: 'data.accepted',    type: 'boolean', description: 'Always true on success.' },
              { name: 'data.version',     type: 'integer', description: 'The message version that was accepted (the audit record).' },
            ],
          },
          {
            status: 400,
            label: 'Bad Request — message does not require acceptance',
            sample: `{ "success": false, "message": "This message does not require acceptance" }`,
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
          <li>Acceptance is recorded per <code className="font-mono text-xs">(user, message)</code> at the current message version.</li>
          <li>A message accepted at the current version is suppressed in subsequent bootstrap responses. If the message&apos;s version is later bumped, it re-surfaces and must be accepted again.</li>
          <li>Only call this for messages where <code className="font-mono text-xs">requiresacceptance</code> is <code className="font-mono text-xs">true</code>; otherwise the endpoint returns 400.</li>
          <li>A 404 is returned cleanly for an unknown/expired id so the client does not get stuck.</li>
        </ul>
      </section>
    </>
  )
}
