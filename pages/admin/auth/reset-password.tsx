import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function ResetPasswordPage() {
  return (
    <>
      <Head><title>Reset Password — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="POST"
        path="/v1/admin/auth/reset-password"
        title="Reset Password"
        description="Complete a password reset using the verification code sent to the admin's email."
      />

      <ParamsCard
        title="Body"
        params={[
          { name: 'email', type: 'string', required: true, description: 'Admin account email' },
          { name: 'code', type: 'string', required: true, description: 'Verification code from the forgot-password email' },
          { name: 'new_password', type: 'string', required: true, description: 'New password to set' },
        ]}
      />

      <ResponseExplorer
        responses={[
          {
            status: 200,
            label: 'OK',
            fields: [
              { name: 'message', type: 'string', description: '"Password reset successful"' },
            ],
            sample: `{ "message": "Password reset successful" }`,
          },
          { status: 400, label: 'Bad Request', description: 'Invalid or expired verification code.' },
        ]}
      />

      <TryItPanel
        method="POST"
        path="/v1/admin/auth/reset-password"
        auth="public"
        bodyFields={[
          { name: 'email', type: 'string', placeholder: 'admin@example.com' },
          { name: 'code', type: 'string', placeholder: '123456' },
          { name: 'new_password', type: 'string', placeholder: 'NewPassword123!' },
        ]}
      />
    </>
  )
}
