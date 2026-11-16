# Nova Works

Company site and studio dashboard for Nova Works, a brand, digital and growth studio in Kampala.
React + Vite + Supabase, hosted on Vercel.

- `/`                 the public site
- `/work/<slug>`      a case study page per project
- `/admin`            the dashboard: read and reply to enquiries, add and edit projects

## Run it on your computer

```bash
npm install
npm run dev        # http://localhost:5173
```

Without Supabase connected the site still works, using the starter projects in
`src/data/projects.js`. The dashboard asks you to connect first.

---

## Set up the dashboard (one time, about 15 minutes)

### 1. Create the database
1. Go to supabase.com and create a **new project** named `nova-works` (keep it separate from Peacock).
2. Open **SQL Editor -> New query**, paste everything from `supabase/schema.sql`.
3. On the line `insert into public.admins (email) values ('your-email@example.com')`, put the email
   you will log in with. Then click **Run**.

### 2. Create your login
1. **Authentication -> Users -> Add user -> Create new user**.
2. Use the same email as in step 1.3, choose a password and tick **Auto confirm user**.
3. **Authentication -> Sign In / Providers**: turn off **Allow new users to sign up**.
   (Only the emails in the `admins` table can use the dashboard anyway, but this keeps it tidy.)

### 3. Connect the site
1. In Supabase, open **Project Settings -> API** and copy the **Project URL** and **anon public** key.
2. Copy `.env.example` to `.env.local` and fill in:
   ```
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   VITE_WHATSAPP=2567XXXXXXXX
   ```
3. Restart `npm run dev`, open http://localhost:5173/admin and sign in.
4. In **Projects**, click **Import starter projects**. Every project from `projects.js` is copied
   into the database. From now on you edit projects in the dashboard.

### 4. Put the same values in Vercel
Vercel -> your project -> **Settings -> Environment Variables**: add `VITE_SUPABASE_URL`,
`VITE_SUPABASE_ANON_KEY` and `VITE_WHATSAPP`, then **Redeploy**.

### 5. (Optional) Send replies straight from the dashboard
Without this, use **Open in Gmail** or **Reply on WhatsApp** on each enquiry, then
**Mark as replied**.

1. Create a free account at resend.com and verify your domain (e.g. `novaworks.co.ug`).
2. Create an API key.
3. In Vercel add: `RESEND_API_KEY`, `MAIL_FROM` (e.g. `Nova Works <hello@novaworks.co.ug>`) and
   optionally `MAIL_REPLY_TO`. Redeploy.

"Send reply" only works on the Vercel site, not on `npm run dev`.

---

## Using the dashboard

**Enquiries.** Every message from the contact form lands here. Open one, edit the reply template,
and send it (or open it in Gmail or WhatsApp). New messages show a lime dot until you reply.

**Projects.** Each project is a case study:
- *Basics*: name, client, status (Live / In progress / Upcoming), featured, hidden, order.
- *The story*: the summary, the problem, what you did, discipline tags and deliverables.
- *Cover image*: optional. Without it the first image in the chapters is used.
- *Chapters*: one per piece of work, e.g. Logo & identity, Packaging, Business cards & invoices,
  Merchandise, Video ads, Website. Add images and short videos (under 50 MB each), or paste
  YouTube links for longer videos. Big photos are shrunk automatically before upload.

Changes appear on the site the next time a page loads.

## Motion

Built with GSAP (ScrollTrigger + SplitText, all free), Lenis smooth scrolling and @gsap/react.

| Piece | File |
| --- | --- |
| Plugin setup, shared media queries | `src/motion/gsap.js` |
| Smooth scroll | `src/motion/SmoothScroll.jsx` |
| Custom cursor (add `data-cursor="View"` to anything) | `src/motion/Cursor.jsx` |
| Intro loader (once per visit) | `src/motion/Preloader.jsx` |
| Magnetic buttons | `src/motion/Magnetic.jsx` |
| Homepage sections | `src/sections/` |

Every animation sits inside `gsap.matchMedia()`, so visitors who turn on "reduce motion"
get the same content without movement. Project tiles use designed stand-in art
(`src/components/TileArt.jsx`) until you upload a cover or images in the dashboard.

## Where to edit things in code

| What | File |
| --- | --- |
| Company email, founder bio, socials | `src/data/site.js` |
| Problems we solve, capabilities, process, discipline tags | `src/data/services.js` |
| Starter projects (fallback) | `src/data/projects.js` |
| Colours and fonts | top of `src/styles.css` |
| Logo files | `public/brand/` |
| Database setup | `supabase/schema.sql` |
| Reply email function | `api/reply.js` |

## Update the live site
```bash
git add .
git commit -m "Describe the change"
git push
```
Vercel redeploys automatically.
