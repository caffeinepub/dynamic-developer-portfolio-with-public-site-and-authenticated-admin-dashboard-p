// JSON-LD structured data helpers for SEO
export interface StructuredDataConfig {
  url: string;
  pathname: string;
}

export function generateWebSiteStructuredData(config: StructuredDataConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Bajrangi Yadav Portfolio',
    url: config.url,
    description: 'Full stack developer portfolio showcasing projects, skills, and experience in modern web technologies and blockchain development.',
    author: {
      '@type': 'Person',
      name: 'Bajrangi Yadav',
      email: 'bajrangiyadav330@gmail.com',
      jobTitle: 'Full Stack Developer',
      url: config.url,
    },
  };
}

export function generatePersonStructuredData(config: StructuredDataConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Bajrangi Yadav',
    email: 'bajrangiyadav330@gmail.com',
    jobTitle: 'Full Stack Developer',
    url: config.url,
    sameAs: [
      // Social links will be dynamically populated if needed
    ],
    description: 'Experienced full stack developer specializing in modern web technologies, blockchain, and the Internet Computer platform.',
  };
}

export function generateCombinedStructuredData(config: StructuredDataConfig) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      generateWebSiteStructuredData(config),
      generatePersonStructuredData(config),
    ],
  };
}
