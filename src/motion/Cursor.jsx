import { useEffect, useRef, useState } from 'react'
import { gsap } from './gsap.js'

// A dot that follows the mouse. It grows over links and shows a label over
// anything with data-cursor="View" (or any word). Mouse users only.
export default function Cursor() {
  const dot = useRef(null)
  const [label, setLabel] = useState('')
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)')
    setEnabled(mq.matches)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const el = dot.current
    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3' })
    const move = (e) => { xTo(e.clientX); yTo(e.clientY) }
    const over = (e) => {
      const t = e.target.closest?.('[data-cursor], a, button, input, textarea, select, label')
      if (!t) { el.dataset.state = ''; setLabel(''); return }
      const text = t.getAttribute('data-cursor')
      if (text) { el.dataset.state = 'label'; setLabel(text) }
      else if (/INPUT|TEXTAREA|SELECT/.test(t.tagName)) { el.dataset.state = 'text'; setLabel('') }
      else { el.dataset.state = 'link'; setLabel('') }
    }
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.2 })
    const enter = () => gsap.to(el, { opacity: 1, duration: 0.2 })
    window.addEventListener('pointermove', move)
    document.addEventListener('pointerover', over)
    document.documentElement.addEventListener('pointerleave', leave)
    document.documentElement.addEventListener('pointerenter', enter)
    document.documentElement.classList.add('has-cursor')
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
      document.documentElement.removeEventListener('pointerenter', enter)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <div className="cursor" ref={dot} aria-hidden="true">
      <span>{label}</span>
    </div>
  )
}
