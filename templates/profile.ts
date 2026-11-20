// Complete example of the homepage/profile settings.
// The LIVE file is src/data/profile.ts. This example is not used by the site.
// Edit the live file with your real information; do not publish these placeholders.
export const profile = {
  name: 'Your name', // Sidebar/header identity; page titles; copyright.
  role: 'Your position', // Sidebar affiliation and homepage introduction line.
  field: 'Your research field', // Short line below your name.
  institution: 'Your institute',
  university: 'Your university',
  institutionUrl: 'https://example.com/',
  location: 'City, Country',
  email: 'you@example.com', // Supply an address, not a mailto: URL.
  portrait: '/images/portrait.webp', // Local file in public/images/.
  cv: '/files/your-cv.pdf', // Local file in public/files/.
  headline: 'A concrete description of your research.', // Homepage h1.
  intro: 'A short paragraph describing your research.', // Also default page description.
  interests: [ // Add or remove research interests; each needs title and description.
    { title: 'Research topic', description: 'What you study in this area.' },
  ],
  skills: ['Tool or method', 'Another tool'],
  socials: [ // Add or remove links; each needs all three properties.
    { label: 'Full accessible link name', short: 'Short sidebar label', url: 'https://example.com/' },
    // Keep Google Scholar first: the Publications page currently uses socials[0].url.
  ],
};
