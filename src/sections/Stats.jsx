import { useRef } from 'react'
import { gsap, SplitText, useGSAP, MOTION_OK } from '../motion/gsap.js'
import { useProjects } from '../lib/projects.jsx'
import { disciplines, practices } from '../data/services.js'

// Big counters that run up when they scroll into view.
export default function Stats() {
  const root = useRef(null)
  const { projects } = useProjects()
  const items = [
    { n: projects.length, label: 'Projects on the board' },
    { n: projects.filter((p) => p.category === 'client').length, label: 'Client brands' },
    { n: disciplines.length, label: 'Disciplines in house' },
    { n: practices.length, label: 'Practices, one team' },
  ]

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const split = SplitText.create('.stats__intro', { type: 'lines', mask: 'lines' })
      gsap.from(split.lines, {
        yPercent: 100, duration: 1, stagger: 0.08, ease: 'expo.out',
        scrollTrigger: { trigger: '.stats__intro', start: 'top 85%' },
      })
      gsap.utils.toArray('.stats__n').forEach((el) => {
        const end = Number(el.dataset.n)
        const o = { v: 0 }
        gsap.to(o, {
          v: end, duration: 1.6, ease: 'power3.out',
          onUpdate: () => { el.textContent = Math.round(o.v) },
          scrollTrigger: { trigger: el, start: 'top 90%' },
        })
      })
      gsap.from('.stats__item', {
        y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: 'expo.out',
        scrollTrigger: { trigger: '.stats__row', start: 'top 88%' },
      })
      return () => split.revert()
    })
  }, { scope: root, dependencies: [projects.length] })

  return (
    <section className="stats" ref={root}>
      <div className="wrap">
        <p className="stats__intro">
          One studio from the first sketch to the final website. Strategy, identity, print,
          packaging, <em>motion</em>, marketing and the systems that keep a business running.
        </p>
        <dl className="stats__row">
          {items.map((it) => (
            <div className="stats__item" key={it.label}>
              <dd className="stats__n" data-n={it.n}>{it.n}</dd>
              <dt>{it.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
