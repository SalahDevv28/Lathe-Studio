import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllCaseStudies, CaseStudy } from '@/lib/mdx-utils'

/* ── Same helpers as CaseStudiesGrid (server-safe, no fs import) ── */
function parseDate(dateStr: string): Date {
  if (!dateStr) return new Date(0)
  const m = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/)
  if (m) return new Date(`${m[3]}-${m[2]}-${m[1]}`)
  return new Date(dateStr)
}

function formatDate(dateStr: string): string {
  const d = parseDate(dateStr)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short' })
}

function slugIndex(slug: string, len: number): number {
  let h = 0
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) & 0xffff
  return h % len
}

const BG_GRADIENTS = [
  'linear-gradient(135deg,#2e1065 0%,#6d28d9 55%,#7c3aed 100%)',
  'linear-gradient(135deg,#1e1b4b 0%,#4c1d95 50%,#7c3aed 100%)',
  'linear-gradient(135deg,#3b0764 0%,#6d28d9 50%,#a855f7 100%)',
  'linear-gradient(135deg,#1e1b4b 0%,#3730a3 45%,#6d28d9 100%)',
  'linear-gradient(135deg,#4a1d96 0%,#7c3aed 55%,#a855f7 100%)',
  'linear-gradient(135deg,#2e1065 0%,#4c1d95 50%,#8b5cf6 100%)',
]

