// The business problems Nova Works solves, and the practices behind the solutions.
// `practices` on each problem refers to the `id` of a practice below.

export const problems = [
  {
    id: 'invisible',
    problem: "Customers can't find you.",
    detail: 'You do good work, but people searching Google, Maps or social media find your competitors first.',
    answer: 'Search optimisation, Google Business listings, content and social channels that put you where buyers are already looking.',
    practices: ['growth', 'products'],
  },
  {
    id: 'small-brand',
    problem: 'Your brand looks smaller than your business.',
    detail: 'Mismatched logos, colours and messages make a serious company look informal, and it costs you bigger clients.',
    answer: 'Brand strategy, a corporate identity and brand guidelines your whole team can apply the same way, every time.',
    practices: ['strategy', 'brand'],
  },
  {
    id: 'wasted-spend',
    problem: 'Ad money goes out, customers don’t come in.',
    detail: 'Boosted posts, radio and billboards run without a plan, and nobody can say which one brought a sale.',
    answer: 'A media strategy, planned buying across print, digital, outdoor and broadcast, and reporting that ties spend to results.',
    practices: ['strategy', 'media', 'growth'],
  },
  {
    id: 'manual-sales',
    problem: 'Sales run on paper, calls and WhatsApp.',
    detail: 'Orders get lost, stock is a guess and daily totals take hours to reconcile.',
    answer: 'Online stores, point-of-sale systems, dashboards and mobile money payments built around how your business actually works.',
    practices: ['products'],
  },
  {
    id: 'untold-story',
    problem: 'Nobody is telling your story.',
    detail: 'Launches, wins and milestones pass without the market, the press or your own staff hearing about them.',
    answer: 'PR and communication strategy, content, motion graphics and live streaming that turn your news into attention.',
    practices: ['strategy', 'brand', 'growth'],
  },
  {
    id: 'repeat-questions',
    problem: 'Your team answers the same questions all day.',
    detail: 'Prices, hours, product details and order status take up time your team should spend selling.',
    answer: 'AI assistants and automations trained on your own information, on your website and WhatsApp.',
    practices: ['products'],
  },
]

export const practices = [
  {
    id: 'strategy',
    name: 'Strategy',
    summary: 'We start by finding the real problem, then plan the way out of it.',
    services: [
      'Strategy development',
      'Brand strategy development',
      'Market strategy development',
      'Media strategy development',
      'PR & communication strategy',
      'Digital marketing strategy',
    ],
  },
  {
    id: 'brand',
    name: 'Brand & Identity',
    summary: 'A brand that looks as serious as the business behind it.',
    services: [
      'Logo & corporate identity',
      'Brand colours & mood boards',
      'Brand guidelines',
      'Graphic design',
      'Packaging & product mockups',
      'Stationery, print & merchandise',
      'Motion graphics & video ads',
      'Broadcast & event packages',
    ],
  },
  {
    id: 'growth',
    name: 'Digital Marketing & Growth',
    summary: 'Getting found, getting followed and getting chosen online.',
    services: [
      'Social media management',
      'Community management',
      'Online content development & marketing',
      'Email marketing',
      'Search engine optimisation (SEO)',
      'Affiliate marketing',
      'Online campaigns',
      'Live streaming',
      'Online analytics & performance',
    ],
  },
  {
    id: 'media',
    name: 'Media Buying',
    summary: 'Every shilling of airtime and ad space placed on purpose.',
    services: [
      'Print',
      'Digital',
      'Outdoor',
      'Broadcast',
      'Campaign management',
    ],
  },
  {
    id: 'products',
    name: 'Digital Products & AI',
    summary: 'The systems and tools that make the strategy run day to day.',
    services: [
      'Websites & online stores',
      'Point-of-sale & business systems',
      'Dashboards & content management',
      'Mobile apps',
      'Payment & SMS integration',
      'AI assistants & automation',
    ],
  },
]

// How a brand is built at Nova Works. The website comes near the end, not the start.
export const process = [
  { name: 'Diagnose', text: 'We meet, ask hard questions and name the problem that is actually costing you money.' },
  { name: 'Strategy', text: 'Who you serve, what you stand for and where to reach them, written down with a budget.' },
  { name: 'Identity', text: 'Logo, colours, type and a mood board, captured in guidelines your team can follow.' },
  { name: 'Assets', text: 'Stationery, packaging, merchandise, social content and video ads in the new identity.' },
  { name: 'Launch', text: 'The website, systems and campaigns that put the brand in front of buyers.' },
  { name: 'Grow', text: 'Monthly reporting, content, maintenance and the next round of improvements.' },
]

// Tags used on projects. The dashboard shows these as checkboxes.
export const disciplines = [
  'Strategy',
  'Brand identity',
  'Graphic design',
  'Packaging',
  'Print & stationery',
  'Merchandise',
  'Motion graphics',
  'Video ads',
  'Social media',
  'Digital marketing',
  'Media buying',
  'Website',
  'Software',
  'AI',
]

// Filter buttons on the Work section, built from the tags above.
export const workFilters = [
  { id: 'all', label: 'All work', match: () => true },
  { id: 'brand', label: 'Branding', match: (p) => hasAny(p, ['Brand identity', 'Strategy']) },
  { id: 'design', label: 'Graphic, print & packaging', match: (p) => hasAny(p, ['Graphic design', 'Packaging', 'Print & stationery', 'Merchandise']) },
  { id: 'motion', label: 'Motion & video', match: (p) => hasAny(p, ['Motion graphics', 'Video ads']) },
  { id: 'marketing', label: 'Marketing & media', match: (p) => hasAny(p, ['Social media', 'Digital marketing', 'Media buying']) },
  { id: 'digital', label: 'Web & software', match: (p) => hasAny(p, ['Website', 'Software', 'AI']) },
  { id: 'ventures', label: 'Ventures & open source', match: (p) => p.category !== 'client' },
]

function hasAny(project, tags) {
  return (project.disciplines || []).some((d) => tags.includes(d))
}
