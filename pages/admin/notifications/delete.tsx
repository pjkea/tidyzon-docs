import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function DeleteNotificationPage() {
  return (
    <>
      <Head><title>Delete Notification — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="DELETE"
        path="/v1/admin/notifications/{notificationid}"
        title="Delete Notification"
        description="Permanently delete a notification record. Only draft or cancelled notifications can be deleted."
      />
      <ParamsCard title="Path Parameters" params={[{ name: 'notificationid', type: 'integer', required: true }]} />
      <ResponseExplorer responses={[
        { status: 200, label: 'OK', fields: [{ name: 'message', type: 'string' }] },
        { status: 400, label: 'Bad Request', description: 'Cannot delete a notification that has already been sent.' },
      ]} />
      <TryItPanel method="DELETE" path="/v1/admin/notifications/{notificationid}" auth="admin"
        pathFields={[{ name: 'notificationid', type: 'number', placeholder: '1' }]}
      />
    </>
  )
}
