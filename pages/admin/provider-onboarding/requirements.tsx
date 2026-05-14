import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

const pathParam = [{ name: 'tidyspid', type: 'integer', required: true, description: 'Provider ID' }]
const pathField = [{ name: 'tidyspid', type: 'number' as const, placeholder: '1' }]

export default function OnboardingRequirementsPage() {
  return (
    <>
      <Head><title>Provider Onboarding Requirements — Tidyzon API Docs</title></Head>

      {/* ── Requirements ───────────────────────────────────────────────── */}
      <div className="mb-10">
        <EndpointHero
          method="GET"
          path="/v1/admin/providers/onboarding/{tidyspid}/requirements"
          title="Get Onboarding Requirements"
          description="Returns all active requirement items grouped by service mode and group, with each provider's submission history and files."
        />
        <ParamsCard title="Path Parameters" params={pathParam} />
        <ResponseExplorer
          responses={[{
            status: 200, label: 'OK',
            sample: `{
  "tidyspid": 1,
  "service_products": [
    { "product_id": 1, "name": "Speed Wash kit", "is_selected": true },
    { "product_id": 2, "name": "Deluxe Wash kit", "is_selected": false },
    { "product_id": 3, "name": "Premium Wash kit", "is_selected": false }
  ],
  "results": {
    "Car": {
      "mode_id": 1,
      "code": "car",
      "description": "Provider operates with a car",
      "groups": {
        "Exterior Wash": {
          "group_id": 5,
          "code": "exterior_wash",
          "description": "Exterior wash equipment",
          "is_required": true,
          "is_recommendation": false,
          "items": [
            {
              "requirement_item_id": 4,
              "name": "25-inch Long-Handle Car Wash Mop Kit",
              "code": "car_wash_mop_kit",
              "description": "Long handle mop for exterior wash",
              "specification": null,
              "min_upload_count": 1,
              "max_upload_count": 1,
              "is_required": true,
              "submissions": [
                {
                  "id": 1,
                  "requirement_item_id": 4,
                  "selected_mode_id": 1,
                  "status_id": 4,
                  "status_name": "rejected",
                  "rejection_reason": null,
                  "approval_notes": null,
                  "reviewed_by": 9,
                  "submittedat": "2026-05-14T16:16:50.845964",
                  "reviewedat": "2026-05-14T16:28:10.079855",
                  "createdat": "2026-04-07T17:23:13.031856",
                  "updatedat": "2026-05-14T16:28:10.079855",
                  "files": [
                    {
                      "id": 3,
                      "submission_id": 1,
                      "file_url": "https://cdn.example.com/onboarding/washkits/1/4/mop_kit.jpg",
                      "file_type": "image",
                      "file_name": "mop_kit.jpg",
                      "file_size_bytes": 335,
                      "mime_type": "image/jpeg",
                      "createdat": "2026-05-14T16:16:50.845964"
                    }
                  ]
                }
              ]
            },
            {
              "requirement_item_id": 5,
              "name": "Water Gun Hose",
              "code": "water_gun_hose",
              "is_required": true,
              "submissions": []
            }
          ]
        },
        "Interior Wash": {
          "group_id": 6,
          "code": "interior_wash",
          "is_required": true,
          "items": [
            { "requirement_item_id": 13, "name": "Interior car cleaner spray", "is_required": true, "submissions": [] },
            { "requirement_item_id": 11, "name": "Portable cordless vacuum cleaner", "is_required": true, "submissions": [] }
          ]
        },
        "Car Tire": {
          "group_id": 7,
          "code": "car_tire",
          "is_required": true,
          "items": [
            { "requirement_item_id": 9, "name": "Tire and rim brush", "is_required": true, "submissions": [] },
            { "requirement_item_id": 10, "name": "Wheel or Tire shine", "is_required": true, "submissions": [] }
          ]
        }
      }
    },
    "Motorcycle": { "mode_id": 2, "code": "motorcycle", "groups": {} },
    "Trash Bin": {
      "mode_id": 3,
      "code": "trash_bin",
      "groups": {
        "Trash Bin Wash Kit": {
          "group_id": 8,
          "items": [
            { "requirement_item_id": 27, "name": "360° Auto-Rotating Trash bin Brush", "is_required": true, "submissions": [] }
          ]
        }
      }
    }
  }
}`,
            fields: [
              { name: 'tidyspid', type: 'integer' },
              {
                name: 'service_products', type: 'array', description: 'All service products for the provider\'s mode, used as filter tabs',
                fields: [
                  { name: 'product_id', type: 'integer' },
                  { name: 'name', type: 'string', description: 'e.g. "Speed Wash kit"' },
                  { name: 'is_selected', type: 'boolean', description: 'True for the provider\'s current service level' },
                ],
              },
              {
                name: 'results', type: 'object', description: 'Keyed by mode name (e.g. "Car", "Motorcycle", "Trash Bin")',
                fields: [
                  { name: 'mode_id', type: 'integer' },
                  { name: 'code', type: 'string' },
                  { name: 'description', type: 'string' },
                  {
                    name: 'groups', type: 'object', description: 'Keyed by group name (e.g. "Exterior Wash", "Interior Wash", "Car Tire")',
                    fields: [
                      { name: 'group_id', type: 'integer' },
                      { name: 'code', type: 'string' },
                      { name: 'description', type: 'string' },
                      { name: 'is_required', type: 'boolean' },
                      { name: 'is_recommendation', type: 'boolean' },
                      {
                        name: 'items', type: 'array',
                        fields: [
                          { name: 'requirement_item_id', type: 'integer' },
                          { name: 'name', type: 'string' },
                          { name: 'code', type: 'string' },
                          { name: 'description', type: 'string' },
                          { name: 'specification', type: 'string | null' },
                          { name: 'min_upload_count', type: 'integer' },
                          { name: 'max_upload_count', type: 'integer' },
                          { name: 'is_required', type: 'boolean' },
                          {
                            name: 'submissions', type: 'array', description: 'All submissions for this item by this provider, latest first',
                            fields: [
                              { name: 'id', type: 'integer' },
                              { name: 'requirement_item_id', type: 'integer' },
                              { name: 'selected_mode_id', type: 'integer' },
                              { name: 'status_id', type: 'integer', description: '1=pending, 2=under_review, 3=approved, 4=rejected' },
                              { name: 'status_name', type: 'string' },
                              { name: 'rejection_reason', type: 'string | null' },
                              { name: 'approval_notes', type: 'string | null' },
                              { name: 'reviewed_by', type: 'integer | null' },
                              { name: 'submittedat', type: 'string' },
                              { name: 'reviewedat', type: 'string | null' },
                              { name: 'createdat', type: 'string' },
                              { name: 'updatedat', type: 'string' },
                              {
                                name: 'files', type: 'array',
                                fields: [
                                  { name: 'id', type: 'integer' },
                                  { name: 'submission_id', type: 'integer' },
                                  { name: 'file_url', type: 'string' },
                                  { name: 'file_type', type: 'string' },
                                  { name: 'file_name', type: 'string' },
                                  { name: 'file_size_bytes', type: 'integer' },
                                  { name: 'mime_type', type: 'string' },
                                  { name: 'createdat', type: 'string' },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          }]}
        />
        <TryItPanel method="GET" path="/v1/admin/providers/onboarding/{tidyspid}/requirements" auth="admin" pathFields={pathField} />
      </div>

      {/* ── Background Check ───────────────────────────────────────────── */}
      <div className="mb-10">
        <EndpointHero
          method="GET"
          path="/v1/admin/providers/onboarding/{tidyspid}/background-check"
          title="Get Background Check Submissions"
          description="Returns all background check submissions for the provider with associated files."
        />
        <ParamsCard title="Path Parameters" params={pathParam} />
        <ResponseExplorer
          responses={[{
            status: 200, label: 'OK',
            sample: `{
  "tidyspid": 1,
  "results": [
    {
      "id": 2,
      "status_id": 3,
      "status_name": "approved",
      "rejection_reason": null,
      "approval_notes": "Verified",
      "reviewed_by": 9,
      "submittedat": "2026-04-10T09:00:00.000000",
      "reviewedat": "2026-04-11T10:30:00.000000",
      "createdat": "2026-04-10T09:00:00.000000",
      "updatedat": "2026-04-11T10:30:00.000000",
      "files": [
        {
          "id": 5,
          "file_url": "https://cdn.example.com/onboarding/background/1/check.pdf",
          "file_type": "document",
          "file_name": "background_check.pdf",
          "file_size_bytes": 204800,
          "mime_type": "application/pdf",
          "createdat": "2026-04-10T09:00:00.000000"
        }
      ]
    }
  ]
}`,
            fields: [
              { name: 'tidyspid', type: 'integer' },
              {
                name: 'results', type: 'array',
                fields: [
                  { name: 'id', type: 'integer' },
                  { name: 'status_id', type: 'integer', description: '1=pending, 2=under_review, 3=approved, 4=rejected' },
                  { name: 'status_name', type: 'string' },
                  { name: 'rejection_reason', type: 'string | null' },
                  { name: 'approval_notes', type: 'string | null' },
                  { name: 'reviewed_by', type: 'integer | null' },
                  { name: 'submittedat', type: 'string' },
                  { name: 'reviewedat', type: 'string | null' },
                  { name: 'createdat', type: 'string' },
                  { name: 'updatedat', type: 'string' },
                  {
                    name: 'files', type: 'array',
                    fields: [
                      { name: 'id', type: 'integer' },
                      { name: 'file_url', type: 'string' },
                      { name: 'file_type', type: 'string' },
                      { name: 'file_name', type: 'string' },
                      { name: 'file_size_bytes', type: 'integer' },
                      { name: 'mime_type', type: 'string' },
                      { name: 'createdat', type: 'string' },
                    ],
                  },
                ],
              },
            ],
          }]}
        />
        <TryItPanel method="GET" path="/v1/admin/providers/onboarding/{tidyspid}/background-check" auth="admin" pathFields={pathField} />
      </div>

      {/* ── Quiz ───────────────────────────────────────────────────────── */}
      <div className="mb-10">
        <EndpointHero
          method="GET"
          path="/v1/admin/providers/onboarding/{tidyspid}/quiz"
          title="Get Quiz Results"
          description="Returns all active quizzes with the provider's latest submission result and total attempt count."
        />
        <ParamsCard title="Path Parameters" params={pathParam} />
        <ResponseExplorer
          responses={[{
            status: 200, label: 'OK',
            sample: `{
  "tidyspid": 1,
  "results": [
    {
      "quiz_id": 1,
      "quiz_name": "Car Wash Safety Quiz",
      "quiz_description": "Test your knowledge of safe car washing practices",
      "pass_mark": 70.0,
      "service_product_id": 1,
      "service_product_name": "Speed Wash",
      "attempt_count": 2,
      "latest_submission": {
        "submission_id": 4,
        "score": 85.0,
        "is_passed": true,
        "submittedat": "2026-04-15T11:22:00"
      }
    }
  ]
}`,
            fields: [
              { name: 'tidyspid', type: 'integer' },
              {
                name: 'results', type: 'array',
                fields: [
                  { name: 'quiz_id', type: 'integer' },
                  { name: 'quiz_name', type: 'string' },
                  { name: 'quiz_description', type: 'string' },
                  { name: 'pass_mark', type: 'number' },
                  { name: 'service_product_id', type: 'integer' },
                  { name: 'service_product_name', type: 'string' },
                  { name: 'attempt_count', type: 'integer' },
                  {
                    name: 'latest_submission', type: 'object | null',
                    fields: [
                      { name: 'submission_id', type: 'integer' },
                      { name: 'score', type: 'number' },
                      { name: 'is_passed', type: 'boolean' },
                      { name: 'submittedat', type: 'string' },
                    ],
                  },
                ],
              },
            ],
          }]}
        />
        <TryItPanel method="GET" path="/v1/admin/providers/onboarding/{tidyspid}/quiz" auth="admin" pathFields={pathField} />
      </div>

      {/* ── Mode of Operation ──────────────────────────────────────────── */}
      <div>
        <EndpointHero
          method="GET"
          path="/v1/admin/providers/onboarding/{tidyspid}/mode-of-operation"
          title="Get Mode of Operation"
          description="Returns the provider's current service mode and full mode selection history."
        />
        <ParamsCard title="Path Parameters" params={pathParam} />
        <ResponseExplorer
          responses={[{
            status: 200, label: 'OK',
            sample: `{
  "tidyspid": 1,
  "current_mode": {
    "mode_id": 1,
    "name": "Car",
    "code": "car",
    "description": "Provider operates with a car"
  },
  "history": [
    {
      "id": 3,
      "mode_id": 1,
      "mode_name": "Car",
      "mode_code": "car",
      "status_id": 2,
      "status_name": "approved",
      "status_description": "Mode approved by admin",
      "createdat": "2026-04-01T08:00:00.000000",
      "updatedat": "2026-04-02T09:00:00.000000"
    }
  ]
}`,
            fields: [
              { name: 'tidyspid', type: 'integer' },
              {
                name: 'current_mode', type: 'object | null',
                fields: [
                  { name: 'mode_id', type: 'integer' },
                  { name: 'name', type: 'string', description: 'e.g. "Car", "Motorcycle", "Trash Bin"' },
                  { name: 'code', type: 'string' },
                  { name: 'description', type: 'string' },
                ],
              },
              {
                name: 'history', type: 'array',
                fields: [
                  { name: 'id', type: 'integer' },
                  { name: 'mode_id', type: 'integer' },
                  { name: 'mode_name', type: 'string' },
                  { name: 'mode_code', type: 'string' },
                  { name: 'status_id', type: 'integer' },
                  { name: 'status_name', type: 'string' },
                  { name: 'status_description', type: 'string' },
                  { name: 'createdat', type: 'string' },
                  { name: 'updatedat', type: 'string' },
                ],
              },
            ],
          }]}
        />
        <TryItPanel method="GET" path="/v1/admin/providers/onboarding/{tidyspid}/mode-of-operation" auth="admin" pathFields={pathField} />
      </div>
    </>
  )
}
