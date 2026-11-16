import { supabase, isDemo } from './supabase.js'
import { projects as starter } from '../data/projects.js'

// 'supabase' when connected, 'demo' for previews, 'none' when not set up yet.
export const backend = supabase ? 'supabase' : isDemo ? 'demo' : 'none'

const BUCKET = 'portfolio'
const PROJECT_FIELDS = [
  'slug', 'name', 'client', 'category', 'status', 'sector', 'year', 'featured', 'hidden',
  'sort_order', 'summary', 'problem', 'solution', 'disciplines', 'deliverables', 'stack',
  'link', 'cover_url', 'sections',
]
const pick = (obj) => Object.fromEntries(PROJECT_FIELDS.map((k) => [k, obj[k]]))
const byOrder = (a, b) => (a.sort_order ?? 100) - (b.sort_order ?? 100)

/* ---------------- Demo store (preview only, nothing is saved) ---------------- */
const now = Date.now()
const demo = {
  session: null,
  projects: starter.map((p) => ({ ...p, id: p.slug })),
  enquiries: [
    {
      id: 'e1', status: 'new', created_at: new Date(now - 36e5 * 3).toISOString(),
      name: 'Sarah N. (sample)', company: 'Sample Bakery', email: 'sarah@example.com', phone: '256700000001',
      area: 'Brand & Identity',
      message: 'We are opening a second branch next month and our logo looks different on every sign and bag. Can you help us sort out the brand before launch?',
    },
    {
      id: 'e2', status: 'new', created_at: new Date(now - 36e5 * 27).toISOString(),
      name: 'David K. (sample)', company: 'Sample Hardware', email: 'david@example.com', phone: '',
      area: 'Digital Marketing & Growth',
      message: 'We spend on Facebook ads every month but cannot tell if they bring customers. Looking for someone to manage our pages and report results.',
    },
    {
      id: 'e3', status: 'replied', created_at: new Date(now - 36e5 * 80).toISOString(),
      name: 'Grace A. (sample)', company: '', email: 'grace@example.com', phone: '256700000003',
      area: '', message: 'How much would a simple website for my salon cost?',
      reply: 'Hi Grace, thanks for reaching out. Could we have a 20 minute call this week to understand what you need?',
      replied_at: new Date(now - 36e5 * 70).toISOString(),
    },
  ],
}

/* ---------------- Public site ---------------- */
export async function fetchPublicProjects() {
  const fallback = starter.filter((p) => !p.hidden).sort(byOrder)
  if (!supabase) return fallback
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('hidden', false)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  if (error || !data?.length) return fallback
  return data
}

export async function submitEnquiry(enquiry) {
  if (!supabase) throw new Error('NOT_CONNECTED')
  const { error } = await supabase.from('enquiries').insert({ ...enquiry, status: 'new' })
  if (error) throw error
}

/* ---------------- Auth ---------------- */
export async function getSession() {
  if (backend === 'demo') return demo.session
  const { data } = await supabase.auth.getSession()
  return data.session
}

export function onAuthChange(cb) {
  if (backend === 'demo') return () => {}
  const { data } = supabase.auth.onAuthStateChange((_event, session) => cb(session))
  return () => data.subscription.unsubscribe()
}

export async function signIn(email, password) {
  if (backend === 'demo') {
    demo.session = { user: { email: email || 'demo@novaworks.co.ug' }, access_token: 'demo' }
    return demo.session
  }
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data.session
}

export async function signOut() {
  if (backend === 'demo') { demo.session = null; return }
  await supabase.auth.signOut()
}

export async function checkAdmin() {
  if (backend === 'demo') return true
  const { data, error } = await supabase.rpc('is_admin')
  if (error) return false
  return data === true
}

/* ---------------- Enquiries ---------------- */
export async function listEnquiries() {
  if (backend === 'demo') return [...demo.enquiries]
  const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function updateEnquiry(id, patch) {
  if (backend === 'demo') {
    demo.enquiries = demo.enquiries.map((e) => (e.id === id ? { ...e, ...patch } : e))
    return demo.enquiries.find((e) => e.id === id)
  }
  const { data, error } = await supabase.from('enquiries').update(patch).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteEnquiry(id) {
  if (backend === 'demo') { demo.enquiries = demo.enquiries.filter((e) => e.id !== id); return }
  const { error } = await supabase.from('enquiries').delete().eq('id', id)
  if (error) throw error
}

// Sends the reply email through /api/reply (Vercel function + Resend).
export async function sendReplyEmail({ to, subject, text }) {
  if (backend === 'demo') return { ok: true }
  const { data } = await supabase.auth.getSession()
  const res = await fetch('/api/reply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${data.session?.access_token}` },
    body: JSON.stringify({ to, subject, text }),
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(body.error || `Sending failed (${res.status}).`)
  return body
}

/* ---------------- Projects ---------------- */
export async function listAllProjects() {
  if (backend === 'demo') return [...demo.projects].sort(byOrder)
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function saveProject(project) {
  const row = pick(project)
  if (backend === 'demo') {
    if (demo.projects.some((p) => p.slug === row.slug && p.id !== project.id)) {
      throw new Error('Another project already uses this web address. Change the slug.')
    }
    const saved = { ...row, id: project.id || row.slug }
    demo.projects = project.id
      ? demo.projects.map((p) => (p.id === project.id ? saved : p))
      : [...demo.projects, saved]
    return saved
  }
  const query = project.id
    ? supabase.from('projects').update({ ...row, updated_at: new Date().toISOString() }).eq('id', project.id)
    : supabase.from('projects').insert(row)
  const { data, error } = await query.select().single()
  if (error) {
    if (error.code === '23505') throw new Error('Another project already uses this web address. Change the slug.')
    throw error
  }
  return data
}

export async function deleteProject(id) {
  if (backend === 'demo') { demo.projects = demo.projects.filter((p) => p.id !== id); return }
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw error
}

export async function importStarterProjects() {
  if (backend === 'demo') return
  const { error } = await supabase.from('projects').insert(starter.map(pick))
  if (error) throw error
}

/* ---------------- Uploads ---------------- */
// Shrinks big photos before upload so the site stays fast. Videos and GIFs go up as they are.
async function prepareImage(file) {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return file
  const bitmap = await createImageBitmap(file)
  const max = 2400
  if (bitmap.width <= max && file.size < 1.5e6) return file
  const scale = Math.min(1, max / bitmap.width)
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  const blob = await new Promise((r) => canvas.toBlob(r, 'image/webp', 0.86))
  if (!blob) return file
  return new File([blob], file.name.replace(/\.\w+$/, '') + '.webp', { type: 'image/webp' })
}

export async function uploadMedia(file, folder = 'misc') {
  if (backend === 'demo') return URL.createObjectURL(file)
  const ready = await prepareImage(file)
  if (ready.size > 50 * 1024 * 1024) {
    throw new Error(`${file.name} is over 50 MB. Put long videos on YouTube and paste the link instead.`)
  }
  const safe = ready.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-')
  const path = `${folder}/${Date.now()}-${safe}`
  const { error } = await supabase.storage.from(BUCKET).upload(path, ready, { cacheControl: '31536000', upsert: false })
  if (error) throw error
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
}
