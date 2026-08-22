/**
 * Single source of truth for brand identity.
 *
 * Everything user-facing — metadata, header, footer, CTAs — reads from here,
 * so a name or domain change is a one-line edit rather than a sweep.
 */
export const BRAND = {
  /** Formal name, as set in the wordmark. */
  name: 'The Lathe Studio',
  /** Spoken / short form, used where space is tight. */
  short: 'Lathe',
  /** TODO: confirm on a registrar before launch. */
  domain: 'lathestudio.com',
  email: 'salahdevv@gmail.com',
  calendly: 'https://calendly.com/salahdevv/request-a-call',
  /**
   * "Lathe" alone ranks against machine-tool results, so public-facing titles
   * always pair it with what we do.
   */
  tagline: 'Websites, Notion systems & AI automation',
} as const

export const BRAND_URL = `https://${BRAND.domain}`
