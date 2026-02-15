// Route-to-SEO mapping for public portfolio routes
export interface RouteSeoConfig {
  title: string;
  description: string;
  ogImage: string;
}

export const routeSeoMap: Record<string, RouteSeoConfig> = {
  '/': {
    title: 'Bajrangi Yadav - Full Stack Developer Portfolio',
    description: 'Welcome to my portfolio. I\'m a full stack developer specializing in modern web technologies, blockchain, and the Internet Computer. Explore my projects, skills, and experience.',
    ogImage: '/assets/generated/hero-bg.dim_1920x1080.png',
  },
  '/about': {
    title: 'About Me - Bajrangi Yadav',
    description: 'Learn more about my background, journey as a developer, and what drives my passion for creating innovative web applications and blockchain solutions.',
    ogImage: '/assets/generated/avatar.dim_512x512.png',
  },
  '/skills': {
    title: 'Skills & Technologies - Bajrangi Yadav',
    description: 'Discover my technical expertise including backend development with Motoko, frontend frameworks, deployment tools, and modern web technologies.',
    ogImage: '/assets/generated/hero-bg.dim_1920x1080.png',
  },
  '/projects': {
    title: 'Projects - Bajrangi Yadav',
    description: 'Browse my portfolio of web applications, blockchain projects, and innovative solutions built with cutting-edge technologies.',
    ogImage: '/assets/generated/project-farmer.dim_1200x675.png',
  },
  '/experience': {
    title: 'Work Experience - Bajrangi Yadav',
    description: 'Explore my professional journey, work history, and the companies I\'ve contributed to as a full stack developer.',
    ogImage: '/assets/generated/hero-bg.dim_1920x1080.png',
  },
  '/contact': {
    title: 'Contact Me - Bajrangi Yadav',
    description: 'Get in touch with me for collaboration opportunities, project inquiries, or just to connect. I\'m always open to discussing new ideas and opportunities.',
    ogImage: '/assets/generated/hero-bg.dim_1920x1080.png',
  },
};

export function getSeoForRoute(pathname: string): RouteSeoConfig {
  return routeSeoMap[pathname] || routeSeoMap['/'];
}
