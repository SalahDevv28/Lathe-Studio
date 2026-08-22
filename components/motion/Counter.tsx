'use client'

import { useEffect, useRef, useState } from 'react'

interface CounterProps {
  /** Final value to count to. */
  value: number
  prefix?: string
  suffix?: string
  /** Decimal places to hold throughout the count, e.g. 1 for "11.4". */
  decimals?: number
  /** Zero-pad the integer part to this width, e.g. 2 renders 3 as "03". */
  pad?: number
  duration?: number
  className?: string
}

/**
 * Counts up to `value` the first time it scrolls into view, then stops.
 *
 * Replaces `SNT.counters()`. Respects `prefers-reduced-motion` by rendering the
 * final value immediately, and renders the final value as its initial state so
 * the figure is correct in SSR output and for anyone without JS.
 */
export default function Counter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  pad = 0,
  duration = 1400,
  className = '',
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced =
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced || typeof IntersectionObserver === 'undefined') return

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1)
          // Ease-out cubic: fast start, gentle settle onto the real figure.
          const eased = 1 - Math.pow(1 - t, 3)
          setDisplay(value * eased)
          if (t < 1) frame = requestAnimationFrame(tick)
          else setDisplay(value)
        }
        setDisplay(0)
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value, duration])

  const shown = display.toFixed(decimals)
  const [whole, fraction] = shown.split('.')
  const padded = pad ? whole.padStart(pad, '0') : whole

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}
      {fraction ? `${padded}.${fraction}` : padded}
      {suffix}
    </span>
  )
}
