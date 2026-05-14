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
            sample: `{
  "success": true,
  "request_id": "REQ-1",
  "exterior": [
    {
      "position": "Driver side [front]",
      "before_url": "https://d1mrdchkrqe029.cloudfront.net/wash_uploads/1/10/before_wash/exterior/driver_side_front_20260512134354_af064219.jpg",
      "after_url": "https://d1mrdchkrqe029.cloudfront.net/wash_uploads/1/10/after_wash/exterior/driver_side_front_20260512165123_c0c5f008.jpg"
    },
    {
      "position": "Driver side [rear]",
      "before_url": "https://d1mrdchkrqe029.cloudfront.net/wash_uploads/1/10/before_wash/exterior/driver_side_rear_20260512165227_d3dc1667.jpg",
      "after_url": "https://d1mrdchkrqe029.cloudfront.net/wash_uploads/1/10/after_wash/exterior/driver_side_rear_20260512165457_e1e91172.jpg"
    }
  ],
  "interior": [
    {
      "position": "Driver side [front]",
      "before_url": "https://d1mrdchkrqe029.cloudfront.net/wash_uploads/1/10/before_wash/interior/driver_side_front_20260512165332_d56861f7.jpg",
      "after_url": "https://d1mrdchkrqe029.cloudfront.net/wash_uploads/1/10/after_wash/interior/driver_side_front_20260512165508_fb67b9a1.jpg"
    },
    {
      "position": "Driver side [rear]",
      "before_url": "https://d1mrdchkrqe029.cloudfront.net/wash_uploads/1/10/before_wash/interior/driver_side_rear_20260512165335_10384097.jpg",
      "after_url": "https://d1mrdchkrqe029.cloudfront.net/wash_uploads/1/10/after_wash/interior/driver_side_rear_20260512165518_93cfbf21.jpg"
    }
  ],
  "damage_report": {
    "exterior": null,
    "interior": null
  }
}`,
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
