import { useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../data/site.js'
import { practices } from '../data/services.js'
import { submitEnquiry, backend } from '../lib/api.js'
import { whatsappLink, WhatsAppIcon } from './WhatsAppButton.jsx'
import Mark from './Mark.jsx'
import { useRef } from 'react'
import { gsap, useGSAP, MOTION_OK } from '../motion/gsap.js'

function composeMessage(f) {
  return [
    `Hello Nova Works, I'm ${f.name}${f.company ? ` from ${f.company}` : ''}.`,
    `The problem: ${f.message}`,
    f.area ? `Area: ${f.area}` : '',
    `Email: ${f.email}${f.phone ? ` · Phone: ${f.phone}` : ''}`,
  ].filter(Boolean).join('\n')
}

export function Contact() {
  const [state, setState] = useState('idle') // idle | sending | sent | fallback
  const [error, setError] = useState('')
  const [fallbackText, setFallbackText] = useState('')
  const wa = whatsappLink()

  async function onSubmit(e) {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.currentTarget))
    // Honeypot: people never see this field, bots fill it in. Pretend it worked.
    if (f.website) { setState('sent'); return }
    const enquiry = {
      name: f.name.trim(),
      company: f.company.trim() || null,
      email: f.email.trim(),
      phone: f.phone.trim() || null,
      area: f.area || null,
      message: f.message.trim(),
    }
    setError('')
    if (backend !== 'supabase') {
      // Not connected to the dashboard yet: hand the visitor a ready message instead.
      setFallbackText(composeMessage(enquiry))
      setState('fallback')
      return
    }
    setState('sending')
    try {
      await submitEnquiry(enquiry)
      setState('sent')
    } catch {
      setFallbackText(composeMessage(enquiry))
      setError('We could not send your message just now. Please send it by email or WhatsApp instead.')
      setState('fallback')
    }
  }

  return (
    <section className="section contact" id="contact">
      <div className="wrap contact__grid">
        <div>
          <p className="eyebrow">Start a project</p>
          <h2 className="contact__title">Got a problem? <em>Let's solve it.</em></h2>
          <p className="section__intro">
            Describe the problem in your own words. We reply within one working day with the
            questions we need answered and a first view of the way forward.
          </p>
          <dl className="contact__details">
            <div>
              <dt>Email</dt>
              <dd className="selectable">{site.email}</dd>
            </div>
            {site.phones?.length > 0 && (
              <div>
                <dt>Phone / WhatsApp</dt>
                {site.phones.map((p) => (
                  <dd key={p.tel}><a className="contact__tel" href={`tel:${p.tel}`}>{p.display}</a></dd>
                ))}
              </div>
            )}
            <div>
              <dt>Studio</dt>
              <dd>{site.city}</dd>
            </div>
          </dl>
          {wa && (
            <a className="btn btn--wa" href={wa} target="_blank" rel="noreferrer">
              <WhatsAppIcon /> Chat on WhatsApp
            </a>
          )}
        </div>

        {state === 'sent' ? (
          <div className="form form--done" aria-live="polite">
            <h3>Message received.</h3>
            <p className="muted">
              Thank you. We will reply to your email within one working day.
              {wa && ' For anything urgent, message us on WhatsApp.'}
            </p>
            <button type="button" className="link" onClick={() => setState('idle')}>Send another message</button>
          </div>
        ) : state === 'fallback' ? (
          <div className="form form--done" aria-live="polite">
            <h3>Your message is ready.</h3>
            <p className="muted">{error || `Send it to us by email${wa ? ' or WhatsApp' : ''}.`}</p>
            <pre className="form__preview">{fallbackText}</pre>
            <div className="form__row">
              <a className="btn" href={`mailto:${site.email}?subject=${encodeURIComponent('New project enquiry')}&body=${encodeURIComponent(fallbackText)}`}>
                Send by email
              </a>
              {wa && (
                <a className="btn btn--ghost" href={whatsappLink(fallbackText)} target="_blank" rel="noreferrer">
                  Send on WhatsApp
                </a>
              )}
            </div>
            <button type="button" className="link" onClick={() => setState('idle')}>Edit message</button>
          </div>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="form__hp" />
            <div className="form__row form__row--2">
              <label>
                Your name
                <input id="f-name" name="name" required maxLength={120} autoComplete="name" />
              </label>
              <label>
                Business
                <input id="f-company" name="company" maxLength={160} autoComplete="organization" />
              </label>
            </div>
            <div className="form__row form__row--2">
              <label>
                Email
                <input id="f-email" name="email" type="email" required maxLength={200} autoComplete="email" />
              </label>
              <label>
                Phone / WhatsApp
                <input id="f-phone" name="phone" type="tel" maxLength={40} autoComplete="tel" placeholder="Optional" />
              </label>
            </div>
            <label>
              What is the problem?
              <textarea
                id="f-message"
                name="message"
                maxLength={5000}
                rows="4"
                required
                placeholder="e.g. Our logo looks different on every sign, bag and post, and customers don't recognise us."
              />
            </label>
            <label>
              Which area is closest? (optional)
              <select id="f-area" name="area" defaultValue="">
                <option value="">Not sure yet</option>
                {practices.map((p) => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </label>
            <button className="btn" type="submit" disabled={state === 'sending'}>
              {state === 'sending' ? 'Sending…' : 'Send message'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  const root = useRef(null)
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.from('.footer__giant span', {
        yPercent: 105, duration: 1.2, stagger: 0.04, ease: 'expo.out',
        scrollTrigger: { trigger: '.footer__giant', start: 'top 95%' },
      })
      gsap.from('.footer__giant .mark polygon', {
        scaleY: 0.1, transformOrigin: '50% 100%', duration: 1.2, stagger: 0.12, ease: 'expo.out',
        scrollTrigger: { trigger: '.footer__giant', start: 'top 95%' },
      })
    })
  }, { scope: root })
  return (
    <footer className="footer band-dark" ref={root}>
      <div className="wrap footer__inner">
        <div>
          <p className="footer__tag">{site.descriptor}.<br />{site.tagline}</p>
          <p className="footer__mail selectable">{site.email}</p>
          <p className="footer__phones">
            {site.phones.map((p) => <a key={p.tel} href={`tel:${p.tel}`}>{p.display}</a>)}
          </p>
        </div>
        <nav className="footer__links" aria-label="Footer">
          <Link to="/#work">Work</Link>
          <Link to="/#logos">Logos</Link>
          <Link to="/#problems">Problems we solve</Link>
          <Link to="/#capabilities">Capabilities</Link>
          <Link to="/#founder">Studio</Link>
          <Link to="/#contact">Contact</Link>
          {site.socials.map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.label}</a>
          ))}
        </nav>
      </div>
      <div className="footer__giant" aria-hidden="true">
        <Mark />
        <span className="footer__word">
          {'NOVA WORKS'.split('').map((c, i) => <span key={i}>{c === ' ' ? '\u00a0' : c}</span>)}
        </span>
      </div>
      <div className="wrap">
        <p className="footer__legal">
          <span>© {year} {site.name}. {site.city}.</span>
          <Link to="/admin">Studio login</Link>
        </p>
      </div>
    </footer>
  )
}
