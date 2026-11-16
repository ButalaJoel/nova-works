// Work out what kind of media a URL points to.
export function youtubeId(url = '') {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/)
  return m ? m[1] : null
}

export function mediaKind(url = '') {
  if (youtubeId(url)) return 'youtube'
  if (/\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(url)) return 'video'
  return 'image'
}

export function Media({ url, alt = '', className = '' }) {
  const kind = mediaKind(url)
  if (kind === 'youtube') {
    const id = youtubeId(url)
    return (
      <a className={`media media--yt ${className}`} href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noreferrer">
        <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt={alt || 'Video'} loading="lazy" />
        <span className="media__play" aria-hidden="true" />
        <span className="media__label">Watch on YouTube</span>
      </a>
    )
  }
  if (kind === 'video') {
    return <video className={`media ${className}`} src={url} controls playsInline preload="metadata" />
  }
  // Tall images (posters, social grids) get capped in height so they don't fill several screens.
  const onLoad = (e) => {
    const img = e.currentTarget
    if (img.naturalHeight / img.naturalWidth >= 0.95) img.classList.add('is-tall')
  }
  return <img className={`media ${className}`} src={url} alt={alt} loading="lazy" onLoad={onLoad} />
}

// The first image in a project, used as the card cover when no cover is set.
export function coverOf(project) {
  if (project.cover_url) return project.cover_url
  for (const s of project.sections || []) {
    for (const m of s.media || []) {
      if (mediaKind(m) === 'image') return m
      if (mediaKind(m) === 'youtube') return `https://img.youtube.com/vi/${youtubeId(m)}/hqdefault.jpg`
    }
  }
  return ''
}
