'use client'

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** Element to render. Defaults to a div. */
  as?: ElementType
  /** Stagger delay in seconds. Feeds the `--d` custom property. */
  delay?: number
  /** Fraction of the element that must be visible before it fires. */
  threshold?: number
  className?: string
  /** Merged with the delay custom property rather than replacing it. */
  style?: React.CSSProperties
}

/**
 * Fades and lifts its children into place the first time they scroll into view.
 *
 * Replaces `SNT.reveal()` from the mockup's missing motion.js. The visual work
 * lives in the `.rise` / `.rise.in` utilities; this only decides *when* to add
 * the class. Under `prefers-reduced-motion` the CSS renders `.rise` fully
 * visible, so a browser that never fires the observer still shows content.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  threshold = 0.15,
  className = '',
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // No observer support: show immediately rather than hiding content forever.
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <Tag
      ref={ref}
      className={`rise ${shown ? 'in' : ''} ${className}`.trim()}
      style={{ ...(delay ? ({ '--d': `${delay}s` } as React.CSSProperties) : null), ...style }}
    >
      {children}
    </Tag>
  )
}
