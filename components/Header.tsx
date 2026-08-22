'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import BrandMark from '@/components/BrandMark'
import { BRAND } from '@/lib/brand'
import type { NavItem } from '@/lib/types'

/* Section anchors are absolute (/#services) so they work from any page, not
   just the homepage.

   /blog is intentionally absent: there are no posts yet, and linking to an
   empty index reads as an abandoned site. Restore it the moment one lands. */
const navigation: NavItem[] = [
  { name: 'Services', href: '/#services' },
  { name: 'Work', href: '/case-studies' },
  { name: 'Process', href: '/#process' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const drawerRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key !== 'Tab') return

      // Keep focus inside the drawer while it is open.
      const focusables = drawerRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      )
      if (!focusables || focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    // Move focus into the drawer so the keyboard lands somewhere sensible.
    drawerRef.current?.querySelector<HTMLElement>('a[href], button')?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      previouslyFocused?.focus?.()
    }
  }, [open])

  /* Anchor links never take the active state — the homepage's own section rail
     tracks those. Only real routes light up. */
  const isActive = (href: string) =>
    href.includes('#') ? false : pathname.startsWith(href)

  return (
    <>
      <header className="on-ink sticky top-0 z-[90] border-b border-ink bg-ink text-bone">
        <div className="wrap flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label={BRAND.name}>
            <BrandMark className="h-7 w-7 shrink-0" tone="bone" />
            <span className="font-display text-[19px] tracking-[-0.02em]">LATHE</span>
          </Link>

          {/* Middle slot. With three children under justify-between, the links
              sit centred between the mark and the button, as in the mockup. */}
          <nav className="hidden items-center gap-[26px] nav:flex" aria-label="Main">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`border-b-2 py-1 font-medium uppercase transition-colors ${
                  isActive(item.href)
                    ? 'border-lime text-bone'
                    : 'border-transparent text-[#B9B5A8] hover:border-lime hover:text-bone'
                }`}
                style={{ fontSize: 13, letterSpacing: '0.06em' }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right slot: the CTA on desktop, the menu toggle below 980px. */}
          <div className="flex items-center">
            <a
              href={BRAND.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded bg-lime px-[18px] py-2.5 font-semibold uppercase text-ink transition-colors hover:bg-bone nav:inline-flex"
              style={{ fontSize: 13, letterSpacing: '0.06em' }}
            >
              Book a call
            </a>

            <button
              ref={toggleRef}
              onClick={() => setOpen(true)}
              className="rounded p-2 text-bone transition-colors hover:bg-white/10 nav:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <>
          <div
            className="fixed inset-0 z-[95] bg-black/60 nav:hidden"
            onClick={() => setOpen(false)}
          />

          <div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="on-ink fixed right-0 top-0 z-[96] flex h-full w-72 flex-col border-l border-line-dark bg-ink text-bone nav:hidden"
          >
            <div className="flex h-16 items-center justify-between border-b border-line-dark px-7">
              <span className="mono text-[#B9B5A8]">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="rounded p-2 transition-colors hover:bg-white/10"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 px-5 pt-6" aria-label="Mobile">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded border-l-2 px-4 py-3.5 font-semibold uppercase transition-colors ${
                    isActive(item.href)
                      ? 'border-lime bg-white/5 text-bone'
                      : 'border-transparent text-[#B9B5A8] hover:bg-white/5 hover:text-bone'
                  }`}
                  style={{ fontSize: 14, letterSpacing: '0.06em' }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="border-t border-line-dark p-5">
              <a
                href={BRAND.calendly}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block rounded bg-lime px-5 py-3.5 text-center font-semibold uppercase text-ink"
                style={{ fontSize: 13, letterSpacing: '0.06em' }}
              >
                Book a call
              </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}
