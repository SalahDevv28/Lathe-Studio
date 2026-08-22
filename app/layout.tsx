import type { Metadata } from 'next'
import { Archivo, Archivo_Black, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/motion/ScrollProgress'
import { BRAND, BRAND_URL } from '@/lib/brand'

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
})

const archivoBlack = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-archivo-black',
  display: 'swap',
})

const instrument = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

/* "Lathe" alone competes with machine-tool results, so every public title
   pairs the name with what the studio actually does. */
const title = `${BRAND.name} — ${BRAND.tagline}`
const description =
  'A digital systems studio for teams that have outgrown their spreadsheets. We build the website, the Notion workspace and the automations underneath, so nothing gets typed twice.'

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${BRAND.name}`,
  },
  description,
  keywords: [
    'Notion systems',
    'Notion consultant',
    'AI automation',
    'workflow automation',
    'business operations',
    'Next.js development',
    'small business systems',
    'CRM setup',
  ],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  publisher: BRAND.name,
  metadataBase: new URL(BRAND_URL),
  alternates: { canonical: '/' },
  icons: { icon: '/icon.svg' },
  openGraph: {
    title,
    description,
    url: BRAND_URL,
    siteName: BRAND.name,
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${archivoBlack.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <ScrollProgress />

        {/* Film grain across the whole page, multiplied over everything. */}
        <svg className="grain" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <filter id="grain-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-filter)" opacity="0.14" />
        </svg>

        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
