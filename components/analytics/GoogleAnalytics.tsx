'use client'

import Script from 'next/script'

/**
 * GA4 via gtag.
 *
 * Loaded with `afterInteractive` so it never competes with first paint, and
 * rendered only when NEXT_PUBLIC_GA_ID is set — so local and preview builds
 * stay out of the numbers unless you deliberately opt them in.
 *
 * Note: gtag sets cookies. If you take UK or EU traffic, this needs a consent
 * banner in front of it to be lawful; `anonymize_ip` reduces but does not
 * remove that obligation.
 */
export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
