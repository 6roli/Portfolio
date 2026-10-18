import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLocale } from '../i18n';

export type Project = CollectionEntry<'projects'>;

/** Entry ids look like "en/horizonte"; the first segment is the locale. */
export function projectLocale(project: Project): string {
  return project.id.split('/')[0];
}

/** URL slug without the locale prefix, e.g. "horizonte". */
export function projectSlug(project: Project): string {
  return project.id.split('/').slice(1).join('/');
}

/** Projects for one locale, ordered by `order` then title. */
export async function getProjects(locale: string = defaultLocale): Promise<Project[]> {
  const all = await getCollection('projects', (entry) => projectLocale(entry) === locale);
  return all.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}
