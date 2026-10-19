/**
 * Biography, CV and working-method data. Used by both the About page and the
 * web CV, so the two never disagree. Empty arrays render as "pending" markers.
 *
 * Rule: only facts stated by Gabriel or documented in his projects. Every
 * `pending` field names the personal example still missing; set it to null
 * once the real example has been added to `evidence`.
 *
 * Example timeline entry:
 *   { title: 'MSc in …', organisation: 'University of …', period: '2022–2024', details: '…' }
 */

export interface TimelineEntry {
  title: string;
  organisation: string;
  /** Free text such as "2021–2023" or "Since 2024". */
  period: string;
  location?: string;
  details?: string;
}

/** A fact from a real project that supports a claim, with a link to it. */
export interface Evidence {
  project: string;
  href: string;
  text: string;
}

/** The four stages of the working method, drawn as parts of a tree. */
export type TreePart = 'roots' | 'sprouts' | 'trunk' | 'branches';

export interface Stage {
  part: TreePart;
  /** Name of the tree part shown next to the stage number. */
  partLabel: string;
  title: string;
  summary: string;
  evidence: Evidence[];
  /** Personal example still to be provided by Gabriel, or null. */
  pending: string | null;
}

const projectLinks = {
  horizonte: '/projects/horizonte/',
  carRental: '/projects/car-rental-chatbot/',
  chordsAi: '/projects/chordsai/',
  weatherWarehouse: 'https://github.com/6roli/weather-warehouse',
};

export const about = {
  /** Short introduction at the top of About (facts stated by Gabriel). */
  bio: [
    'I studied telecommunications and remote sensing at the Universitat Politècnica de Catalunya (UPC), and I have worked as a data analyst and as a data engineer.',
    'Both sides of that path ask the same question: what can we actually trust in the data, and what is it telling us? This page explains how I work through that question, step by step.',
  ] as string[],
  /** Details still missing from the background section. */
  backgroundPending: [
    'Exact names and dates of the degree and the master, and their specialisations',
    'What from remote sensing and telecommunications I use most in my work today',
    'Roles, companies, responsibilities and real results',
  ],
  education: [] as TimelineEntry[],
  experience: [] as TimelineEntry[],

  approachIntro:
    'I work in four connected stages. They are not a straight line: experimenting or building often shows that the problem was framed the wrong way, and then I go back to the roots.',
  stages: [
    {
      part: 'roots',
      partLabel: 'Roots',
      title: 'Understand the problem',
      summary:
        'Before proposing a solution, I try to understand the context, the needs of the people involved and the constraints. That means listening, asking, and checking assumptions against the data before they turn into requirements.',
      evidence: [
        {
          project: 'Weather warehouse',
          href: projectLinks.weatherWarehouse,
          text: 'Past forecasts disappear once a new one is published, so the warehouse stores every hourly forecast next to what was actually observed. The data needed to measure forecast accuracy has to be collected from day one.',
        },
        {
          project: 'Horizonte',
          href: projectLinks.horizonte,
          text: 'Satellite images of Spain are easy to find but rarely say which product they show, when they were observed or how old they are. That gap defined the scope of the app.',
        },
      ],
      pending: 'Requirements trip to Portugal, and an ML project where the data challenged a hypothesis',
    },
    {
      part: 'sprouts',
      partLabel: 'Sprouts',
      title: 'Explore and experiment',
      summary:
        'Creativity is a concrete part of my technical work: connecting knowledge from different fields, asking questions and imagining alternatives. I turn an idea into a hypothesis small enough to test — a prototype, a notebook, a single workflow — so it can be evaluated instead of argued about.',
      evidence: [
        {
          project: 'ChordsAI',
          href: projectLinks.chordsAi,
          text: 'An experiment joining music and language-model agents: a supervisor sends each request to an agent that looks up the chords of a song or to one that plays notes and chords.',
        },
        {
          project: 'Horizonte',
          href: projectLinks.horizonte,
          text: 'The first, deliberately small step of a wider idea about weather, extreme events, the ocean and the coast.',
        },
      ],
      pending: 'The exploration project you have in mind: what you wanted to find out, what you tried and what you learned',
    },
    {
      part: 'trunk',
      partLabel: 'Trunk',
      title: 'Execute with judgement',
      summary:
        'I compare candidate solutions and choose the one that solves the problem with the least complexity. I value building something useful, understandable and maintainable, sized to the real need.',
      evidence: [
        {
          project: 'Horizonte',
          href: projectLinks.horizonte,
          text: 'No server, no database, no scheduled jobs: the browser loads EUMETSAT images directly, so the app costs nothing to run and has few parts that can break.',
        },
        {
          project: 'Car rental chatbot',
          href: projectLinks.carRental,
          text: 'The language model only extracts the search criteria; plain Python validates them and runs the database query, so the bot cannot invent cars.',
        },
      ],
      pending: 'A technical decision from your professional work that shows this criterion',
    },
    {
      part: 'branches',
      partLabel: 'Branches',
      title: 'Prepare for growth',
      summary:
        'When the context calls for it — more data, more users, more features — I plan for scale through architecture, automation and maintenance. Complexity is a cost, not a goal: I add it when growth makes it necessary.',
      evidence: [
        {
          project: 'Weather warehouse',
          href: projectLinks.weatherWarehouse,
          text: 'Raw responses are kept unmodified in a bronze layer, so the cleaned and combined tables can be rebuilt when they change. An automated job runs every hour, and re-running an hour gives the same result.',
        },
        {
          project: 'Car rental chatbot',
          href: projectLinks.carRental,
          text: 'Per-visitor and daily message limits keep the public demo within free API quotas, and automated tests run before every deployment.',
        },
      ],
      pending: 'A real solution of yours that had to grow or adapt',
    },
  ] satisfies Stage[],

  ai: {
    intro:
      'AI makes it easy to generate code, analyses and proposals. That makes the decisions around it more important: which problem is worth solving, when an AI tool is the right choice, and how to check what it produces. Creativity widens the options; critical thinking selects and validates them.',
    practices: [
      { title: 'Context before tools', text: 'I start from the problem and its constraints, then decide whether AI helps at all.' },
      { title: 'Contrast', text: 'I check answers against data, documentation and primary sources.' },
      { title: 'Know the limits', text: 'I make clear what a model cannot do and design the solution around it.' },
      { title: 'Verify usefulness', text: 'Tests and real use decide whether a solution works, not how convincing it sounds.' },
    ],
    evidence: {
      project: 'Car rental chatbot',
      href: projectLinks.carRental,
      text: 'The model’s output is treated as a proposal: Python validates the extracted criteria before any query. When relative dates such as “next Saturday” were misread, the fix was to give the extraction model an explicit calendar and to repeat the understood search back to the visitor so they can check it.',
    } satisfies Evidence,
    pending: 'A real example of using AI tools: what they contributed, how you checked the result and which decisions were yours',
  },

  curiosity: {
    intro: 'Many of my projects start with a question that crosses fields:',
    questions: [
      { question: 'What does a satellite image actually show, and how old is it?', project: 'Horizonte', href: projectLinks.horizonte },
      { question: 'Can language-model agents help with music?', project: 'ChordsAI', href: projectLinks.chordsAi },
      { question: 'How accurate is tomorrow’s forecast, really?', project: 'Weather warehouse', href: projectLinks.weatherWarehouse },
    ],
  },

  /** Interests stated by Gabriel; the focus areas in site.ts already cover the portfolio themes. */
  interests: [] as string[],
  languages: [] as string[],
};
