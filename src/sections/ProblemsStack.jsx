import { useRef } from 'react'
import { gsap, SplitText, useGSAP, MOTION_OK } from '../motion/gsap.js'
import { problems, practices } from '../data/services.js'

const practiceName = Object.fromEntries(practices.map((p) => [p.id, p.name]))

// Problem cards stack on top of each other as you scroll. Each one shrinks back as the next arrives.
export default function ProblemsStack() {
  const root = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const split = SplitText.create('.problems__title', { type: 'words', mask: 'words' })
      gsap.from(split.words, {
        yPercent: 110, duration: 1.1, stagger: 0.05, ease: 'expo.out',
        scrollTrigger: { trigger: '.problems__title', start: 'top 85%' },
      })
      const cards = gsap.utils.toArray('.pcard')
      cards.forEach((card, i) => {
        const next = cards[i + 1]
        if (!next) return
        gsap.to(card.firstChild, {
          scale: 0.92, opacity: 0.35, ease: 'none',
          scrollTrigger: { trigger: next, start: 'top 85%', end: 'top 20%', scrub: true },
        })
      })
      return () => split.revert()
    })
  }, { scope: root })

  return (
    <section className="problems" id="problems" ref={root}>
      <div className="wrap">
        <div className="problems__head">
          <p className="eyebrow">Problems we solve</p>
          <h2 className="problems__title">Start with the problem, <em>not the deliverable.</em></h2>
          <p className="problems__intro">
            Clients rarely need "a website" or "a logo". They need more customers, less waste and a
            business that runs without chaos.
          </p>
        </div>
        <ol className="problems__stack">
          {problems.map((p, i) => (
            <li key={p.id} className="pcard" style={{ '--i': i }}>
              <div className="pcard__inner">
                <div className="pcard__q">
                  <span className="pcard__n">{String(i + 1).padStart(2, '0')} / {String(problems.length).padStart(2, '0')}</span>
                  <h3>{p.problem}</h3>
                  <p>{p.detail}</p>
                </div>
                <div className="pcard__a">
                  <span className="tag">Solution</span>
                  <p className="pcard__answer">{p.answer}</p>
                  <p className="pcard__via">{p.practices.map((id) => practiceName[id]).join(' · ')}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
