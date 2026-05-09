import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function ListUsersPage() {
  return (
    <>
      <Head><title>List Users — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/admin/users"
        title="List Users"
        description="Returns a paginated list of all customer accounts with filters for status and search."
      />

      <ParamsCard
        title="Query Parameters"
        params={[
          { name: 'status', type: 'string', default: 'all', description: 'Filter by account status: all | active | dormant | inactive' },
          { name: 'search', type: 'string', description: 'Full-text search across name, email, and phone' },
          { name: 'date_from', type: 'string', description: 'Filter by registration date from (YYYY-MM-DD)' },
          { name: 'date_to', type: 'string', description: 'Filter by registration date to (YYYY-MM-DD)' },
          { name: 'page', type: 'integer', default: 1, description: 'Page number (1-indexed)' },
          { name: 'limit', type: 'integer', default: 10, description: 'Records per page (max 50)' },
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
                    name: 'users', type: 'array', fields: [
                      { name: 'userid', type: 'integer' },
                      { name: 'firstname', type: 'string' },
                      { name: 'lastname', type: 'string' },
                      { name: 'email', type: 'string' },
                      { name: 'phone', type: 'string' },
                      { name: 'status', type: 'string', description: 'active | dormant | inactive' },
                      { name: 'created_at', type: 'string', description: 'ISO 8601 timestamp' },
                      { name: 'total_requests', type: 'integer' },
                    ],
                  },
                  {
                    name: 'pagination', type: 'object', fields: [
                      { name: 'total', type: 'integer' },
                      { name: 'page', type: 'integer' },
                      { name: 'limit', type: 'integer' },
                      { name: 'total_pages', type: 'integer' },
                    ],
                  },
                ],
              },
            ],
          },
          { status: 401, label: 'Unauthorized' },
        ]}
      />

      <TryItPanel
        method="GET"
        path="/v1/admin/users"
        auth="admin"
        queryFields={[
          { name: 'status', type: 'string', placeholder: 'all' },
          { name: 'search', type: 'string', placeholder: 'name or email' },
          { name: 'page', type: 'number', placeholder: '1' },
          { name: 'limit', type: 'number', placeholder: '10' },
        ]}
      />
    </>
  )
}
