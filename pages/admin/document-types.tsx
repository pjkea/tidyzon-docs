import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function DocumentTypesPage() {
  return (
    <>
      <Head><title>Document Types — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/admin/providers/required-documents"
        title="Get Provider Document Types"
        description="Returns all document type definitions that providers must submit during onboarding."
      />

      <ResponseExplorer
        responses={[{
          status: 200, label: 'OK',
          fields: [
            { name: 'message', type: 'string' },
            {
              name: 'data', type: 'object', fields: [
                {
                  name: 'document_types', type: 'array', fields: [
                    { name: 'document_type_id', type: 'integer' },
                    { name: 'name', type: 'string', description: 'e.g. "National ID", "Driver\'s Licence"' },
                    { name: 'description', type: 'string' },
                    { name: 'required', type: 'boolean' },
                    { name: 'accepts_multiple', type: 'boolean', description: 'Whether the provider can upload more than one file for this type' },
                  ],
                },
              ],
            },
          ],
        }]}
      />

      <TryItPanel method="GET" path="/v1/admin/providers/required-documents" auth="admin" />
    </>
  )
}
