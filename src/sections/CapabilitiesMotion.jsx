import { useRef, useState } from 'react'
import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION_OK } from '../motion/gsap.js'
import { practices } from '../data/services.js'
import Mark from '../components/Mark.jsx'

const all = practices.flatMap((p) => p.services)
const half = Math.ceil(all.length / 2)

function Marquee({ items, reverse = false }) {
  // Items are repeated so the loop never shows a gap.
  const loop = [...items, ...items]
  return (
    <div className={`marquee ${reverse ? 'marquee--rev' : ''}`} aria-hidden="true">
      <div className="marquee__track">
        {loop.map((s, i) => (
          <span key={i} className="marquee__item">
            {s}
            <Mark className="marquee__mark" />
          </span>
        ))}
      </div>
    </div>
  )
}

export default function CapabilitiesMotion() {
  const root = useRef(null)
  const [open, setOpen] = useState(practices[0].id)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      // Endless marquees that speed up while the page is scrolling.
      const tweens = gsap.utils.toArray('.marquee').map((m) => {
        const track = m.querySelector('.marquee__track')
        const rev = m.classList.contains('marquee--rev')
        return gsap.fromTo(track, { xPercent: rev ? -50 : 0 }, { xPercent: rev ? 0 : -50, duration: 40, ease: 'none', repeat: -1 })
      })
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 6)
          tweens.forEach((t) => gsap.to(t, { timeScale: boost, duration: 0.2, overwrite: true }))
          gsap.to(tweens, { timeScale: 1, duration: 1, delay: 0.25, overwrite: false })
        },
      })
      const split = SplitText.create('.caps__title', { type: 'words', mask: 'words' })
      gsap.from(split.words, {
        yPercent: 110, duration: 1.1, stagger: 0.05, ease: 'expo.out',
        scrollTrigger: { trigger: '.caps__title', start: 'top 85%' },
      })
      gsap.from('.caps__row', {
        y: 30, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'expo.out',
        scrollTrigger: { trigger: '.caps__list', start: 'top 85%' },
      })
      return () => { st.kill(); split.revert() }
    })
  }, { scope: root })

  return (
    <section className="caps band-dark" id="capabilities" ref={root}>
      <Marquee items={all.slice(0, half)} />
      <Marquee items={all.slice(half)} reverse />
      <div className="wrap caps__body">
        <div className="caps__head">
          <p className="eyebrow">Capabilities</p>
          <h2 className="caps__title">Five practices, <em>one team, one plan.</em></h2>
          <p className="caps__intro">
            Every engagement draws on whichever practices the problem needs, so strategy, creative,
            media and technology stay aligned instead of being bought from four different vendors.
          </p>
        </div>
        <ul className="caps__list">
          {practices.map((p, i) => {
            const isOpen = open === p.id
            return (
              <li key={p.id} className={`caps__row ${isOpen ? 'is-open' : ''}`}>
                <button
                  className="caps__toggle"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : p.id)}
                  onPointerEnter={(e) => e.pointerType === 'mouse' && setOpen(p.id)}
                >
                  <span className="caps__n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="caps__name">{p.name}</span>
                  <span className="caps__summary">{p.summary}</span>
                  <span className="caps__plus" aria-hidden="true" />
                </button>
                <div className="caps__panel">
                  <ul>
                    {p.services.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
