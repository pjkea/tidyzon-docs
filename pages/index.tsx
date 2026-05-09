import Link from 'next/link'
import Head from 'next/head'

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE ??
  'https://25p5ndzk5j.execute-api.us-east-1.amazonaws.com/dev'

const SECTIONS = [
  {
    title: 'Admin API',
    description: 'Full control over users, providers, requests, payments, and platform configuration.',
    href: '/admin',
    color: 'from-brand-600 to-brand-800',
    endpoints: 30,
  },
]

export default function QuickstartPage() {
  return (
    <>
      <Head>
        <title>Quickstart — Tidyzon API Docs</title>
      </Head>

      <div className="max-w-3xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Tidyzon API Documentation
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Integrate with the Tidyzon platform — on-demand car wash marketplace.
          </p>
        </div>

        {/* Base URL */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
            Base URL
          </h2>
          <div className="bg-slate-900 dark:bg-slate-950 rounded-lg px-4 py-3">
            <code className="text-sm text-emerald-400 font-mono">{BASE_URL}</code>
          </div>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            All API calls are made to this base. Append the route path (e.g.{' '}
            <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">/v1/admin/requests</code>
            ).
          </p>
        </section>

        {/* Auth overview */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
            Authentication
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
            All protected endpoints require a Bearer token in the{' '}
            <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">Authorization</code>{' '}
            header. Obtain a token by calling the appropriate login endpoint.
          </p>
          <div className="bg-slate-900 dark:bg-slate-950 rounded-lg px-4 py-3 text-xs font-mono text-slate-300">
            <div className="text-slate-500 mb-1"># Admin</div>
            <div>
              <span className="text-amber-400">POST</span>{' '}
              <span className="text-emerald-400">/v1/admin/auth/login</span>
            </div>
            <div className="text-slate-500 mt-3 mb-1"># Add to all requests</div>
            <div>
              Authorization: Bearer{' '}
              <span className="text-brand-400">{'<id_token>'}</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Tokens expire after 1 hour. Re-authenticate when you receive a{' '}
            <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">401</code>.
          </p>
        </section>

        {/* API sections */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
            API Sections
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {SECTIONS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group block p-5 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-brand-300 dark:hover:border-brand-700 transition-colors"
              >
                <div className={`inline-block text-xs font-bold text-white px-2 py-0.5 rounded bg-gradient-to-r ${s.color} mb-2`}>
                  {s.endpoints} endpoints
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{s.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick response format */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
            Response Format
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
            All endpoints return JSON. Successful responses always include a{' '}
            <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">message</code>{' '}
            and a{' '}
            <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">data</code>{' '}
            object. Error responses include a{' '}
            <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">message</code>{' '}
            field with a human-readable description.
          </p>
          <div className="bg-slate-900 dark:bg-slate-950 rounded-lg px-4 py-3 text-xs font-mono">
            <div className="text-slate-400">{'{'}</div>
            <div className="pl-4">
              <span className="text-brand-400">&quot;message&quot;</span>
              <span className="text-slate-400">: </span>
              <span className="text-emerald-400">&quot;Requests retrieved successfully&quot;</span>
              <span className="text-slate-400">,</span>
            </div>
            <div className="pl-4">
              <span className="text-brand-400">&quot;data&quot;</span>
              <span className="text-slate-400">: {'{ ... }'}</span>
            </div>
            <div className="text-slate-400">{'}'}</div>
          </div>
        </section>
      </div>
    </>
  )
}
