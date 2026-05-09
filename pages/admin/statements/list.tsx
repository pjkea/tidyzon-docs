import Head from 'next/head'
import { EndpointHero } from '@/components/EndpointHero'
import { ParamsCard } from '@/components/ParamsCard'
import { ResponseExplorer } from '@/components/ResponseExplorer'
import { TryItPanel } from '@/components/TryItPanel'

export default function ListStatementsPage() {
  return (
    <>
      <Head><title>List Statements — Tidyzon API Docs</title></Head>

      <EndpointHero
        method="GET"
        path="/v1/admin/statements"
        title="List Statements"
        description="Returns provider payout statements. A statement groups transactions for a provider over a billing period."
      />
      <ParamsCard
        title="Query Parameters"
        params={[
          { name: 'limit', type: 'integer', default: 20 },
          { name: 'offset', type: 'integer', default: 0 },
          { name: 'providerid', type: 'integer' },
          { name: 'status', type: 'string', description: 'pending | paid' },
        ]}
      />
      <ResponseExplorer
        responses={[{
          status: 200, label: 'OK',
          fields: [
            { name: 'message', type: 'string' },
            {
              name: 'data', type: 'object', fields: [
                {
                  name: 'statements', type: 'array', fields: [
                    { name: 'statementid', type: 'integer' },
                    { name: 'provider_name', type: 'string' },
                    { name: 'period_start', type: 'string' },
                    { name: 'period_end', type: 'string' },
                    { name: 'total_amount', type: 'number' },
                    { name: 'status', type: 'string' },
                    { name: 'created_at', type: 'string' },
                  ],
                },
                {
                  name: 'pagination', type: 'object', fields: [
                    { name: 'total', type: 'integer' }, { name: 'limit', type: 'integer' }, { name: 'offset', type: 'integer' },
                  ],
                },
              ],
            },
          ],
        }]}
      />
      <TryItPanel method="GET" path="/v1/admin/statements" auth="admin"
        queryFields={[
          { name: 'limit', type: 'number', placeholder: '20' },
          { name: 'status', type: 'string', placeholder: 'pending' },
          { name: 'providerid', type: 'number' },
        ]}
      />
    </>
  )
}
