import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap.js'

let lenis = null

// Scroll to an element or position, smoothly when Lenis is running.
export function scrollToTarget(target, opts = {}) {
  if (lenis) lenis.scrollTo(target, { offset: -72, duration: 1.2, ...opts })
  else if (typeof target === 'number') window.scrollTo(0, target)
  else target?.scrollIntoView?.({ behavior: 'smooth', block: 'start' })
}

export function stopScroll() { lenis?.stop() }
export function startScroll() { lenis?.start() }

// Smooth scrolling driven by GSAP's clock, so scroll animations stay in sync.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis?.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    document.documentElement.classList.add('lenis')
    return () => {
      gsap.ticker.remove(tick)
      lenis?.destroy()
      lenis = null
      document.documentElement.classList.remove('lenis')
    }
  }, [])
  return null
}
