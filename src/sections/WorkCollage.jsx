import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, SplitText, useGSAP, DESKTOP, MOTION_OK } from '../motion/gsap.js'
import TileArt from '../components/TileArt.jsx'
import { StatusPill } from '../components/ProjectBits.jsx'
import { useProjects } from '../lib/projects.jsx'

// Selected work: cards start scattered like a pinboard and settle into a grid as you scroll.
export default function WorkCollage() {
  const root = useRef(null)
  const { projects } = useProjects()
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured && p.category === 'client')
  const picks = [...featured, ...rest].slice(0, 6)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const split = SplitText.create('.collage__title', { type: 'words', mask: 'words' })
      gsap.from(split.words, {
        yPercent: 110, duration: 1.1, stagger: 0.05, ease: 'expo.out',
        scrollTrigger: { trigger: '.collage__title', start: 'top 85%' },
      })
      return () => split.revert()
    })
    mm.add(DESKTOP, () => {
      gsap.utils.toArray('.collage__card').forEach((card, i) => {
        gsap.from(card, {
          x: gsap.utils.random(-260, 260),
          y: gsap.utils.random(180, 420),
          rotation: gsap.utils.random(-16, 16),
          scale: 0.82,
          ease: 'none',
          scrollTrigger: { trigger: '.collage__grid', start: `top ${95 - (i % 3) * 4}%`, end: 'top 25%', scrub: 1 },
        })
      })
    })
    mm.add('(max-width: 860px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray('.collage__card').forEach((card) => {
        gsap.from(card, { y: 60, rotation: gsap.utils.random(-5, 5), opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: card, start: 'top 92%' } })
      })
    })
  }, { scope: root, dependencies: [picks.length] })

  return (
    <section className="collage" id="work" ref={root}>
      <div className="wrap">
        <div className="collage__head">
          <p className="eyebrow">Selected work</p>
          <h2 className="collage__title">Brands we built, <em>problems we solved.</em></h2>
          <p className="collage__intro">
            Most clients came to us for one thing and left with a whole brand: logo, print,
            packaging, video, social media, and the website that ties it together.
          </p>
        </div>
        <div className="collage__grid">
          {picks.map((p, i) => (
            <Link key={p.slug} to={`/work/${p.slug}`} className={`collage__card collage__card--${i}`} data-cursor="View">
              <TileArt project={p} className="collage__art" />
              <span className="collage__meta">
                <span className="collage__name">{p.name}</span>
                <StatusPill status={p.status} />
              </span>
              <span className="collage__tags">{(p.disciplines || []).slice(0, 3).join(' · ')}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
