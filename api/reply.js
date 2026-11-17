// Vercel serverless function: sends a reply email from the dashboard.
// Needs these environment variables in Vercel (Project -> Settings -> Environment Variables):
//   VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY  (same values as the site)
//   RESEND_API_KEY   from resend.com -> API Keys
//   MAIL_FROM        e.g. "Nova Works <hello@novaworks.co.ug>" (domain verified in Resend)
//   MAIL_REPLY_TO    optional, where client replies should go

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST.' })

  const url = process.env.VITE_SUPABASE_URL
  const anon = process.env.VITE_SUPABASE_ANON_KEY
  const resendKey = process.env.RESEND_API_KEY
  const from = process.env.MAIL_FROM

  if (!url || !anon) return res.status(500).json({ error: 'Server is missing its Supabase settings.' })
  if (!resendKey || !from) {
    return res.status(501).json({
      error: 'Email sending is not set up yet. Use "Open in Gmail" for now, or add RESEND_API_KEY and MAIL_FROM in Vercel.',
    })
  }

  // Only signed-in dashboard admins may send.
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '')
  if (!token) return res.status(401).json({ error: 'Please sign in again.' })
  const check = await fetch(`${url}/rest/v1/rpc/is_admin`, {
    method: 'POST',
    headers: { apikey: anon, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: '{}',
  })
  const isAdmin = check.ok ? await check.json().catch(() => false) : false
  if (isAdmin !== true) return res.status(403).json({ error: 'Your account is not allowed to send replies.' })

  const { to, subject, text } = req.body || {}
  if (typeof to !== 'string' || typeof subject !== 'string' || typeof text !== 'string' || !to || !subject || !text) {
    return res.status(400).json({ error: 'Recipient, subject and message are required.' })
  }
  // Validate on the server, not just in the browser.
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(to) || to.length > 200) return res.status(400).json({ error: 'That email address is not valid.' })
  if (subject.length > 200 || /[\r\n]/.test(subject)) return res.status(400).json({ error: 'The subject must be one line, under 200 characters.' })
  if (text.length > 20000) return res.status(400).json({ error: 'The message is too long.' })

  const send = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      ...(process.env.MAIL_REPLY_TO ? { reply_to: process.env.MAIL_REPLY_TO } : {}),
    }),
  })
  const result = await send.json().catch(() => ({}))
  if (!send.ok) return res.status(502).json({ error: result.message || 'The email service rejected the message.' })
  return res.status(200).json({ ok: true, id: result.id })
}
