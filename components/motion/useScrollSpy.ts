'use client'

import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently occupying the reading position.
 *
 * Replaces `SNT.spy()`. Drives the active state on both the top nav and the
 * sticky section rail. Sections are tracked by id; the one nearest the top of
 * the viewport while still above the midpoint wins, which behaves better than
 * pure intersection ratio when sections differ wildly in height.
 */
export function useScrollSpy(ids: string[], offset = 96): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (ids.length === 0) return
    let frame = 0

    const update = () => {
      frame = 0
      let current: string | null = null

      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top - offset <= 0) current = id
      }

      // Past the end of the document, hold the final section.
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      if (atBottom) current = ids[ids.length - 1]

      setActive(current)
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
  }, [ids, offset])

  return active
}
