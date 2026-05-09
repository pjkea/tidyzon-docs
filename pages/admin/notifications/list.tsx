import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function ListNotificationsPage() {
  return (
    <>
      <Head><title>List Notifications — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/admin/notifications"
        title="List Notifications"
        description="Returns all push notification records (sent, scheduled, and draft)."
      />
      <ParamsCard
        title="Query Parameters"
        params={[
          { name: 'limit', type: 'integer', default: 20 },
          { name: 'offset', type: 'integer', default: 0 },
          { name: 'status', type: 'string', description: 'sent | scheduled | draft' },
        ]}
      />
      <ResponseExplorer
        responses={[{
          status: 200, label: 'OK',
          fields: [
            { name: 'message', type: 'string' },
            {
              name: 'data', type: 'object', fields: [
                {
                  name: 'notifications', type: 'array', fields: [
                    { name: 'notificationid', type: 'integer' },
                    { name: 'title', type: 'string' },
                    { name: 'body', type: 'string' },
                    { name: 'status', type: 'string' },
                    { name: 'target', type: 'string', description: 'all | users | providers | specific' },
                    { name: 'scheduled_at', type: 'string' },
                    { name: 'sent_at', type: 'string' },
                    { name: 'recipient_count', type: 'integer' },
                  ],
                },
              ],
            },
          ],
        }]}
      />
      <TryItPanel method="GET" path="/v1/admin/notifications" auth="admin"
        queryFields={[{ name: 'limit', type: 'number', placeholder: '20' }, { name: 'status', type: 'string', placeholder: 'sent' }]}
      />
    </>
  )
}
