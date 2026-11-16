import { useEffect, useMemo, useState } from 'react'
import { listEnquiries, updateEnquiry, deleteEnquiry, sendReplyEmail } from '../lib/api.js'
import { site } from '../data/site.js'

const views = [
  { id: 'inbox', label: 'Inbox', test: (e) => e.status !== 'archived' },
  { id: 'new', label: 'Needs reply', test: (e) => e.status === 'new' },
  { id: 'replied', label: 'Replied', test: (e) => e.status === 'replied' },
  { id: 'archived', label: 'Archived', test: (e) => e.status === 'archived' },
]

const fmt = (iso) =>
  new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })

const firstName = (name = '') => name.trim().split(/\s+/)[0] || 'there'

function template(e) {
  return `Hi ${firstName(e.name)},

Thank you for reaching out to Nova Works.

[Your reply here]

Kind regards,
${site.founder.name}
${site.name} · ${site.descriptor}`
}

const digits = (s = '') => s.replace(/\D/g, '').replace(/^0/, '256')

function Detail({ enquiry, onChange, onDeleted }) {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState(null) // {type, text}
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    setSubject('Re: Your enquiry to Nova Works')
    setBody(template(enquiry))
    setNotice(null)
    setConfirmDelete(false)
  }, [enquiry.id]) // eslint-disable-line react-hooks/exhaustive-deps

  async function markReplied(text = body) {
    const saved = await updateEnquiry(enquiry.id, { status: 'replied', reply: text, replied_at: new Date().toISOString() })
    onChange(saved)
  }

  async function send() {
    setBusy(true)
    setNotice(null)
    try {
      await sendReplyEmail({ to: enquiry.email, subject, text: body })
      await markReplied()
      setNotice({ type: 'ok', text: `Reply sent to ${enquiry.email}.` })
    } catch (err) {
      setNotice({ type: 'error', text: err.message })
    } finally {
      setBusy(false)
    }
  }

  async function setStatus(status) {
    const saved = await updateEnquiry(enquiry.id, { status })
    onChange(saved)
  }

  async function remove() {
    await deleteEnquiry(enquiry.id)
    onDeleted(enquiry.id)
  }

  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(enquiry.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  const wa = enquiry.phone ? `https://wa.me/${digits(enquiry.phone)}?text=${encodeURIComponent(body)}` : ''

  return (
    <article className="adm-detail">
      <header className="adm-detail__head">
        <div>
          <h2>{enquiry.name}</h2>
          <p className="adm-muted">
            {[enquiry.company, enquiry.area, fmt(enquiry.created_at)].filter(Boolean).join(' · ')}
          </p>
        </div>
        <span className={`adm-pill adm-pill--${enquiry.status}`}>
          {enquiry.status === 'new' ? 'Needs reply' : enquiry.status === 'replied' ? 'Replied' : 'Archived'}
        </span>
      </header>

      <dl className="adm-contact">
        <div><dt>Email</dt><dd className="adm-select">{enquiry.email}</dd></div>
        {enquiry.phone && <div><dt>Phone</dt><dd className="adm-select">{enquiry.phone}</dd></div>}
      </dl>

      <div className="adm-message">{enquiry.message}</div>

      {enquiry.reply && (
        <div className="adm-sent">
          <p className="adm-label">Your reply · {enquiry.replied_at ? fmt(enquiry.replied_at) : ''}</p>
          <p>{enquiry.reply}</p>
        </div>
      )}

      <div className="adm-compose">
        <p className="adm-label">{enquiry.reply ? 'Send another reply' : 'Reply'}</p>
        <label className="adm-field">
          Subject
          <input id="reply-subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        </label>
        <label className="adm-field">
          Message
          <textarea id="reply-body" rows="9" value={body} onChange={(e) => setBody(e.target.value)} />
        </label>
        {notice && <p className={notice.type === 'ok' ? 'adm-ok' : 'adm-error'} role="status">{notice.text}</p>}
        <div className="adm-actions">
          <button className="adm-btn" onClick={send} disabled={busy}>{busy ? 'Sending…' : 'Send reply'}</button>
          <a className="adm-btn adm-btn--ghost" href={gmail} target="_blank" rel="noreferrer">Open in Gmail</a>
          {wa && <a className="adm-btn adm-btn--ghost" href={wa} target="_blank" rel="noreferrer">Reply on WhatsApp</a>}
          {enquiry.status === 'new' && (
            <button className="adm-btn adm-btn--ghost" onClick={() => markReplied()}>Mark as replied</button>
          )}
        </div>
      </div>

      <footer className="adm-detail__foot">
        {enquiry.status === 'archived' ? (
          <button className="adm-link" onClick={() => setStatus(enquiry.reply ? 'replied' : 'new')}>Move back to inbox</button>
        ) : (
          <button className="adm-link" onClick={() => setStatus('archived')}>Archive</button>
        )}
        {confirmDelete ? (
          <span className="adm-confirm">
            Delete this enquiry for good?
            <button className="adm-btn adm-btn--danger adm-btn--sm" onClick={remove}>Delete</button>
            <button className="adm-link" onClick={() => setConfirmDelete(false)}>Cancel</button>
          </span>
        ) : (
          <button className="adm-link adm-link--danger" onClick={() => setConfirmDelete(true)}>Delete</button>
        )}
      </footer>
    </article>
  )
}

