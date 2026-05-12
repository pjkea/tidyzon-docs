import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function PermissionsPage() {
  return (
    <>
      <Head><title>Permissions — Tidyzon API Docs</title></Head>

      <div className="mb-10">
        <EndpointHero
          method="GET"
          path="/v1/admin/permissions"
          title="Get Permissions"
          description="Returns the full permission matrix grouped by role. Valid permission keys: view_dashboard, manage_users, manage_providers, manage_requests, manage_payments, manage_promo_codes, manage_notifications, manage_tickets, manage_statements, manage_reports, manage_admin_users, manage_permissions, view_system_logs, manage_website."
        />
        <ParamsCard
          title="Query Parameters"
          params={[
            { name: 'roleid', type: 'integer', description: 'Optional — filter to a single role (4 or 5)' },
          ]}
        />
        <ResponseExplorer
          responses={[
            {
              status: 200,
              label: 'OK',
              sample: `{
  "message": "Permissions retrieved successfully",
  "data": [
    {
      "roleid": 4,
      "rolename": "Admin",
      "permissions": {
        "manage_admin_users": { "isallowed": false, "updatedat": "April 09, 2026 04:05 PM" },
        "manage_notifications": { "isallowed": true, "updatedat": "April 09, 2026 04:05 PM" },
        "manage_payments": { "isallowed": true, "updatedat": "April 09, 2026 04:05 PM" },
        "manage_users": { "isallowed": true, "updatedat": "April 09, 2026 04:05 PM" }
      }
    }
  ]
}`,
              fields: [
                { name: 'message', type: 'string' },
                {
                  name: 'data', type: 'array', fields: [
                    { name: 'roleid', type: 'integer' },
                    { name: 'rolename', type: 'string' },
                    { name: 'permissions', type: 'object', description: 'Keys are permission names; values are { isallowed: boolean, updatedat: string }' },
                  ],
                },
              ],
            },
            { status: 401, label: 'Unauthorized' },
          ]}
        />
        <TryItPanel
          method="GET"
          path="/v1/admin/permissions"
          auth="admin"
          queryFields={[{ name: 'roleid', type: 'number', placeholder: '4' }]}
        />
      </div>

      <div>
        <EndpointHero
          method="PUT"
          path="/v1/admin/permissions/{role}"
          title="Update Permissions"
          description="Updates the permission set for a given roleid. Super Admin only (roleid 5)."
        />
        <ParamsCard
          title="Path Parameters"
          params={[{ name: 'role', type: 'integer', required: true, description: 'roleid to update — 4 or 5' }]}
        />
        <ParamsCard
          title="Body Parameters"
          params={[
            { name: 'permissions', type: 'array', required: true, description: 'Array of { permission_key: string, isallowed: boolean }' },
          ]}
        />
        <ResponseExplorer
          responses={[
            {
              status: 200,
              label: 'OK',
              sample: `{
  "message": "Permissions updated successfully",
  "roleid": 4,
  "rolename": "Admin",
  "updated": [
    { "permission_key": "manage_notifications", "isallowed": true, "updatedat": "May 12, 2026 10:00 AM" }
  ]
}`,
              fields: [
                { name: 'message', type: 'string' },
                { name: 'roleid', type: 'integer' },
                { name: 'rolename', type: 'string' },
                {
                  name: 'updated', type: 'array', fields: [
                    { name: 'permission_key', type: 'string' },
                    { name: 'isallowed', type: 'boolean' },
                    { name: 'updatedat', type: 'string' },
                  ],
                },
              ],
            },
            { status: 403, label: 'Forbidden — Super Admin only' },
          ]}
        />
        <TryItPanel
          method="PUT"
          path="/v1/admin/permissions/{role}"
          auth="admin"
          pathFields={[{ name: 'role', type: 'number', placeholder: '4' }]}
          bodyFields={[
            { name: 'permissions', type: 'string', placeholder: '[{"permission_key":"manage_users","isallowed":true}]' },
          ]}
        />
      </div>
    </>
  )
}
