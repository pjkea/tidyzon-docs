import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function ListProvidersPage() {
  return (
    <>
      <Head><title>List Providers — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/admin/providers"
        title="List Providers"
        description="Returns a paginated list of all provider (TidySp) accounts with filters for status, verification, and availability."
      />

      <ParamsCard
        title="Query Parameters"
        params={[
          { name: 'status', type: 'string', default: 'all', description: 'active | dormant | inactive' },
          { name: 'background_verified', type: 'boolean', description: 'Filter by background check status (true | false)' },
          { name: 'equipment_verified', type: 'boolean', description: 'Filter by equipment/washkit verification' },
          { name: 'available', type: 'boolean', description: 'Filter by current availability toggle' },
          { name: 'search', type: 'string', description: 'Full-text search across name, email, phone' },
          { name: 'page', type: 'integer', default: 1 },
          { name: 'limit', type: 'integer', default: 10, description: 'Max 50' },
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
                    name: 'providers', type: 'array', fields: [
                      { name: 'tidyspid', type: 'integer' },
                      { name: 'firstname', type: 'string' },
                      { name: 'lastname', type: 'string' },
                      { name: 'email', type: 'string' },
                      { name: 'phone', type: 'string' },
                      { name: 'status', type: 'string' },
                      { name: 'available', type: 'boolean' },
                      { name: 'background_verified', type: 'boolean' },
                      { name: 'equipment_verified', type: 'boolean' },
                      { name: 'rating', type: 'number' },
                      { name: 'total_orders', type: 'integer' },
                      { name: 'created_at', type: 'string' },
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
        path="/v1/admin/providers"
        auth="admin"
        queryFields={[
          { name: 'status', type: 'string', placeholder: 'all' },
          { name: 'search', type: 'string' },
          { name: 'page', type: 'number', placeholder: '1' },
          { name: 'limit', type: 'number', placeholder: '10' },
        ]}
      />
    </>
  )
}
