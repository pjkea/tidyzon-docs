import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'

export default function SubmitProviderQuizPage() {
  return (
    <>
      <Head><title>Submit Quiz — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="POST"
        path="/v1/provider/onboarding/quiz/submit"
        title="Submit Quiz"
        description="Submit answers for a quiz section. The backend grades the answers server-side, records the attempt, and returns the score and pass/fail result."
      />

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Authentication
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Requires a Cognito <code className="font-mono text-xs">id_token</code> in the <code className="font-mono text-xs">Authorization: Bearer</code> header.
        </p>
      </section>

      <ParamsCard
        title="Request Body"
        params={[
          { name: 'answers', type: 'array', required: true, description: 'Array of { question_id, option_id } objects — one per question answered.' },
        ]}
      />

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Request Example
        </h3>
        <pre className="bg-slate-900 dark:bg-black text-slate-100 text-xs font-mono p-3 rounded overflow-x-auto">
{`{
  "answers": [
    { "question_id": 1, "option_id": 2 },
    { "question_id": 2, "option_id": 7 },
    { "question_id": 3, "option_id": 10 }
  ]
}`}
        </pre>
      </section>

      <ResponseExplorer
        responses={[
          {
            status: 200,
            label: 'OK — Passed',
            sample: `{
  "score": 85.0,
  "passed": true,
  "pass_mark": 70.0,
  "status": "approved",
  "next_step": "mode_selection"
}`,
            fields: [
              { name: 'score', type: 'number', description: 'Percentage score (0–100)' },
              { name: 'passed', type: 'boolean' },
              { name: 'pass_mark', type: 'number', description: 'Minimum score required to pass' },
              { name: 'status', type: 'string', description: '"approved" if passed, "rejected" if failed' },
              { name: 'next_step', type: 'string', description: '"mode_selection" if passed, "quiz" if failed (retry)' },
            ],
          },
          {
            status: 200,
            label: 'OK — Failed',
            sample: `{
  "score": 45.0,
  "passed": false,
  "pass_mark": 70.0,
  "status": "rejected",
  "next_step": "quiz"
}`,
          },
          {
            status: 400,
            label: 'Bad Request',
            sample: `{ "error": "BadRequest", "message": "answers array is required." }`,
          },
          { status: 401, label: 'Unauthorized' },
          { status: 403, label: 'Forbidden — no provider record' },
        ]}
      />

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Notes
        </h3>
        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1.5">
          <li>Each submission is recorded — providers can retry as many times as needed.</li>
          <li>The score is calculated as <code className="font-mono text-xs">(correct / total) * 100</code>.</li>
          <li>The frontend should check answers locally (using <code className="font-mono text-xs">is_correct</code> from the GET endpoint) for immediate feedback, then submit to the backend to record the attempt.</li>
          <li><strong>Known limitation:</strong> the current DB function resolves a single quiz by service product. A <code className="font-mono text-xs">quiz_id</code> parameter will be added to support per-section submissions.</li>
        </ul>
      </section>
    </>
  )
}
