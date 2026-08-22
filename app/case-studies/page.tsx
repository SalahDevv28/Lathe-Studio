import Link from 'next/link'
import { getAllCaseStudies } from '@/lib/mdx-utils'
import { BRAND } from '@/lib/brand'
import PageHero from '@/components/PageHero'
import CaseStudiesGrid from '@/components/CaseStudiesGrid'
import Reveal from '@/components/motion/Reveal'

export const metadata = {
  title: 'Work',
  description:
    'Real projects for clinics, property teams and engineering firms — websites, Notion systems and the automations underneath.',
}

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies()

  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title={
          <>
            Real projects,
            <br />
            real results
          </>
        }
        lede="Healthcare, property, engineering. Different industries, the same problem underneath — work being typed twice."
      />

      <section className="wrap py-14">
        <CaseStudiesGrid caseStudies={caseStudies} />
      </section>

      {/* ------------------------------------------------------------ CTA */}
      <section className="border-t border-line px-7 py-20 text-center">
        <Reveal>
          <h2 className="mb-5 uppercase" style={{ fontSize: 'clamp(30px, 5vw, 60px)' }}>
            Want to be the <span className="ser normal-case text-teal">next one</span>?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mb-8 max-w-[46ch] text-[17.5px] text-grey">
            A free 30-minute call. We look at one workflow together and tell you honestly
            whether it is worth automating.
          </p>
        </Reveal>
        <Reveal delay={0.18} className="flex flex-wrap justify-center gap-3">
          <a
            href={BRAND.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lime"
          >
            Book the call →
          </a>
          <Link href="/contact" className="btn btn-line">
            Send a message
          </Link>
        </Reveal>
      </section>
    </>
  )
}
