'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, Search, X, FileText } from 'lucide-react'
import { CaseStudy } from '@/lib/mdx-utils'

/* ── Helpers ── */
function parseDate(dateStr: string): Date {
  if (!dateStr) return new Date(0)
  const m = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/)
  if (m) return new Date(`${m[3]}-${m[2]}-${m[1]}`)
  return new Date(dateStr)
}

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = parseDate(dateStr)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short' })
}

function slugIndex(slug: string, len: number): number {
  let h = 0
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) & 0xffff
  return h % len
}

/* ── Thumbnail designs (all purple palette) ── */
const BG_GRADIENTS = [
  'linear-gradient(135deg,#2e1065 0%,#6d28d9 55%,#7c3aed 100%)',
  'linear-gradient(135deg,#1e1b4b 0%,#4c1d95 50%,#7c3aed 100%)',
  'linear-gradient(135deg,#3b0764 0%,#6d28d9 50%,#a855f7 100%)',
  'linear-gradient(135deg,#1e1b4b 0%,#3730a3 45%,#6d28d9 100%)',
  'linear-gradient(135deg,#4a1d96 0%,#7c3aed 55%,#a855f7 100%)',
  'linear-gradient(135deg,#2e1065 0%,#4c1d95 50%,#8b5cf6 100%)',
]

const THUMBNAIL_PATTERNS = [
  /* 0 — Floating orbs */
  <div key="orbs" className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full" style={{ background: 'radial-gradient(circle,rgba(255,255,255,.18) 0%,transparent 65%)' }} />
    <div className="absolute -bottom-10 -right-10 w-52 h-52 rounded-full" style={{ background: 'radial-gradient(circle,rgba(255,255,255,.12) 0%,transparent 65%)' }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full" style={{ background: 'radial-gradient(circle,rgba(216,180,254,.45) 0%,transparent 70%)' }} />
  </div>,

  /* 1 — Grid + glowing nodes */
  <div key="grid" className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
    {([
      [28,28,'rgba(196,181,253,.7)',5],
      [112,56,'rgba(196,181,253,.4)',4],
      [56,84,'rgba(244,114,182,.5)',3.5],
      [168,28,'rgba(167,139,250,.5)',3],
      [280,84,'rgba(196,181,253,.4)',4],
      [84,140,'rgba(244,114,182,.35)',3],
    ] as [number,number,string,number][]).map(([x,y,c,r],i) => (
      <div key={i} className="absolute rounded-full" style={{ left: x, top: y, width: r*2, height: r*2, marginLeft: -r, marginTop: -r, background: c, boxShadow: `0 0 6px ${c}` }} />
    ))}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full" style={{ background: 'radial-gradient(circle,rgba(196,181,253,.25) 0%,transparent 70%)' }} />
  </div>,

  /* 2 — Concentric rings */
  <div key="rings" className="absolute inset-0 overflow-hidden">
    {[140,110,82,56,32,12].map((r,i) => (
      <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border" style={{ width: r*2, height: r*2, borderColor: `rgba(255,255,255,${0.18 - i * 0.025})` }} />
    ))}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full" style={{ background: 'rgba(216,180,254,.8)', boxShadow: '0 0 12px rgba(216,180,254,.6)' }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full" style={{ background: 'radial-gradient(circle,rgba(139,92,246,.15) 0%,transparent 70%)' }} />
  </div>,

  /* 3 — Rotated shards */
  <div key="shards" className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-6 -left-6 w-36 h-28 rounded-2xl rotate-12"  style={{ background: 'rgba(255,255,255,.07)' }} />
    <div className="absolute top-4  right-6  w-28 h-24 rounded-2xl -rotate-8" style={{ background: 'rgba(255,255,255,.06)' }} />
    <div className="absolute bottom-0 left-10  w-24 h-20 rounded-2xl rotate-6"  style={{ background: 'rgba(255,255,255,.05)' }} />
    <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl rotate-12" style={{ background: 'rgba(255,255,255,.07)' }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full" style={{ background: 'radial-gradient(circle,rgba(216,180,254,.3) 0%,transparent 70%)' }} />
  </div>,

  /* 4 — Diagonal stripe + glow */
  <div key="stripes" className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg,rgba(255,255,255,.04) 0px,rgba(255,255,255,.04) 1px,transparent 1px,transparent 18px)' }} />
    <div className="absolute top-1/4 left-1/4 w-24 h-24 rounded-full" style={{ background: 'radial-gradient(circle,rgba(216,180,254,.25) 0%,transparent 70%)' }} />
    <div className="absolute bottom-1/4 right-1/4 w-20 h-20 rounded-full" style={{ background: 'radial-gradient(circle,rgba(244,114,182,.2) 0%,transparent 70%)' }} />
    <div className="absolute top-1/2 left-2/3 w-10 h-10 rounded-full" style={{ background: 'radial-gradient(circle,rgba(167,139,250,.3) 0%,transparent 70%)' }} />
  </div>,

  /* 5 — Starburst lines */
  <div key="burst" className="absolute inset-0 overflow-hidden">
    {Array.from({ length: 12 }, (_, i) => (
      <div key={i} className="absolute" style={{ top: '50%', left: '38%', width: 110, height: 1, transformOrigin: 'left center', transform: `translateY(-50%) rotate(${i * 30}deg)`, background: 'linear-gradient(to right,rgba(255,255,255,.22),transparent)' }} />
    ))}
    <div className="absolute rounded-full" style={{ top: 'calc(50% - 6px)', left: 'calc(38% - 6px)', width: 12, height: 12, background: 'rgba(216,180,254,.85)', boxShadow: '0 0 10px rgba(216,180,254,.7)' }} />
    <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full" style={{ background: 'radial-gradient(circle,rgba(139,92,246,.15) 0%,transparent 70%)' }} />
  </div>,
]

