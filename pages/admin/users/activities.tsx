import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function UserActivitiesPage() {
  return (
    <>
      <Head><title>User Activities — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/admin/users/summary"
        title="User Summary Cards"
        description="Returns aggregate statistics for the user management dashboard — total users, active, dormant, and new registrations."
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
                  { name: 'total_users', type: 'integer' },
                  { name: 'active_users', type: 'integer' },
                  { name: 'dormant_users', type: 'integer' },
                  { name: 'inactive_users', type: 'integer' },
                  { name: 'new_this_month', type: 'integer' },
                ],
              },
            ],
          },
          { status: 401, label: 'Unauthorized' },
        ]}
      />

      <TryItPanel
        method="GET"
        path="/v1/admin/users/summary"
        auth="admin"
      />
    </>
  )
}
