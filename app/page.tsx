import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllCaseStudies } from '@/lib/mdx-utils'
import { BRAND } from '@/lib/brand'
import Reveal from '@/components/motion/Reveal'
import Counter from '@/components/motion/Counter'
import DragRail from '@/components/motion/DragRail'
import SectionRail from '@/components/home/SectionRail'
import CaseStudyThumb from '@/components/CaseStudyThumb'

/* ------------------------------------------------------------------ data */

const services = [
  {
    num: '01 / WEB',
    title: 'Modern websites',
    body: 'Fast, good-looking sites your customers find on Google — and your team can update without calling a developer.',
    points: ['Design and build', 'Search visibility', 'Handover and training'],
  },
  {
    num: '02 / OPS',
    title: 'Notion systems',
    body: 'One place for jobs, clients and documents — instead of six spreadsheets, a shared inbox and someone’s memory.',
    points: ['Workspace design', 'Automatic updates', 'Team training'],
  },
  {
    num: '03 / AI',
    title: 'AI automations',
    body: 'Software that handles the repetitive middle of a job — intake, chasing, reporting — and leaves the decisions to you.',
    points: ['Automated intake', 'Reports that write themselves', 'A person always reviews'],
  },
]

/* Every row below is drawn from a real case study in content/case-studies.
   Nothing here is illustrative. */
const proof = [
  {
    was: 'Appointments kept in scattered notes and phone calls',
    now: 'One calendar, reminders sent automatically',
    source: 'CuraClinic · healthcare',
  },
  {
    was: 'Leads, sales, email and finances in four separate tools',
    now: 'A single CRM the whole team works from',
    source: 'Real estate agency',
  },
  {
    was: 'Weekly status reports written by hand',
    now: '11.4 hours back per engineer, every week',
    source: 'Meridian · engineering',
  },
]

const process = [
  {
    n: '01',
    title: 'Understand',
    body: 'We sit with your team and map how the work really happens — including the spreadsheet nobody admits to.',
  },
  {
    n: '02',
    title: 'Design',
    body: 'You review working screens in your own browser. No slide decks, no 40-page proposals.',
  },
  {
    n: '03',
    title: 'Automate',
    body: 'Automation goes on last — helping the people doing the work, never quietly replacing them.',
  },
]

/* Verbatim from the `testimonial` blocks in content/case-studies, split so the
   middle clause can be set in the serif accent face. The Raynor quote opens by
   naming the old studio name, so it is excerpted from the sentence after —
   shortened, never reworded. */
const testimonials = [
  {
    lead: 'They took the time to understand my requirements, offered a reasonable price, and',
    highlight: 'fulfilled all their promises',
    tail: '. They maintained clear communication throughout and scheduled feedback sessions effectively.',
    author: 'Jai Raynor',
    role: 'Founder, Raynor Lending Solutions',
  },
  {
    lead: 'This project transformed every part of how we operate. From our brand to our back office to how we generate and follow up with leads, everything is',
    highlight: 'sharper, faster, and more professional',
    tail: ' than ever before.',
    author: 'Agency owner',
    role: 'Real estate · name withheld',
  },
  {
    lead: 'We went from juggling multiple tools to',
    highlight: 'having everything in one place',
    tail: '. The AI features alone have saved us hours every week on outreach and follow-ups.',
    author: 'Team lead',
    role: 'Meridian · engineering',
  },
]

/* Mirrors the answers on /faq so the two pages cannot drift apart. */
const faqs = [
  {
    q: 'How long does a project usually take?',
    a: 'Most projects are completed within 1–4 weeks, depending on complexity and scope. The expected timeline is written into the Scope of Work before anything starts.',
  },
  {
    q: 'Do we need all three services?',
    a: 'No. Most clients start with the single thing that hurts most. Because it is one studio, the second piece plugs into the first instead of becoming another silo.',
  },
  {
    q: 'Can I request changes after the project?',
    a: 'Yes. You get up to two free edits within the first month after completion. Additional edits can be arranged separately.',
  },
  {
    q: 'Will this replace my staff?',
    a: 'That is not what we build. Automation takes the repetitive middle of a job. Judgement, relationships and the awkward edge cases stay with your people — that is where their value is.',
  },
  {
    q: 'How do you keep my data private?',
    a: 'All project material is kept confidential. We ask for consent before showing any project publicly, and we never use your real data in the screenshots.',
  },
]

/* ------------------------------------------------------------------ page */

