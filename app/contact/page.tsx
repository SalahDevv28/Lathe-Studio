import { Clock, Mail, MessageCircle } from 'lucide-react'
import PageHero from '@/components/PageHero'
import ContactFlow from '@/components/contact/ContactFlow'
import Reveal from '@/components/motion/Reveal'
import { BRAND } from '@/lib/brand'

export const metadata = {
  title: 'Contact',
  description:
    'Tell us what is not working. Five short questions, about a minute, and a reply from a person within 24 hours.',
}

const alternatives = [
  {
    icon: Clock,
    label: 'Reply time',
    value: 'Within 24 hours, from a person',
    href: null,
  },
  {
    icon: MessageCircle,
    label: 'Rather talk?',
    value: 'Book a free 30-minute call',
    href: BRAND.calendly,
    external: true,
  },
  {
    icon: Mail,
    label: 'Prefer email',
    value: BRAND.email,
    href: `mailto:${BRAND.email}`,
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Tell us what’s
            <br />
            not working
          </>
        }
        lede="Five short questions, one at a time. It takes about a minute, and there is no form to stare at."
      />

      <section className="mx-auto w-full max-w-[680px] px-7 py-14">
        <ContactFlow />
      </section>

      {/* ------------------------------------------------- other routes in */}
      <section className="border-t border-line bg-clay">
        <div className="wrap grid gap-px py-0 md:grid-cols-3">
          {alternatives.map((item, i) => {
            const Icon = item.icon
            const body = (
              <>
                <span className="mb-3 flex h-9 w-9 items-center justify-center rounded border border-ink bg-lime">
                  <Icon className="h-4 w-4 text-ink" />
                </span>
                <span className="mono block text-grey">{item.label}</span>
                <span className="mt-1 block text-[16px] text-ink">{item.value}</span>
              </>
            )

            return (
              <Reveal
                key={item.label}
                delay={i * 0.08}
                className="border-b border-line py-8 last:border-b-0 md:border-b-0 md:border-r md:px-6 md:last:border-r-0 md:first:pl-0"
              >
                {item.href ? (
                  <a
                    href={item.href}
                    {...(item.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="group block transition-opacity hover:opacity-70"
                  >
                    {body}
                  </a>
                ) : (
                  <div>{body}</div>
                )}
              </Reveal>
            )
          })}
        </div>
      </section>
    </>
  )
}
