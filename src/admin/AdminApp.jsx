import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { backend, getSession, onAuthChange, signIn, signOut, checkAdmin, listEnquiries } from '../lib/api.js'
import { Wordmark } from '../components/Mark.jsx'
import Enquiries from './Enquiries.jsx'
import Projects from './Projects.jsx'
import './admin.css'

function Shell({ children, narrow = false }) {
  return (
    <div className={`adm-shell ${narrow ? 'adm-shell--narrow' : ''}`}>
      {children}
    </div>
  )
}

function Setup() {
  return (
    <Shell narrow>
      <div className="adm-card">
        <Wordmark />
        {import.meta.env.DEV ? (
          <>
            <h1>Connect the dashboard</h1>
            <p className="adm-muted">
              The dashboard needs a Supabase project to store enquiries, projects and images. Follow
              the steps in the README ("Set up the dashboard"), then add these to <code>.env.local</code>{' '}
              and to Vercel:
            </p>
            <pre className="adm-code">{`VITE_SUPABASE_URL=...\nVITE_SUPABASE_ANON_KEY=...`}</pre>
          </>
        ) : (
          <>
            <h1>Studio login</h1>
            <p className="adm-muted">This area is for the Nova Works team.</p>
          </>
        )}
        <Link to="/" className="adm-btn adm-btn--ghost">Back to the site</Link>
      </div>
    </Shell>
  )
}

function Login({ onSignedIn }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  async function onSubmit(e) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setBusy(true)
    setError('')
    try {
      onSignedIn(await signIn(f.get('email'), f.get('password')))
    } catch {
      setError('Email or password is wrong. Check both and try again.')
      setBusy(false)
    }
  }
  return (
    <Shell narrow>
      <form className="adm-card" onSubmit={onSubmit}>
        <Wordmark />
        <h1>Studio dashboard</h1>
        {backend === 'demo' && (
          <p className="adm-note">Preview: type anything to sign in. Nothing you do here is saved.</p>
        )}
        <label className="adm-field">
          Email
          <input id="login-email" name="email" type="email" autoComplete="username" required={backend !== 'demo'} />
        </label>
        <label className="adm-field">
          Password
          <input id="login-password" name="password" type="password" autoComplete="current-password" required={backend !== 'demo'} />
        </label>
        {error && <p className="adm-error" role="alert">{error}</p>}
        <button className="adm-btn" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
        <Link to="/" className="adm-link">Back to the site</Link>
      </form>
    </Shell>
  )
}

function NotAllowed({ email }) {
  return (
    <Shell narrow>
      <div className="adm-card">
        <Wordmark />
        <h1>No access</h1>
        <p className="adm-muted">
          {email} is signed in but isn't on the admin list. Add it to the <code>admins</code> table
          in Supabase, then sign in again.
        </p>
        <button className="adm-btn adm-btn--ghost" onClick={signOut}>Sign out</button>
      </div>
    </Shell>
  )
}

function Dashboard({ session, onSignOut }) {
  const [tab, setTab] = useState(() => {
    try { return localStorage.getItem('nw-admin-tab') || 'enquiries' } catch { return 'enquiries' }
  })
  const [newCount, setNewCount] = useState(0)

  useEffect(() => {
    try { localStorage.setItem('nw-admin-tab', tab) } catch { /* ignore */ }
  }, [tab])

  useEffect(() => {
    listEnquiries().then((list) => setNewCount(list.filter((e) => e.status === 'new').length)).catch(() => {})
  }, [tab])

  return (
    <div className="adm">
      <header className="adm-top">
        <div className="adm-top__inner">
          <Wordmark />
          <nav className="adm-tabs" aria-label="Dashboard sections">
            <button className={tab === 'enquiries' ? 'is-on' : ''} onClick={() => setTab('enquiries')}>
              Enquiries {newCount > 0 && <span className="adm-badge">{newCount}</span>}
            </button>
            <button className={tab === 'projects' ? 'is-on' : ''} onClick={() => setTab('projects')}>
              Projects
            </button>
          </nav>
          <div className="adm-top__right">
            <Link to="/" className="adm-link">View site</Link>
            <span className="adm-muted adm-email">{session.user?.email}</span>
            <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={onSignOut}>Sign out</button>
          </div>
        </div>
      </header>
      {backend === 'demo' && (
        <p className="adm-demo">Preview mode with sample enquiries. Nothing you change here is saved.</p>
      )}
      <main className="adm-main">
        {tab === 'enquiries' ? <Enquiries onCountChange={setNewCount} /> : <Projects />}
      </main>
    </div>
  )
}

export default function AdminApp() {
  const [session, setSession] = useState(undefined) // undefined = still checking
  const [allowed, setAllowed] = useState(null)

  useEffect(() => {
    document.title = 'Dashboard · Nova Works'
    if (backend === 'none') return
    getSession().then(setSession)
    return onAuthChange(setSession)
  }, [])

  useEffect(() => {
    setAllowed(null)
    if (session) checkAdmin().then(setAllowed)
  }, [session])

  async function handleSignOut() {
    await signOut()
    setSession(null)
  }

  if (backend === 'none') return <Setup />
  if (session === undefined) return <div className="adm-loading">Loading…</div>
  if (!session) return <Login onSignedIn={setSession} />
  if (allowed === null) return <div className="adm-loading">Checking access…</div>
  if (!allowed) return <NotAllowed email={session.user?.email} />
  return <Dashboard session={session} onSignOut={handleSignOut} />
}
