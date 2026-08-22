'use client'

import { useScrollSpy } from '@/components/motion/useScrollSpy'

const sections = [
  { id: 'services', label: 'Services' },
  { id: 'proof', label: 'Proof' },
  { id: 'process', label: 'Process' },
  { id: 'work', label: 'Work' },
  { id: 'studio', label: 'Studio' },
  { id: 'faq', label: 'FAQ' },
]

const ids = sections.map((s) => s.id)

/**
 * Sticky index down the left of the homepage body, tracking the reader's
 * position. Hidden below the mockup's 1080px breakpoint, where the body
 * collapses to a single column.
 */
export default function SectionRail() {
  const active = useScrollSpy(ids)

  return (
    <aside className="hidden border-r border-line xl:block">
      <nav
        className="sticky top-16 flex flex-col gap-3.5 py-9 pl-7"
        aria-label="Sections"
      >
        {sections.map((section, i) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`border-l-2 pl-3 font-mono uppercase transition-colors ${
              active === section.id
                ? 'border-teal text-ink'
                : 'border-transparent text-grey hover:text-ink'
            }`}
            style={{ fontSize: 11, letterSpacing: '0.12em' }}
            aria-current={active === section.id ? 'true' : undefined}
          >
            {String(i + 1).padStart(2, '0')} / {section.label}
          </a>
        ))}
      </nav>
    </aside>
  )
}
