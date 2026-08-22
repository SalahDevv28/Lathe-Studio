'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { NavItem } from '@/lib/types'

const navigation: NavItem[] = [
  { name: 'Blog', href: '/blog' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/90 backdrop-blur-md border-b border-gray-800/50'
            : 'bg-background/60 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center group gap-2">
              <img
                src="/images/snt-logo-header.svg"
                alt="SNT Solutions"
                className="h-8 w-8 object-cover"
              />
              <span className="font-heading font-bold text-xl text-white group-hover:text-purple-300 transition-colors">
                SNT Solutions
              </span>
            </Link>

            {/* Desktop Navigation - Right aligned with CTA */}
            <div className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-gray-300 hover:text-purple-400 transition-colors duration-200 font-medium relative ${
                    pathname === item.href ? 'text-purple-400' : ''
                  }`}
                >
                  {item.name}
                  {pathname === item.href && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                  )}
                </Link>
              ))}
              <a
                href="https://calendly.com/salahdevv/request-a-call"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Book a discovery call
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation — backdrop + slide-in drawer */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[59]"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="md:hidden fixed top-0 right-0 h-full w-72 bg-[#0f0f14] border-l border-white/10 z-[60] flex flex-col shadow-2xl shadow-black/50">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
              <span className="font-heading font-bold text-white">Menu</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center px-6 gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 ${
                    pathname === item.href
                      ? 'bg-purple-600/10 border border-purple-500/30 text-purple-300'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                  {pathname === item.href && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="px-6 pb-8 pt-4 border-t border-white/10">
              <a
                href="https://calendly.com/salahdevv/request-a-call"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold py-3.5 px-6 rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Book a discovery call
              </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}