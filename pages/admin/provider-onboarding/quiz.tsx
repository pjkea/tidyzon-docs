import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'

export default function AdminQuizPage() {
  return (
    <>
      <Head><title>Quiz — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/admin/providers/onboarding/{tidyspid}/quiz"
        title="Provider Quiz Status"
        description="Returns quiz completion status for a provider, grouped by service product. Each product lists its training sections with pass/fail status, attempt count, and an overall status (pending / in_progress / completed)."
      />

      <ParamsCard
        title="Path Parameters"
        params={[
          { name: 'tidyspid', type: 'integer', required: true, description: 'Provider tidyspid' },
        ]}
      />

      <ResponseExplorer
        responses={[
          {
            status: 200,
            label: 'OK',
            sample: `{
  "tidyspid": 494,
  "results": [
    {
      "service_product_id": 1,
      "service_product_name": "Speed Wash",
      "overall_status": "in_progress",
      "passed_count": 3,
      "total_count": 7,
      "sections": [
        {
          "quiz_id": 1,
          "name": "Welcome to Speed Wash",
          "description": "Speed Wash training section 1",
          "pass_mark": 70.0,
          "is_passed": true,
          "attempt_count": 2,
          "latest_score": 85.0,
          "latest_submitted": "2026-05-23T14:30:00"
        },
        {
          "quiz_id": 2,
          "name": "Arrival and Starting Service",
          "description": "Speed Wash training section 2",
          "pass_mark": 70.0,
          "is_passed": false,
          "attempt_count": 0,
          "latest_score": null,
          "latest_submitted": null
        }
      ]
    }
  ]
}`,
            fields: [
              { name: 'tidyspid', type: 'integer' },
              {
                name: 'results', type: 'array', description: 'One entry per service product (Speed Wash, Deluxe, Premium)', fields: [
                  { name: 'service_product_id', type: 'integer' },
                  { name: 'service_product_name', type: 'string' },
                  { name: 'overall_status', type: 'string', description: '"pending" (none started), "in_progress" (some passed), "completed" (all passed)' },
                  { name: 'passed_count', type: 'integer' },
                  { name: 'total_count', type: 'integer' },
                  {
                    name: 'sections', type: 'array', fields: [
                      { name: 'quiz_id', type: 'integer' },
                      { name: 'name', type: 'string' },
                      { name: 'pass_mark', type: 'number' },
                      { name: 'is_passed', type: 'boolean' },
                      { name: 'attempt_count', type: 'integer' },
                      { name: 'latest_score', type: 'number | null' },
                      { name: 'latest_submitted', type: 'string | null', description: 'ISO timestamp of last attempt' },
                    ],
                  },
                ],
              },
            ],
          },
          { status: 401, label: 'Unauthorized' },
          { status: 404, label: 'Provider not found' },
        ]}
      />
    </>
  )
}
