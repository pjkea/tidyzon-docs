import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function OnboardingReviewPage() {
  return (
    <>
      <Head><title>Onboarding Review — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="POST"
        path="/v1/admin/providers/onboarding/review"
        title="Review Onboarding Submission"
        description="Approve, reject, or update the status of a provider's requirement or document submission. Returns the updated status and full submission history."
      />

      <ParamsCard
        title="Body"
        params={[
          { name: 'review_type', type: 'string', required: true, description: '"document" or "requirement"' },
          { name: 'reference_id', type: 'integer', required: true, description: 'ID of the submission row to review' },
          { name: 'status_id', type: 'integer', required: true, description: '1=pending, 2=under_review, 3=approved, 4=rejected' },
          { name: 'review_notes', type: 'string', description: 'Optional notes or rejection reason' },
        ]}
      />

      <ResponseExplorer
        responses={[
          {
            status: 200,
            label: 'OK',
            fields: [
              { name: 'message', type: 'string', description: '"Review applied successfully"' },
              { name: 'tidyspid', type: 'integer' },
              { name: 'review_type', type: 'string' },
              { name: 'old_status_id', type: 'integer' },
              { name: 'new_status_id', type: 'integer' },
              {
                name: 'history', type: 'array', description: 'Full review history for this submission, latest first',
                fields: [
                  { name: 'id', type: 'integer' },
                  { name: 'old_status_id', type: 'integer | null' },
                  { name: 'new_status_id', type: 'integer' },
                  { name: 'review_notes', type: 'string | null' },
                  { name: 'reviewed_by', type: 'integer | null' },
                  { name: 'reviewedat', type: 'string' },
                ],
              },
            ],
          },
          { status: 400, label: 'Bad Request', description: 'Missing required fields, invalid status_id, or invalid review_type.' },
          { status: 404, label: 'Not Found', description: 'Submission not found for the given reference_id.' },
          { status: 403, label: 'Forbidden', description: 'Caller does not have admin role.' },
        ]}
      />

      <TryItPanel
        method="POST"
        path="/v1/admin/providers/onboarding/review"
        auth="admin"
        bodyFields={[
          { name: 'review_type', type: 'string', placeholder: 'requirement' },
          { name: 'reference_id', type: 'number', placeholder: '1' },
          { name: 'status_id', type: 'number', placeholder: '3' },
          { name: 'review_notes', type: 'string', placeholder: 'Looks good' },
        ]}
      />
    </>
  )
}
