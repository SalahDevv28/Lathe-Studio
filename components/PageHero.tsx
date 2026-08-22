import type { ReactNode } from 'react'
import Reveal from '@/components/motion/Reveal'

/**
 * The dark band that opens an inner page.
 *
 * Same stripe field as the homepage hero, at a shorter height so it announces
 * the page without repeating the full arrival moment.
 */
export default function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="on-ink relative overflow-hidden border-b border-ink bg-ink text-bone">
      <div className="stripes" aria-hidden="true" />
      <div className="stripes-2" aria-hidden="true" />

      <div className="wrap relative z-[3] py-16">
        <Reveal as="span" delay={0.05}>
          <span className="mono inline-flex items-center gap-2.5 rounded border-2 border-bone px-3.5 py-1.5">
            <b className="h-[7px] w-[7px] rounded-[1px] bg-lime" />
            {eyebrow}
          </span>
        </Reveal>

        <Reveal delay={0.14}>
          <h1 className="mt-7" style={{ fontSize: 'clamp(38px, 6.5vw, 82px)' }}>
            {title}
          </h1>
        </Reveal>

        {lede && (
          <Reveal delay={0.24}>
            <p className="mt-6 max-w-[52ch] text-[18px] text-[#B9B5A8]">{lede}</p>
          </Reveal>
        )}

        {children}
      </div>
    </div>
  )
}
