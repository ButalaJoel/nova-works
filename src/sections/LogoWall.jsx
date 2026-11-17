import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP, MOTION_OK } from '../motion/gsap.js'
import { logos } from '../data/logos.js'

// Every logo the studio has designed, as a grid of tiles.
export default function LogoWall() {
  const root = useRef(null)
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.from('.logos__tile', {
        y: 50, opacity: 0, scale: 0.94, duration: 1, stagger: { each: 0.06, from: 'start' }, ease: 'expo.out',
        scrollTrigger: { trigger: '.logos__grid', start: 'top 85%' },
      })
    })
  }, { scope: root })

  return (
    <section className="section logos" id="logos" ref={root}>
      <div className="wrap">
        <p className="eyebrow">Logos we designed</p>
        <h2>Marks built <em>from scratch.</em></h2>
        <p className="section__intro">
          Every brand starts with a mark people remember. These are the logos we have drawn for our
          clients and our own ventures.
        </p>
        <ul className="logos__grid">
          {logos.map((l) => {
            const inner = (
              <>
                <img src={l.file} alt={`${l.name} logo`} loading="lazy" />
                <span className="logos__cap">
                  <strong>{l.name}</strong>
                  <span>{l.note}</span>
                </span>
              </>
            )
            return (
              <li key={l.name} className="logos__tile">
                {l.slug ? <Link to={`/work/${l.slug}`}>{inner}</Link> : <div>{inner}</div>}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
