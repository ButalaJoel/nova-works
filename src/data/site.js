// Company details used across the site. Edit these, nothing else needs to change.
export const site = {
  name: 'Nova Works',
  descriptor: 'Brand, Digital & Growth Studio',
  tagline: 'Built for brands on the rise.',
  city: 'Kampala, Uganda',

  // TODO: replace with the real company contacts before going live.
  email: 'btljoel97@gmail.com',
  // WhatsApp number in international format, digits only, e.g. '2567XXXXXXXX'.
  // Leave empty to hide the WhatsApp buttons.
  whatsapp: import.meta.env.VITE_WHATSAPP || '256786713906',
  whatsappGreeting: 'Hello Nova Works, I would like to talk about a project.',
  // Shown in the nav, contact section and footer. First one is the main line.
  phones: [
    { display: '0786 713 906', tel: '+256786713906' },
    { display: '0791 483 971', tel: '+256791483971' },
  ],
  phoneDisplay: '0786 713 906 / 0791 483 971',

  socials: [
    // { label: 'Instagram', url: 'https://instagram.com/...' },
    // { label: 'LinkedIn', url: 'https://linkedin.com/company/...' },
    // { label: 'Behance', url: 'https://behance.net/...' },
  ],

  founder: {
    name: 'Butala Joel',
    first: 'Joel',
    role: 'Founder & Creative Technologist',
    tools: ['Brand design', 'Illustrator', 'Motion', 'After Effects', 'React', 'Supabase', 'AI'],
    bio: 'Joel is a designer and developer who started Nova Works to give growing Ugandan businesses the kind of strategy, brand and technology support usually reserved for big corporates. He leads every engagement personally, from the first diagnosis to launch.',
  },
}
