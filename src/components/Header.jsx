import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Wordmark } from './Mark.jsx'
import { site } from '../data/site.js'
import { gsap, ScrollTrigger, useGSAP } from '../motion/gsap.js'

const links = [
  { to: '/#work', label: 'Work' },
  { to: '/#problems', label: 'Problems' },
  { to: '/#capabilities', label: 'Capabilities' },
  { to: '/#founder', label: 'Studio' },
]

export function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const close = () => setOpen(false)

  // Hide while scrolling down, come back when scrolling up.
  useGSAP(() => {
    const st = ScrollTrigger.create({
      start: 'top -120',
      end: 'max',
      onUpdate: (self) => {
        if (open) return
        gsap.to(ref.current, { yPercent: self.direction === 1 ? -110 : 0, duration: 0.35, ease: 'power2.out', overwrite: true })
      },
      onLeaveBack: () => gsap.to(ref.current, { yPercent: 0, duration: 0.3, overwrite: true }),
    })
    ref.current.classList.toggle('header--solid', window.scrollY > 40)
    const solid = ScrollTrigger.create({
      start: 'top -40',
      onToggle: (self) => ref.current?.classList.toggle('header--solid', self.isActive),
    })
    return () => { st.kill(); solid.kill() }
  }, { dependencies: [open] })

  return (
    <header className="header" ref={ref}>
      <div className="wrap header__inner">
        <Link to="/" className="header__brand" aria-label="Nova Works home" onClick={close}>
          <Wordmark />
        </Link>
        <nav className={`nav ${open ? 'nav--open' : ''}`} aria-label="Main">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={close}>
              {l.label}
            </Link>
          ))}
          <a href={`tel:${site.phones[0].tel}`} className="header__phone" onClick={close}>
            <PhoneIcon />
            <span>{site.phones[0].display}</span>
          </a>
          <Link to="/#contact" className="btn btn--small" onClick={close}>
            Start a project
          </Link>
        </nav>
        <a href={`tel:${site.phones[0].tel}`} className="header__call" aria-label={`Call ${site.phones[0].display}`}>
          <PhoneIcon />
        </a>
        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
