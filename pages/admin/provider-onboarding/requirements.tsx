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
