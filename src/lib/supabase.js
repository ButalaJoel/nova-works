import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// null until VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set (.env.local / Vercel)
export const supabase = url && key ? createClient(url, key) : null

// VITE_DEMO=1 runs the dashboard with sample data and saves nothing (used for previews).
export const isDemo = import.meta.env.VITE_DEMO === '1'