export default function Enquiries({ onCountChange }) {
  const [items, setItems] = useState(null)
  const [error, setError] = useState('')
  const [view, setView] = useState('inbox')
  const [selected, setSelected] = useState(null)

  const load = () =>
    listEnquiries()
      .then((list) => { setItems(list); setError('') })
      .catch((e) => setError(e.message || 'Could not load enquiries.'))

  useEffect(() => { load() }, [])
  useEffect(() => {
    if (items) onCountChange?.(items.filter((e) => e.status === 'new').length)
  }, [items, onCountChange])

  const filtered = useMemo(
    () => (items || []).filter(views.find((v) => v.id === view).test),
    [items, view]
  )
  const current = items?.find((e) => e.id === selected)

  function replace(saved) {
    setItems((list) => list.map((e) => (e.id === saved.id ? saved : e)))
  }
  function removed(id) {
    setItems((list) => list.filter((e) => e.id !== id))
    setSelected(null)
  }

  if (error) return <p className="adm-error">{error} <button className="adm-link" onClick={load}>Try again</button></p>
  if (!items) return <p className="adm-muted">Loading enquiries…</p>

  return (
    <div className={`adm-inbox ${current ? 'has-selection' : ''}`}>
      <aside className="adm-list">
        <div className="adm-list__head">
          <div className="adm-seg" role="group" aria-label="Show">
            {views.map((v) => (
              <button key={v.id} className={view === v.id ? 'is-on' : ''} onClick={() => setView(v.id)}>
                {v.label}
                <span>{items.filter(v.test).length}</span>
              </button>
            ))}
          </div>
          <button className="adm-link" onClick={load}>Refresh</button>
        </div>
        {filtered.length === 0 ? (
          <p className="adm-empty">
            {items.length === 0
              ? 'No enquiries yet. Messages sent from the contact form on your site appear here.'
              : 'Nothing here.'}
          </p>
        ) : (
          <ul>
            {filtered.map((e) => (
              <li key={e.id}>
                <button
                  className={`adm-row ${selected === e.id ? 'is-on' : ''} ${e.status === 'new' ? 'is-new' : ''}`}
                  onClick={() => setSelected(e.id)}
                >
                  <span className="adm-row__top">
                    <strong>{e.name}</strong>
                    <time>{fmt(e.created_at)}</time>
                  </span>
                  {e.company && <span className="adm-row__company">{e.company}</span>}
                  <span className="adm-row__snippet">{e.message}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>

      <section className="adm-pane">
        {current ? (
          <>
            <button className="adm-link adm-back" onClick={() => setSelected(null)}>← All enquiries</button>
            <Detail enquiry={current} onChange={replace} onDeleted={removed} />
          </>
        ) : (
          <p className="adm-empty adm-empty--pane">Select an enquiry to read and reply.</p>
        )}
      </section>
    </div>
  )
}