/* ── Component ── */
interface Props { caseStudies: CaseStudy[] }

export default function CaseStudiesGrid({ caseStudies }: Props) {
  const [query, setQuery]       = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const allTags = useMemo(() => {
    const set = new Set<string>()
    caseStudies.forEach(cs => { if (Array.isArray(cs.tags)) cs.tags.forEach((t: string) => set.add(t)) })
    return Array.from(set).sort()
  }, [caseStudies])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return caseStudies.filter(cs => {
      const matchesTag = !activeTag || (Array.isArray(cs.tags) && cs.tags.includes(activeTag))
      if (!q) return matchesTag
      const searchable = [cs.title, cs.description, cs.client, cs.category, ...(Array.isArray(cs.tags) ? cs.tags : [])]
        .filter(Boolean).join(' ').toLowerCase()
      return matchesTag && searchable.includes(q)
    })
  }, [caseStudies, query, activeTag])

  const clearFilters = () => { setQuery(''); setActiveTag(null) }
  const hasFilters = query.trim() !== '' || activeTag !== null

  return (
    <>
      {/* ── Toolbar ── */}
      <div className="mb-10 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by title, client, tag…"
              className="w-full pl-11 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-colors"
            />
            {query && (
              <button onClick={() => setQuery('')} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className="shrink-0 text-sm text-gray-500 whitespace-nowrap">
            {hasFilters ? `${filtered.length} of ${caseStudies.length} results` : `${caseStudies.length} case stud${caseStudies.length !== 1 ? 'ies' : 'y'}`}
          </p>
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all duration-200 ${activeTag === null ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-transparent text-white shadow-md' : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200 bg-white/5'}`}
            >All</button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all duration-200 ${activeTag === tag ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-transparent text-white shadow-md' : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200 bg-white/5'}`}
              >{tag}</button>
            ))}
            {hasFilters && (
              <button onClick={clearFilters} className="text-xs text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1 px-2">
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Grid ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-28">
          <FileText className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p className="text-gray-400 mb-3">No case studies match your search.</p>
          <button onClick={clearFilters} className="text-sm text-pink-400 hover:text-pink-300 transition-colors">Clear filters</button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ gridAutoRows: '1fr' }}>
          {filtered.map(cs => {
            const bgIdx       = slugIndex(cs.slug, BG_GRADIENTS.length)
            const patternIdx  = slugIndex(cs.slug + 'p', THUMBNAIL_PATTERNS.length)
            const date        = formatDate(cs.date)
            const tags: string[] = Array.isArray(cs.tags) ? cs.tags : []

            return (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="group flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-900/20"
              >
                {/* ── Thumbnail ── */}
                <div className="relative h-44 flex-shrink-0 overflow-hidden" style={cs.featuredImage ? undefined : { background: BG_GRADIENTS[bgIdx] }}>
                  {cs.featuredImage ? (
                    <img
                      src={cs.featuredImage}
                      alt={cs.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    THUMBNAIL_PATTERNS[patternIdx]
                  )}

                  {/* Bottom fade into card body */}
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Category badge */}
                  {cs.category && (
                    <span className="absolute top-4 left-4 text-xs font-semibold text-white bg-black/30 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 z-10">
                      {cs.category}
                    </span>
                  )}

                  {/* Date */}
                  {date && (
                    <span className="absolute bottom-3 right-4 text-xs text-white/55 font-medium z-10">
                      {date}
                    </span>
                  )}
                </div>

                {/* ── Body ── */}
                <div className="flex flex-col flex-1 p-6">
                  {cs.client && (
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">
                      {cs.client}
                    </p>
                  )}

                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-all">
                    {cs.title}
                  </h3>

                  {cs.description && (
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                      {cs.description}
                    </p>
                  )}

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className={`text-xs px-2.5 py-0.5 rounded-full border transition-colors ${activeTag === tag ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-pink-500/40 text-pink-300' : 'bg-white/5 border-white/10 text-gray-400'}`}
                        >{tag}</span>
                      ))}
                      {tags.length > 3 && (
                        <span className="text-xs text-gray-600 py-0.5">+{tags.length - 3}</span>
                      )}
                    </div>
                  )}

                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                      Read case study
                    </span>
                    <span className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center group-hover:from-purple-500 group-hover:to-pink-500 group-hover:border-transparent transition-all duration-300">
                      <ArrowRight className="w-3.5 h-3.5 text-pink-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}
