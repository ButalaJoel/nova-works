import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, SplitText, useGSAP, DESKTOP, MOTION_OK } from '../motion/gsap.js'
import Magnetic from '../motion/Magnetic.jsx'
import Mark from '../components/Mark.jsx'
import { site } from '../data/site.js'
import { useProjects } from '../lib/projects.jsx'

// Cards that float around the founder. depth = how far they drift with the mouse.
function OrbitCard({ className, depth, children }) {
  return (
    <div className={`oc ${className}`} data-depth={depth}>
      <div className="oc__par">
        <div className="oc__float">
          <div className="oc__card">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default function HeroOrbit({ ready }) {
  const root = useRef(null)
  const intro = useRef(null)
  const { projects } = useProjects()
  const clients = projects.filter((p) => p.category === 'client').length
  const bySlug = (s) => projects.find((p) => p.slug === s)
  const peacock = bySlug('peacock-paints')
  const concrete = bySlug('concrete-finisher-ug')
  const ms = bySlug('ms-home-security')

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(MOTION_OK, () => {
      // Entrance, played when the preloader lifts.
      const split = SplitText.create('.ho__title .ho__line', { type: 'words', mask: 'words' })
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
      tl.from(split.words, { yPercent: 115, duration: 1.2, stagger: 0.06 })
        .from('.ho__mark polygon', { scaleY: 0.08, transformOrigin: '50% 100%', duration: 1.3, stagger: 0.14, ease: 'expo.out' }, 0.1)
        .from('.ho__glow', { scale: 0.4, opacity: 0, duration: 1.6, ease: 'expo.out' }, 0.2)
        .from('.oc__card', { scale: 0.4, opacity: 0, y: 40, rotation: () => gsap.utils.random(-12, 12), duration: 1, stagger: 0.08, ease: 'back.out(1.6)' }, 0.55)
        .from('.ho__ring', { scale: 0.6, opacity: 0, duration: 1.4, stagger: 0.1 }, 0.3)
        .from('.ho__eyebrow, .ho__lede, .ho__actions, .ho__scroll', { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, 0.4)
      intro.current = tl

      // Endless gentle float.
      gsap.utils.toArray('.oc__float').forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 ? 14 : -14,
          rotation: i % 2 ? 1.5 : -1.5,
          duration: gsap.utils.random(2.6, 4),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.2,
        })
      })
      return () => split.revert()
    })

    mm.add(DESKTOP, () => {
      // Mouse parallax: each card drifts by its depth.
      const layers = gsap.utils.toArray('.oc').map((el) => ({
        depth: Number(el.dataset.depth || 1),
        x: gsap.quickTo(el.querySelector('.oc__par'), 'x', { duration: 0.9, ease: 'power3' }),
        y: gsap.quickTo(el.querySelector('.oc__par'), 'y', { duration: 0.9, ease: 'power3' }),
      }))
      const px = gsap.quickTo('.ho__center', 'x', { duration: 1.2, ease: 'power3' })
      const py = gsap.quickTo('.ho__center', 'y', { duration: 1.2, ease: 'power3' })
      const move = (e) => {
        const nx = e.clientX / window.innerWidth - 0.5
        const ny = e.clientY / window.innerHeight - 0.5
        layers.forEach((l) => { l.x(nx * 40 * l.depth); l.y(ny * 30 * l.depth) })
        px(nx * -16)
        py(ny * -12)
      }
      window.addEventListener('pointermove', move)

      // Scroll: pin the stage while the cards drift out of orbit.
      const out = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top top', end: '+=70%', scrub: 0.8, pin: '.ho__stage' },
      })
      gsap.utils.toArray('.oc').forEach((el) => {
        const r = el.getBoundingClientRect()
        const dir = r.left + r.width / 2 < window.innerWidth * 0.6 ? -1 : 1
        out.to(el, { x: dir * gsap.utils.random(220, 420), y: gsap.utils.random(-260, 120), rotation: dir * gsap.utils.random(8, 22), opacity: 0, ease: 'power2.in' }, 0)
      })
      out.to('.ho__mark', { scale: 1.25, yPercent: -6, ease: 'none' }, 0)
        .to('.ho__ring', { scale: 1.6, opacity: 0, ease: 'none' }, 0)
        .to('.ho__copy', { yPercent: -18, opacity: 0.15, ease: 'none' }, 0)
        .to('.ho__scroll', { opacity: 0, ease: 'none' }, 0)
      return () => window.removeEventListener('pointermove', move)
    })
  }, { scope: root })

  // Start the entrance when the preloader is done.
  useGSAP(() => {
    if (ready) intro.current?.play()
  }, { dependencies: [ready], scope: root })

  return (
    <section className="ho" ref={root} id="top">
      <div className="ho__stage">
        <div className="wrap ho__grid">
          <div className="ho__copy">
            <p className="eyebrow ho__eyebrow">{site.descriptor} · {site.city}</p>
            <h1 className="ho__title">
              <span className="ho__line">We solve</span>
              <span className="ho__line ho__serif">business problems.</span>
            </h1>
            <p className="ho__lede">
              With brand, design, motion and technology. From the first sketch to the final
              website, built by one studio. {site.tagline}
            </p>
            <div className="ho__actions">
              <Magnetic><Link to="/#contact" className="btn">Start a project</Link></Magnetic>
              <Link to="/#work" className="btn btn--ghost">See the work</Link>
            </div>
          </div>

          <div className="ho__visual">
            <div className="ho__center" aria-hidden="true">
              <span className="ho__glow" />
              <span className="ho__ring ho__ring--1" />
              <span className="ho__ring ho__ring--2" />
              <Mark className="ho__mark" title="Nova Works" />
            </div>

            <OrbitCard className="oc--a" depth={1.4}>
              <span className="oc__swatch oc__swatch--lime" />
              <span className="oc__text"><b>{peacock?.name || 'Peacock Paints'}</b><small>Packaging · Brand · Web</small></span>
            </OrbitCard>
            <OrbitCard className="oc--b" depth={0.8}>
              <span className="oc__big">{clients}</span>
              <span className="oc__text"><small>Client brands built</small></span>
            </OrbitCard>
            <OrbitCard className="oc--c" depth={1.1}>
              <span className="oc__live" />
              <span className="oc__text"><b>{concrete?.name || 'Concrete Finisher UG'}</b><small>Live · Brand from scratch</small></span>
            </OrbitCard>
            <OrbitCard className="oc--d" depth={1.7}>
              <span className="oc__flow">
                <span>Logo</span><i>→</i><span>Print</span><i>→</i><span>Video</span><i>→</i><span className="is-on">Web</span>
              </span>
            </OrbitCard>
            <OrbitCard className="oc--e" depth={0.9}>
              <span className="oc__swatch oc__swatch--ink" />
              <span className="oc__text"><b>{ms?.name || 'MS Home Security'}</b><small>Identity · Stationery · Merch</small></span>
            </OrbitCard>
          </div>
        </div>
        <span className="ho__scroll" aria-hidden="true">Scroll</span>
      </div>
    </section>
  )
}
