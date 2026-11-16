import { createContext, useContext, useEffect, useState } from 'react'
import { fetchPublicProjects } from './api.js'
import { projects as starter } from '../data/projects.js'

const initial = starter.filter((p) => !p.hidden)
const ProjectsContext = createContext({ projects: initial, loading: true })

// Loads public projects once and shares them with every page.
export function ProjectsProvider({ children }) {
  const [state, setState] = useState({ projects: initial, loading: true })
  useEffect(() => {
    let alive = true
    fetchPublicProjects()
      .then((projects) => alive && setState({ projects, loading: false }))
      .catch(() => alive && setState({ projects: initial, loading: false }))
    return () => { alive = false }
  }, [])
  return <ProjectsContext.Provider value={state}>{children}</ProjectsContext.Provider>
}

export const useProjects = () => useContext(ProjectsContext)
