import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import { ProjectCover, StatusPill } from '../components/ProjectBits.jsx'
import { useProjects } from '../lib/projects.jsx'
import { Media, coverOf } from '../lib/media.jsx'
import { categoryLabels } from '../data/projects.js'
import NotFound from './NotFound.jsx'

export default function CaseStudy() {
  const { slug } = useParams()
  const { projects, loading } = useProjects()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]

  useEffect(() => {
    if (project) document.title = `${project.name} · Nova Works`
    return () => { document.title = 'Nova Works' }
  }, [project])

  if (!project) {
    if (loading) return <Layout><section className="section"><div className="wrap muted">Loading…</div></section></Layout>
    return <NotFound />
  }

  const next = projects[(index + 1) % projects.length]
  const sections = (project.sections || []).filter((s) => s.title || s.body || s.media?.length)
  const hasVisuals = sections.some((s) => s.media?.length)
  const isDone = project.status === 'live'

  return (
    <Layout>
      <article className="case">
        <header className="case__head">
          <div className="wrap">
            <Link to="/#work" className="case__back">← All work</Link>
            <div className="card__meta case__meta">
              <StatusPill status={project.status} />
              <span>{project.client || categoryLabels[project.category]}</span>
              {project.sector && <span>{project.sector}</span>}
              {project.year && <span>{project.year}</span>}
            </div>
            <h1 className="case__title">{project.name}</h1>
            {project.summary && <p className="case__summary">{project.summary}</p>}
            {project.disciplines?.length > 0 && (
              <ul className="chips case__chips">
                {project.disciplines.map((d) => <li key={d}>{d}</li>)}
              </ul>
            )}
          </div>
        </header>

        <div className="wrap">
          <ProjectCover project={project} src={coverOf(project)} className="case__cover" />
        </div>

        {(project.problem || project.solution) && (
          <section className="wrap case__story">
            {project.problem && (
              <div>
                <h2 className="case__label">The problem</h2>
                <p>{project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div>
                <h2 className="case__label">{isDone ? 'What we did' : 'What we are doing'}</h2>
                <p>{project.solution}</p>
              </div>
            )}
          </section>
        )}

        {(project.deliverables?.length > 0 || project.stack?.length > 0) && (
          <section className="wrap case__facts">
            {project.deliverables?.length > 0 && (
              <div>
                <h2 className="case__label">Deliverables</h2>
                <ul className="case__list">
                  {project.deliverables.map((d) => <li key={d}>{d}</li>)}
                </ul>
              </div>
            )}
            {project.stack?.length > 0 && (
              <div>
                <h2 className="case__label">Tools</h2>
                <ul className="chips chips--plain">
                  {project.stack.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </div>
            )}
            {project.link && (
              <div>
                <h2 className="case__label">See it live</h2>
                <a className="btn" href={project.link} target="_blank" rel="noreferrer">Visit the website</a>
              </div>
            )}
          </section>
        )}

        {sections.map((s, i) => (
          <section key={i} className="case__chapter">
            <div className="wrap">
              <div className="case__chapter-head">
                <span className="case__n">{String(i + 1).padStart(2, '0')}</span>
                <h2>{s.title}</h2>
                {s.body && <p>{s.body}</p>}
              </div>
              {s.media?.length > 0 && (
                <div className={`case__media case__media--${s.media.length === 1 ? '1' : s.media.length % 2 === 0 ? 'even' : 'odd'}`}>
                  {s.media.map((url) => (
                    <Media key={url} url={url} alt={`${project.name}: ${s.title}`} />
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}

        {!hasVisuals && (
          <div className="wrap">
            <p className="case__soon">Visuals for this project are being added.</p>
          </div>
        )}

        <section className="case__cta">
          <div className="wrap case__cta-inner">
            <div>
              <p className="eyebrow">Have a similar problem?</p>
              <h2>Let's talk about your brand.</h2>
            </div>
            <Link to="/#contact" className="btn">Start a project</Link>
          </div>
        </section>

        {next && next.slug !== project.slug && (
          <Link to={`/work/${next.slug}`} className="case__next">
            <div className="wrap">
              <span className="eyebrow">Next project</span>
              <span className="case__next-name">{next.name} →</span>
            </div>
          </Link>
        )}
      </article>
    </Layout>
  )
}
