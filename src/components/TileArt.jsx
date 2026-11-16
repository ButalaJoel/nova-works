import Mark from './Mark.jsx'
import { coverOf } from '../lib/media.jsx'

// Designed stand-in artwork for projects that don't have images yet.
// Each project gets a stable palette and layout from its slug.
const palettes = ['ink', 'lime', 'paper', 'grey', 'ink-lime']
const layouts = ['type', 'mark', 'stripes']

function hash(s = '') {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

export default function TileArt({ project, className = '', showImage = true }) {
  const src = showImage ? coverOf(project) : ''
  if (src) {
    return (
      <div className={`tile tile--image ${className}`}>
        <img src={src} alt={`${project.name}`} loading="lazy" draggable="false" />
      </div>
    )
  }
  const h = hash(project.slug)
  const palette = palettes[h % palettes.length]
  const layout = layouts[(h >> 3) % layouts.length]
  const tag = project.disciplines?.[0] || project.sector || 'Case study'
  return (
    <div className={`tile tile--${palette} tile--${layout} ${className}`} aria-hidden="true">
      <span className="tile__top">
        <span>{project.sector || 'Nova Works'}</span>
        <span>{project.year || ''}</span>
      </span>
      {layout === 'mark' && <Mark className="tile__mark" />}
      {layout === 'stripes' && <span className="tile__stripes" />}
      <span className="tile__name">{project.name}</span>
      <span className="tile__tag">{tag}</span>
    </div>
  )
}
