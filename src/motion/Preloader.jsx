import { useRef, useState } from 'react'
import { gsap, useGSAP } from './gsap.js'
import Mark from '../components/Mark.jsx'

const seenKey = 'nw-intro-seen'
const alreadySeen = () => {
  try { return sessionStorage.getItem(seenKey) === '1' } catch { return false }
}

// Short intro: the logo bars rise while a counter runs to 100, then the curtain lifts.
// Plays once per visit. Calls onDone when the page should start its own entrance.
export default function Preloader({ onDone }) {
  const root = useRef(null)
  const [show] = useState(() =>
    !alreadySeen() && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useGSAP(() => {
    if (!show) { onDone?.(); return }
    const counter = { v: 0 }
    const num = root.current.querySelector('.preloader__num')
    const tl = gsap.timeline({
      onComplete: () => {
        try { sessionStorage.setItem(seenKey, '1') } catch { /* ignore */ }
        root.current && (root.current.style.display = 'none')
      },
    })
    tl.from('.preloader .mark polygon', { scaleY: 0, transformOrigin: '50% 100%', duration: 0.8, stagger: 0.12, ease: 'expo.out' })
      .to(counter, { v: 100, duration: 1.1, ease: 'power2.inOut', onUpdate: () => { num.textContent = String(Math.round(counter.v)).padStart(3, '0') } }, 0)
      .to('.preloader__inner', { yPercent: -40, opacity: 0, duration: 0.5, ease: 'power3.in' }, '+=0.1')
      .add(() => onDone?.(), '-=0.15')
      .to(root.current, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, '-=0.25')
  }, { scope: root })

  if (!show) return null
  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="preloader__inner">
        <Mark />
        <span className="preloader__num">000</span>
      </div>
    </div>
  )
}
