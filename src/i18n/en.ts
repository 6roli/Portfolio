/**
 * English interface strings. A Spanish file (es.ts) must export the same keys;
 * TypeScript enforces that through the `UiStrings` type.
 */
export const en = {
  'site.title': 'Gabriel Olius',
  'site.description':
    'Portfolio of Gabriel Olius: machine learning, software engineering, systems architecture and Earth observation projects.',
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.cv': 'CV',
  'nav.projects': 'Projects',
  'nav.contact': 'Contact',
  'nav.skip': 'Skip to content',
  'nav.menu': 'Menu',

  'banner.firstVersion':
    'First version. Sections marked "pending" are waiting for information from Gabriel — nothing there is invented.',
  'pending.label': 'Pending',
  'pending.default': 'To be completed by Gabriel.',

  'home.heroLine': 'Machine learning & Earth observation',
  'home.areasEyebrow': 'What I work on',
  'home.areas': 'Areas of work',
  'home.featuredEyebrow': 'Selected work',
  'home.appsEyebrow': 'Running now',
  'home.liveCount': 'live applications',
  'home.projectCount': 'documented projects',
  'home.featured': 'Featured projects',
  'home.allProjects': 'All projects',
  'home.apps': 'Live applications',

  'projects.eyebrow': 'Work',
  'projects.title': 'Projects',
  'projects.intro':
    'Each project explains the problem, the data, the method, the results and the limitations, with links to code and demos where available.',
  'projects.problem': 'Problem',
  'projects.data': 'Data',
  'projects.method': 'Method',
  'projects.results': 'Results',
  'projects.limitations': 'Limitations',
  'projects.architecture': 'Architecture',
  'projects.technologies': 'Technologies',
  'projects.demo': 'Open demo',
  'projects.code': 'View code',
  'projects.codePrivate': 'Code repository is private',
  'projects.needsReview':
    'This summary was written from the repository structure and has not yet been reviewed by Gabriel.',
  'projects.status.live': 'Live',
  'projects.status.in-progress': 'In progress',
  'projects.status.repository': 'Repository',
  'projects.back': 'All projects',

  'about.eyebrow': 'Profile',
  'about.title': 'About',
  'about.education': 'Education',
  'about.experience': 'Experience',
  'about.interests': 'Interests',
  'about.onThisPage': 'On this page',
  'about.background': 'Background',
  'about.backgroundTitle': 'Education and experience',
  'about.approach': 'How I work',
  'about.approachTitle': 'How I approach problems',
  'about.iterate': 'What I learn in the branches feeds back into the roots.',
  'about.inPractice': 'In practice',
  'about.ai': 'Critical thinking',
  'about.aiTitle': 'Critical thinking in the age of AI',
  'about.curiosity': 'Curiosity',
  'about.curiosityTitle': 'Questions that start projects',

  'cv.eyebrow': 'Résumé',
  'cv.title': 'Curriculum vitae',
  'cv.download': 'Download CV (PDF)',
  'cv.noFile': 'The downloadable CV will be added when the file is provided.',
  'cv.web': 'Web version',

  'contact.eyebrow': 'Get in touch',
  'contact.title': 'Contact',
  'contact.intro': 'The best ways to reach me or see my work:',
  'contact.email': 'Email',
  'contact.github': 'GitHub',
  'contact.linkedin': 'LinkedIn',

  'footer.built': 'Static site built with Astro. No tracking, no cookies.',
  'footer.source': 'Source code',

  'notFound.title': 'Page not found',
  'notFound.body': 'The page you are looking for does not exist or has moved.',
  'notFound.home': 'Go to the home page',
} as const;

export type UiKey = keyof typeof en;
export type UiStrings = Record<UiKey, string>;
