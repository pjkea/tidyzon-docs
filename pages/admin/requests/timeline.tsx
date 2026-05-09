import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function RequestTimelinePage() {
  return (
    <>
      <Head><title>Request Status Timeline — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/admin/requests/{requestid}/timeline"
        title="Request Status Timeline"
        description="Chronological log of all status transitions for a service request, with local-timezone timestamps derived from the request's GPS location."
      />

      <ParamsCard
        title="Path Parameters"
        params={[
          { name: 'requestid', type: 'integer', required: true },
        ]}
      />

      <ResponseExplorer
        responses={[
          {
            status: 200,
            label: 'OK',
            fields: [
              { name: 'message', type: 'string' },
              {
                name: 'data', type: 'object', fields: [
                  {
                    name: 'timeline', type: 'array', fields: [
                      { name: 'status_label', type: 'string', description: 'Human-readable status name' },
                      { name: 'statusid', type: 'integer' },
                      { name: 'timestamp', type: 'string', description: 'ISO 8601 in the request\'s local timezone' },
                      { name: 'timezone', type: 'string', description: 'e.g. "Africa/Accra"' },
                    ],
                  },
                ],
              },
            ],
          },
          { status: 404, label: 'Not Found' },
        ]}
      />

      <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm">
        <strong className="text-slate-700 dark:text-slate-300">Note:</strong>{' '}
        <span className="text-slate-600 dark:text-slate-400">
          Timestamps are converted to the local timezone of the service location using the{' '}
          <code className="text-xs font-mono">timezonefinder</code> library. Requires the{' '}
          <strong>numpyPytz</strong> Lambda layer. Falls back to UTC if timezone cannot be resolved.
        </span>
      </div>

      <TryItPanel
        method="GET"
        path="/v1/admin/requests/{requestid}/timeline"
        auth="admin"
        pathFields={[{ name: 'requestid', type: 'number', placeholder: '1' }]}
      />
    </>
  )
}
