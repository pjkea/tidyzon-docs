import Head from 'next/head'
import { CopyButton } from '@/components/CopyButton'
import { ParamsCard } from '@/components/ParamsCard'
import { WSEventCard } from '@/components/WSEventCard'

const WS_URL = 'wss://slwip90tr6.execute-api.us-east-1.amazonaws.com/dev'

export default function InAppChatPage() {
  return (
    <>
      <Head><title>In-App Chat (WebSocket) — Tidyzon API Docs</title></Head>

      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          In-App Chat
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-4 text-base">
          Real-time chat between a customer and the provider assigned to their request, over an API Gateway
          WebSocket. One socket per order; messages are persisted to <code className="font-mono text-xs">inappmessages</code>.
        </p>
        <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg">
          <span className="inline-block text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
            WSS
          </span>
          <code className="flex-1 text-sm text-slate-700 dark:text-slate-300 font-mono break-all">
            {WS_URL}
          </code>
          <CopyButton text={WS_URL} />
        </div>
      </div>

      {/* Authentication */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
          Authentication
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
          The connection is authorized at <code className="font-mono text-xs">$connect</code> by a Lambda
          authorizer. Pass the Cognito <strong>id_token</strong> (the same one returned by
          <code className="font-mono text-xs"> POST /v1/auth/sign-in</code>) and the <code className="font-mono text-xs">orderid</code>
          via the connect URL's query string. Browser WebSocket clients cannot send custom headers, so the
          token must travel on the URL.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          The authorizer rejects the handshake (401) if the token is invalid/expired, or if the signed-in
          user is not the customer (<code className="font-mono text-xs">orders.userid</code>) or the assigned
          provider (<code className="font-mono text-xs">tidysp.userid</code> for <code className="font-mono text-xs">orders.tidyspid</code>)
          on the supplied order.
        </p>
      </section>

      <ParamsCard
        title="Connection Query Parameters"
        params={[
          { name: 'token', type: 'string', required: true, description: 'Cognito id_token from /v1/auth/sign-in.' },
          { name: 'orderid', type: 'integer', required: true, description: 'orders.orderid for the chat thread. The signed-in user must be either the customer or the assigned provider on this order.' },
        ]}
      />

      {/* Connect URL example */}
      <section className="mb-8">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Connect URL
        </h3>
        <pre className="bg-slate-900 dark:bg-black text-slate-100 text-xs font-mono p-3 rounded overflow-x-auto">
{`wss://slwip90tr6.execute-api.us-east-1.amazonaws.com/dev?token=<id_token>&orderid=<orderid>`}
        </pre>
      </section>

      {/* Send events */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
          Send Events
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Sent by the client over the open socket. Every payload must include an <code className="font-mono text-xs">action</code> field.
          The sender, recipient, and order are inferred from the connection — clients never specify a <code className="font-mono text-xs">to</code> field.
        </p>

        <WSEventCard
          direction="send"
          action="get-history"
          description="Replay the full message history for this order and flush any messages addressed to the caller that have not been marked delivered. Call this immediately after the socket opens."
          payload={`{
  "action": "get-history"
}`}
          example={`ws.send(JSON.stringify({ action: "get-history" }));`}
          notes="Server responds with a 'history' event followed by zero or more 'messages-delivered' pushes to the peer."
        />

        <WSEventCard
          direction="send"
          action="send-message"
          description="Send a chat message to the peer on this order. The server persists it to inappmessages and pushes it to the peer if they are currently connected."
          payload={`{
  "action": "send-message",
  "message": "On my way"
}`}
          example={`ws.send(JSON.stringify({
  action: "send-message",
  message: "On my way"
}));`}
          notes="Server replies with 'message-sent' (ack to sender) and pushes 'receive-message' to the peer."
        />
      </section>

      {/* Receive events */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
          Receive Events
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Pushed by the server. Every payload includes an <code className="font-mono text-xs">action</code> field — dispatch on it.
        </p>

        <WSEventCard
          direction="receive"
          action="history"
          description="Reply to get-history. Contains the full message thread for this order ordered oldest → newest."
          example={`{
  "action": "history",
  "orderid": 20,
  "messages": [
    {
      "id": 1,
      "orderid": 20,
      "from": 9,
      "to": 1770,
      "message": "Hi",
      "timestamp": "2026-05-22T23:35:12.000Z",
      "deliveredAt": "2026-05-22T23:35:14.000Z"
    }
  ]
}`}
        />

        <WSEventCard
          direction="receive"
          action="receive-message"
          description="The peer just sent a new message. Append it to the conversation UI."
          example={`{
  "action": "receive-message",
  "id": 5,
  "orderid": 20,
  "from": 1770,
  "to": 9,
  "message": "almost there",
  "timestamp": "2026-05-22T23:40:01.000Z",
  "deliveredAt": "2026-05-22T23:40:01.000Z"
}`}
        />

        <WSEventCard
          direction="receive"
          action="message-sent"
          description="Acknowledgement for a send-message that just succeeded. delivered=true means the peer was online and received the push."
          example={`{
  "action": "message-sent",
  "id": 6,
  "orderid": 20,
  "from": 9,
  "to": 1770,
  "message": "ok",
  "timestamp": "2026-05-22T23:40:30.000Z",
  "deliveredAt": "2026-05-22T23:40:30.000Z",
  "delivered": true
}`}
        />

        <WSEventCard
          direction="receive"
          action="messages-delivered"
          description="Messages the caller previously sent have just been delivered (peer reconnected and was flushed). Use this to flip the message bubble status from 'sent' to 'delivered' in the UI."
          example={`{
  "action": "messages-delivered",
  "orderid": 20,
  "updates": [
    { "id": 6, "from": 9, "to": 1770, "deliveredAt": "2026-05-22T23:42:11.000Z" }
  ]
}`}
        />

        <WSEventCard
          direction="receive"
          action="peer-offline"
          description="The peer just disconnected. Use this to display a 'Provider is offline' indicator."
          example={`{
  "action": "peer-offline",
  "orderid": 20,
  "userId": 1770
}`}
        />

        <WSEventCard
          direction="receive"
          action="error"
          description="Server-side validation or state error. The message field is human-readable; do not parse it for logic."
          example={`{
  "action": "error",
  "message": "No peer found on this order"
}`}
        />
      </section>

      {/* Lifecycle */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
          Connection Lifecycle
        </h2>
        <ol className="list-decimal list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1.5 mb-4">
          <li>Customer opens the chat screen for an order → <code className="font-mono text-xs">new WebSocket(...)</code>.</li>
          <li>On <code className="font-mono text-xs">open</code>, send <code className="font-mono text-xs">{`{action:"get-history"}`}</code> to backfill the thread.</li>
          <li>User sends messages → <code className="font-mono text-xs">send-message</code>; UI updates from <code className="font-mono text-xs">message-sent</code> + <code className="font-mono text-xs">receive-message</code>.</li>
          <li>User leaves the screen → call <code className="font-mono text-xs">socket.close(1000)</code>.</li>
        </ol>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          There is no global chat socket — each chat thread is a fresh WebSocket scoped to that orderid.
          When the socket closes with any code other than 1000, retry with exponential backoff (1s, 2s, 4s,
          capped ~30s) and re-issue <code className="font-mono text-xs">get-history</code> on reconnect.
        </p>
      </section>

      {/* Close codes */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
          Close Codes
        </h2>
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden divide-y divide-slate-200 dark:divide-slate-700">
          {[
            { code: '1000', label: 'Normal Closure', desc: 'Client called socket.close() cleanly. Do not reconnect.' },
            { code: '1006', label: 'Abnormal Closure', desc: 'Network drop or handshake failed. Most common cause: token rejected by the authorizer (expired or invalid). Refresh the token and reconnect.' },
            { code: '1011', label: 'Internal Error', desc: 'Server-side error during the connection. Retry with backoff.' },
            { code: '4xx', label: 'Authorizer Denied', desc: 'API Gateway rejected $connect because token/orderid were missing, invalid, or the user is not on the order.' },
          ].map((row) => (
            <div key={row.code} className="flex gap-4 px-4 py-3 bg-white dark:bg-slate-900">
              <code className="w-16 shrink-0 text-sm font-mono font-medium text-slate-900 dark:text-slate-100">
                {row.code}
              </code>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-0.5">
                  {row.label}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{row.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Minimum example */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
          Minimum Client
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
          The whole interface in three lines. Works as-is in React Native, browser, or Node 22+.
        </p>
        <pre className="bg-slate-900 dark:bg-black text-slate-100 text-xs font-mono p-3 rounded overflow-x-auto">
{`const ws = new WebSocket(
  \`wss://slwip90tr6.execute-api.us-east-1.amazonaws.com/dev?token=\${id_token}&orderid=\${orderid}\`
);
ws.onopen = () => ws.send(JSON.stringify({ action: 'get-history' }));
ws.onmessage = (e) => console.log(JSON.parse(e.data));`}
        </pre>
      </section>
    </>
  )
}
