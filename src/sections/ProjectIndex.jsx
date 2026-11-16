import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP, DESKTOP, MOTION_OK } from '../motion/gsap.js'
import TileArt from '../components/TileArt.jsx'
import { StatusPill } from '../components/ProjectBits.jsx'
import { useProjects } from '../lib/projects.jsx'
import { workFilters } from '../data/services.js'

const statusOrder = { live: 0, 'in-progress': 1, upcoming: 2 }

// Every project as a list. On desktop a preview follows the mouse over each row.
export default function ProjectIndex() {
  const root = useRef(null)
  const { projects } = useProjects()
  const [filter, setFilter] = useState('all')
  const [hover, setHover] = useState(null)

  const active = workFilters.find((f) => f.id === filter) || workFilters[0]
  const list = projects
    .filter(active.match)
    .sort((a, b) => statusOrder[a.status] - statusOrder[b.status] || (a.sort_order ?? 100) - (b.sort_order ?? 100))
  const filters = workFilters
    .map((f) => ({ ...f, count: projects.filter(f.match).length }))
    .filter((f) => f.count > 0)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.from('.index__row', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.04, ease: 'expo.out',
        scrollTrigger: { trigger: '.index__list', start: 'top 85%' },
      })
    })
    mm.add(DESKTOP, () => {
      const prev = root.current.querySelector('.index__preview')
      const xTo = gsap.quickTo(prev, 'x', { duration: 0.6, ease: 'power3' })
      const yTo = gsap.quickTo(prev, 'y', { duration: 0.6, ease: 'power3' })
      const rTo = gsap.quickTo(prev, 'rotation', { duration: 0.8, ease: 'power3' })
      let lastX = 0
      const move = (e) => {
        const box = root.current.getBoundingClientRect()
        xTo(e.clientX - box.left)
        yTo(e.clientY - box.top)
        rTo(gsap.utils.clamp(-10, 10, (e.clientX - lastX) * 0.6))
        lastX = e.clientX
      }
      const list = root.current.querySelector('.index__list')
      list.addEventListener('pointermove', move)
      return () => list.removeEventListener('pointermove', move)
    })
  }, { scope: root, dependencies: [filter] })

  const hovered = list.find((p) => p.slug === hover)

  return (
    <section className="index" ref={root} aria-label="All projects">
      <div className="wrap">
        <div className="index__head">
          <h2>All projects <sup>{projects.length}</sup></h2>
          <div className="filters" aria-label="Filter projects">
            {filters.map((f) => (
              <button
                key={f.id}
                aria-pressed={filter === f.id}
                className={`filter ${filter === f.id ? 'filter--on' : ''}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
                <span>{f.count}</span>
              </button>
            ))}
          </div>
        </div>

        <ul className="index__list" onPointerLeave={() => setHover(null)}>
          {list.map((p, i) => (
            <li key={p.slug}>
              <Link
                to={`/work/${p.slug}`}
                className="index__row"
                data-cursor="Open"
                onPointerEnter={() => setHover(p.slug)}
              >
                <span className="index__n">{String(i + 1).padStart(2, '0')}</span>
                <span className="index__name">{p.name}</span>
                <span className="index__client">{p.client}</span>
                <span className="index__tags">{(p.disciplines || []).slice(0, 3).join(' · ')}</span>
                <StatusPill status={p.status} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={`index__preview ${hovered ? 'is-on' : ''}`} aria-hidden="true">
        {hovered && <TileArt project={hovered} />}
      </div>
    </section>
  )
}
