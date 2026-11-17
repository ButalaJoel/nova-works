import { useState } from 'react'
import Layout from '../components/Layout.jsx'
import Preloader from '../motion/Preloader.jsx'
import HeroOrbit from '../sections/HeroOrbit.jsx'
import Stats from '../sections/Stats.jsx'
import WorkCollage from '../sections/WorkCollage.jsx'
import MotionRibbon from '../sections/MotionRibbon.jsx'
import ProjectIndex from '../sections/ProjectIndex.jsx'
import ProblemsStack from '../sections/ProblemsStack.jsx'
import CapabilitiesMotion from '../sections/CapabilitiesMotion.jsx'
import StudioMotion from '../sections/StudioMotion.jsx'
import LogoWall from '../sections/LogoWall.jsx'
import { Contact } from '../components/Contact.jsx'

export default function Home() {
  const [ready, setReady] = useState(false)
  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Layout>
        <HeroOrbit ready={ready} />
        <Stats />
        <WorkCollage />
        <MotionRibbon />
        <ProjectIndex />
        <LogoWall />
        <ProblemsStack />
        <CapabilitiesMotion />
        <StudioMotion />
        <Contact />
      </Layout>
    </>
  )
}
