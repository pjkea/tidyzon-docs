import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

const historyItemFields = [
  { name: 'id', type: 'integer' },
  { name: 'tidyspid', type: 'integer' },
  { name: 'provider_name', type: 'string' },
  { name: 'review_type', type: 'string', description: 'document | background | washkit | quiz' },
  { name: 'reference_id', type: 'integer' },
  { name: 'old_status_id', type: 'integer' },
  { name: 'old_status_name', type: 'string' },
  { name: 'new_status_id', type: 'integer' },
  { name: 'new_status_name', type: 'string' },
  { name: 'review_notes', type: 'string' },
  { name: 'reviewed_by', type: 'integer' },
  { name: 'reviewer_name', type: 'string' },
  { name: 'reviewedat', type: 'string' },
]

const paginationFields = [
  { name: 'total', type: 'integer' },
  { name: 'page', type: 'integer' },
  { name: 'page_size', type: 'integer' },
  { name: 'pages', type: 'integer' },
]

export default function ProviderStatusHistoryPage() {
  return (
    <>
      <Head><title>Provider Status History — Tidyzon API Docs</title></Head>

      <div className="mb-10">
        <EndpointHero
          method="GET"
          path="/v1/admin/providers/status/history"
          title="All Provider Status History"
          description="Paginated list of all provider document/onboarding review history events."
        />
        <ParamsCard
          title="Query Parameters"
          params={[
            { name: 'tidyspid', type: 'integer', description: 'Filter by provider' },
            { name: 'review_type', type: 'string', description: 'e.g. document' },
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
  "message": "Provider status history retrieved successfully",
  "data": [
    {
      "id": 1,
      "tidyspid": 494,
      "provider_name": "Joseph Ansah",
      "review_type": "document",
      "reference_id": 12,
      "old_status_id": 1,
      "old_status_name": "pending",
      "new_status_id": 2,
      "new_status_name": "approved",
      "review_notes": "Documents verified and approved.",
      "reviewed_by": 9,
      "reviewer_name": "Kwamena Essiful-Ansah",
      "reviewedat": "April 30, 2026 11:00 AM"
    }
  ],
  "pagination": { "total": 3, "page": 1, "page_size": 20, "pages": 1 }
}`,
              fields: [
                { name: 'message', type: 'string' },
                { name: 'data', type: 'array', fields: historyItemFields },
                { name: 'pagination', type: 'object', fields: paginationFields },
              ],
            },
            { status: 401, label: 'Unauthorized' },
          ]}
        />
        <TryItPanel
          method="GET"
          path="/v1/admin/providers/status/history"
          auth="admin"
          queryFields={[
            { name: 'tidyspid', type: 'number' },
            { name: 'review_type', type: 'string', placeholder: 'document' },
            { name: 'date_from', type: 'string' },
            { name: 'date_to', type: 'string' },
            { name: 'page', type: 'number', placeholder: '1' },
            { name: 'page_size', type: 'number', placeholder: '20' },
          ]}
        />
      </div>

      <div className="mb-10">
        <EndpointHero
          method="GET"
          path="/v1/admin/providers/status/history/{historyid}"
          title="Get Status History Record"
          description="Single provider status history record by ID."
        />
        <ParamsCard
          title="Path Parameters"
          params={[{ name: 'historyid', type: 'integer', required: true }]}
        />
        <ResponseExplorer
          responses={[
            {
              status: 200,
              label: 'OK',
              sample: `{
  "message": "Provider status history retrieved successfully",
  "data": {
    "id": 1,
    "tidyspid": 494,
    "provider_name": "Joseph Ansah",
    "review_type": "document",
    "reference_id": 12,
    "old_status_id": 1,
    "old_status_name": "pending",
    "new_status_id": 2,
    "new_status_name": "approved",
    "review_notes": "Documents verified and approved.",
    "reviewed_by": 9,
    "reviewer_name": "Kwamena Essiful-Ansah",
    "reviewedat": "April 30, 2026 11:00 AM"
  }
}`,
              fields: [
                { name: 'message', type: 'string' },
                { name: 'data', type: 'object', fields: historyItemFields },
              ],
            },
            { status: 404, label: 'Not Found' },
          ]}
        />
        <TryItPanel
          method="GET"
          path="/v1/admin/providers/status/history/{historyid}"
          auth="admin"
          pathFields={[{ name: 'historyid', type: 'number', placeholder: '1' }]}
        />
      </div>

      <div>
        <EndpointHero
          method="GET"
          path="/v1/admin/providers/{tidyspid}/status-history"
          title="Provider Status History"
          description="All status history events for a specific provider."
        />
        <ParamsCard
          title="Path Parameters"
          params={[{ name: 'tidyspid', type: 'integer', required: true }]}
        />
        <ParamsCard
          title="Query Parameters"
          params={[
            { name: 'review_type', type: 'string' },
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
  "message": "Provider status history retrieved successfully",
  "data": [
    {
      "id": 1,
      "tidyspid": 494,
      "provider_name": "Joseph Ansah",
      "review_type": "document",
      "reference_id": 12,
      "old_status_id": 1,
      "old_status_name": "pending",
      "new_status_id": 2,
      "new_status_name": "approved",
      "review_notes": "Documents verified and approved.",
      "reviewed_by": 9,
      "reviewer_name": "Kwamena Essiful-Ansah",
      "reviewedat": "April 30, 2026 11:00 AM"
    }
  ],
  "pagination": { "total": 3, "page": 1, "page_size": 20, "pages": 1 }
}`,
              fields: [
                { name: 'message', type: 'string' },
                { name: 'data', type: 'array', fields: historyItemFields },
                { name: 'pagination', type: 'object', fields: paginationFields },
              ],
            },
            { status: 404, label: 'Not Found' },
          ]}
        />
        <TryItPanel
          method="GET"
          path="/v1/admin/providers/{tidyspid}/status-history"
          auth="admin"
          pathFields={[{ name: 'tidyspid', type: 'number', placeholder: '494' }]}
          queryFields={[
            { name: 'review_type', type: 'string', placeholder: 'document' },
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
