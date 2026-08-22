'use client'

import { useRef, type ReactNode } from 'react'

/**
 * Horizontal rail that can be dragged with a pointer as well as scrolled.
 *
 * Replaces `SNT.dragRail()`. Native overflow scrolling is left intact, so
 * trackpads, touch, and keyboard all keep working; the pointer handlers only
 * add click-and-drag for mouse users. Uses pointer events so a dragged pointer
 * that leaves the element is still released correctly.
 */
export default function DragRail({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const state = useRef({ down: false, startX: 0, startScroll: 0, moved: false })

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Let touch and pen use native momentum scrolling.
    if (e.pointerType !== 'mouse') return
    const el = ref.current
    if (!el) return
    state.current = {
      down: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    }
    el.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || !state.current.down) return
    const dx = e.clientX - state.current.startX
    if (Math.abs(dx) > 4) state.current.moved = true
    el.scrollLeft = state.current.startScroll - dx
  }

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || !state.current.down) return
    state.current.down = false
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId)
  }

  // A drag that moved should not also activate the card it finished on.
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (state.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      state.current.moved = false
    }
  }

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={onClickCapture}
      className={`flex overflow-x-auto ${className}`}
      style={{ scrollbarWidth: 'none', cursor: 'grab' }}
    >
      {children}
    </div>
  )
}
