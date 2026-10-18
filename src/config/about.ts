/**
 * Biography and CV data. Used by both the About page and the web CV, so the
 * two never disagree. Empty arrays render as "pending" markers.
 *
 * Example entry (delete the comment once real data is added):
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

export const about = {
  /** One or two paragraphs written by Gabriel. */
  bio: [] as string[],
  education: [] as TimelineEntry[],
  experience: [] as TimelineEntry[],
  /** Interests stated by Gabriel; the focus areas in site.ts already cover the portfolio themes. */
  interests: [] as string[],
  languages: [] as string[],
};
