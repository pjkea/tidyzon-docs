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
                { name: 'message', type: 'string' },
                {
                  name: 'data', type: 'object', fields: [
                    {
                      name: 'documents', type: 'array', fields: [
                        { name: 'documentid', type: 'integer' },
                        { name: 'document_type', type: 'string' },
                        { name: 'document_url', type: 'string', description: 'Presigned S3 URL' },
                        { name: 'status', type: 'string', description: 'pending | approved | rejected' },
                        { name: 'submitted_at', type: 'string' },
                        { name: 'reviewed_at', type: 'string' },
                        { name: 'notes', type: 'string' },
                      ],
                    },
                  ],
                },
              ],
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
          path="/v1/admin/providers/required-documents"
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
                      name: 'document_types', type: 'array', fields: [
                        { name: 'document_type_id', type: 'integer' },
                        { name: 'name', type: 'string' },
                        { name: 'description', type: 'string' },
                        { name: 'required', type: 'boolean' },
                      ],
                    },
                  ],
                },
              ],
            },
          ]}
        />
        <TryItPanel
          method="GET"
          path="/v1/admin/providers/required-documents"
          auth="admin"
        />
      </div>
    </>
  )
}