export default async function HomePage() {
  const caseStudies = await getAllCaseStudies()

  const marqueeItems = [
    'Modern websites',
    'Notion systems',
    'AI automations',
    'Workflow design',
    'Team training',
  ]

  return (
    <>
      {/* ============================================ HERO */}
      <div className="on-ink relative overflow-hidden border-b border-ink bg-ink text-bone">
        <div className="stripes" aria-hidden="true" />
        <div className="stripes-2" aria-hidden="true" />

        <header className="relative z-[3]">
          <div className="wrap pt-20">
            <Reveal as="span" delay={0.05}>
              <span className="mono inline-flex items-center gap-2.5 rounded border-2 border-bone px-3.5 py-1.5">
                <b className="h-[7px] w-[7px] rounded-[1px] bg-lime" />
                Websites · Notion · AI Automation
              </span>
            </Reveal>

            <h1 className="mt-8" style={{ fontSize: 'clamp(42px, 8vw, 108px)' }}>
              <Reveal delay={0.12}>We build the</Reveal>
              <Reveal delay={0.24}>
                <span className="roll">
                  <ul>
                    <li>websites</li>
                    <li>workspaces</li>
                    <li>AI agents</li>
                    <li>websites</li>
                  </ul>
                </span>
              </Reveal>
              <Reveal delay={0.36}>that run themselves</Reveal>
            </h1>

            <div className="mt-11 grid items-end gap-14 pb-14 lg:grid-cols-[1.35fr_1fr]">
              <div>
                <Reveal delay={0.5}>
                  <p className="max-w-[44ch] text-[19px]">
                    One studio for the website, the workspace and the automations
                    underneath — so nothing in your business gets typed twice.
                  </p>
                  <p className="mt-4 max-w-[44ch] text-[16.5px] text-[#B9B5A8]">
                    Built for teams that have outgrown their spreadsheets but don’t want
                    an IT department.
                  </p>
                </Reveal>

                <Reveal delay={0.6} className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={BRAND.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-lime"
                  >
                    Book a free 30-min call
                  </a>
                  <a href="#work" className="btn btn-line">
                    See the work
                  </a>
                </Reveal>
              </div>

              <Reveal
                delay={0.66}
                as="aside"
                className="rounded border border-bone bg-ink/55 backdrop-blur-[3px]"
              >
                <div className="flex items-baseline justify-between gap-3.5 border-b border-bone/30 px-5 py-4">
                  <span className="mono text-[#C9C4B6]">Hrs saved / person / wk</span>
                  <span className="font-display text-[34px] leading-none tracking-[-0.03em] text-lime">
                    <Counter value={11.4} decimals={1} />
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-3.5 border-b border-bone/30 px-5 py-4">
                  <span className="mono text-teal">Tools replaced</span>
                  <span className="font-display text-[34px] leading-none tracking-[-0.03em] text-teal">
                    4→1
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-3.5 px-5 py-4">
                  <span className="mono text-[#C9C4B6]">Discovery call</span>
                  <span className="font-display text-[34px] leading-none tracking-[-0.03em] text-lime">
                    <Counter value={30} suffix="m" />
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </header>

        {/* Stat bar, sharing the hero's stripe field */}
        <div className="relative z-[3] border-t border-line-dark">
          <div className="wrap grid sm:grid-cols-3">
            <div className="flex items-baseline gap-3 border-b border-line-dark py-4 pr-6 sm:border-b-0 sm:border-r">
              <b className="font-display text-[25px] leading-none tracking-[-0.03em] text-teal">
                <Counter value={11.4} decimals={1} />
              </b>
              <span className="text-[14px] text-[#A8A499]">hours back, per engineer, weekly</span>
            </div>
            <div className="flex items-baseline gap-3 border-b border-line-dark py-4 pr-6 sm:border-b-0 sm:border-r sm:pl-6">
              <b className="font-display text-[25px] leading-none tracking-[-0.03em] text-lime">
                4 → 1
              </b>
              <span className="text-[14px] text-[#A8A499]">tools replaced by one hub</span>
            </div>
            <div className="flex items-baseline gap-3 py-4 sm:pl-6">
              <b className="font-display text-[25px] leading-none tracking-[-0.03em] text-lime">
                <Counter value={3} pad={2} />
              </b>
              <span className="text-[14px] text-[#A8A499]">industries shipped</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================ MARQUEE */}
      <div className="marquee overflow-hidden whitespace-nowrap border-b border-line bg-clay py-3.5">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <span key={copy}>
              {marqueeItems.map((item) => (
                <span key={item}>
                  <span className="px-5 text-[14px] font-medium">{item}</span>
                  <span className="px-5 text-teal">◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ============================================ POSITIONING */}
      <div className="border-b border-line py-16">
        <div className="wrap">
          <Reveal>
            <p
              className="max-w-[24ch] font-display leading-[1.14] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(24px, 3.6vw, 44px)' }}
            >
              We give small teams the <span className="ser text-teal">operating system</span>{' '}
              that big companies pay millions for.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ============================================ BODY */}
      <div className="grid xl:grid-cols-[180px_1fr]">
        <SectionRail />

        <div className="min-w-0">
          {/* ---------------------------------------- SERVICES */}
          <section id="services" className="border-b border-line scroll-mt-16">
            <div className="shead">
              <Reveal as="h2">What we actually build</Reveal>
              <Reveal as="p" delay={0.1}>
                Three services that stack. Most clients start with one and end up with all
                three talking to each other.
              </Reveal>
            </div>

            <div className="grid md:grid-cols-3">
              {services.map((service, i) => (
                <Reveal
                  key={service.title}
                  delay={i * 0.08}
                  className="flex flex-col border-b border-line px-6 pb-9 pt-8 transition-colors last:border-b-0 hover:bg-clay md:border-b-0 md:border-r md:last:border-r-0"
                >
                  <span className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-teal">
                    {service.num}
                  </span>
                  <h3 className="mb-3 mt-4 text-[26px]">{service.title}</h3>
                  <p className="text-[15.5px] text-grey">{service.body}</p>
                  <ul className="mt-auto list-none pt-5">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="relative border-t border-line py-2.5 pl-[18px] text-[13.5px] text-grey"
                      >
                        <span className="absolute left-0 top-[17px] h-[7px] w-[7px] rounded-[1px] border border-ink bg-lime" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ---------------------------------------- PROOF */}
          <section id="proof" className="border-b border-line scroll-mt-16">
            <div className="shead">
              <Reveal as="h2">Where the hours come from</Reveal>
              <Reveal as="p" delay={0.1}>
                Three real changes from three real projects. Every figure below comes from
                a case study you can read in full.
              </Reveal>
            </div>

            <div className="bg-clay px-7 pb-12">
              <div className="border-t-2 border-ink">
                {proof.map((row, i) => (
                  <Reveal
                    key={row.was}
                    delay={i * 0.1}
                    className="grid items-center gap-5 border-b border-line py-6 md:grid-cols-[1fr_130px_1fr]"
                  >
                    <span className="text-[17px] text-grey">{row.was}</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-teal md:text-center">
                      now
                      <i className="mt-2 block h-px w-full bg-teal" />
                    </span>
                    <span className="text-[17px] font-semibold">
                      <em className="rounded-[2px] not-italic px-1.5 bg-lime">
                        {row.now}
                      </em>
                      <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.12em] text-grey">
                        {row.source}
                      </span>
                    </span>
                  </Reveal>
                ))}
              </div>

              <Reveal className="flex flex-wrap items-baseline gap-4 pt-8">
                <b
                  className="font-display leading-none tracking-[-0.04em]"
                  style={{ fontSize: 'clamp(38px, 6vw, 74px)' }}
                >
                  <Counter value={11.4} decimals={1} suffix=" hours" />
                </b>
                <span className="max-w-[26ch] text-[18px] text-grey">
                  back every week for every engineer on the Meridian team.
                </span>
              </Reveal>
            </div>
          </section>

          {/* ---------------------------------------- PROCESS */}
          <section
            id="process"
            className="on-ink border-b border-line bg-ink text-bone scroll-mt-16"
          >
            <div className="shead">
              <Reveal as="h2">How it goes</Reveal>
              <Reveal as="p" delay={0.1}>
                No discovery theatre. Three phases, fixed scope, visible progress.
              </Reveal>
            </div>

            <div className="grid gap-8 px-7 py-12 md:grid-cols-3">
              {process.map((step, i) => (
                <Reveal key={step.n} delay={i * 0.12} className="border-t border-line-dark pt-6">
                  <div className="font-display text-[60px] leading-[0.9] text-lime">
                    {i === 1 ? <span className="text-teal">{step.n}</span> : step.n}
                  </div>
                  <h3 className="mb-2.5 mt-4 text-[22px]">{step.title}</h3>
                  <p className="text-[15.5px] text-[#A8A499]">{step.body}</p>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ---------------------------------------- WORK */}
          <section id="work" className="border-b border-line scroll-mt-16">
            <div className="shead">
              <Reveal as="h2">Selected work</Reveal>
              <Reveal as="p" delay={0.1}>
                Healthcare, property, engineering. Different industries, same problem
                underneath.
              </Reveal>
            </div>

            <DragRail className="select-none">
              {caseStudies.map((cs, i) => (
                <Link
                  key={cs.slug}
                  href={`/case-studies/${cs.slug}`}
                  className="group flex w-[min(400px,82vw)] shrink-0 flex-col border-r border-line pb-8 transition-colors hover:bg-clay"
                >
                  <CaseStudyThumb variant={i} className="h-[190px] shrink-0" />
                  <div className="flex flex-1 flex-col px-6 pt-6">
                    {cs.category && (
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-teal">
                        {cs.category}
                      </span>
                    )}
                    <h3 className="mb-3 mt-3.5 text-[29px]">{cs.title}</h3>
                    {cs.description && (
                      <p className="mb-auto text-[15px] text-grey line-clamp-3">
                        {cs.description}
                      </p>
                    )}
                    {Array.isArray(cs.outcomes) && cs.outcomes[0] && (
                      <div className="mt-6 border-t border-line pt-4">
                        <span className="text-[13.5px] text-grey">{cs.outcomes[0]}</span>
                      </div>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink">
                      Read case study
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </DragRail>

            <div className="flex items-center justify-between border-t border-line px-7 py-4">
              <span className="mono text-grey">← Drag to explore</span>
              <Link href="/case-studies" className="mono text-teal hover:text-ink">
                All {caseStudies.length} case studies →
              </Link>
            </div>
          </section>

          {/* ---------------------------------------- TESTIMONIALS */}
          <section id="testimonials" className="border-b border-line scroll-mt-16">
            <div className="shead">
              <Reveal as="h2">What clients say</Reveal>
              <Reveal as="p" delay={0.1}>
                Three projects, three industries. Each quote comes from the case study of
                the same name.
              </Reveal>
            </div>

            <div className="grid md:grid-cols-3">
              {testimonials.map((t, i) => (
                <Reveal
                  key={t.author}
                  delay={i * 0.1}
                  className="flex flex-col border-b border-line px-6 pb-8 pt-8 transition-colors last:border-b-0 hover:bg-clay md:border-b-0 md:border-r md:last:border-r-0"
                >
                  <span
                    className="select-none font-display leading-none text-lime"
                    style={{ fontSize: 46 }}
                    aria-hidden="true"
                  >
                    “
                  </span>

                  <blockquote className="mb-6 mt-2 text-[17.5px] leading-[1.5] text-ink">
                    {t.lead}{' '}
                    <span className="ser text-teal">{t.highlight}</span>
                    {t.tail}
                  </blockquote>

                  <div className="mt-auto border-t border-line pt-4">
                    <b className="block text-[15px] font-semibold">{t.author}</b>
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-grey">
                      {t.role}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ---------------------------------------- FAQ */}
          <section id="faq" className="border-b border-line scroll-mt-16">
            {/* Centred header rather than the split .shead used elsewhere —
                the whole section reads as one centred column. */}
            <div className="border-b-2 border-ink px-7 pb-8 pt-14 text-center">
              <Reveal as="h2" style={{ fontSize: 'clamp(28px, 4.2vw, 48px)' }}>
                Questions
              </Reveal>
              <Reveal as="p" delay={0.1} className="mx-auto mt-4 max-w-[46ch] text-[15.5px] text-grey">
                The ones that come up on nearly every first call.
              </Reveal>
            </div>

            <div className="mx-auto w-full max-w-[780px] px-7 pb-16 pt-10">
              {faqs.map((faq, i) => (
                <Reveal key={faq.q} delay={i * 0.06}>
                  <details
                    open={i === 0}
                    className="group mb-3 overflow-hidden rounded border border-line bg-clay transition-colors hover:border-[#BEB7A5] open:border-ink open:bg-bone"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left text-[17.5px] font-semibold leading-[1.35] transition-colors hover:text-teal [&::-webkit-details-marker]:hidden">
                      <span>{faq.q}</span>
                      <span
                        className="shrink-0 font-mono text-[14px] text-teal group-open:text-ink"
                        aria-hidden="true"
                      >
                        <span className="group-open:hidden">[+]</span>
                        <span className="hidden group-open:inline">[−]</span>
                      </span>
                    </summary>
                    <p className="mx-6 border-t border-line py-5 text-left text-[16px] leading-[1.62] text-grey">
                      {faq.a}
                    </p>
                  </details>
                </Reveal>
              ))}

              <div className="mt-8 text-center">
                <Link
                  href="/faq"
                  className="mono text-teal transition-colors hover:text-ink"
                >
                  All questions →
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ============================================ END CTA */}
      <section className="border-b border-line px-7 py-20 text-center">
        <Reveal>
          <h2
            className="mb-5 font-display uppercase"
            style={{ fontSize: 'clamp(34px, 6vw, 74px)' }}
          >
            Let’s find your <span className="ser normal-case text-teal">eleven hours</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mb-8 max-w-[46ch] text-[17.5px] text-grey">
            A free 30-minute call. We look at one workflow together and tell you honestly
            whether it is worth automating.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <a
            href={BRAND.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lime"
          >
            Book the call →
          </a>
          <div className="mono mt-5 text-grey">No deck · No obligation · Straight answer</div>
        </Reveal>
      </section>
    </>
  )
}
