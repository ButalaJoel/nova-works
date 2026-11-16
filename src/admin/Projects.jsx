import { useEffect, useRef, useState } from 'react'
import {
  backend, listAllProjects, saveProject, deleteProject, importStarterProjects, uploadMedia,
} from '../lib/api.js'
import { Media, coverOf, mediaKind, youtubeId } from '../lib/media.jsx'
import { disciplines as allDisciplines } from '../data/services.js'
import { statusLabels, categoryLabels, projects as starter } from '../data/projects.js'

const slugify = (s) =>
  s.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-')

const blank = () => ({
  slug: '', name: '', client: '', category: 'client', status: 'in-progress', sector: '',
  year: new Date().getFullYear(), featured: false, hidden: false, sort_order: 50,
  summary: '', problem: '', solution: '', disciplines: [], deliverables: [], stack: [],
  link: '', cover_url: '', sections: [{ title: '', body: '', media: [] }],
})

const move = (arr, from, to) => {
  if (to < 0 || to >= arr.length) return arr
  const copy = [...arr]
  const [item] = copy.splice(from, 1)
  copy.splice(to, 0, item)
  return copy
}

/* ---------- Upload button ---------- */
function UploadButton({ folder, multiple = false, label, onUploaded, accept = 'image/*,video/mp4,video/webm,video/quicktime' }) {
  const ref = useRef(null)
  const [busy, setBusy] = useState('')
  const [error, setError] = useState('')
  async function onPick(e) {
    const files = [...e.target.files]
    e.target.value = ''
    if (!files.length) return
    setError('')
    const urls = []
    try {
      for (let i = 0; i < files.length; i++) {
        setBusy(`Uploading ${i + 1} of ${files.length}…`)
        urls.push(await uploadMedia(files[i], folder || 'misc'))
      }
    } catch (err) {
      setError(err.message || 'Upload failed.')
    } finally {
      setBusy('')
      if (urls.length) onUploaded(urls)
    }
  }
  return (
    <span className="adm-upload">
      <button type="button" className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => ref.current.click()} disabled={!!busy}>
        {busy || label}
      </button>
      <input ref={ref} type="file" hidden multiple={multiple} accept={accept} onChange={onPick} />
      {error && <span className="adm-error">{error}</span>}
    </span>
  )
}

/* ---------- Media strip for one section ---------- */
function MediaStrip({ media, onChange }) {
  return (
    <ul className="adm-media">
      {media.map((url, i) => (
        <li key={url + i}>
          <div className="adm-media__thumb">
            {mediaKind(url) === 'video' ? (
              <video src={url} muted preload="metadata" />
            ) : mediaKind(url) === 'youtube' ? (
              <img src={`https://img.youtube.com/vi/${youtubeId(url)}/mqdefault.jpg`} alt="" />
            ) : (
              <img src={url} alt="" />
            )}
            {mediaKind(url) !== 'image' && <span className="adm-media__kind">{mediaKind(url) === 'youtube' ? 'YouTube' : 'Video'}</span>}
          </div>
          <div className="adm-media__tools">
            <button type="button" aria-label="Move left" onClick={() => onChange(move(media, i, i - 1))} disabled={i === 0}>←</button>
            <button type="button" aria-label="Move right" onClick={() => onChange(move(media, i, i + 1))} disabled={i === media.length - 1}>→</button>
            <button type="button" aria-label="Remove" className="is-danger" onClick={() => onChange(media.filter((_, j) => j !== i))}>✕</button>
          </div>
        </li>
      ))}
    </ul>
  )
}

