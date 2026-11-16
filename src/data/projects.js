/*
  STARTER PROJECTS

  Once the dashboard is connected (see README), you add and edit projects at /admin
  and this file is only used as a fallback. The dashboard's "Import starter projects"
  button copies everything below into the database the first time.

  Fields (same as the database columns):
    slug        web address, e.g. 'peacock-paints' -> /work/peacock-paints
    category    'client' | 'venture' | 'open-source'
    status      'live' | 'in-progress' | 'upcoming'
    featured    true = large card at the top of Work
    hidden      true = not shown on the public site
    sort_order  lower numbers come first
    disciplines pick from the list in services.js
    sections    the case study chapters: { title, body, media: [image/video/YouTube URLs] }
*/

const p = (x) => ({
  client: '',
  category: 'client',
  status: 'upcoming',
  sector: '',
  year: 2026,
  featured: false,
  hidden: false,
  sort_order: 100,
  summary: '',
  problem: '',
  solution: '',
  disciplines: [],
  deliverables: [],
  stack: [],
  link: '',
  cover_url: '',
  sections: [],
  ...x,
})

export const projects = [
  // ---------------- FEATURED BRAND BUILDS ----------------
  p({
    slug: 'peacock-paints',
    name: 'Peacock Paints',
    client: 'Peacock Paints Ltd',
    status: 'in-progress',
    sector: 'Paint manufacturing',
    featured: true,
    sort_order: 1,
    summary:
      'Brand guidelines, packaging, product mockups, a 92-page catalogue, social media, video and a new website for "The Painters\u2019 Paint".',
    problem:
      'A Ugandan paint brand clients have known for about 30 years had a wide range of decorative, industrial, waterproofing and wood care products, but no single system tying its logo, packaging, catalogue and social media together, and no website it fully owns.',
    solution:
      'We set down the brand in a full guidelines manual, designed packaging and product mockups across the range, produced the 2026 product catalogue, and run the social media with posters and short videos. A catalogue website with colour systems, data sheets and quote requests is in build.',
    disciplines: ['Brand identity', 'Packaging', 'Graphic design', 'Print & stationery', 'Social media', 'Video ads', 'Website'],
    deliverables: [
      'Brand guidelines & identity manual',
      'Packaging & labels',
      'Product mockups',
      'Product catalogue 2026 (92 pages)',
      'Social media management',
      'Product videos & reels',
      'Exhibition & event content',
      'Catalogue website with Paint Advisor',
    ],
    stack: ['Illustrator', 'Photoshop', 'React', 'Supabase'],
    cover_url: '/projects/peacock-paints/cover-product-range.jpg',
    sections: [
      {
        title: 'Brand identity & guidelines',
        body: 'The peacock fan and "The Painters\u2019 Paint" lockup, set down in a 36-page manual: logo system and variations, a turquoise, mustard, orange and black palette, typography, packaging rules and social media layouts.',
        media: [
          '/projects/peacock-paints/brand-logo.jpg',
          '/projects/peacock-paints/guidelines-cover.jpg',
          '/projects/peacock-paints/guidelines-colours.jpg',
          '/projects/peacock-paints/guidelines-logo-variations.jpg',
          '/projects/peacock-paints/guidelines-product-mockups.jpg',
          '/projects/peacock-paints/guidelines-social-layouts.jpg',
          '/projects/peacock-paints/guidelines-contents.jpg',
        ],
      },
      {
        title: 'Packaging & product mockups',
        body: 'One recognisable system across buckets, tins and sacks: the logo badge on top, a bold product name and a colour field for each range, from Weather Shield Plus to Epoxy Self Levelling.',
        media: [
          '/projects/peacock-paints/packaging-epoxy-tin-label.jpg',
          '/projects/peacock-paints/product-weather-shield.jpg',
          '/projects/peacock-paints/product-acrylic.jpg',
          '/projects/peacock-paints/product-epoxy-2l.jpg',
          '/projects/peacock-paints/product-mastic.jpg',
          '/projects/peacock-paints/product-aquaphob.jpg',
          '/projects/peacock-paints/epoxy-floor-scene-1.jpg',
        ],
      },
      {
        title: 'Product catalogue 2026',
        body: 'A 92-page catalogue covering decorative paints, industrial coatings, waterproofing, wood care, thinners and tools, with the colour systems and a full colour chart.',
        media: [
          '/projects/peacock-paints/catalogue-industrial-coatings.jpg',
          '/projects/peacock-paints/catalogue-cover.jpg',
          '/projects/peacock-paints/catalogue-colour-systems.jpg',
          '/projects/peacock-paints/catalogue-wood-care.jpg',
          '/projects/peacock-paints/catalogue-colour-chart.jpg',
        ],
      },
      {
        title: 'Social media',
        body: 'Product education instead of price lists: what each product solves, how to apply it and which finish to choose, in one consistent template.',
        media: [
          '/projects/peacock-paints/social-grid.jpg',
          '/projects/peacock-paints/social-crack-bridging.jpg',
          '/projects/peacock-paints/social-find-your-finish.jpg',
        ],
      },
      {
        title: 'Video',
        body: 'Motion explainers and site reels: Auto Acrylic, a two-component refinish paint, and a step-by-step slab waterproofing system.',
        media: [
          '/projects/peacock-paints/video-auto-acrylic.mp4',
          '/projects/peacock-paints/video-slab-waterproofing.mp4',
        ],
      },
      {
        title: 'Exhibitions & events',
        body: 'The Peacock stand, colour chart displays and award moments, captured for social media and the company newsletter.',
        media: [
          '/projects/peacock-paints/event-exhibition-stand.jpg',
          '/projects/peacock-paints/event-colour-chart-wall.jpg',
          '/projects/peacock-paints/event-award-team.jpg',
          '/projects/peacock-paints/event-award-colour-wall.jpg',
        ],
      },
      {
        title: 'Website',
        body: 'A catalogue website the company fully owns, in final review before launch on peacock.co.ug. Every product with its specs and pack sizes, colour collections matched to Peacock, NCS, BS 4800, NOVA and RAL, quote requests instead of prices, and a Paint Advisor that answers from the catalogue by text or voice.',
        media: [
          '/projects/peacock-paints/website-home.jpg',
          '/projects/peacock-paints/website-products.jpg',
          '/projects/peacock-paints/website-product-page.jpg',
          '/projects/peacock-paints/website-colours.jpg',
          '/projects/peacock-paints/website-paint-advisor.jpg',
        ],
      },
    ],
  }),
  p({
    slug: 'concrete-finisher-ug',
    name: 'Concrete Finisher UG',
    client: 'Concrete Finisher UG',
    status: 'live',
    sector: 'Construction',
    featured: true,
    sort_order: 2,
    summary: 'A concrete finishing brand built from scratch: logo, colours, mood board, business cards, merchandise, video ads and a website.',
    problem:
      'A crew doing epoxy floors, polishing, stamping and waterproofing across Uganda had no brand, no website and no way to show finished work, so new jobs came only by word of mouth.',
    solution:
      'We built the brand from nothing: logo, colour palette and mood board, then video ads cut from real site footage and concretefinisherug.com, which presents six floor systems, real projects and a quote form built around site visits. A Google Business listing, search optimisation and a YouTube channel are rolling out next.',
    disciplines: ['Strategy', 'Brand identity', 'Print & stationery', 'Merchandise', 'Video ads', 'Website', 'Digital marketing'],
    deliverables: ['Logo', 'Brand colours', 'Mood board', 'Business cards', 'Merchandise', 'Video ads', 'Website', 'Quote request form', 'Google Business listing', 'SEO'],
    stack: ['React'],
    link: 'https://concretefinisherug.com',
    cover_url: '/projects/concrete-finisher-ug/cover-epoxy-warehouse.jpg',
    sections: [
      {
        title: 'Logo & colours',
        body: 'The CF mark set in a tiled diamond, like a finished floor seen from above, with an italic wordmark that leans forward. Two earth tones carry everything: Site Brown and Sand, with Charcoal for contrast.',
        media: ['/projects/concrete-finisher-ug/brand-logo-colours.jpg'],
      },
      {
        title: 'Mood board',
        body: 'Real site footage, raw concrete and high-gloss finishes, held together by the brown and sand palette. Precise, durable, hands-on.',
        media: ['/projects/concrete-finisher-ug/brand-mood-board.jpg'],
      },
      {
        title: 'Business cards',
        body: 'Site Brown on the front, contact details and the six services on the back.',
        media: ['/projects/concrete-finisher-ug/brand-business-cards.jpg'],
      },
      {
        title: 'Merchandise',
        body: 'Crew T-shirts, caps and site helmets so the team is recognisable on every job, plus mugs and stickers for vans and equipment.',
        media: ['/projects/concrete-finisher-ug/brand-merchandise.jpg'],
      },
      {
        title: 'Video ad',
        body: 'A 38-second ad cut from real site footage: surface preparation, epoxy going down and finished floors, from homes to heavy-duty spaces.',
        media: ['/projects/concrete-finisher-ug/video-ad.mp4'],
      },
      {
        title: 'Website',
        body: '"Precision floors, built to last." Six floor systems, projects with before and after, and a quote form that asks for location, area and property type so the team can plan the site visit.',
        media: [
          '/projects/concrete-finisher-ug/website-home.jpg',
          '/projects/concrete-finisher-ug/website-services.jpg',
          '/projects/concrete-finisher-ug/website-projects.jpg',
          '/projects/concrete-finisher-ug/website-quote-form.jpg',
        ],
      },
    ],
  }),
  p({
    slug: 'ms-home-security',
    name: 'MS Home Security Systems',
    client: 'MS Home Security Systems',
    status: 'in-progress',
    sector: 'Security systems',
    featured: true,
    sort_order: 3,
    summary:
      'A full identity for a security systems company: logo, stationery, merchandise and stickers, followed by a point-of-sale system and website.',
    problem:
      'A growing security company needed to look established on everything clients see, from business cards to invoices, and to stop tracking sales on paper.',
    solution:
      'We designed the logo and identity, then rolled it out across business cards, invoices, merchandise and stickers. A point-of-sale system and a public website are in build.',
    disciplines: ['Brand identity', 'Print & stationery', 'Merchandise', 'Website', 'Software'],
    deliverables: ['Logo', 'Business cards', 'Invoices', 'Merchandise', 'Stickers', 'Point-of-sale system', 'Website'],
    sections: [
      { title: 'Logo & identity', body: '', media: [] },
      { title: 'Stationery', body: 'Business cards and invoices.', media: [] },
      { title: 'Merchandise & stickers', body: '', media: [] },
      { title: 'Point of sale & website', body: 'Sales, stock and reporting in one system, plus a public site for quote requests.', media: [] },
    ],
  }),

  // ---------------- OTHER CLIENT WORK ----------------
  p({
    slug: 'vana-power-mart',
    name: 'Vana Power Mart',
    client: 'Vana Power Mart',
    status: 'in-progress',
    sector: 'Retail & e-commerce',
    sort_order: 4,
    summary: 'An online store and admin dashboard with mobile money payments.',
    problem:
      'A retailer that sources goods to order needed customers across Uganda to shop and pay online, without running a warehouse.',
    solution:
      'A full online store and admin dashboard where each order flows to the supplier and on to delivery. MTN and Airtel mobile money payments, SMS sign-in and app-store releases are being added.',
    disciplines: ['Website', 'Software'],
    deliverables: ['Online store', 'Admin dashboard', 'Mobile money payments', 'SMS sign-in', 'Mobile app'],
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
  }),
  p({
    slug: 'gods-will',
    name: "God's Will",
    client: "God's Will",
    status: 'in-progress',
    sort_order: 5,
    // TODO: add sector, problem, solution and disciplines
  }),
  p({
    slug: 'furniture-studio',
    name: 'Furniture Studio', // TODO: real business name
    client: 'Custom furniture maker',
    sector: 'Furniture',
    sort_order: 6,
    summary: 'An online showroom for a custom furniture maker.',
    problem: 'A furniture maker sells one buyer at a time through calls and WhatsApp, so most people never see the full range.',
    solution: 'An online showroom and catalogue where buyers browse pieces, request made-to-measure orders and get quotes.',
    disciplines: ['Website'],
    deliverables: ['Website', 'Catalogue', 'Quote requests'],
  }),

  // ---------------- VENTURES ----------------
  p({
    slug: 'afcon-broadcast',
    name: 'AFCON Broadcast Package',
    client: 'Self-initiated',
    category: 'venture',
    sector: 'Sports media',
    sort_order: 10,
    summary: 'A complete tournament broadcast package in motion.',
    problem:
      'A continental tournament needs one on-screen identity: line-ups, player cards, score and time bugs and goal moments that all feel like the same brand.',
    solution: 'A full motion graphics broadcast package with player cards, time and score animations and goal stings.',
    disciplines: ['Motion graphics', 'Brand identity'],
    deliverables: ['Player cards', 'Score & time animations', 'Goal animations', 'Line-ups', 'Transitions'],
    stack: ['After Effects'],
  }),
  p({
    slug: 'kora-beauty',
    name: 'Kora Beauty',
    client: 'Kora Beauty',
    category: 'venture',
    sector: 'Beauty',
    sort_order: 11,
    problem: 'A makeup studio wins clients through Instagram messages, which makes bookings hard to manage.',
    solution: 'A brand identity and booking website showing the looks, services and available slots.',
    disciplines: ['Brand identity', 'Website'],
    deliverables: ['Brand identity', 'Website', 'Bookings'],
  }),
  p({
    slug: 'broflix',
    name: 'BroFlix',
    client: 'Nova Works',
    category: 'venture',
    status: 'in-progress',
    sector: 'Entertainment',
    sort_order: 12,
    problem: 'Viewers want one simple, affordable place to stream a curated selection of films.',
    solution: 'A compact movie streaming platform with browsing, search and a cinema-style player.',
    disciplines: ['Website', 'Software'],
    stack: ['React'],
  }),
  p({
    slug: 'zzimba-ug',
    name: 'Zzimba UG',
    client: 'Nova Works',
    category: 'venture',
    sector: 'Construction marketplace',
    year: 2027,
    sort_order: 13,
    problem:
      'Finding a trusted builder, engineer, painter, welder, security installer, realtor or landlord in Uganda depends on who you know.',
    solution:
      'A marketplace where professionals build portfolio profiles, clients post jobs and tenders, and the two are matched and talk directly.',
    disciplines: ['Software', 'Website'],
  }),
  p({
    slug: 'connect-marketplace',
    name: 'Connect Marketplace',
    client: 'Nova Works',
    category: 'venture',
    sector: 'Small business',
    year: 2027,
    sort_order: 14,
    problem: 'Very small sellers of jewellery, perfume, bangles and accessories rely on personal contacts to reach buyers.',
    solution: 'A marketplace where small businesses list products and buyers discover them in one place.',
    disciplines: ['Software'],
  }),
  p({
    slug: 'gaming-store',
    name: 'Gaming Store', // TODO: real name
    client: 'Nova Works',
    category: 'venture',
    sector: 'Retail',
    year: 2027,
    sort_order: 15,
    problem: 'Buyers of video games and consoles, and owners needing repairs, have no single trusted shop online.',
    solution: 'An online store for games and consoles with repair and servicing bookings.',
    disciplines: ['Website'],
  }),
  p({
    slug: 'upl-fantasy',
    name: 'UPL Fantasy',
    client: 'Nova Works',
    category: 'venture',
    sector: 'Sports',
    year: 2027,
    sort_order: 16,
    problem: 'Uganda Premier League fans have no fantasy football game built around their own league.',
    solution: 'A fantasy football app for the Uganda Premier League with squads, weekly points and leagues.',
    disciplines: ['Software'],
  }),
  p({
    slug: 'money-globe',
    name: 'Money Globe',
    client: 'Nova Works',
    category: 'venture',
    sector: 'Finance',
    year: 2027,
    sort_order: 17,
    problem: 'Ordinary investors have few accessible ways to own digital assets and media.',
    solution: 'An investment platform for buying into digital assets and media. Concept stage, subject to regulatory approval.',
    disciplines: ['Software'],
  }),
  p({
    slug: 'trading-assistant',
    name: 'Trading Assistant',
    client: 'Private',
    category: 'venture',
    sector: 'Finance',
    year: 2027,
    hidden: true,
    sort_order: 18,
    problem: 'Manual trading misses entries and exits when the trader is away from the screen.',
    solution: 'A bot that executes trades on a connected account following set strategies.',
    disciplines: ['Software'],
  }),

  // ---------------- OPEN SOURCE ----------------
  p({
    slug: 'uganda-ems-network',
    name: 'Uganda EMS Network',
    client: 'Open source',
    category: 'open-source',
    sector: 'Health',
    year: 2027,
    sort_order: 20,
    problem: 'When someone needs an ambulance, there is no shared system showing which ambulance is free and closest.',
    solution:
      'Two connected open-source systems: an ambulance dispatch platform any provider can join, and a national EMS layer linking them.',
    disciplines: ['Software'],
  }),
  p({
    slug: 'uganda-bus-routes',
    name: 'Uganda Bus Routes',
    client: 'Open source',
    category: 'open-source',
    sector: 'Transport',
    year: 2027,
    sort_order: 21,
    problem: 'Bus routes, times and fares in Uganda live in people’s heads and at the park.',
    solution: 'An open-source booking system covering local and international bus routes across Uganda.',
    disciplines: ['Software'],
  }),
  p({
    slug: 'muyiribi',
    name: 'Muyiribi',
    client: 'Open source',
    category: 'open-source',
    sector: 'Community',
    year: 2027,
    sort_order: 22,
    problem: 'Everyone in Uganda knows a muyiribi who can get anything, but finding the right one is luck.',
    solution: 'An open-source network that connects people with trusted bayiribi, the middlemen who know a guy.',
    disciplines: ['Software'],
  }),
]

export const statusLabels = {
  live: 'Live',
  'in-progress': 'In progress',
  upcoming: 'Upcoming',
}

export const categoryLabels = {
  client: 'Client work',
  venture: 'Venture',
  'open-source': 'Open source',
}
