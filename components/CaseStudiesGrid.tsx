'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Search, X } from 'lucide-react'
import type { CaseStudy } from '@/lib/mdx-utils'
import { formatDate } from '@/lib/dates'
import CaseStudyThumb from '@/components/CaseStudyThumb'

export default function CaseStudiesGrid({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string | null>(null)

  /* Filter by category — the only taxonomy actually present in the case-study
     frontmatter. The previous grid filtered on `tags`, which no case study has. */
  const categories = useMemo(() => {
    const set = new Set<string>()
    caseStudies.forEach((cs) => {
      if (cs.category) set.add(cs.category)
    })
    return Array.from(set).sort()
  }, [caseStudies])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return caseStudies.filter((cs) => {
      if (category && cs.category !== category) return false
      if (!q) return true
      return [cs.title, cs.description, cs.client, cs.category, ...(cs.technicalStack ?? [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q)
    })
  }, [caseStudies, query, category])

  const filtering = query.trim() !== '' || category !== null
  const clear = () => {
    setQuery('')
    setCategory(null)
  }

  return (
    <>
      {/* ------------------------------------------------------- toolbar */}
      <div className="mb-10 space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-grey"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, client or stack…"
              aria-label="Search case studies"
              className="w-full rounded border border-line bg-clay py-3 pl-11 pr-10 text-[15px] text-ink placeholder-grey transition-colors focus:border-ink focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-grey transition-colors hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <p className="mono shrink-0 text-grey">
            {filtering
              ? `${filtered.length} of ${caseStudies.length}`
              : `${caseStudies.length} case ${caseStudies.length === 1 ? 'study' : 'studies'}`}
          </p>
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setCategory(null)}
              className={`rounded border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                category === null
                  ? 'border-ink bg-ink text-bone'
                  : 'border-line bg-clay text-grey hover:border-ink hover:text-ink'
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(category === c ? null : c)}
                className={`rounded border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                  category === c
                    ? 'border-ink bg-ink text-bone'
                    : 'border-line bg-clay text-grey hover:border-ink hover:text-ink'
                }`}
              >
                {c}
              </button>
            ))}
            {filtering && (
              <button
                onClick={clear}
                className="mono px-2 text-teal transition-colors hover:text-ink"
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>

      {/* ---------------------------------------------------------- grid */}
      {filtered.length === 0 ? (
        <div className="border-t-2 border-ink py-24 text-center">
          <p className="mb-4 text-[17px] text-grey">Nothing matches that search.</p>
          <button onClick={clear} className="mono text-teal transition-colors hover:text-ink">
            Clear filters →
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((cs, i) => {
            const date = formatDate(cs.date)
            const outcome = Array.isArray(cs.outcomes) ? cs.outcomes[0] : undefined

            return (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="group flex flex-col overflow-hidden rounded border border-line transition-colors hover:border-ink hover:bg-clay"
              >
                <CaseStudyThumb variant={i} className="h-[190px] shrink-0" />

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-baseline justify-between gap-3">
                    {cs.category && (
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-teal">
                        {cs.category}
                      </span>
                    )}
                    {date && <span className="mono shrink-0 text-grey">{date}</span>}
                  </div>

                  <h2 className="mb-3 text-[24px] leading-[1.05]">{cs.title}</h2>

                  {cs.client && (
                    <p className="mb-3 text-[13.5px] text-grey">{cs.client}</p>
                  )}

                  {cs.description && (
                    <p className="mb-auto line-clamp-3 text-[15px] text-grey">
                      {cs.description}
                    </p>
                  )}

                  {outcome && (
                    <p className="mt-5 border-t border-line pt-4 text-[13.5px] text-ink">
                      <span className="mr-2 inline-block h-[7px] w-[7px] rounded-[1px] border border-ink bg-lime align-middle" />
                      {outcome}
                    </p>
                  )}

                  <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em]">
                    Read case study
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}
