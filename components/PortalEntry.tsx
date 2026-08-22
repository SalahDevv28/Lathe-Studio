'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

export default function PortalEntry() {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleEnter = () => {
    setIsAnimating(true)
    setTimeout(() => {
      router.push('/home')
    }, 1500)
  }

  if (isAnimating) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="animate-fade-in">
          <div className="relative">
            {/* Portal rings */}
            <div className="absolute inset-0 animate-ping">
              <div className="w-32 h-32 border-2 border-purple-600 rounded-full"></div>
            </div>
            <div className="absolute inset-2 animate-ping animation-delay-300">
              <div className="w-28 h-28 border-2 border-accent-600 rounded-full"></div>
            </div>
            <div className="absolute inset-4 animate-ping animation-delay-600">
              <div className="w-24 h-24 border-2 border-purple-400 rounded-full"></div>
            </div>
            
            {/* Portal center */}
            <div className="w-32 h-32 bg-portal-gradient rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div
        className={`group relative transition-all duration-700 cursor-pointer ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
        onClick={handleEnter}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* ambient glow */}
          <div
            className={`absolute inset-[-30px] rounded-full blur-2xl ${
              isHovered ? 'bg-purple-600/40' : 'bg-purple-600/25'
            }`}
          />
          {/* main ring */}
          <div
            className={`absolute inset-0 rounded-full border-4 ${
              isHovered ? 'border-purple-400' : 'border-purple-600'
            } shadow-[0_0_60px_rgba(168,85,247,0.35)]`}
          />
          {/* subtle inner ring */}
          <div
            className={`absolute inset-3 rounded-full border-2 ${
              isHovered ? 'border-accent-400/80' : 'border-accent-600/60'
            }`}
          />
          {/* black core with text */}
          <div className="relative z-10 w-56 h-56 rounded-full bg-black text-gray-200 flex items-center justify-center select-none shadow-[0_0_30px_rgba(168,85,247,0.25)]">
            <span className="text-sm tracking-wide">Enter here</span>
          </div>
        </div>
      </div>
    </div>
  )
}