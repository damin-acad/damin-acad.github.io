/**
 * Where the sister site lives. Mirror of the portfolio's helper: in dev the
 * cross-links point at the local portfolio server, in a build at the real
 * domain. PUBLIC_PORTFOLIO_ORIGIN overrides both, which is what a preview
 * deploy would set.
 */
const fromEnv = import.meta.env.PUBLIC_PORTFOLIO_ORIGIN as string | undefined;

export const PORTFOLIO_ORIGIN =
  fromEnv?.replace(/\/+$/, '') ||
  (import.meta.env.DEV ? 'http://localhost:4321' : 'https://danialamin.com');

/** absolute URL of the short version of an essay */
export const portfolioExtract = (slug: string) =>
  `${PORTFOLIO_ORIGIN}/writing/essays/${slug.toLowerCase()}`;

/** true when we are pointing at a local dev server rather than the real site */
export const PORTFOLIO_IS_LOCAL = /localhost|127\.0\.0\.1/.test(PORTFOLIO_ORIGIN);
