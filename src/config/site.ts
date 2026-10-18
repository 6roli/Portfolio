/**
 * Single source of truth for personal data and links.
 *
 * Rule: anything that is not confirmed by Gabriel stays `null`.
 * Components render `null` as a visible "pending" marker instead of
 * inventing text, so missing information is obvious on the live site.
 */

export interface Link {
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  /** One-line professional headline, e.g. "Machine learning engineer". */
  headline: string | null;
  /** Short introduction for the home page (2–3 sentences). */
  intro: string | null;
  location: string | null;
  /** Public contact email. Only fill in an address you want published. */
  email: string | null;
  githubUser: string;
  linkedinUrl: string | null;
  /** Extra professional links (Google Scholar, ORCID, Kaggle…). */
  otherLinks: Link[];
  /**
   * Path of the CV inside /public, e.g. "/cv/gabriel-olius-cv.pdf".
   * Keep null until the file exists; the CV page then hides the download button.
   */
  cvFile: string | null;
}

export const profile: Profile = {
  name: 'Gabriel Olius',
  headline: null,
  intro: null,
  location: null,
  email: null,
  githubUser: '6roli',
  linkedinUrl: null,
  otherLinks: [],
  cvFile: null,
};

/** Areas the portfolio is organised around. Descriptive, not self-rated. */
export const focusAreas = [
  {
    id: 'ml',
    title: 'Machine learning',
    summary: 'Models, evaluation and the data work that makes them trustworthy.',
  },
  {
    id: 'software',
    title: 'Software engineering',
    summary: 'Readable, tested code with automated checks and deployments.',
  },
  {
    id: 'architecture',
    title: 'Systems architecture',
    summary: 'Simple designs that fit the problem, with costs kept under control.',
  },
  {
    id: 'earth-observation',
    title: 'Image processing & Earth observation',
    summary: 'Satellite imagery, geospatial data and natural phenomena.',
  },
] as const;

export type FocusAreaId = (typeof focusAreas)[number]['id'];

/**
 * Independent applications, each with its own repository and deployment.
 * Add a new entry here when a new app goes live (see docs/new-app-guide.md).
 */
export interface AppLink {
  name: string;
  url: string;
  repoUrl: string;
  /** Private repositories are not linked publicly. */
  repoIsPublic: boolean;
  projectSlug: string;
}

export const apps: AppLink[] = [
  {
    name: 'Horizonte',
    url: 'https://horizonte.pages.dev',
    repoUrl: 'https://github.com/6roli/horizonte',
    repoIsPublic: false,
    projectSlug: 'horizonte',
  },
];

export const githubUrl = `https://github.com/${profile.githubUser}`;
