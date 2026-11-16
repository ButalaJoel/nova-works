import Mark from './Mark.jsx'
import { statusLabels } from '../data/projects.js'

export function StatusPill({ status }) {
  return <span className={`status status--${status}`}>{statusLabels[status] || status}</span>
}

// Real cover image when there is one, otherwise a branded placeholder.
export function ProjectCover({ project, src, large = false, className = '' }) {
  if (src) {
    return (
      <div className={`cover ${large ? 'cover--large' : ''} ${className}`}>
        <img src={src} alt={`${project.name} cover`} loading="lazy" />
      </div>
    )
  }
  return (
    <div className={`cover cover--placeholder cover--${project.category} ${large ? 'cover--large' : ''} ${className}`}>
      <Mark className="cover__mark" />
      <span className="cover__name">{project.name}</span>
      <span className="cover__sector">{project.sector || 'Case study'}</span>
    </div>
  )
}
