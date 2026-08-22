import Link from 'next/link'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/motion/Reveal'
import { faqs } from '@/lib/faq'
import { BRAND } from '@/lib/brand'

export const metadata = {
  title: 'FAQ — cost, timelines and how it works',
  description:
    'Answers on pricing and payment, project timelines, what happens after handover, and whether AI automation replaces staff. Notion systems, websites and automation for clinics, property and trades teams.',
}

/**
 * FAQPage structured data.
 *
 * Worth setting honest expectations: since 2023 Google shows FAQ rich results
 * almost exclusively for government and health sites, so this is unlikely to
 * produce the expandable snippet. It still helps search engines understand the
 * page, and costs nothing to include.
 */
function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export default function FAQPage() {
  return (
    <>
      {/* Escaping `<` keeps a stray closing tag in any answer from breaking
          out of the script block. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema()).replace(/</g, '\\u003c'),
        }}
      />

      <PageHero
        eyebrow="Questions"
        title={
          <>
            Answers,
            <br />
            before you ask
          </>
        }
        lede="The ones that come up on nearly every first call — what it costs, how long it takes, and what happens once it is built."
      />

      <section className="mx-auto w-full max-w-[820px] px-7 py-16">
        {faqs.map((faq, i) => (
          <Reveal key={faq.question} delay={Math.min(i * 0.05, 0.3)}>
            <details
              open={i === 0}
              className="group mb-3 overflow-hidden rounded border border-line bg-clay transition-colors hover:border-[#BEB7A5] open:border-ink open:bg-bone"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-[17.5px] font-semibold leading-[1.35] transition-colors hover:text-teal [&::-webkit-details-marker]:hidden">
                <h2 className="font-sans text-[17.5px] font-semibold leading-[1.35] tracking-normal">
                  {faq.question}
                </h2>
                <span
                  className="shrink-0 font-mono text-[14px] text-teal group-open:text-ink"
                  aria-hidden="true"
                >
                  <span className="group-open:hidden">[+]</span>
                  <span className="hidden group-open:inline">[−]</span>
                </span>
              </summary>
              <p className="mx-6 border-t border-line py-5 text-[16px] leading-[1.62] text-grey">
                {faq.answer}
              </p>
            </details>
          </Reveal>
        ))}
      </section>

      {/* ------------------------------------------------------------ CTA */}
      <section className="border-t border-line px-7 py-20 text-center">
        <Reveal>
          <h2 className="mb-5 uppercase" style={{ fontSize: 'clamp(28px, 4.6vw, 56px)' }}>
            Still <span className="ser normal-case text-teal">wondering</span>?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mb-8 max-w-[44ch] text-[17px] text-grey">
            Thirty minutes, no deck, no obligation. Bring the question that is not on this
            page.
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
          <Link href="/contact" className="btn btn-line">
            Send a message
          </Link>
        </Reveal>
      </section>
    </>
  )
}
