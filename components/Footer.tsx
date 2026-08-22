import Link from 'next/link'
import BrandMark from '@/components/BrandMark'
import { BRAND } from '@/lib/brand'

const services = [
  { name: 'Modern websites', href: '/#services' },
  { name: 'Notion systems', href: '/#services' },
  { name: 'AI automations', href: '/#services' },
]

const company = [
  { name: 'Work', href: '/case-studies' },
  { name: 'Clients', href: '/#testimonials' },
  { name: 'FAQ', href: '/faq' },
]

export default function Footer() {
  return (
    <footer className="on-ink bg-ink text-bone">
      <div className="wrap grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="mb-4 flex items-center gap-2.5" aria-label={BRAND.name}>
            <BrandMark className="h-7 w-7 shrink-0" tone="bone" />
            <span className="font-display text-[19px] uppercase tracking-[-0.02em]">
              {BRAND.name}
            </span>
          </Link>
          <p className="max-w-[34ch] text-[15px] text-[#A8A499]">
            Digital systems studio. Websites, Notion workspaces and AI automation for
            teams that have outgrown their spreadsheets.
          </p>
        </div>

        <div>
          <h2 className="mono mb-3.5 text-lime">Services</h2>
          {services.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block py-1.5 text-[15px] text-[#B9B5A8] transition-colors hover:text-bone"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div>
          <h2 className="mono mb-3.5 text-teal">Company</h2>
          {company.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block py-1.5 text-[15px] text-[#B9B5A8] transition-colors hover:text-bone"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div>
          <h2 className="mono mb-3.5 text-lime">Contact</h2>
          <a
            href={BRAND.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="block py-1.5 text-[15px] text-[#B9B5A8] transition-colors hover:text-bone"
          >
            Book a call
          </a>
          <Link
            href="/contact"
            className="block py-1.5 text-[15px] text-[#B9B5A8] transition-colors hover:text-bone"
          >
            Send a message
          </Link>
          <a
            href={`mailto:${BRAND.email}`}
            className="block py-1.5 text-[15px] text-[#B9B5A8] transition-colors hover:text-bone"
          >
            {BRAND.email}
          </a>
        </div>
      </div>

      <div className="wrap flex flex-col justify-between gap-3 border-t border-line-dark py-4 sm:flex-row">
        <span className="mono text-[#8C887C]">
          © {new Date().getFullYear()} {BRAND.name}
        </span>
        <span className="mono text-[#8C887C]">{BRAND.domain}</span>
      </div>
    </footer>
  )
}
