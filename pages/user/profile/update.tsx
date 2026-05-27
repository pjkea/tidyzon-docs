import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'

export default function UpdateUserProfilePage() {
  return (
    <>
      <Head><title>Update Profile — User App — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="POST"
        path="/v1/user/me/update"
        title="Update Profile"
        description="Update the signed-in user's profile information. All fields are optional — send only what needs changing. Returns the full updated profile on success."
      />

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Authentication
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Requires a Cognito <code className="font-mono text-xs">id_token</code> in the{' '}
          <code className="font-mono text-xs">Authorization: Bearer</code> header.
          The user is derived from the token — clients never specify whose profile to update.
        </p>
      </section>

      <ParamsCard
        title="Request Body"
        params={[
          { name: 'firstName',       type: 'string',  required: false, description: 'First name.' },
          { name: 'lastName',        type: 'string',  required: false, description: 'Last name.' },
          { name: 'phoneNumber',     type: 'string',  required: false, description: 'Phone number in international format e.g. +233501234567.' },
          { name: 'profilePhotoUrl', type: 'string',  required: false, description: 'URL of the user\'s profile photo (typically an S3 / CloudFront URL).' },
          { name: 'address',         type: 'object',  required: false, description: 'Address object — all sub-fields optional.' },
          { name: 'address.streetAddress1', type: 'string',  required: false, description: 'Primary street address.' },
          { name: 'address.streetAddress2', type: 'string',  required: false, description: 'Apartment, suite, unit etc.' },
          { name: 'address.city',           type: 'string',  required: false, description: 'City.' },
          { name: 'address.state',          type: 'string',  required: false, description: 'State or region.' },
          { name: 'address.postalCode',     type: 'string',  required: false, description: 'Postal / ZIP code.' },
          { name: 'address.countryId',      type: 'integer', required: false, description: 'Country ID from the countries reference table.' },
        ]}
      />

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Request Example
        </h3>
        <pre className="bg-slate-900 dark:bg-black text-slate-100 text-xs font-mono p-3 rounded overflow-x-auto">
{`POST /v1/user/me/update
Authorization: Bearer <id_token>
Content-Type: application/json

{
  "firstName": "Joseph",
  "lastName": "Kessie",
  "phoneNumber": "+233501234567",
  "profilePhotoUrl": "https://cdn.example.com/photos/user-123.jpg",
  "address": {
    "streetAddress1": "12 Independence Ave",
    "city": "Kumasi",
    "state": "Ashanti",
    "postalCode": "00233",
    "countryId": 190
  }
}`}
        </pre>
      </section>

      <ResponseExplorer
        responses={[
          {
            status: 200,
            label: 'OK — Profile updated',
            sample: `{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "userid": 1770,
    "email": "user@example.com",
    "roleid": 1,
    "firstName": "Joseph",
    "lastName": "Kessie",
    "phoneNumber": "+233501234567",
    "profilePhotoUrl": "https://cdn.example.com/photos/user-123.jpg",
    "address": {
      "streetAddress1": "12 Independence Ave",
      "streetAddress2": null,
      "city": "Kumasi",
      "state": "Ashanti",
      "postalCode": "00233",
      "countryId": 190
    }
  },
  "fieldsUpdated": ["firstName", "lastName", "phoneNumber", "address"]
}`,
            fields: [
              { name: 'success',       type: 'boolean', description: 'Always true on a 200.' },
              { name: 'user',          type: 'object',  description: 'Full refreshed profile after the update.' },
              { name: 'fieldsUpdated', type: 'string[]', description: 'List of top-level fields that were changed.' },
            ],
          },
          {
            status: 400,
            label: 'Bad Request — empty body',
            sample: `{ "success": false, "error": "Request body is empty" }`,
          },
          {
            status: 400,
            label: 'Bad Request — no updatable fields',
            sample: `{
  "success": false,
  "error": "No updatable fields provided",
  "updatable_fields": ["firstName", "lastName", "phoneNumber", "profilePhotoUrl", "address"]
}`,
          },
          {
            status: 400,
            label: 'Bad Request — invalid phone number',
            sample: `{ "success": false, "error": "Invalid phone number format. Use international format e.g. +233501234567" }`,
          },
          { status: 401, label: 'Unauthorized — missing or invalid token' },
          { status: 404, label: 'Not Found — user not found or inactive' },
          { status: 500, label: 'Internal Server Error' },
        ]}
      />

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Notes
        </h3>
        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1.5">
          <li>All fields are optional. Only the fields present in the request body are updated — omitted fields are left unchanged.</li>
          <li>
            <strong>Email changes are not supported here.</strong> Changing email requires a separate Cognito verification flow.
          </li>
          <li>
            <code className="font-mono text-xs">phoneNumber</code> must be in international format including the country code (e.g.{' '}
            <code className="font-mono text-xs">+233501234567</code>).
          </li>
          <li>If no <code className="font-mono text-xs">userdetails</code> row exists for the user yet, one is created automatically (upsert behaviour).</li>
          <li>Works for both customer (<code className="font-mono text-xs">roleid 1</code>) and provider (<code className="font-mono text-xs">roleid 2</code>) accounts — the token determines whose profile is updated.</li>
        </ul>
      </section>
    </>
  )
}
