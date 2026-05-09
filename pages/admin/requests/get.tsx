import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function GetRequestPage() {
  return (
    <>
      <Head><title>Get Request — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/admin/requests/{requestid}"
        title="Get Request Detail"
        description="Full detail of a single service request including assets, provider, customer, pricing, and current status."
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
                  { name: 'requestid', type: 'integer' },
                  { name: 'statusid', type: 'integer' },
                  { name: 'status_label', type: 'string' },
                  { name: 'scheduled', type: 'boolean' },
                  { name: 'scheduled_date', type: 'string' },
                  { name: 'scheduled_time', type: 'string' },
                  { name: 'created_at', type: 'string' },
                  { name: 'address', type: 'string' },
                  { name: 'latitude', type: 'number' },
                  { name: 'longitude', type: 'number' },
                  { name: 'water_provided', type: 'boolean' },
                  { name: 'total_price', type: 'number' },
                  {
                    name: 'customer', type: 'object', fields: [
                      { name: 'userid', type: 'integer' },
                      { name: 'name', type: 'string' },
                      { name: 'email', type: 'string' },
                      { name: 'phone', type: 'string' },
                    ],
                  },
                  {
                    name: 'provider', type: 'object', fields: [
                      { name: 'tidyspid', type: 'integer' },
                      { name: 'name', type: 'string' },
                      { name: 'email', type: 'string' },
                      { name: 'phone', type: 'string' },
                    ],
                  },
                  {
                    name: 'assets', type: 'array', fields: [
                      { name: 'asset_id', type: 'integer' },
                      { name: 'make', type: 'string' },
                      { name: 'model', type: 'string' },
                      { name: 'color', type: 'string' },
                      { name: 'license_plate', type: 'string' },
                      { name: 'package_name', type: 'string' },
                      { name: 'package_price', type: 'number' },
                      {
                        name: 'extra_services', type: 'array', fields: [
                          { name: 'name', type: 'string' },
                          { name: 'price', type: 'number' },
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
        path="/v1/admin/requests/{requestid}"
        auth="admin"
        pathFields={[{ name: 'requestid', type: 'number', placeholder: '1' }]}
      />
    </>
  )
}
