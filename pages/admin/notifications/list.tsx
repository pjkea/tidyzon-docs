import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

const notificationFields = [
  { name: 'id', type: 'integer' },
  { name: 'title', type: 'string' },
  { name: 'message', type: 'string' },
  { name: 'userType', type: 'string' },
  { name: 'target', type: 'string' },
  { name: 'targetIds', type: 'array', description: 'null if sent to all' },
  { name: 'status', type: 'string', description: 'draft | scheduled | delivered | cancelled' },
  { name: 'scheduledAt', type: 'string | null' },
  { name: 'sentAt', type: 'string | null' },
  { name: 'priority', type: 'string' },
  { name: 'clickAction', type: 'string | null' },
  { name: 'imageUrl', type: 'string | null' },
  {
    name: 'deliveryStats', type: 'object', fields: [
      { name: 'total', type: 'integer' },
      { name: 'delivered', type: 'integer' },
      { name: 'failed', type: 'integer' },
    ],
  },
]

export default function ListNotificationsPage() {
  return (
    <>
      <Head><title>Notifications — Tidyzon API Docs</title></Head>

      <div className="mb-10">
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
            { name: 'status', type: 'string', description: 'draft | scheduled | delivered | cancelled' },
          ]}
        />
        <ResponseExplorer
          responses={[{
            status: 200, label: 'OK',
            sample: `{
  "notifications": [
    {
      "id": 2,
      "title": "Test Notification",
      "message": "New Notification test",
      "userType": "system",
      "target": "system",
      "targetIds": null,
      "status": "delivered",
      "scheduledAt": null,
      "sentAt": "2026-02-28T20:01:03.585664",
      "priority": "high",
      "clickAction": null,
      "imageUrl": null,
      "deliveryStats": { "total": 1, "delivered": 1, "failed": 0 }
    }
  ],
  "pagination": { "currentPage": 1, "totalCount": 2, "totalPages": 2, "limit": 20 }
}`,
            fields: [
              {
                name: 'notifications', type: 'array', fields: notificationFields,
              },
              {
                name: 'pagination', type: 'object', fields: [
                  { name: 'currentPage', type: 'integer' },
                  { name: 'totalCount', type: 'integer' },
                  { name: 'totalPages', type: 'integer' },
                  { name: 'limit', type: 'integer' },
                ],
              },
            ],
          }]}
        />
        <TryItPanel
          method="GET"
          path="/v1/admin/notifications"
          auth="admin"
          queryFields={[
            { name: 'limit', type: 'number', placeholder: '20' },
            { name: 'offset', type: 'number', placeholder: '0' },
            { name: 'status', type: 'string', placeholder: 'delivered' },
          ]}
        />
      </div>

      <div>
        <EndpointHero
          method="GET"
          path="/v1/admin/notifications/{notificationid}"
          title="Get Notification"
          description="Returns a single notification by ID."
        />
        <ParamsCard
          title="Path Parameters"
          params={[{ name: 'notificationid', type: 'integer', required: true }]}
        />
        <ResponseExplorer
          responses={[{
            status: 200, label: 'OK',
            sample: `{
  "message": "Notification retrieved successfully",
  "id": 2,
  "title": "Test Notification",
  "message": "New Notification test",
  "userType": "system",
  "target": "system",
  "targetIds": null,
  "status": "delivered",
  "scheduledAt": null,
  "sentAt": "2026-02-28T20:01:03.585664",
  "priority": "high",
  "clickAction": null,
  "imageUrl": null,
  "deliveryStats": { "total": 1, "delivered": 1, "failed": 0 }
}`,
            fields: notificationFields,
          }]}
        />
        <TryItPanel
          method="GET"
          path="/v1/admin/notifications/{notificationid}"
          auth="admin"
          pathFields={[{ name: 'notificationid', type: 'number', placeholder: '1' }]}
        />
      </div>
    </>
  )
}
