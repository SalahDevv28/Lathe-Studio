import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getAllCaseStudies, getCaseStudyBySlug } from '@/lib/mdx-utils'
import { formatDateLong } from '@/lib/dates'
import { BRAND } from '@/lib/brand'
import Reveal from '@/components/motion/Reveal'

export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudies()
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const caseStudy = await getCaseStudyBySlug(params.slug)
  if (!caseStudy) {
    return {
      title: 'Case study not found',
      description: 'We could not find the case study you are looking for.',
    }
  }
  return {
    title: caseStudy.title,
    description: caseStudy.description ?? `Read the case study about ${caseStudy.title}`,
  }
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudy = await getCaseStudyBySlug(params.slug)
  if (!caseStudy) notFound()

  /* Frontmatter dates are DD-MM-YYYY, which `new Date()` cannot parse. Going
     through formatDateLong is what stops this rendering "Invalid Date". */
  const date = formatDateLong(caseStudy.date)

  const stack: string[] = Array.isArray(caseStudy.technicalStack)
    ? caseStudy.technicalStack
    : []
  const outcomes: string[] = Array.isArray(caseStudy.outcomes) ? caseStudy.outcomes : []

  return (
    <>
      {/* ----------------------------------------------------------- HERO */}
      <div className="on-ink relative overflow-hidden border-b border-ink bg-ink text-bone">
        <div className="stripes" aria-hidden="true" />
        <div className="stripes-2" aria-hidden="true" />

        <div className="wrap relative z-[3] py-14">
          <Link
            href="/case-studies"
            className="mono inline-flex items-center gap-2 text-[#B9B5A8] transition-colors hover:text-lime"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All work
          </Link>

          <div className="mt-8 max-w-[46rem]">
            {caseStudy.category && (
              <Reveal as="span" delay={0.05}>
                <span className="mono inline-flex items-center gap-2.5 rounded border-2 border-bone px-3.5 py-1.5">
                  <b className="h-[7px] w-[7px] rounded-[1px] bg-lime" />
                  {caseStudy.category}
                </span>
              </Reveal>
            )}

            <Reveal delay={0.14}>
              <h1 className="mt-6" style={{ fontSize: 'clamp(32px, 5.4vw, 64px)' }}>
                {caseStudy.title}
              </h1>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mono mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[#B9B5A8]">
                {caseStudy.client && <span className="text-bone">{caseStudy.client}</span>}
                {caseStudy.client && date && <span aria-hidden="true">·</span>}
                {date && <span>{date}</span>}
              </div>
            </Reveal>

            {caseStudy.description && (
              <Reveal delay={0.3}>
                <p className="mt-6 border-l-2 border-lime pl-5 text-[18px] leading-relaxed">
                  {caseStudy.description}
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------ AT A GLANCE */}
      {(stack.length > 0 || outcomes.length > 0) && (
        <section className="border-b border-line bg-clay">
          <div className="wrap grid gap-px py-0 md:grid-cols-2">
            {stack.length > 0 && (
              <Reveal className="border-b border-line py-8 pr-8 md:border-b-0 md:border-r">
                <h2 className="mono mb-4 text-teal">Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-line bg-bone px-2.5 py-1 text-[13px] text-ink"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Reveal>
            )}

            {outcomes.length > 0 && (
              <Reveal delay={0.08} className="py-8 md:pl-8">
                <h2 className="mono mb-4 text-teal">Outcomes</h2>
                <ul className="space-y-2">
                  {outcomes.map((outcome) => (
                    <li key={outcome} className="relative pl-6 text-[15px] leading-relaxed">
                      <span className="absolute left-0 top-2 h-[7px] w-[7px] rounded-[1px] border border-ink bg-lime" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* -------------------------------------------------------- CONTENT */}
      <article className="wrap max-w-[46rem] py-14">
        <div
          className="prose-editorial"
          dangerouslySetInnerHTML={{ __html: caseStudy.content }}
        />

        {caseStudy.testimonial && (
          <figure className="mt-14 rounded border border-line bg-clay p-8">
            <span
              className="select-none font-display leading-none text-lime"
              style={{ fontSize: 46 }}
              aria-hidden="true"
            >
              “
            </span>
            <blockquote className="mt-2 text-[19px] leading-[1.5]">
              {caseStudy.testimonial.content}
            </blockquote>
            <figcaption className="mt-5 border-t border-line pt-4">
              <b className="block text-[15px]">{caseStudy.testimonial.author}</b>
              {caseStudy.testimonial.role && (
                <span className="mono text-grey">{caseStudy.testimonial.role}</span>
              )}
            </figcaption>
          </figure>
        )}
      </article>

      {/* ------------------------------------------------------------ CTA */}
      <section className="border-t border-line px-7 py-20 text-center">
        <Reveal>
          <h2 className="mb-5 uppercase" style={{ fontSize: 'clamp(28px, 4.6vw, 56px)' }}>
            Same problem, <span className="ser normal-case text-teal">different desk</span>?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mb-8 max-w-[44ch] text-[17px] text-grey">
            If any of the above sounded like your week, the call is free and the answer is
            straight.
          </p>
        </Reveal>
        <Reveal delay={0.18} className="flex flex-wrap justify-center gap-3">
          <a
            href={BRAND.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lime"
          >
            Book a call →
          </a>
          <Link href="/case-studies" className="btn btn-line">
            More work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </>
  )
}