/* Each thumbnail uses the case study cover image when available */
function Thumbnail({ slug, featuredImage, title }: { slug: string; featuredImage?: string; title: string }) {
  const bgIdx = slugIndex(slug, BG_GRADIENTS.length)
  const p     = slugIndex(slug + 'p', 6)

  if (featuredImage) {
    return (
      <div className="relative h-40 overflow-hidden flex-shrink-0">
        <img
          src={featuredImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
    )
  }

  const overlay = (() => {
    switch (p) {
      case 0: return (
        <>
          <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full" style={{ background: 'radial-gradient(circle,rgba(255,255,255,.18) 0%,transparent 65%)' }} />
          <div className="absolute -bottom-10 -right-10 w-52 h-52 rounded-full" style={{ background: 'radial-gradient(circle,rgba(255,255,255,.12) 0%,transparent 65%)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full" style={{ background: 'radial-gradient(circle,rgba(216,180,254,.45) 0%,transparent 70%)' }} />
        </>
      )
      case 1: return (
        <>
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
          {([[ 28,28,'rgba(196,181,253,.7)',5],[112,56,'rgba(196,181,253,.4)',4],[56,84,'rgba(244,114,182,.5)',3.5],[168,28,'rgba(167,139,250,.5)',3],[280,84,'rgba(196,181,253,.4)',4]] as [number,number,string,number][]).map(([x,y,c,r],i) => (
            <div key={i} className="absolute rounded-full" style={{ left:x,top:y,width:r*2,height:r*2,marginLeft:-r,marginTop:-r,background:c,boxShadow:`0 0 6px ${c}` }} />
          ))}
        </>
      )
      case 2: return (
        <>
          {[140,110,82,56,32,12].map((r,i) => (
            <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border" style={{ width:r*2,height:r*2,borderColor:`rgba(255,255,255,${0.18-i*0.025})` }} />
          ))}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full" style={{ background:'rgba(216,180,254,.8)',boxShadow:'0 0 12px rgba(216,180,254,.6)' }} />
        </>
      )
      case 3: return (
        <>
          <div className="absolute -top-6 -left-6 w-36 h-28 rounded-2xl rotate-12"  style={{ background:'rgba(255,255,255,.07)' }} />
          <div className="absolute top-4  right-6  w-28 h-24 rounded-2xl -rotate-8" style={{ background:'rgba(255,255,255,.06)' }} />
          <div className="absolute bottom-0 left-10  w-24 h-20 rounded-2xl rotate-6"  style={{ background:'rgba(255,255,255,.05)' }} />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl rotate-12" style={{ background:'rgba(255,255,255,.07)' }} />
        </>
      )
      case 4: return (
        <>
          <div className="absolute inset-0" style={{ backgroundImage:'repeating-linear-gradient(45deg,rgba(255,255,255,.04) 0px,rgba(255,255,255,.04) 1px,transparent 1px,transparent 18px)' }} />
          <div className="absolute top-1/4 left-1/4 w-24 h-24 rounded-full" style={{ background:'radial-gradient(circle,rgba(216,180,254,.25) 0%,transparent 70%)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-20 h-20 rounded-full" style={{ background:'radial-gradient(circle,rgba(244,114,182,.2) 0%,transparent 70%)' }} />
        </>
      )
      default: return (
        <>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="absolute" style={{ top:'50%',left:'38%',width:110,height:1,transformOrigin:'left center',transform:`translateY(-50%) rotate(${i*30}deg)`,background:'linear-gradient(to right,rgba(255,255,255,.22),transparent)' }} />
          ))}
          <div className="absolute rounded-full" style={{ top:'calc(50% - 6px)',left:'calc(38% - 6px)',width:12,height:12,background:'rgba(216,180,254,.85)',boxShadow:'0 0 10px rgba(216,180,254,.7)' }} />
        </>
      )
    }
  })()

  return (
    <div className="relative h-40 overflow-hidden flex-shrink-0" style={{ background: BG_GRADIENTS[bgIdx] }}>
      {overlay}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  )
}

function CarouselCard({ cs }: { cs: CaseStudy }) {
  const date = formatDate(cs.date)
  const tags: string[] = Array.isArray(cs.tags) ? cs.tags.slice(0, 3) : []

  return (
    <Link
      href={`/case-studies/${cs.slug}`}
      className="group flex-shrink-0 w-72 flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/20"
    >
      <Thumbnail slug={cs.slug} featuredImage={cs.featuredImage} title={cs.title} />

      <div className="flex flex-col flex-1 p-5">
        {/* Category + date */}
        <div className="flex items-center justify-between mb-3">
          {cs.category ? (
            <span className="text-xs font-semibold text-white bg-black/30 border border-white/15 rounded-full px-2.5 py-0.5">
              {cs.category}
            </span>
          ) : <span />}
          {date && <span className="text-xs text-gray-500">{date}</span>}
        </div>

        <h3 className="text-base font-bold text-white line-clamp-2 leading-snug mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-all">
          {cs.title}
        </h3>

        {cs.description && (
          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-3">
            {cs.description}
          </p>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Read case study
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-pink-400 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}

export default async function CaseStudiesCarousel() {
  const caseStudies = await getAllCaseStudies()
  if (caseStudies.length === 0) return null

  // Duplicate enough times to fill wide screens + loop seamlessly
  const repeated = [...caseStudies, ...caseStudies, ...caseStudies, ...caseStudies]

  return (
    <section className="py-20 bg-black/30 backdrop-blur-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-24 mb-10">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Case Studies
              </span>
            </h2>
            <p className="text-gray-400 mt-2">Real projects, real results.</p>
          </div>
          <Link
            href="/case-studies"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 hover:opacity-70 transition-opacity"
          >
            View all <ArrowRight className="w-4 h-4 text-pink-400" />
          </Link>
        </div>
      </div>

      {/* Scrolling track — no JS, pure CSS */}
      <div className="relative">
        {/* Left + right fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-[#0A0A0A] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-[#0A0A0A] to-transparent" />

        <div className="carousel-track flex gap-5 px-6" style={{ width: 'max-content' }}>
          {repeated.map((cs, i) => (
            <CarouselCard key={`${cs.slug}-${i}`} cs={cs} />
          ))}
        </div>
      </div>

      <div className="sm:hidden mt-8 text-center">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all hover:scale-105"
        >
          View all case studies <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}
