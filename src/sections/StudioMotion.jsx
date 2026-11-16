import { useRef } from 'react'
import { gsap, SplitText, useGSAP, MOTION_OK } from '../motion/gsap.js'
import { process } from '../data/services.js'
import { site } from '../data/site.js'
import Mark from '../components/Mark.jsx'

// How we build a brand (a line that draws as you scroll) and the studio behind it.
export default function StudioMotion() {
  const root = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const split = SplitText.create('.studio__title', { type: 'words', mask: 'words' })
      gsap.from(split.words, {
        yPercent: 110, duration: 1.1, stagger: 0.05, ease: 'expo.out',
        scrollTrigger: { trigger: '.studio__title', start: 'top 85%' },
      })
      gsap.fromTo('.steps__line-fill', { '--p': 0 }, {
        '--p': 1, ease: 'none',
        scrollTrigger: { trigger: '.steps', start: 'top 75%', end: 'bottom 55%', scrub: 0.6 },
      })
      gsap.utils.toArray('.step').forEach((step) => {
        gsap.from(step, {
          y: 40, opacity: 0.15, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: step, start: 'top 82%', toggleActions: 'play none none reverse' },
        })
      })
      gsap.from('.studio__founder', {
        y: 60, opacity: 0, duration: 1.1, ease: 'expo.out',
        scrollTrigger: { trigger: '.studio__founder', start: 'top 88%' },
      })
      gsap.from('.studio__founder .mark polygon', {
        scaleY: 0.1, transformOrigin: '50% 100%', duration: 1, stagger: 0.12, ease: 'expo.out',
        scrollTrigger: { trigger: '.studio__founder', start: 'top 80%' },
      })
      return () => split.revert()
    })
  }, { scope: root })

  return (
    <section className="studio" id="founder" ref={root}>
      <div className="wrap">
        <div className="studio__head">
          <p className="eyebrow">How we build a brand</p>
          <h2 className="studio__title">The website comes last. <em>The thinking comes first.</em></h2>
        </div>

        <ol className="steps">
          <span className="steps__line" aria-hidden="true"><span className="steps__line-fill" /></span>
          {process.map((s, i) => (
            <li key={s.name} className="step">
              <span className="step__dot" aria-hidden="true" />
              <span className="step__n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="studio__founder">
          <div className="studio__badge" aria-hidden="true"><Mark /></div>
          <div className="studio__copy">
            <p className="eyebrow">The studio</p>
            <p className="studio__lead">
              Nova Works is a Kampala studio where brand, design, motion and technology sit at one
              table, so nothing gets lost between the idea and the launch.
            </p>
            <div className="studio__person">
              <span className="studio__name">{site.founder.name}</span>
              <span className="studio__role">{site.founder.role}</span>
            </div>
            <ul className="chips chips--plain">
              {site.founder.tools.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
