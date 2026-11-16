import { lazy, Suspense } from 'react'
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom'
import { ProjectsProvider } from './lib/projects.jsx'
import Home from './pages/Home.jsx'
import CaseStudy from './pages/CaseStudy.jsx'
import NotFound from './pages/NotFound.jsx'

// The dashboard code only loads for people who open /admin.
const AdminApp = lazy(() => import('./admin/AdminApp.jsx'))

// Previews run inside a frame where the address bar can't be used, so they keep routes in memory.
const Router = import.meta.env.VITE_DEMO === '1' ? MemoryRouter : BrowserRouter

export default function App() {
  return (
    <Router>
      <ProjectsProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<div className="adm-loading">Loading dashboard…</div>}>
                <AdminApp />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ProjectsProvider>
    </Router>
  )
}
