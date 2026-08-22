import type { MetadataRoute } from 'next'
import { BRAND_URL } from '@/lib/brand'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      /* /blog has no posts yet and /services only redirects — neither is worth
         a crawl budget until they carry real content. */
      disallow: ['/blog', '/blog/', '/services'],
    },
    sitemap: `${BRAND_URL}/sitemap.xml`,
    host: BRAND_URL,
  }
}
