import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function ProviderOnboardingDocumentsPage() {
  return (
    <>
      <Head><title>Provider Onboarding Documents — Tidyzon API Docs</title></Head>

      <div className="mb-10">
        <EndpointHero
          method="GET"
          path="/v1/admin/providers/onboarding/{tidyspid}/documents"
          title="Get Provider Documents"
          description="Retrieve all documents submitted by a provider during onboarding (ID, driver's licence, vehicle certificate, etc.)."
        />
        <ParamsCard
          title="Path Parameters"
          params={[{ name: 'tidyspid', type: 'integer', required: true }]}
        />
        <ResponseExplorer
          responses={[
            {
              status: 200,
              label: 'OK',
              fields: [
                { name: 'tidyspid', type: 'integer' },
                {
                  name: 'results', type: 'array', fields: [
                    { name: 'id', type: 'integer' },
                    { name: 'document_type_id', type: 'integer' },
                    { name: 'status_id', type: 'integer' },
                    { name: 'status_name', type: 'string', description: 'pending | approved | rejected' },
                    { name: 'rejection_reason', type: 'string' },
                    { name: 'approval_notes', type: 'string' },
                    { name: 'reviewed_by', type: 'integer' },
                    { name: 'submittedat', type: 'string' },
                    { name: 'reviewedat', type: 'string' },
                    { name: 'createdat', type: 'string' },
                    { name: 'updatedat', type: 'string' },
                    {
                      name: 'files', type: 'array', fields: [
                        { name: 'id', type: 'integer' },
                        { name: 'file_url', type: 'string', description: 'CloudFront URL' },
                        { name: 'file_type', type: 'string' },
                        { name: 'file_name', type: 'string' },
                        { name: 'file_size_bytes', type: 'integer' },
                        { name: 'mime_type', type: 'string' },
                        { name: 'uploaded_by', type: 'integer' },
                        { name: 'createdat', type: 'string' },
                      ],
                    },
                  ],
                },
              ],
              sample: `{
  "tidyspid": 1,
  "results": [
    {
      "id": 1,
      "document_type_id": 1,
      "status_id": 3,
      "status_name": "approved",
      "rejection_reason": null,
      "approval_notes": null,
      "reviewed_by": 9,
      "submittedat": "2026-04-07T17:46:12.525267",
      "reviewedat": "2026-04-08T09:51:07.294183",
      "createdat": "2026-04-05T19:08:54.928618",
      "updatedat": "2026-04-08T09:51:07.294183",
      "files": [
        {
          "id": 5,
          "file_url": "https://d37274hi88351g.cloudfront.net/onboarding/docs/1/1/tidysp.pdf",
          "file_type": "document",
          "file_name": "tidysp.pdf",
          "file_size_bytes": 103324,
          "mime_type": "application/pdf",
          "uploaded_by": null,
          "createdat": "2026-04-07T17:46:12.525267"
        }
      ]
    }
  ]
}`,
            },
          ]}
        />
        <TryItPanel
          method="GET"
          path="/v1/admin/providers/onboarding/{tidyspid}/documents"
          auth="admin"
          pathFields={[{ name: 'tidyspid', type: 'number', placeholder: '494' }]}
        />
      </div>

      <div>
        <EndpointHero
          method="GET"
          path="/v1/admin/providers/onboarding/document-types"
          title="Get Required Document Types"
          description="Returns the list of document types that providers must submit to complete onboarding."
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
                      name: 'results', type: 'array', fields: [
                        { name: 'document_type_id', type: 'integer' },
                        { name: 'name', type: 'string' },
                        { name: 'code', type: 'string' },
                        { name: 'description', type: 'string' },
                        { name: 'is_required', type: 'boolean' },
                        { name: 'is_active', type: 'boolean' },
                        { name: 'displayorder', type: 'integer' },
                      ],
                    },
                  ],
                },
              ],
              sample: `{
  "results": [
    { "document_type_id": 5, "name": "Wash Kit", "code": "wash_kit", "description": "Provider wash kit requirement", "is_required": true, "is_active": true, "displayorder": 1 },
    { "document_type_id": 1, "name": "Identification Card", "code": "identification_card", "description": "Valid identification document", "is_required": true, "is_active": true, "displayorder": 2 },
    { "document_type_id": 2, "name": "Background Check", "code": "background_check", "description": "Background check requirement", "is_required": true, "is_active": true, "displayorder": 3 }
  ]
}`,
            },
          ]}
        />
        <TryItPanel
          method="GET"
          path="/v1/admin/providers/onboarding/document-types"
          auth="admin"
        />
      </div>
    </>
  )
}
