import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP, MOTION_OK } from '../motion/gsap.js'
import TileArt from '../components/TileArt.jsx'
import { useProjects } from '../lib/projects.jsx'

// "Design in motion": project tiles ride a curved ribbon across the screen as you scroll.
export default function MotionRibbon() {
  const root = useRef(null)
  const { projects } = useProjects()
  const tiles = projects.slice(0, 12)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      root.current.classList.add('is-animated')
      const row = root.current.querySelector('.ribbon__row')
      const cards = gsap.utils.toArray('.ribbon__tile', root.current)
      const distance = () => row.scrollWidth - window.innerWidth * 0.35

      // Bend each tile by how far it is from the centre of the screen.
      const bend = () => {
        const mid = window.innerWidth / 2
        cards.forEach((c) => {
          const r = c.getBoundingClientRect()
          const d = gsap.utils.clamp(-1.4, 1.4, (r.left + r.width / 2 - mid) / mid)
          gsap.set(c.firstChild, {
            rotationY: d * -38,
            rotationZ: d * 4,
            z: -Math.abs(d) * 220,
            y: d * d * 70 - d * 30,
          })
        })
      }

      gsap.set(row, { x: window.innerWidth * 0.55 })
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance() + window.innerHeight * 0.4}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: bend,
          onRefresh: bend,
        },
      })
      tl.to(row, { x: () => -distance(), ease: 'none' }, 0)
        .fromTo('.ribbon__word--l', { xPercent: 0 }, { xPercent: -30, ease: 'none' }, 0)
        .fromTo('.ribbon__word--r', { xPercent: 0 }, { xPercent: 30, ease: 'none' }, 0)
      bend()
      return () => root.current?.classList.remove('is-animated')
    })
  }, { scope: root, dependencies: [tiles.length] })

  return (
    <section className="ribbon band-dark" ref={root} aria-label="Design in motion">
      <div className="ribbon__words" aria-hidden="true">
        <span className="ribbon__word ribbon__word--l">Design in</span>
        <span className="ribbon__word ribbon__word--r"><em>motion</em></span>
      </div>
      <div className="ribbon__track">
        <div className="ribbon__row">
          {tiles.map((p) => (
            <Link key={p.slug} to={`/work/${p.slug}`} className="ribbon__tile" data-cursor="View" aria-label={p.name}>
              <TileArt project={p} />
            </Link>
          ))}
        </div>
      </div>
      <p className="ribbon__caption wrap">
        Logos, packaging, print, video ads, websites. Every tile is a brand we built or are building.
      </p>
    </section>
  )
}
