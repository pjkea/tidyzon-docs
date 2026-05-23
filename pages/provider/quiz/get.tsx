import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'

export default function GetProviderQuizPage() {
  return (
    <>
      <Head><title>Get Quiz Sections — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/provider/onboarding/quiz"
        title="Get Quiz Sections"
        description="Returns all training video sections and quiz questions for the provider's current service product (e.g. Speed Wash). Each section includes a video URL, thumbnail, pass/fail status, and the full question pool with options and correct answers."
      />

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Authentication
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Requires a Cognito <code className="font-mono text-xs">id_token</code> in the <code className="font-mono text-xs">Authorization: Bearer</code> header.
          The provider is resolved from the JWT claims.
        </p>
      </section>

      <ResponseExplorer
        responses={[
          {
            status: 200,
            label: 'OK',
            sample: `{
  "service_product_id": 1,
  "service_product_name": "Speed Wash kit",
  "overall_status": "pending",
  "sections": [
    {
      "quiz_id": 1,
      "name": "Welcome to Speed Wash",
      "description": "Speed Wash training section 1",
      "video_url": "https://d37274hi88351g.cloudfront.net/.../01-welcome-to-speed-wash.mp4",
      "thumbnail_url": "https://d37274hi88351g.cloudfront.net/.../01-welcome-to-speed-wash.png",
      "pass_mark": 70.0,
      "questions_per_attempt": null,
      "is_passed": false,
      "attempt_count": 0,
      "latest_score": null,
      "questions": [
        {
          "id": 1,
          "question": "What is the purpose of the Tidyzon Speed Wash Certification Program?",
          "question_type": "single_choice",
          "displayorder": 1,
          "explanation": "The certification program ensures providers understand Tidyzon's procedures.",
          "options": [
            { "id": 1, "name": "To allow providers to work immediately without training", "is_correct": false, "displayorder": 1 },
            { "id": 2, "name": "To teach providers Tidyzon's washing standards and procedures", "is_correct": true, "displayorder": 2 },
            { "id": 3, "name": "To test how fast providers can wash cars", "is_correct": false, "displayorder": 3 },
            { "id": 4, "name": "To advertise Tidyzon services", "is_correct": false, "displayorder": 4 }
          ]
        }
      ]
    }
  ]
}`,
            fields: [
              { name: 'service_product_id', type: 'integer', description: 'Current service product ID (e.g. 1 = Speed Wash)' },
              { name: 'service_product_name', type: 'string' },
              { name: 'overall_status', type: 'string', description: '"pending" | "in_progress" | "completed"' },
              {
                name: 'sections', type: 'array', fields: [
                  { name: 'quiz_id', type: 'integer' },
                  { name: 'name', type: 'string', description: 'Section title (e.g. "Welcome to Speed Wash")' },
                  { name: 'video_url', type: 'string', description: 'CloudFront URL for the training video' },
                  { name: 'thumbnail_url', type: 'string', description: 'CloudFront URL for the video thumbnail' },
                  { name: 'pass_mark', type: 'number', description: 'Minimum score to pass (e.g. 70.0)' },
                  { name: 'is_passed', type: 'boolean', description: 'Whether the provider has passed this section' },
                  { name: 'attempt_count', type: 'integer' },
                  { name: 'latest_score', type: 'number | null' },
                  {
                    name: 'questions', type: 'array', fields: [
                      { name: 'id', type: 'integer' },
                      { name: 'question', type: 'string' },
                      { name: 'explanation', type: 'string', description: 'Shown after answering — explains the correct answer' },
                      {
                        name: 'options', type: 'array', fields: [
                          { name: 'id', type: 'integer' },
                          { name: 'name', type: 'string' },
                          { name: 'is_correct', type: 'boolean' },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          { status: 401, label: 'Unauthorized' },
          { status: 403, label: 'Forbidden — no provider record' },
        ]}
      />
    </>
  )
}
