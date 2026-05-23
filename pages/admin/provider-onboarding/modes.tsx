import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ResponseExplorer } from '@/components/ResponseExplorer'

export default function AdminModesPage() {
  return (
    <>
      <Head><title>Modes — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/admin/providers/onboarding/modes"
        title="List Modes"
        description="Returns all active provider modes (e.g. Car, Motorcycle, Trash Bin). System-wide — does not require a tidyspid."
      />

      <ResponseExplorer
        responses={[
          {
            status: 200,
            label: 'OK',
            sample: `{
  "results": [
    {
      "mode_id": 1,
      "name": "Car",
      "code": "car",
      "description": "Provider operates with a car",
      "is_active": true
    },
    {
      "mode_id": 2,
      "name": "Motorcycle",
      "code": "motorcycle",
      "description": "Provider operates with a motorcycle",
      "is_active": true
    },
    {
      "mode_id": 3,
      "name": "Trash Bin",
      "code": "trash_bin",
      "description": "Provider handles trash bin service mode",
      "is_active": true
    }
  ]
}`,
            fields: [
              {
                name: 'results', type: 'array', fields: [
                  { name: 'mode_id', type: 'integer' },
                  { name: 'name', type: 'string' },
                  { name: 'code', type: 'string' },
                  { name: 'description', type: 'string' },
                  { name: 'is_active', type: 'boolean' },
                ],
              },
            ],
          },
          { status: 401, label: 'Unauthorized' },
        ]}
      />
    </>
  )
}
