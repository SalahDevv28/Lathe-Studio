import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'SNT Solutions - Building Websites, AI Systems & Automations',
    template: '%s | SNT Solutions'
  },
  description: 'SNT Solutions builds modern websites with Next.js/React, customized Notion systems with AI automations, and intelligent AI agents/automations.',
  keywords: [
    'web development',
    'Next.js development',
    'React development',
    'Notion systems',
    'AI automations',
    'AI agents',
    'custom Notion',
    'AI workflows',
    'portfolio'
  ],
  authors: [{ name: 'SNT Solutions' }],
  creator: 'SNT Solutions',
  publisher: 'SNT Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://snt-solutions.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'SNT Solutions - Building Websites, AI Systems & Automations',
    description: 'We build modern websites, customized Notion systems with AI, and intelligent automations that help businesses grow.',
    url: 'https://snt-solutions.com',
    siteName: 'SNT Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SNT Solutions - Building Websites, AI Systems & Automations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SNT Solutions - Building Websites, AI Systems & Automations',
    description: 'We build modern websites, customized Notion systems with AI, and intelligent automations.',
    images: ['/og-image.jpg'],
    creator: '@sntsolutions',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <LoadingScreen />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}