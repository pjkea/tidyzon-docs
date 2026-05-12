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
            sample: `{
  "message": "Request timeline retrieved successfully",
  "request": {
    "requestid": 1,
    "current_status": 8,
    "address": "376G+P3C, Techiman-Tamale Rd, Kintampo, Ghana",
    "createdat": "May 12, 2026 01:41 PM"
  },
  "timeline": [
    {
      "id": 1,
      "requestid": 1,
      "status": "pending",
      "status_name": "pending",
      "changedat": "May 12, 2026 01:41 PM",
      "changedby_userid": null,
      "changedby_name": null,
      "changedby_role": null,
      "provider_tidyspid": null,
      "provider_name": null,
      "reason": null,
      "metadata": null
    },
    {
      "id": 2,
      "requestid": 1,
      "status": "assigned",
      "status_name": "assigned",
      "changedat": "May 12, 2026 01:41 PM",
      "changedby_userid": 1,
      "changedby_name": "Randy Odoom",
      "changedby_role": "provider",
      "provider_tidyspid": 1,
      "provider_name": "Randy Odoom",
      "reason": "A1",
      "metadata": { "attempt": 1, "tidyspid": 1, "response_status": "ACCEPTED" }
    }
  ],
  "total_events": 4
}`,
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
