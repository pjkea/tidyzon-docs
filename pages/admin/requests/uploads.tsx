import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function RequestUploadsPage() {
  return (
    <>
      <Head><title>Wash Uploads — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/admin/requests/{requestid}/uploads"
        title="Wash Uploads"
        description="Returns before and after wash photos uploaded by the provider for each asset in a service request."
      />

      <ParamsCard
        title="Path Parameters"
        params={[
          { name: 'requestid', type: 'integer', required: true },
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
                    name: 'uploads', type: 'array', fields: [
                      { name: 'asset_id', type: 'integer' },
                      { name: 'asset_label', type: 'string', description: 'e.g. "Toyota Corolla (Black)"' },
                      {
                        name: 'before', type: 'array', fields: [
                          { name: 'url', type: 'string', description: 'S3 presigned URL' },
                          { name: 'uploaded_at', type: 'string' },
                        ],
                      },
                      {
                        name: 'after', type: 'array', fields: [
                          { name: 'url', type: 'string', description: 'S3 presigned URL' },
                          { name: 'uploaded_at', type: 'string' },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          { status: 404, label: 'Not Found' },
        ]}
      />

      <TryItPanel
        method="GET"
        path="/v1/admin/requests/{requestid}/uploads"
        auth="admin"
        pathFields={[{ name: 'requestid', type: 'number', placeholder: '1' }]}
      />
    </>
  )
}
