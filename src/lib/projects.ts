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

/**
 * A module is a project stored inside another project's folder, e.g.
 * src/content/projects/en/horizonte/weather-warehouse.md belongs to Horizonte.
 * Modules are shown inside their parent, never as separate projects.
 */
export function parentSlug(project: Project): string | null {
  const parts = projectSlug(project).split('/');
  return parts.length > 1 ? parts.slice(0, -1).join('/') : null;
}

const byOrder = (a: Project, b: Project) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title);

/** Every project and module of one locale (used to build the pages). */
export async function getAllProjects(locale: string = defaultLocale): Promise<Project[]> {
  const all = await getCollection('projects', (entry) => projectLocale(entry) === locale);
  return all.sort(byOrder);
}

/** Top-level projects for one locale, ordered by `order` then title. */
export async function getProjects(locale: string = defaultLocale): Promise<Project[]> {
  return (await getAllProjects(locale)).filter((project) => parentSlug(project) === null);
}

/** Modules of a project, e.g. getModules('horizonte'). */
export async function getModules(parent: string, locale: string = defaultLocale): Promise<Project[]> {
  return (await getAllProjects(locale)).filter((project) => parentSlug(project) === parent);
}
