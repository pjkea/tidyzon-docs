import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function RequestOverviewPage() {
  return (
    <>
      <Head><title>Request Overview & Receipt — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/admin/requests/{requestid}/overview"
        title="Request Overview & Receipt"
        description="Returns a full overview of a service request — customer, provider, assets, earnings breakdown, status timeline, and photo upload links."
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
                  { name: 'subtotal', type: 'number' },
                  { name: 'tip', type: 'number' },
                  { name: 'discount', type: 'number' },
                  { name: 'total', type: 'number' },
                  { name: 'payment_method', type: 'string' },
                  {
                    name: 'provider_side', type: 'object', fields: [
                      { name: 'provider', type: 'object', fields: [
                        { name: 'tidyspid', type: 'integer' }, { name: 'firstname', type: 'string' },
                        { name: 'lastname', type: 'string' }, { name: 'email', type: 'string' }, { name: 'phone', type: 'string' },
                      ]},
                      { name: 'service_timestamps', type: 'object', fields: [
                        { name: 'accepted_at', type: 'string' }, { name: 'arrived_at', type: 'string' },
                        { name: 'started_at', type: 'string' }, { name: 'completed_at', type: 'string' },
                      ]},
                      { name: 'earnings', type: 'object', fields: [
                        { name: 'gross_amount', type: 'number' }, { name: 'tidyzon_service_charge', type: 'number' },
                        { name: 'tip_amount', type: 'number' }, { name: 'net_payout', type: 'number' }, { name: 'currency', type: 'string' },
                      ]},
                      { name: 'uploads', type: 'object', fields: [
                        { name: 'has_uploads', type: 'boolean' }, { name: 'uploads_url', type: 'string' },
                      ]},
                    ],
                  },
                  {
                    name: 'status_timeline', type: 'array', fields: [
                      { name: 'status', type: 'string' }, { name: 'changed_at', type: 'string' },
                      { name: 'changed_by_role', type: 'string' }, { name: 'changed_by_userid', type: 'integer' },
                    ],
                  },
                ],
              },
            ],
            sample: `{
  "success": true,
  "data": {
    "request_id": "REQ-1",
    "status": "completed",
    "service_time": "Live",
    "scheduled_datetime": null,
    "available_actions": [],
    "locations": {
      "pickup": {
        "address": "376G+P3C, Techiman-Tamale Rd, Kintampo, Ghana",
        "latitude": 8.061811,
        "longitude": -1.724847
      },
      "dropoff": null
    },
    "time_spans": [{ "asset_type": "Car", "duration_minutes": 190 }],
    "customer_side": {
      "customer": {
        "userid": 2,
        "firstname": "Otabil",
        "lastname": "Odoom",
        "email": "engineeringcaldarmallafrica@gmail.com",
        "phone": "+11234567891"
      },
      "assets": [
        {
          "asset_type": "car",
          "label": "Car 1",
          "make": "Audi",
          "model": "Prelude",
          "type": "Passenger Car",
          "color": "#FFD700",
          "package": "Interior Wash",
          "package_price": 29.99,
          "included_services": ["Vacuum - Regular", "Wipe door jambs", "Deep stain"],
          "extra_services": []
        }
      ],
      "tip": { "amount": 0.0, "note": "Providers receive 100% of the tip you give" },
      "rating": null,
      "payment": null,
      "total_charge": 41.12,
      "currency": "USD"
    },
    "provider_side": {
      "provider": {
        "tidyspid": 1,
        "firstname": "Randy",
        "lastname": "Odoom",
        "email": "randyodoom19@gmail.com",
        "phone": "+11273787677",
        "mode_of_operation": null
      },
      "service_timestamps": {
        "accepted_at": "May 12, 2026 09:41 AM",
        "arrived_at": "May 12, 2026 09:42 AM",
        "started_at": "May 12, 2026 09:44 AM",
        "completed_at": "May 12, 2026 12:55 PM"
      },
      "earnings": {
        "gross_amount": 34.99,
        "tidyzon_service_charge": 10.5,
        "tip_amount": 0.0,
        "net_payout": 24.49,
        "currency": "USD"
      },
      "uploads": { "has_uploads": true, "uploads_url": "/v1/admin/requests/1/uploads" }
    },
    "admin_notes": [],
    "status_timeline": [
      { "status": "pending", "changed_at": "May 12, 2026 09:41 AM", "changed_by_role": null, "changed_by_userid": null, "reason": null },
      { "status": "assigned", "changed_at": "May 12, 2026 09:41 AM", "changed_by_role": "provider", "changed_by_userid": 1, "reason": "A1" },
      { "status": "arrived", "changed_at": "May 12, 2026 09:42 AM", "changed_by_role": null, "changed_by_userid": null, "reason": null },
      { "status": "started", "changed_at": "May 12, 2026 09:44 AM", "changed_by_role": null, "changed_by_userid": null, "reason": null },
      { "status": "completed", "changed_at": "May 12, 2026 12:55 PM", "changed_by_role": null, "changed_by_userid": null, "reason": null }
    ]
  }
}`,
          },
        ]}
      />

      <TryItPanel
        method="GET"
        path="/v1/admin/requests/{requestid}/overview"
        auth="admin"
        pathFields={[{ name: 'requestid', type: 'number', placeholder: '1' }]}
      />
    </>
  )
}
