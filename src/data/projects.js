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
    status: 'live',
    sector: 'Paint manufacturing',
    featured: true,
    link: 'https://www.peacock.co.ug',
    sort_order: 1,
    summary:
      'Packaging, product mockups, a 92-page catalogue, social media, video and a new website for "The Painters\u2019 Paint".',
    problem:
      'A Ugandan paint brand clients have known for about 30 years had a wide range of decorative, industrial, waterproofing and wood care products, but no single system tying its logo, packaging, catalogue and social media together, and no website it fully owns.',
    solution:
      'We designed packaging and product mockups across the range, produced the 2026 product catalogue, and run the social media with posters and short videos. We also built and launched a catalogue website the company fully owns, with colour systems, data sheets, quote requests and a staff dashboard, live at peacock.co.ug.',
    disciplines: ['Packaging', 'Graphic design', 'Print & stationery', 'Social media', 'Video ads', 'Website'],
    deliverables: [
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
        body: 'A catalogue website the company fully owns, live on www.peacock.co.ug since November 2026. Every product with its specs and pack sizes, colour collections matched to Peacock, NCS, BS 4800, NOVA and RAL, quote requests instead of prices, and a Paint Advisor that answers from the catalogue by text or voice.',
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
    name: 'MS Security Systems Ltd',
    client: 'MS Security Systems Ltd (formerly MS Home Security Solutions)',
    status: 'live',
    sector: 'Security equipment',
    featured: true,
    sort_order: 3,
    summary:
      'Identity, print and merchandise for a Kampala security equipment shop, plus the point-of-sale system it runs on and a public online shop connected to it.',
    problem:
      'A shop selling CCTV, metal detectors, walkie-talkies, access control, smart locks and parking systems, and installing them, was tracking sales, stock, quotations and customer balances on paper, with no way for customers to browse or order online.',
    solution:
      'We designed the logo and rolled it out across flyers, stationery and merchandise. Then we built a point-of-sale system the staff use every day: sales and receipts, quotations, invoices, customer balances, stock and suppliers, installation jobs and online orders, working offline when the internet drops. A public website reads the same catalogue, so prices and stock stay in one place.',
    disciplines: ['Brand identity', 'Print & stationery', 'Merchandise', 'Software', 'Website'],
    deliverables: [
      'Logo & identity',
      'Flyers & price list',
      'Merchandise',
      'Point-of-sale system (live)',
      'Quotations, invoices & receipts',
      'Stock, suppliers & installation jobs',
      'Online shop connected to the POS (live)',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    link: 'https://mssecuritysystemsltd.com',
    cover_url: '/projects/ms-home-security/cover.jpg',
    sections: [
      {
        title: 'Logo & identity',
        body: 'A house and shield mark in sky blue and navy: home security in one glance, clear on a shop sign, an invoice or a sticker.',
        media: ['/projects/ms-home-security/brand-logo.jpg'],
      },
      {
        title: 'Price lists',
        body: 'One price list per product line, with pictures, names and prices in a clear table, made to print and to share on WhatsApp. This one is for the Gold Hunter metal detector range.',
        media: ['/projects/ms-home-security/flyer-gold-hunter-price-list.jpg'],
      },
      {
        title: 'Point-of-sale system',
        body: 'Used by the shop every day. Sell in a few taps, issue receipts, quotations and invoices as PDFs, track customer balances and stock, manage installation jobs and online orders, and keep selling offline. Shown here with sample data.',
        media: [
          '/projects/ms-home-security/pos-dashboard.jpg',
          '/projects/ms-home-security/pos-sign-in.jpg',
          '/projects/ms-home-security/pos-sales-chart.jpg',
          '/projects/ms-home-security/pos-new-sale.jpg',
          '/projects/ms-home-security/pos-products.jpg',
        ],
      },
      {
        title: 'Online shop',
        body: 'The public website reads products, prices and stock from the POS. Customers shop by category or by place (homes, shops, schools, hotels, parking), order online and pay by Mobile Money or on delivery, or request a site survey for installation. In final testing.',
        media: [
          '/projects/ms-home-security/website-home.jpg',
          '/projects/ms-home-security/website-range.jpg',
          '/projects/ms-home-security/website-category.jpg',
          '/projects/ms-home-security/website-product.jpg',
          '/projects/ms-home-security/website-solutions-homes.jpg',
          '/projects/ms-home-security/website-installation.jpg',
          '/projects/ms-home-security/website-checkout.jpg',
        ],
      },
    ],
  }),

  // ---------------- OTHER CLIENT WORK ----------------
  p({
    slug: 'bling-fest',
    name: 'Bling Fest',
    client: 'Bling Fest · Canvas Alive',
    status: 'live',
    sector: 'Events · Creative marketplace',
    featured: true,
    sort_order: 3,
    summary: 'Website, creative marketplace and admin dashboard for an art exhibition, fashion runway and market in Kampala, 12–13 December 2026.',
    problem:
      'Bling Fest brings small businesses, artists, portrait painters and designers together for one weekend. But a market day ends, and the customers leave with it. The organisers also needed a fair, organised way to take in and review hundreds of vendor applications.',
    solution:
      'We built a bold event site with a live countdown, three stages (art exhibition, fashion runway and creative market) and a vendor sign-up form. Every approved vendor gets their own storefront in the marketplace with a direct WhatsApp button, so they keep selling long after the fest. Behind it, an admin dashboard lets the team review applications, add private notes, approve or reject, and switch storefronts live or featured. Built to our security standard: secure sign-in, roles, rate limits, photo checks and an audit log.',
    disciplines: ['Website', 'Software', 'Graphic design'],
    deliverables: [
      'Event website & countdown',
      'Vendor applications with photos',
      'Marketplace & vendor storefronts',
      'WhatsApp ordering',
      'Admin dashboard & team roles',
      'Security pass & report',
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'Cloudinary', 'Render'],
    link: 'https://bling-fest.onrender.com',
    cover_url: '/projects/bling-fest/cover.jpg',
    sections: [
      {
        title: 'The event site',
        body: 'Loud, colourful and unmistakably Kampala: purple, orange and cream, condensed type and cut-out photography. A countdown to opening day sits on the first screen, then the three stages and an open call to every small business.',
        media: [
          '/projects/bling-fest/site-home.jpg',
          '/projects/bling-fest/site-experience.jpg',
          '/projects/bling-fest/site-every-business.jpg',
          '/projects/bling-fest/site-art-exhibition.jpg',
          '/projects/bling-fest/site-runway.jpg',
          '/projects/bling-fest/site-register.jpg',
        ],
      },
      {
        title: 'A marketplace that outlives the fest',
        body: 'Every approved vendor gets a storefront: what they make, where they are, and a WhatsApp button straight to them. No checkout and no middleman; buyers find them by category or search, during the fest and after it. Shown here with sample vendors.',
        media: [
          '/projects/bling-fest/site-marketplace.jpg',
          '/projects/bling-fest/site-storefront.jpg',
          '/projects/bling-fest/site-mobile.jpg',
          '/projects/bling-fest/site-mobile-market.jpg',
        ],
      },
      {
        title: 'Admin dashboard',
        body: 'Applications by status and category at a glance. Reviewers read applications and add notes; owners approve, and an approved application becomes a hidden storefront that goes live with one switch. Shown here with sample data.',
        media: [
          '/projects/bling-fest/admin-overview.jpg',
          '/projects/bling-fest/admin-applications.jpg',
          '/projects/bling-fest/admin-application.jpg',
          '/projects/bling-fest/admin-vendors.jpg',
        ],
      },
    ],
  }),
  p({
    slug: 'vana-power-mart',
    name: 'Vana Power Mart',
    client: 'Vana Power Mart',
    status: 'in-progress',
    sector: 'Retail & e-commerce',
    featured: true,
    sort_order: 4,
    summary: 'An online store for home appliances and furniture, with an admin dashboard that runs orders, stock, suppliers and delivery behind it.',
    problem:
      'A Kampala retailer selling fridges, freezers, washing machines, water heaters, kitchen appliances and furniture sources most goods to order. It needed customers across Uganda to browse and order online, and a way to confirm each order with a supplier and deliver it, without running a warehouse.',
    solution:
      'We built the full store and the system behind it. Customers shop by category, search, add to cart and check out with delivery or store collection, paying by mobile money, cash on delivery or bank transfer, and track their orders. The admin dashboard shows sales and open orders at a glance and handles products, categories, inventory, supplier sourcing, delivery zones, promotions and vouchers, returns, customers and SMS updates. Live mobile money and SMS sign-in are being connected, then the mobile app.',
    disciplines: ['Website', 'Software'],
    deliverables: [
      'Online store',
      'Admin dashboard',
      'Orders, stock & supplier sourcing',
      'Delivery zones, vouchers & returns',
      'Mobile money & SMS (connecting)',
      'Mobile app (next)',
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'Prisma', 'PostgreSQL'],
    cover_url: '/projects/vana-power-mart/cover.jpg',
    sections: [
      {
        title: 'Online store',
        body: 'A clean, green storefront built for trust: rotating hero, shop by category, featured products and a clear price in shillings on every item. Products can still be ordered when out of stock, marked Awaiting Stock, because Vana sources to order.',
        media: [
          '/projects/vana-power-mart/store-home.jpg',
          '/projects/vana-power-mart/store-categories.jpg',
          '/projects/vana-power-mart/store-products.jpg',
          '/projects/vana-power-mart/store-product.jpg',
        ],
      },
      {
        title: 'Cart & checkout',
        body: 'Contact details, delivery or collection, delivery zones, vouchers, and payment by mobile money, cash on delivery or bank transfer. Customers get SMS updates and can track an order with its number.',
        media: ['/projects/vana-power-mart/store-cart.jpg', '/projects/vana-power-mart/store-checkout.jpg'],
      },
      {
        title: 'Admin dashboard',
        body: 'Sales value, orders, items to source and returns on one screen. Each order moves from Awaiting Stock to sourced, delivered and paid, with invoices and delivery notes generated as PDFs. Shown here with sample data.',
        media: [
          '/projects/vana-power-mart/admin-dashboard.jpg',
          '/projects/vana-power-mart/admin-orders.jpg',
          '/projects/vana-power-mart/admin-products.jpg',
          '/projects/vana-power-mart/admin-inventory.jpg',
        ],
      },
      {
        title: 'On the phone',
        body: 'Most customers shop on a phone, so every page is designed for small screens first. The app-store version is next.',
        media: ['/projects/vana-power-mart/store-mobile.jpg'],
      },
    ],
  }),
  p({
    slug: 'legacy-of-love',
    name: 'The Legacy of Love Global Foundation',
    client: 'The Legacy of Love Global Foundation',
    status: 'live',
    sector: 'Non-profit · Children',
    sort_order: 5,
    summary: 'Identity and website for a Christian foundation caring for 110 orphaned and vulnerable children in Kiboga, Uganda.',
    problem:
      'A foundation that has cared for orphaned and vulnerable children in Kiboga since 2016 depended on personal networks to raise support. It had no recognisable identity and no place where donors anywhere in the world could learn about the children and give.',
    solution:
      'We designed the logo: a globe held in two hands, with a heart and the children at its centre, and the line "Changing lives, restoring hope, building futures". Then we built and launched the website: the story, five programmes (sponsorship and education, nutrition, health, women empowerment and capacity building), and three ways to give: a donation, sponsoring a child for $38 a month, or a dairy cow for $800.',
    disciplines: ['Brand identity', 'Website'],
    deliverables: ['Logo & identity', 'Website (live)', 'Donations, once or monthly', 'Child sponsorship', 'Dairy herd appeal'],
    link: 'https://thelegacyofloveglobalfoundation.org',
    cover_url: '/projects/legacy-of-love/cover.jpg',
    sections: [
      {
        title: 'Logo & identity',
        body: 'The world in caring hands, a heart, and children growing like a young plant. Teal, magenta and green: warm, hopeful and clear at any size.',
        media: ['/projects/legacy-of-love/brand-logo.jpg'],
      },
      {
        title: 'Website',
        body: 'Live at thelegacyofloveglobalfoundation.org. A donation box sits in the hero, so a visitor can give once or monthly without leaving the first screen, and every amount says what it pays for: $38 a month keeps a child in school, fed and cared for.',
        media: [
          '/projects/legacy-of-love/website-home.jpg',
          '/projects/legacy-of-love/website-impact.jpg',
          '/projects/legacy-of-love/website-story.jpg',
          '/projects/legacy-of-love/website-programmes.jpg',
        ],
      },
      {
        title: 'Sponsor a child & the dairy appeal',
        body: 'Two focused journeys. Sponsorship in three steps: choose, give monthly, hear how they are doing. And a dairy herd appeal with a live tracker: $800 buys a cow that feeds the children every day, 20 cows to fund.',
        media: ['/projects/legacy-of-love/website-sponsor.jpg', '/projects/legacy-of-love/website-dairy-appeal.jpg'],
      },
    ],
  }),
  p({
    slug: 'earth-connect-hotel',
    name: 'Earth@Connect Hotel',
    client: 'Earth@Connect Hotel',
    status: 'live',
    sector: 'Hospitality',
    sort_order: 6,
    summary: 'Menus, event posters and the couple mark for a hotel on Nira Road, Kiryandongo. An ongoing design partner.',
    problem:
      'A hotel competes on food, drinks and events, but a plain typed menu and a crowded poster sell none of them. Guests should want the food before they order, and want to come back for the next event.',
    solution:
      'We are the hotel\'s regular designers. We drew the couple silhouette mark, laid out the menu with food photography and clear prices by section, and design the posters for its events, like the first Connect Series music festival.',
    disciplines: ['Brand identity', 'Graphic design', 'Print & stationery', 'Social media'],
    deliverables: ['Logo mark', 'Hotel menu (4 pages)', 'Event posters', 'Social media flyers'],
    cover_url: '/projects/earth-connect/cover.jpg',
    sections: [
      {
        title: 'The mark',
        body: 'Two people sharing a toast at sunset: what a night at Earth@Connect feels like.',
        media: ['/projects/earth-connect/brand-logo.jpg'],
      },
      {
        title: 'Menu',
        body: 'Black, orange and real food photography. Main courses, accompaniments and breakfast combos; hot drinks, cold drinks and fresh juice; salads, snacks and katogo, each with a clear price in shillings.',
        media: [
          '/projects/earth-connect/menu-cover.jpg',
          '/projects/earth-connect/menu-food.jpg',
          '/projects/earth-connect/menu-drinks.jpg',
          '/projects/earth-connect/menu-salads-snacks.jpg',
        ],
      },
      {
        title: 'Connect Series music festival',
        body: 'The poster for the first edition: one night of DJs, MCs, nyama choma and a bonfire, with entry fees and booking numbers easy to find.',
        media: ['/projects/earth-connect/poster-connect-series.jpg'],
      },
    ],
  }),
  p({
    slug: 'living-store',
    name: 'Living Store',
    client: 'Living Store',
    status: 'live',
    sector: 'Retail & e-commerce',
    sort_order: 6,
    summary: 'Logo and Shopify store for a fashion, home and lifestyle shop in Uganda.',
    problem:
      'A seller of handbags, dresses, jewellery, perfumes, lighting and home essentials needed to sell online quickly, without building and maintaining a custom store.',
    solution:
      'We designed the Living Store logo, a house roof over a handwritten "Living", and set up the shop on Shopify: collections, product pages with colour options, prices in shillings, cart and checkout, on its own domain.',
    disciplines: ['Brand identity', 'Website'],
    deliverables: ['Logo', 'Shopify store set-up', 'Collections & product pages', 'Domain'],
    stack: ['Shopify'],
    link: 'https://livingstore.online',
    cover_url: '/projects/living-store/cover.jpg',
    sections: [
      {
        title: 'Logo',
        body: 'A roof line and window over a handwritten "Living": home and personal style in one mark.',
        media: ['/projects/living-store/brand-logo.jpg'],
      },
      {
        title: 'Shopify store',
        body: 'Live at livingstore.online. Shop by collection: home essentials, kitchen and dining, women\'s dresses, handbags and jewellery, perfumes and modern lighting.',
        media: ['/projects/living-store/store-home.jpg', '/projects/living-store/store-product.jpg'],
      },
    ],
  }),
  p({
    slug: 'posters-flyers',
    name: 'Posters & flyers',
    client: 'Various clients',
    status: 'live',
    sector: 'Print & social',
    sort_order: 6,
    summary: 'Event posters, product flyers and price lists for a hotel, a shop and a manufacturer.',
    problem:
      'A flyer has a second or two to stop someone scrolling or walking past. It has to say what, where, when and how much, and still look like the brand.',
    solution:
      'Bold headlines, a clear order of information and the client\'s own colours: an event poster that sells the night, product flyers that list every service, and price lists customers can read at a glance and share on WhatsApp.',
    disciplines: ['Graphic design', 'Print & stationery', 'Social media'],
    deliverables: ['Event posters', 'Product flyers', 'Price lists', 'Launch posters'],
    cover_url: '/projects/posters-flyers/cover.jpg',
    sections: [
      {
        title: 'Connect Series music festival',
        body: 'For Earth@Connect Hotel: the first edition of a one-night concert in Kiryandongo. Fire and gold to match the night, with activities, entry fees and booking numbers easy to find.',
        media: ['/projects/posters-flyers/connect-series-festival.jpg'],
      },
      {
        title: 'Trends Complexstitch',
        body: 'A product flyer for a knitting and embroidery company: sweater knitting front and centre, with every service and both branches listed.',
        media: ['/projects/posters-flyers/trends-sweater-flyer.jpg'],
      },
      {
        title: 'MS Security Systems price list',
        body: 'The Gold Hunter metal detector range: pictures, names and prices in a clean table, ready to print or send on WhatsApp.',
        media: ['/projects/posters-flyers/ms-gold-hunter-price-list.jpg'],
      },
      {
        title: 'The Plug: we are open',
        body: 'The launch poster for The Plug at Pioneer Mall.',
        media: ['/projects/posters-flyers/the-plug-we-are-open.jpg'],
      },
    ],
  }),
  p({
    slug: 'joels-furniture',
    name: "Joel's Furniture",
    client: "Joel's Furniture",
    sector: 'Furniture',
    sort_order: 7,
    summary: 'A landing page that shows the work and turns visitors into WhatsApp orders.',
    problem: 'A furniture maker sells one buyer at a time through calls and WhatsApp, so most people never see the full range.',
    solution: 'A landing page that shows his best pieces, from beds and sofas to cabinets, with one clear way to order: a WhatsApp button.',
    disciplines: ['Website'],
    deliverables: ['Landing page', 'Portfolio gallery', 'WhatsApp ordering'],
  }),

  // ---------------- VENTURES ----------------
  p({
    slug: 'kora-beauty',
    name: 'Kora Beauty',
    client: 'Kora Beauty',
    sector: 'Beauty & glam',
    sort_order: 6,
    summary: 'A landing page for a makeup and glam studio: makeup, veiling, perfumes, shades and accessories.',
    problem: 'A makeup and glam business wins clients through social media messages, so its full range of services and products is hard to see in one place.',
    solution: 'A black-and-gold landing page that matches the brand, shows every service and product line, and books or orders through one WhatsApp button.',
    disciplines: ['Website'],
    deliverables: ['Landing page', 'Services & products', 'WhatsApp booking'],
  }),
  p({
    slug: 'broflix',
    name: 'BroFlix',
    client: 'Nova Works venture',
    category: 'venture',
    status: 'in-progress',
    sector: 'Entertainment · Streaming',
    sort_order: 8,
    summary: 'Brand and app for a movie streaming platform, launching for testing with free classic films.',
    problem: 'Viewers want one simple, affordable place to stream films and series, without the clutter and the price of the big platforms.',
    solution:
      'We designed the BroFlix wordmark, with a play button inside the O, and built the app around it: a cinematic hero for the featured title, rows by genre, a movies catalogue you can filter and sort, search, title pages with "More like this", a My List, accounts and a full-screen player. It launches for testing with public-domain classics streamed from the Internet Archive, then licensed films and series are added.',
    disciplines: ['Brand identity', 'Website', 'Software'],
    deliverables: ['Logo & identity', 'Streaming web app', 'Catalogue, search & My List', 'Title pages & player', 'Accounts', 'Licensed catalogue (next)'],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    cover_url: '/projects/broflix/cover.jpg',
    sections: [
      {
        title: 'Logo & identity',
        body: 'A heavy italic wordmark that feels fast, and a green play button in the O. Works on black for the app and on light for print.',
        media: ['/projects/broflix/brand-logo-dark.jpg', '/projects/broflix/brand-logo-light.jpg'],
      },
      {
        title: 'Streaming app',
        body: 'Dark, cinematic and quick to browse: the featured film fills the screen with its rating, runtime and genres, and Play is one tap away. Rows by genre, filters and search do the rest.',
        media: ['/projects/broflix/app-home.jpg', '/projects/broflix/app-login.jpg', '/projects/broflix/app-mobile.jpg'],
      },
    ],
  }),
  p({
    slug: 'joelverse',
    name: 'JOELVERSE',
    client: 'Nova Works venture',
    category: 'venture',
    status: 'live',
    sector: 'Personal portfolio · 3D web',
    sort_order: 8,
    summary: 'A portfolio you ride: hop on a boda boda and explore a tiny 3D Kampala to see my work, CV and contacts.',
    problem: 'A PDF CV and a grid of thumbnails look like everyone else\'s. I wanted a portfolio people remember and actually spend time in, that still works for a recruiter in a hurry.',
    solution:
      'I built a small 3D city in the browser. You ride a boda through districts for marketing, creative, digital, business and innovation work, with billboards for each project; ride onto a glowing circle to open the case study, the CV or the contact centre. There is a mini-map and a full map to jump anywhere, engine sound and a hooter, and a Portfolio mode with filters plus a printable CV for anyone who just wants a normal page. Images load only as you ride close, so it stays light on phones.',
    disciplines: ['Website', 'Software', 'Graphic design'],
    deliverables: ['3D city & boda ride', 'Districts & project billboards', 'Mini-map & jump-to map', 'Case studies', 'Portfolio mode', 'Printable CV'],
    stack: ['Next.js', 'React', 'TypeScript', 'Three.js', 'Web Audio', 'Tailwind CSS'],
    link: 'https://joelverse.onrender.com',
    cover_url: '/projects/joelverse/cover.jpg',
    sections: [
      {
        title: 'Start the engine',
        body: 'One button starts the ride, the other opens the classic portfolio. A short welcome card explains the controls, then you are on the road.',
        media: ['/projects/joelverse/start.jpg', '/projects/joelverse/welcome.jpg'],
      },
      {
        title: 'Ride through mini Kampala',
        body: 'A roundabout at the centre, road signs to each district, and boda stages, a rolex stand and buses along the way. Every project has its own billboard.',
        media: ['/projects/joelverse/cover.jpg', '/projects/joelverse/roundabout.jpg'],
      },
    ],
  }),
  p({
    slug: 'beer-bros',
    name: 'Beer BROS',
    client: 'Nova Works venture',
    category: 'venture',
    status: 'live',
    sector: 'Social · Nightlife',
    sort_order: 8,
    summary: 'A social app for finding drinking buddies nearby: a feed for where the vibe is tonight, plus swipe-to-match and private chat. Now in public beta.',
    problem:
      'Sitting at a bar alone with a six-pack is no fun, and the bar down the road might be the one with the vibe tonight. People in Kampala had no simple way to say "I\u2019m drinking here, who\u2019s joining?" or to find good company nearby, without it turning into a dating app.',
    solution:
      'We designed and built Beer BROS: a familiar feed where people post where they are, with photos, likes and replies, and a Discover tab where you swipe on people nearby. When two people both say yes, they can message and agree where to meet. Anyone can browse the feed without an account; posting, swiping and chat need a free sign-up. It is 18+ only, with report and block on every post and chat, an admin console, and password reset by email. Distance ranges and a "drinking now" status come next, then the Play Store and App Store apps.',
    disciplines: ['Website', 'Software'],
    deliverables: [
      'Social feed with photo posts',
      'Swipe-to-match discovery',
      'Match-only private messaging',
      'Guest browsing + free sign-up',
      'Report, block & admin console',
      'Password reset by email',
      'Mobile apps (next)',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Neon', 'Render', 'Vercel', 'Brevo'],
    link: 'https://beer-bros-nine.vercel.app',
    cover_url: '/projects/beer-bros/cover.jpg',
    sections: [
      {
        title: 'The feed',
        body: 'Built to feel instantly familiar: a three-column layout on desktop and a bottom tab bar on phones. People post where they are drinking and drop a photo; big phone photos are shrunk before upload so posting works on mobile data. Shown here with sample posts.',
        media: ['/projects/beer-bros/cover.jpg', '/projects/beer-bros/app-feed.jpg', '/projects/beer-bros/app-mobile.jpg'],
      },
      {
        title: 'Swipe to find a buddy',
        body: 'Discover is opt-in: only people who choose to appear can be swiped on. Pass or Interested, and when both people say yes it becomes a match.',
        media: ['/projects/beer-bros/app-discover.jpg', '/projects/beer-bros/app-mobile-discover.jpg'],
      },
      {
        title: 'Chat after a match',
        body: 'Private messages open only between matched people, so nobody gets messaged by strangers. Report and block sit on every post and conversation.',
        media: ['/projects/beer-bros/app-messages.jpg'],
      },
      {
        title: 'Free to join, easy to start',
        body: 'Visitors can browse before signing up. Sign-up asks for just a name, email, password and date of birth; the username is created automatically and the 18+ check runs on the server.',
        media: ['/projects/beer-bros/app-sign-up.jpg'],
      },
    ],
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
    slug: 'the-plug',
    name: 'The Plug',
    client: 'The Plug (Nova Works venture)',
    category: 'venture',
    status: 'in-progress',
    sector: 'Gaming & phones retail',
    sort_order: 9,
    summary: 'Brand and launch for a games, consoles and phones shop at Pioneer Mall, Kampala. Online store and repair bookings next.',
    problem:
      'Gamers in Kampala buy consoles, games and chipping services from scattered sellers and have no single shop they can trust for sales, setup and repairs.',
    solution:
      'We built The Plug: a bold red and blue identity with the line "Games. Phones. More.", a plug icon worked into the wordmark, and launch posters for the shop at Pioneer Mall. An online store for consoles, games and phones, with repair and servicing bookings, is in development.',
    disciplines: ['Brand identity', 'Graphic design', 'Social media', 'Website'],
    deliverables: ['Logo & identity', 'Launch poster', 'Social media', 'Online store (in development)'],
    cover_url: '/projects/the-plug/cover.jpg',
    sections: [
      { title: 'Logo & identity', body: 'Blue for trust, red for energy, and a plug where the g should be.', media: ['/projects/the-plug/brand-logo.jpg'] },
      { title: 'Launch poster', body: 'Opening announcement: Xbox, PlayStation, games, chipping and phones, open 9am to 8pm, Monday to Saturday.', media: ['/projects/the-plug/poster-we-are-open.jpg'] },
      { title: 'Online store', body: 'Consoles, games and phones online, with booking for chipping, repairs and servicing. In development.', media: [] },
    ],
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
    solution:
      'A fantasy football app for the Uganda Premier League: pick a squad within a budget, choose a captain, score points every gameweek and compete in private leagues. While the league pauses for AFCON 2027, which Uganda co-hosts, the same app runs an AFCON fantasy game.',
    disciplines: ['Software', 'Motion graphics'],
    deliverables: ['Fantasy app', 'Private leagues', 'AFCON 2027 edition', 'Player cards & match graphics'],
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
