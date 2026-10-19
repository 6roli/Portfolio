/**
 * Per-project colour themes. Every page shares the same dark layout; a project
 * only changes its two accent colours, which drive the glow, the liquid bands,
 * labels and links. Pick one in the project's front matter with `theme: <id>`.
 */
export const themes = {
  /** Default: blue to violet, used by the home page and generic pages. */
  aurora: { accent: '#7c9cff', accent2: '#a678ff' },
  /** Cold cyan to deep blue — satellites, atmosphere, ocean. */
  sky: { accent: '#4cc9f0', accent2: '#4361ee' },
  /** Warm coral to amber — products and conversation. */
  ember: { accent: '#ff7a59', accent2: '#ffb347' },
  /** Violet to magenta — sound and creative tools. */
  violet: { accent: '#c084fc', accent2: '#f472b6' },
  /** Green to teal — data pipelines and measurements. */
  moss: { accent: '#4ade80', accent2: '#2dd4bf' },
} as const;

export type ThemeId = keyof typeof themes;
export const themeIds = Object.keys(themes) as [ThemeId, ...ThemeId[]];

/**
 * Inline style that sets the theme's CSS variables on an element. The derived
 * colours are repeated here because a custom property built with var() is
 * resolved where it is declared, not where it is used.
 */
export function themeStyle(id: ThemeId = 'aurora'): string {
  const { accent, accent2 } = themes[id];
  return [
    `--accent: ${accent}`,
    `--accent-2: ${accent2}`,
    `--accent-soft: color-mix(in srgb, ${accent} 14%, transparent)`,
    `--accent-text: color-mix(in srgb, ${accent} 55%, white)`,
  ].join('; ');
}
