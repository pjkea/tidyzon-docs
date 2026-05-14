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
            sample: `{
  "message": "Service request details retrieved successfully",
  "data": {
    "request_id": 1,
    "service_types": ["Car Wash"],
    "customer": {
      "user_id": 2,
      "username": "engineeringcaldarmallafrica@gmail.com",
      "email": "engineeringcaldarmallafrica@gmail.com",
      "first_name": "Otabil",
      "last_name": "Odoom",
      "phone_number": "+11234567891"
    },
    "schedule": {
      "scheduled_datetime": "2026-05-12T13:41:17.868425+00:00",
      "is_scheduled": false,
      "created_at": "2026-05-12T13:41:17.868425",
      "updated_at": "2026-05-12T16:55:29.947604"
    },
    "status": {
      "status_id": 10,
      "status_name": "completed",
      "status_description": "Service has been successfully completed."
    },
    "location": {
      "address": "376G+P3C, Techiman-Tamale Rd, Kintampo, Ghana",
      "latitude": 8.061811,
      "longitude": -1.724847
    },
    "price": 41.12,
    "water_provided": true,
    "pricing_breakdown": [
      {
        "asset_id": 10,
        "car_name": "Unknown Vehicle",
        "tax_rate": 8.25,
        "package_id": 15,
        "package_amount": 29.99,
        "tax_amount": 3.13,
        "subtotal_numeric": 37.99,
        "total_numeric": 41.12,
        "provider_payout": 24.49,
        "service_platform_charge": 3.0,
        "priority_service_fee": 5.0,
        "breakdown": [
          { "name": "Interior Wash", "type": "package", "amount": "29.99", "amount_numeric": 29.99 },
          { "name": "Service and platform charge", "type": "platform", "amount": "3.00", "amount_numeric": 3.0 },
          { "name": "Priority service fee", "type": "priority", "amount": "5.00", "amount_numeric": 5.0 },
          { "name": "Sales tax", "rate": 8.25, "type": "tax", "amount": "3.13", "amount_numeric": 3.13 }
        ]
      }
    ],
    "provider": {
      "tidysp_id": 1,
      "provider_user_id": 1,
      "username": "randyodoom19@gmail.com",
      "email": "randyodoom19@gmail.com",
      "first_name": "Randy",
      "last_name": "Odoom",
      "phone_number": "+11273787677"
    },
    "order": {
      "order_id": 1,
      "tidysp_id": 1,
      "order_status": 10,
      "order_status_name": "completed",
      "total_price": 41.12,
      "accepted_at": "2026-05-12T13:41:35.428022+00:00",
      "arrived_at": "2026-05-12T13:42:16.251870+00:00",
      "started_at": "2026-05-12T13:44:44.553785+00:00",
      "completed_at": "2026-05-12T16:55:29.947604+00:00",
      "created_at": "2026-05-12T13:41:35.428022"
    },
    "order_details": [
      {
        "order_detail_id": 1,
        "asset_id": 10,
        "asset_name": "A7",
        "subcategory": "Car Wash",
        "package": null,
        "addons": "[13]",
        "created_at": "2026-05-12T13:41:35.428022"
      }
    ],
    "review": null
  }
}`,
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

  "message": "Service request details retrieved successfully",
  "data": {
    "request_id": 1,
    "service_types": ["Car Wash"],
    "customer": {
      "user_id": 2,
      "username": "engineeringcaldarmallafrica@gmail.com",
      "email": "engineeringcaldarmallafrica@gmail.com",
      "first_name": "Otabil",
      "last_name": "Odoom",
      "phone_number": "+11234567891"
    },
    "schedule": {
      "scheduled_datetime": "2026-05-12T13:41:17.868425+00:00",
      "is_scheduled": false,
      "created_at": "2026-05-12T13:41:17.868425",
      "updated_at": "2026-05-12T16:55:29.947604"
    },
    "status": {
      "status_id": 10,
      "status_name": "completed",
      "status_description": "Service has been successfully completed."
    },
    "location": {
      "address": "376G+P3C, Techiman-Tamale Rd, Kintampo, Ghana",
      "latitude": 8.061811,
      "longitude": -1.724847
    },
    "price": 41.12,
    "water_provided": true,
    "pricing_breakdown": [
      {
        "asset_id": 10,
        "car_name": "Unknown Vehicle",
        "tax_rate": 8.25,
        "package_id": 15,
        "package_amount": 29.99,
        "tax_amount": 3.13,
        "subtotal_numeric": 37.99,
        "total_numeric": 41.12,
        "provider_payout": 24.49,
        "service_platform_charge": 3.0,
        "priority_service_fee": 5.0,
        "breakdown": [
          { "name": "Interior Wash", "type": "package", "amount": "29.99", "amount_numeric": 29.99 },
          { "name": "Service and platform charge", "type": "platform", "amount": "3.00", "amount_numeric": 3.0 },
          { "name": "Priority service fee", "type": "priority", "amount": "5.00", "amount_numeric": 5.0 },
          { "name": "Sales tax", "rate": 8.25, "type": "tax", "amount": "3.13", "amount_numeric": 3.13 }
        ]
      }
    ],
    "provider": {
      "tidysp_id": 1,
      "provider_user_id": 1,
      "username": "randyodoom19@gmail.com",
      "email": "randyodoom19@gmail.com",
      "first_name": "Randy",
      "last_name": "Odoom",
      "phone_number": "+11273787677"
    },
    "order": {
      "order_id": 1,
      "tidysp_id": 1,
      "order_status": 10,
      "order_status_name": "completed",
      "total_price": 41.12,
      "accepted_at": "2026-05-12T13:41:35.428022+00:00",
      "arrived_at": "2026-05-12T13:42:16.251870+00:00",
      "started_at": "2026-05-12T13:44:44.553785+00:00",
      "completed_at": "2026-05-12T16:55:29.947604+00:00",
      "created_at": "2026-05-12T13:41:35.428022"
    },
    "order_details": [
      {
        "order_detail_id": 1,
        "asset_id": 10,
        "asset_name": "A7",
        "subcategory": "Car Wash",
        "package": null,
        "addons": "[13]",
        "created_at": "2026-05-12T13:41:35.428022"
      }
    ],
    "review": null
  }
}`}
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
