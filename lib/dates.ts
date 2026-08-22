/**
 * Date helpers shared by content loaders and listing components.
 *
 * Case-study frontmatter is authored as DD-MM-YYYY, which `new Date()` cannot
 * parse — it yields Invalid Date. Everything that renders a content date must
 * go through here.
 */

/** Parses DD-MM-YYYY as well as anything `Date` already understands. */
export function parseDate(dateStr: string): Date {
  if (!dateStr) return new Date(0)
  const ddmmyyyy = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/)
  if (ddmmyyyy) return new Date(`${ddmmyyyy[3]}-${ddmmyyyy[2]}-${ddmmyyyy[1]}`)
  return new Date(dateStr)
}

/** Short display form, e.g. "Apr 2026". Empty string when unparseable. */
export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = parseDate(dateStr)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-GB', { year: 'numeric', month: 'short' })
}

/** Long display form, e.g. "18 April 2026". Empty string when unparseable. */
export function formatDateLong(dateStr: string): string {
  if (!dateStr) return ''
  const d = parseDate(dateStr)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
}

/** Newest first. Safe against missing or malformed dates. */
export function byDateDesc<T extends { date: string }>(a: T, b: T): number {
  return parseDate(b.date).getTime() - parseDate(a.date).getTime()
}
