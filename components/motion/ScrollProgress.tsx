'use client'

import { useEffect, useState } from 'react'

/**
 * Thin teal bar across the top showing how far down the page the reader is.
 *
 * Replaces `SNT.scrollProgress()`. Reads are batched into a rAF so a fast
 * scroll cannot queue up layout work per event.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const scrollable =
        document.documentElement.scrollHeight - document.documentElement.clientHeight
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[500] h-[3px] bg-teal"
      style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
    />
  )
}