/* ---------- Editor ---------- */
function Editor({ initial, onClose, onSaved, onDeleted }) {
  const [p, setP] = useState(initial)
  const [slugTouched, setSlugTouched] = useState(Boolean(initial.id))
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [ytDrafts, setYtDrafts] = useState({})
  const [stackText, setStackText] = useState((initial.stack || []).join(', '))
  const folder = p.slug || 'drafts'

  const set = (key, value) => setP((cur) => ({ ...cur, [key]: value }))
  const setSection = (i, patch) =>
    setP((cur) => ({ ...cur, sections: cur.sections.map((s, j) => (j === i ? { ...s, ...patch } : s)) }))

  function onName(value) {
    setP((cur) => ({ ...cur, name: value, slug: slugTouched ? cur.slug : slugify(value) }))
  }

  function toggleDiscipline(d) {
    set('disciplines', p.disciplines.includes(d) ? p.disciplines.filter((x) => x !== d) : [...p.disciplines, d])
  }

  function addYoutube(i) {
    const url = (ytDrafts[i] || '').trim()
    if (!youtubeId(url)) {
      setNotice({ type: 'error', text: 'That is not a YouTube link. Copy it from the Share button on YouTube.' })
      return
    }
    setSection(i, { media: [...p.sections[i].media, url] })
    setYtDrafts((d) => ({ ...d, [i]: '' }))
    setNotice(null)
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (!p.name.trim() || !p.slug.trim()) {
      setNotice({ type: 'error', text: 'A project needs a name and a web address.' })
      return
    }
    setBusy(true)
    setNotice(null)
    try {
      const clean = {
        ...p,
        slug: slugify(p.slug),
        year: p.year ? Number(p.year) : null,
        sort_order: Number(p.sort_order) || 100,
        deliverables: p.deliverables.map((x) => x.trim()).filter(Boolean),
        stack: stackText.split(',').map((x) => x.trim()).filter(Boolean),
        sections: p.sections
          .map((s) => ({ title: s.title.trim(), body: s.body.trim(), media: s.media }))
          .filter((s) => s.title || s.body || s.media.length),
      }
      const saved = await saveProject(clean)
      setP({ ...saved, sections: saved.sections?.length ? saved.sections : [{ title: '', body: '', media: [] }] })
      setSlugTouched(true)
      setNotice({ type: 'ok', text: 'Saved. The site shows the change on the next page load.' })
      onSaved(saved)
    } catch (err) {
      setNotice({ type: 'error', text: err.message || 'Could not save.' })
    } finally {
      setBusy(false)
    }
  }

  async function remove() {
    await deleteProject(p.id)
    onDeleted(p.id)
  }

  return (
    <form className="adm-editor" onSubmit={onSubmit}>
      <div className="adm-editor__bar">
        <button type="button" className="adm-link" onClick={onClose}>← All projects</button>
        <h2>{p.id ? p.name || 'Untitled' : 'New project'}</h2>
      </div>

      <fieldset className="adm-block">
        <legend>Basics</legend>
        <div className="adm-grid">
          <label className="adm-field adm-span-2">
            Project name
            <input id="p-name" value={p.name} onChange={(e) => onName(e.target.value)} required />
          </label>
          <label className="adm-field">
            Web address
            <span className="adm-prefix"><span>/work/</span>
              <input id="p-slug" value={p.slug} onChange={(e) => { setSlugTouched(true); set('slug', e.target.value) }} required />
            </span>
          </label>
          <label className="adm-field">
            Client
            <input id="p-client" value={p.client || ''} onChange={(e) => set('client', e.target.value)} />
          </label>
          <label className="adm-field">
            Sector
            <input id="p-sector" value={p.sector || ''} onChange={(e) => set('sector', e.target.value)} placeholder="e.g. Construction" />
          </label>
          <label className="adm-field">
            Year
            <input id="p-year" type="number" value={p.year || ''} onChange={(e) => set('year', e.target.value)} />
          </label>
          <label className="adm-field">
            Type
            <select id="p-category" value={p.category} onChange={(e) => set('category', e.target.value)}>
              {Object.entries(categoryLabels).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </label>
          <label className="adm-field">
            Status
            <select id="p-status" value={p.status} onChange={(e) => set('status', e.target.value)}>
              {Object.entries(statusLabels).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </label>
          <label className="adm-field">
            Order (lower shows first)
            <input id="p-order" type="number" value={p.sort_order} onChange={(e) => set('sort_order', e.target.value)} />
          </label>
          <label className="adm-field">
            Live link
            <input id="p-link" type="url" value={p.link || ''} onChange={(e) => set('link', e.target.value)} placeholder="https://" />
          </label>
        </div>
        <div className="adm-checks">
          <label><input id="p-featured" type="checkbox" checked={p.featured} onChange={(e) => set('featured', e.target.checked)} /> Featured (large card at the top)</label>
          <label><input id="p-hidden" type="checkbox" checked={p.hidden} onChange={(e) => set('hidden', e.target.checked)} /> Hidden from the public site</label>
        </div>
      </fieldset>

      <fieldset className="adm-block">
        <legend>The story</legend>
        <label className="adm-field">
          One-line summary (shown on the card)
          <input id="p-summary" value={p.summary || ''} onChange={(e) => set('summary', e.target.value)} maxLength={220} />
        </label>
        <label className="adm-field">
          The problem
          <textarea id="p-problem" rows="3" value={p.problem || ''} onChange={(e) => set('problem', e.target.value)} />
        </label>
        <label className="adm-field">
          What we did
          <textarea id="p-solution" rows="3" value={p.solution || ''} onChange={(e) => set('solution', e.target.value)} />
        </label>
        <div className="adm-field">
          Disciplines
          <div className="adm-tags">
            {allDisciplines.map((d) => (
              <button type="button" key={d} className={p.disciplines.includes(d) ? 'is-on' : ''} onClick={() => toggleDiscipline(d)} aria-pressed={p.disciplines.includes(d)}>
                {d}
              </button>
            ))}
          </div>
        </div>
        <div className="adm-grid">
          <label className="adm-field">
            Deliverables (one per line)
            <textarea id="p-deliverables" rows="5" value={p.deliverables.join('\n')} onChange={(e) => set('deliverables', e.target.value.split('\n').map((x) => x.trimStart()).filter((x, i, a) => x || i === a.length - 1))} placeholder={'Logo\nBusiness cards\nPackaging'} />
          </label>
          <label className="adm-field">
            Tools (comma separated)
            <input id="p-stack" value={stackText} onChange={(e) => setStackText(e.target.value)} placeholder="Illustrator, After Effects, React" />
          </label>
        </div>
      </fieldset>

      <fieldset className="adm-block">
        <legend>Cover image</legend>
        <div className="adm-cover">
          {p.cover_url ? <Media url={p.cover_url} /> : <p className="adm-muted">No cover yet. The first image in the chapters below is used instead.</p>}
          <div className="adm-actions">
            <UploadButton folder={folder} label={p.cover_url ? 'Replace cover' : 'Upload cover'} accept="image/*" onUploaded={([u]) => set('cover_url', u)} />
            {p.cover_url && <button type="button" className="adm-link adm-link--danger" onClick={() => set('cover_url', '')}>Remove cover</button>}
          </div>
        </div>
      </fieldset>

      <fieldset className="adm-block">
        <legend>Case study chapters</legend>
        <p className="adm-muted adm-help">
          One chapter per piece of work, e.g. Logo &amp; identity, Packaging, Business cards &amp; invoices,
          Video ads, Website. Upload images or short videos (under 50 MB). For longer videos, upload to
          YouTube and paste the link.
        </p>
        {p.sections.map((s, i) => (
          <div key={i} className="adm-section">
            <div className="adm-section__head">
              <span className="adm-num">{String(i + 1).padStart(2, '0')}</span>
              <input id={`s-title-${i}`} aria-label="Chapter title" placeholder="Chapter title, e.g. Packaging" value={s.title} onChange={(e) => setSection(i, { title: e.target.value })} />
              <div className="adm-section__tools">
                <button type="button" aria-label="Move up" onClick={() => set('sections', move(p.sections, i, i - 1))} disabled={i === 0}>↑</button>
                <button type="button" aria-label="Move down" onClick={() => set('sections', move(p.sections, i, i + 1))} disabled={i === p.sections.length - 1}>↓</button>
                <button type="button" aria-label="Remove chapter" className="is-danger" onClick={() => set('sections', p.sections.filter((_, j) => j !== i))}>✕</button>
              </div>
            </div>
            <textarea id={`s-body-${i}`} aria-label="Chapter text" rows="2" placeholder="A sentence or two about this part of the work (optional)" value={s.body} onChange={(e) => setSection(i, { body: e.target.value })} />
            {s.media.length > 0 && <MediaStrip media={s.media} onChange={(media) => setSection(i, { media })} />}
            <div className="adm-actions">
              <UploadButton folder={folder} multiple label="Add images or videos" onUploaded={(urls) => setSection(i, { media: [...p.sections[i].media, ...urls] })} />
              <span className="adm-yt">
                <input id={`s-yt-${i}`} aria-label="YouTube link" placeholder="Paste a YouTube link" value={ytDrafts[i] || ''} onChange={(e) => setYtDrafts((d) => ({ ...d, [i]: e.target.value }))} />
                <button type="button" className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => addYoutube(i)}>Add</button>
              </span>
            </div>
          </div>
        ))}
        <button type="button" className="adm-btn adm-btn--ghost" onClick={() => set('sections', [...p.sections, { title: '', body: '', media: [] }])}>
          + Add chapter
        </button>
      </fieldset>

      <div className="adm-savebar">
        {notice && <p className={notice.type === 'ok' ? 'adm-ok' : 'adm-error'} role="status">{notice.text}</p>}
        <div className="adm-actions">
          <button className="adm-btn" disabled={busy}>{busy ? 'Saving…' : 'Save project'}</button>
          <button type="button" className="adm-btn adm-btn--ghost" onClick={onClose}>Close</button>
          {p.id && !confirmDelete && (
            <button type="button" className="adm-link adm-link--danger adm-push" onClick={() => setConfirmDelete(true)}>Delete project</button>
          )}
          {confirmDelete && (
            <span className="adm-confirm adm-push">
              Delete {p.name} for good?
              <button type="button" className="adm-btn adm-btn--danger adm-btn--sm" onClick={remove}>Delete</button>
              <button type="button" className="adm-link" onClick={() => setConfirmDelete(false)}>Cancel</button>
            </span>
          )}
        </div>
      </div>
    </form>
  )
}

/* ---------- List ---------- */
export default function Projects() {
  const [items, setItems] = useState(null)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null)
  const [importing, setImporting] = useState(false)

  const load = () =>
    listAllProjects()
      .then((list) => { setItems(list); setError('') })
      .catch((e) => setError(e.message || 'Could not load projects.'))

  useEffect(() => { load() }, [])

  async function runImport() {
    setImporting(true)
    try {
      await importStarterProjects()
      await load()
    } catch (e) {
      setError(e.message)
    } finally {
      setImporting(false)
    }
  }

  if (editing) {
    return (
      <Editor
        key={editing.id || 'new'}
        initial={{ ...blank(), ...editing, sections: editing.sections?.length ? editing.sections : blank().sections }}
        onClose={() => { setEditing(null); load() }}
        onSaved={(saved) => setItems((list) => {
          const exists = list.some((x) => x.id === saved.id)
          return exists ? list.map((x) => (x.id === saved.id ? saved : x)) : [...list, saved]
        })}
        onDeleted={(id) => { setItems((list) => list.filter((x) => x.id !== id)); setEditing(null) }}
      />
    )
  }

  if (error) return <p className="adm-error">{error} <button className="adm-link" onClick={load}>Try again</button></p>
  if (!items) return <p className="adm-muted">Loading projects…</p>

  return (
    <div className="adm-projects">
      <div className="adm-projects__head">
        <div>
          <h2>Projects</h2>
          <p className="adm-muted">{items.length} projects · {items.filter((x) => !x.hidden).length} public</p>
        </div>
        <button className="adm-btn" onClick={() => setEditing(blank())}>+ New project</button>
      </div>

      {items.length === 0 && backend === 'supabase' && (
        <div className="adm-card adm-card--inline">
          <h3>Start with your existing projects</h3>
          <p className="adm-muted">
            Copy the {starter.length} projects already written for the site (Peacock, Concrete Finisher,
            MS Home Security and the rest) into the dashboard, then add images to each.
          </p>
          <button className="adm-btn" onClick={runImport} disabled={importing}>
            {importing ? 'Importing…' : `Import ${starter.length} starter projects`}
          </button>
        </div>
      )}

      <ul className="adm-plist">
        {items.map((x) => {
          const cover = coverOf(x)
          const media = (x.sections || []).reduce((n, s) => n + (s.media?.length || 0), 0)
          return (
            <li key={x.id}>
              <button className="adm-prow" onClick={() => setEditing(x)}>
                <span className="adm-prow__thumb">{cover ? <img src={cover} alt="" /> : <span>{x.name.slice(0, 1)}</span>}</span>
                <span className="adm-prow__main">
                  <strong>{x.name}</strong>
                  <span className="adm-muted">{[x.client, categoryLabels[x.category]].filter(Boolean).join(' · ')}</span>
                </span>
                <span className="adm-prow__flags">
                  <span className={`adm-pill adm-pill--${x.status}`}>{statusLabels[x.status]}</span>
                  {x.featured && <span className="adm-pill">Featured</span>}
                  {x.hidden && <span className="adm-pill adm-pill--archived">Hidden</span>}
                  <span className={`adm-pill ${media ? '' : 'adm-pill--warn'}`}>{media ? `${media} media` : 'No images'}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
