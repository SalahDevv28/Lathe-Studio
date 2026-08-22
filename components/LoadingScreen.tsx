'use client'

import { useState, useEffect } from 'react'

export default function LoadingScreen() {
  const [started, setStarted] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  useEffect(() => {
    if (loaded) {
      document.body.style.overflow = 'unset'
    }
  }, [loaded])

  const handleClick = () => {
    if (started) return
    setStarted(true)
    setTimeout(() => {
      setLoaded(true)
    }, 1600)
  }

  if (loaded) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0A0A] transition-opacity duration-700 ${
        started ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <button
        onClick={handleClick}
        className="group flex flex-col items-center gap-6 focus:outline-none"
        aria-label="Click to load"
      >
        <div
          className={`relative w-40 h-40 sm:w-52 sm:h-52 transition-transform duration-700 ${
            started ? 'animate-logo-spin' : ''
          }`}
        >
          <img
            src="/images/snt_logo_loading_bright_trail.svg"
            alt="SNT"
            className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(139,92,246,0.4)]"
          />
          {!started && (
            <div className="absolute inset-0 rounded-full bg-purple-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          )}
        </div>

        {!started && (
          <span className="text-sm sm:text-base font-medium tracking-[0.2em] text-gray-300 group-hover:text-white transition-colors">
            CLICK TO LOAD
          </span>
        )}
      </button>
    </div>
  )
}
