import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function AdminLoginPage() {
  return (
    <>
      <Head><title>Admin Login — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="POST"
        path="/v1/admin/auth/login"
        title="Admin Login"
        description="Authenticate as an admin user. Returns Cognito JWT tokens used to authorize all subsequent admin requests."
      />

      <ParamsCard
        title="Body"
        params={[
          { name: 'email', type: 'string', required: true, description: 'Admin account email address' },
          { name: 'password', type: 'string', required: true, description: 'Admin account password' },
        ]}
      />

      <ResponseExplorer
        responses={[
          {
            status: 200,
            label: 'OK',
            fields: [
              { name: 'message', type: 'string', description: '"Login successful"' },
              {
                name: 'token', type: 'object', fields: [
                  { name: 'id_token', type: 'string', description: 'JWT — pass as Bearer token in Authorization header' },
                  { name: 'access_token', type: 'string' },
                  { name: 'refresh_token', type: 'string', description: 'Use to obtain a new id_token without re-entering credentials' },
                  { name: 'expires_in', type: 'number', description: 'Seconds until id_token expires (3600)' },
                  { name: 'token_type', type: 'string', description: '"Bearer"' },
                ],
              },
            ],
          },
            sample: `{
  "message": "Login successful",
  "token": {
    "access_token": "eyJraWQiOiJGS214...",
    "id_token": "eyJraWQiOiJka2NtS...",
    "refresh_token": "eyJjdHkiOiJKV1Qi...",
    "token_type": "Bearer",
    "expires_in": 3600
  },
  "user": {
    "userid": 9,
    "email": "nsafulansahk@gmail.com",
    "firstname": "Kwamena",
    "lastname": "Essiful-Ansah",
    "phonenumber": "+233249795541",
    "roleid": 5,
    "latitude": 33.761572,
    "longitude": -84.385946
  }
}`,
          },
          { status: 401, label: 'Unauthorized', description: 'Invalid email or password.' },
          { status: 403, label: 'Forbidden', description: 'Account is disabled or not in the admin group.' },
        ]}
      />

      <TryItPanel
        method="POST"
        path="/v1/admin/auth/login"
        auth="public"
        bodyFields={[
          { name: 'email', type: 'string', placeholder: 'admin@example.com' },
          { name: 'password', type: 'string', placeholder: 'password' },
        ]}
      />
    </>
  )
}
