import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function UserActivitiesPage() {
  return (
    <>
      <Head><title>User Summary & Activities — Tidyzon API Docs</title></Head>

      <div className="mb-10">
        <EndpointHero
          method="GET"
          path="/v1/admin/users/summary"
          title="User Summary Cards"
          description="Aggregate user statistics for the dashboard."
        />
        <ResponseExplorer
          responses={[
            {
              status: 200,
              label: 'OK',
              sample: `{
  "message": "User summary retrieved successfully",
  "data": {
    "total_users": 24,
    "active_users": 24,
    "inactive_users": 0,
    "new_users_last_30_days": 10,
    "role_distribution": [
      { "role_id": 1, "role_name": "User", "count": 10 },
      { "role_id": 2, "role_name": "Service Provider", "count": 13 },
      { "role_id": 5, "role_name": "Super Admin", "count": 1 }
    ]
  }
}`,
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
      </div>

      <div>
        <EndpointHero
          method="GET"
          path="/v1/admin/users/activities"
          title="List User Activities"
          description="Paginated list of user activities (request events). Optionally filter by userid, activity_type, date range."
        />
        <ParamsCard
          title="Query Parameters"
          params={[
            { name: 'userid', type: 'integer' },
            { name: 'activity_type', type: 'string', description: 'request | order | payment | rating | notification | user | admin | promo' },
            { name: 'date_from', type: 'string' },
            { name: 'date_to', type: 'string' },
            { name: 'page', type: 'integer', default: 1 },
            { name: 'page_size', type: 'integer', default: 20 },
          ]}
        />
        <ResponseExplorer
          responses={[
            {
              status: 200,
              label: 'OK',
              sample: `{
  "message": "User activities retrieved successfully",
  "data": [
    {
      "activity_id": 5,
      "activity_type": "request",
      "userid": 2,
      "user_name": "Otabil Odoom",
      "reference_id": "5",
      "description": "pending",
      "activity_status": 1,
      "source": "request",
      "createdat": "May 12, 2026 01:41 PM"
    }
  ],
  "pagination": { "total": 5, "page": 1, "page_size": 20, "pages": 1 }
}`,
              fields: [
                { name: 'message', type: 'string' },
                {
                  name: 'data', type: 'array', fields: [
                    { name: 'activity_id', type: 'integer' },
                    { name: 'activity_type', type: 'string' },
                    { name: 'userid', type: 'integer' },
                    { name: 'user_name', type: 'string' },
                    { name: 'reference_id', type: 'string' },
                    { name: 'description', type: 'string' },
                    { name: 'activity_status', type: 'integer' },
                    { name: 'source', type: 'string' },
                    { name: 'createdat', type: 'string' },
                  ],
                },
                {
                  name: 'pagination', type: 'object', fields: [
                    { name: 'total', type: 'integer' },
                    { name: 'page', type: 'integer' },
                    { name: 'page_size', type: 'integer' },
                    { name: 'pages', type: 'integer' },
                  ],
                },
              ],
            },
            { status: 401, label: 'Unauthorized' },
          ]}
        />
        <TryItPanel
          method="GET"
          path="/v1/admin/users/activities"
          auth="admin"
          queryFields={[
            { name: 'userid', type: 'number' },
            { name: 'activity_type', type: 'string', placeholder: 'request' },
            { name: 'date_from', type: 'string' },
            { name: 'date_to', type: 'string' },
            { name: 'page', type: 'number', placeholder: '1' },
            { name: 'page_size', type: 'number', placeholder: '20' },
          ]}
        />
      </div>
    </>
  )
}
