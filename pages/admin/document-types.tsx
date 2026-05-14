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
        path="/v1/admin/providers/onboarding/document-types"
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
                    { name: 'code', type: 'string', description: 'Machine-readable identifier e.g. "wash_kit"' },
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
    {
      "document_type_id": 5,
      "name": "Wash Kit",
      "code": "wash_kit",
      "description": "Provider wash kit requirement (Basic/Deluxe/Premium based on selected package)",
      "is_required": true,
      "is_active": true,
      "displayorder": 1
    },
    {
      "document_type_id": 1,
      "name": "Identification Card",
      "code": "identification_card",
      "description": "Valid identification document",
      "is_required": true,
      "is_active": true,
      "displayorder": 2
    },
    {
      "document_type_id": 2,
      "name": "Background Check",
      "code": "background_check",
      "description": "Background check requirement",
      "is_required": true,
      "is_active": true,
      "displayorder": 3
    },
    {
      "document_type_id": 3,
      "name": "Quiz Completion",
      "code": "quiz_completion",
      "description": "Provider onboarding quiz completion",
      "is_required": true,
      "is_active": true,
      "displayorder": 4
    },
    {
      "document_type_id": 4,
      "name": "Mode of Operation",
      "code": "mode_of_operation",
      "description": "Provider operating mode selection",
      "is_required": true,
      "is_active": true,
      "displayorder": 5
    }
  ]
}`,
        }]}
      />

      <TryItPanel method="GET" path="/v1/admin/providers/onboarding/document-types" auth="admin" />
    </>
  )
}
