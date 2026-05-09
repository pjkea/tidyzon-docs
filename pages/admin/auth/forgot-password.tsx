import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function ForgotPasswordPage() {
  return (
    <>
      <Head><title>Forgot Password — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="POST"
        path="/v1/admin/auth/forgot-password"
        title="Forgot Password"
        description="Initiate a password reset flow. Sends a verification code to the admin's registered email via Cognito."
      />

      <ParamsCard
        title="Body"
        params={[
          { name: 'email', type: 'string', required: true, description: 'Admin account email address' },
        ]}
      />

      <ResponseExplorer
        responses={[
          {
            status: 200,
            label: 'OK',
            fields: [
              { name: 'message', type: 'string', description: '"Password reset code sent to email"' },
            ],
          },
          { status: 404, label: 'Not Found', description: 'No account found for the provided email.' },
        ]}
      />

      <TryItPanel
        method="POST"
        path="/v1/admin/auth/forgot-password"
        auth="public"
        bodyFields={[
          { name: 'email', type: 'string', placeholder: 'admin@example.com' },
        ]}
      />
    </>
  )
}
