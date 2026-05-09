import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

const pathParam = [{ name: 'tidyspid', type: 'integer', required: true }]
const pathField = [{ name: 'tidyspid', type: 'number' as const, placeholder: '494' }]

const statusField = { name: 'status', type: 'string', description: 'pending | approved | rejected | not_submitted' }

export default function OnboardingRequirementsPage() {
  return (
    <>
      <Head><title>Provider Onboarding Requirements — Tidyzon API Docs</title></Head>

      <div className="mb-10">
        <EndpointHero
          method="GET"
          path="/v1/admin/providers/onboarding/{tidyspid}/requirements"
          title="Get Onboarding Requirements"
          description="Returns a summary of all onboarding requirements and their completion status for a specific provider."
        />
        <ParamsCard title="Path Parameters" params={pathParam} />
        <ResponseExplorer
          responses={[{
            status: 200, label: 'OK',
            fields: [
              { name: 'message', type: 'string' },
              {
                name: 'data', type: 'object', fields: [
                  { name: 'documents_complete', type: 'boolean' },
                  { name: 'background_check_complete', type: 'boolean' },
                  { name: 'quiz_complete', type: 'boolean' },
                  { name: 'washkit_assigned', type: 'boolean' },
                  { name: 'mode_of_operation_set', type: 'boolean' },
                  { name: 'fully_onboarded', type: 'boolean' },
                ],
              },
            ],
          }]}
        />
        <TryItPanel method="GET" path="/v1/admin/providers/onboarding/{tidyspid}/requirements" auth="admin" pathFields={pathField} />
      </div>

      <div className="mb-10">
        <EndpointHero
          method="GET"
          path="/v1/admin/providers/onboarding/{tidyspid}/background-check"
          title="Get Background Check Status"
          description="Returns the Certn background check status and report details for a provider."
        />
        <ParamsCard title="Path Parameters" params={pathParam} />
        <ResponseExplorer
          responses={[{
            status: 200, label: 'OK',
            fields: [
              { name: 'message', type: 'string' },
              {
                name: 'data', type: 'object', fields: [
                  { name: 'status', type: 'string', description: 'pending | clear | consider | suspended' },
                  { name: 'report_url', type: 'string' },
                  { name: 'submitted_at', type: 'string' },
                  { name: 'completed_at', type: 'string' },
                ],
              },
            ],
          }]}
        />
        <TryItPanel method="GET" path="/v1/admin/providers/onboarding/{tidyspid}/background-check" auth="admin" pathFields={pathField} />
      </div>

      <div className="mb-10">
        <EndpointHero
          method="GET"
          path="/v1/admin/providers/onboarding/{tidyspid}/quiz"
          title="Get Quiz Results"
          description="Returns the provider's quiz attempt history and pass/fail status."
        />
        <ParamsCard title="Path Parameters" params={pathParam} />
        <ResponseExplorer
          responses={[{
            status: 200, label: 'OK',
            fields: [
              { name: 'message', type: 'string' },
              {
                name: 'data', type: 'object', fields: [
                  { name: 'passed', type: 'boolean' },
                  { name: 'score', type: 'number' },
                  { name: 'attempts', type: 'integer' },
                  { name: 'last_attempt_at', type: 'string' },
                ],
              },
            ],
          }]}
        />
        <TryItPanel method="GET" path="/v1/admin/providers/onboarding/{tidyspid}/quiz" auth="admin" pathFields={pathField} />
      </div>

      <div>
        <EndpointHero
          method="GET"
          path="/v1/admin/providers/onboarding/{tidyspid}/mode-of-operation"
          title="Get Mode of Operation"
          description="Returns the provider's selected service mode (e.g. on-demand, scheduled, or both)."
        />
        <ParamsCard title="Path Parameters" params={pathParam} />
        <ResponseExplorer
          responses={[{
            status: 200, label: 'OK',
            fields: [
              { name: 'message', type: 'string' },
              {
                name: 'data', type: 'object', fields: [
                  { name: 'mode', type: 'string', description: 'on_demand | scheduled | both' },
                  { name: 'set_at', type: 'string' },
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
