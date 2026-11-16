import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import { Footer } from './Contact.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'
import SmoothScroll, { scrollToTarget } from '../motion/SmoothScroll.jsx'
import Cursor from '../motion/Cursor.jsx'
import { ScrollTrigger } from '../motion/gsap.js'

// Shared frame for public pages: smooth scroll, custom cursor, header, footer, WhatsApp.
export default function Layout({ children }) {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    const t = setTimeout(() => {
      ScrollTrigger.refresh()
      const el = hash && document.getElementById(hash.slice(1))
      if (el) scrollToTarget(el)
      else scrollToTarget(0, { immediate: true })
    }, 60)
    return () => clearTimeout(t)
  }, [pathname, hash, key])

  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
