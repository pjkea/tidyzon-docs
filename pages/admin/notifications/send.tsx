import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function SendNotificationPage() {
  return (
    <>
      <Head><title>Send Notification — Tidyzon API Docs</title></Head>

      <div className="mb-10">
        <EndpointHero
          method="POST"
          path="/v1/admin/notifications"
          title="Create Notification"
          description="Create a new notification record (draft). Use the send or schedule endpoints to dispatch it."
        />
        <ParamsCard title="Body" params={[
          { name: 'title', type: 'string', required: true },
          { name: 'body', type: 'string', required: true },
          { name: 'target', type: 'string', required: true, description: 'all | users | providers | specific' },
          { name: 'recipient_ids', type: 'array', description: 'Required when target is "specific" — list of userid or tidyspid' },
          { name: 'data', type: 'object', description: 'Optional custom payload (deep link, etc.)' },
        ]} />
        <ResponseExplorer responses={[{
          status: 201, label: 'Created',
          fields: [
            { name: 'message', type: 'string' },
            { name: 'data', type: 'object', fields: [{ name: 'notificationid', type: 'integer' }] },
          ],
        }]} />
        <TryItPanel method="POST" path="/v1/admin/notifications" auth="admin"
          bodyFields={[
            { name: 'title', type: 'string', placeholder: 'Announcement' },
            { name: 'body', type: 'string', placeholder: 'Message body...' },
            { name: 'target', type: 'string', placeholder: 'all' },
          ]}
        />
      </div>

      <div className="mb-10">
        <EndpointHero
          method="POST"
          path="/v1/admin/notifications/{notificationid}/send"
          title="Send Notification"
          description="Immediately dispatch a notification to its target recipients via Firebase Cloud Messaging."
        />
        <ParamsCard title="Path Parameters" params={[{ name: 'notificationid', type: 'integer', required: true }]} />
        <ResponseExplorer responses={[{ status: 200, label: 'OK', fields: [{ name: 'message', type: 'string' }] }]} />
        <TryItPanel method="POST" path="/v1/admin/notifications/{notificationid}/send" auth="admin"
          pathFields={[{ name: 'notificationid', type: 'number', placeholder: '1' }]}
        />
      </div>

      <div>
        <EndpointHero
          method="POST"
          path="/v1/admin/notifications/{notificationid}/schedule"
          title="Schedule Notification"
          description="Schedule a notification to be sent at a future time."
        />
        <ParamsCard title="Path Parameters" params={[{ name: 'notificationid', type: 'integer', required: true }]} />
        <ParamsCard title="Body" params={[
          { name: 'scheduled_at', type: 'string', required: true, description: 'ISO 8601 datetime to send' },
        ]} />
        <ResponseExplorer responses={[{ status: 200, label: 'OK', fields: [{ name: 'message', type: 'string' }] }]} />
        <TryItPanel method="POST" path="/v1/admin/notifications/{notificationid}/schedule" auth="admin"
          pathFields={[{ name: 'notificationid', type: 'number', placeholder: '1' }]}
          bodyFields={[{ name: 'scheduled_at', type: 'string', placeholder: '2026-06-01T09:00:00Z' }]}
        />
      </div>
    </>
  )
}
