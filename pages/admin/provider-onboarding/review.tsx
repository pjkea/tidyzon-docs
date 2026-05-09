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
        description="Approve or reject a provider's onboarding document or background check. Triggers notification to the provider."
      />

      <ParamsCard
        title="Body"
        params={[
          { name: 'tidyspid', type: 'integer', required: true, description: 'Provider being reviewed' },
          { name: 'review_type', type: 'string', required: true, description: 'document | background_check' },
          { name: 'action', type: 'string', required: true, description: 'approve | reject' },
          { name: 'document_id', type: 'integer', description: 'Required when review_type is "document"' },
          { name: 'notes', type: 'string', description: 'Rejection reason or admin notes' },
        ]}
      />

      <ResponseExplorer
        responses={[
          {
            status: 200,
            label: 'OK',
            fields: [
              { name: 'message', type: 'string', description: '"Review submitted successfully"' },
            ],
          },
          { status: 400, label: 'Bad Request', description: 'Missing required fields or invalid action.' },
          { status: 404, label: 'Not Found', description: 'Provider not found.' },
        ]}
      />

      <TryItPanel
        method="POST"
        path="/v1/admin/providers/onboarding/review"
        auth="admin"
        bodyFields={[
          { name: 'tidyspid', type: 'number', placeholder: '494' },
          { name: 'review_type', type: 'string', placeholder: 'document' },
          { name: 'action', type: 'string', placeholder: 'approve' },
          { name: 'notes', type: 'string' },
        ]}
      />
    </>
  )
}
