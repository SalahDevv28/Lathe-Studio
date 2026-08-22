import type { MetadataRoute } from 'next'
import { getAllCaseStudies } from '@/lib/mdx-utils'
import { parseDate } from '@/lib/dates'
import { BRAND_URL } from '@/lib/brand'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const caseStudies = await getAllCaseStudies()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BRAND_URL, changeFrequency: 'monthly', priority: 1 },
    { url: `${BRAND_URL}/case-studies`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BRAND_URL}/faq`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${BRAND_URL}/contact`, changeFrequency: 'yearly', priority: 0.8 },
  ]

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => {
    /* Frontmatter dates are DD-MM-YYYY; parseDate is what keeps lastModified
       from becoming Invalid Date and dropping out of the XML. */
    const parsed = parseDate(cs.date)
    return {
      url: `${BRAND_URL}/case-studies/${cs.slug}`,
      lastModified: isNaN(parsed.getTime()) ? undefined : parsed,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    }
  })

  return [...staticRoutes, ...caseStudyRoutes]
}
