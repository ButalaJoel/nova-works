// One place to register GSAP plugins. Import gsap from here, not from 'gsap' directly.
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

export { gsap, ScrollTrigger, SplitText, useGSAP }

// Animations only run for visitors who haven't asked their device to reduce motion.
export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const DESKTOP = '(min-width: 861px) and (prefers-reduced-motion: no-preference)'
export const MOBILE = '(max-width: 860px) and (prefers-reduced-motion: no-preference)'
