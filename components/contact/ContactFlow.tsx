'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, CornerDownLeft, Send } from 'lucide-react'
import { BRAND } from '@/lib/brand'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xlgzezdb'

type FieldId = 'name' | 'email' | 'company' | 'projectType' | 'message'

interface Step {
  id: FieldId
  question: string
  hint?: string
  type: 'text' | 'email' | 'choice' | 'textarea'
  placeholder?: string
  optional?: boolean
  options?: { value: string; label: string; note: string }[]
  validate?: (value: string) => string | null
}

const steps: Step[] = [
  {
    id: 'name',
    question: 'First — what should we call you?',
    type: 'text',
    placeholder: 'Your name',
    validate: (v) => (v.trim().length < 2 ? 'A name helps us reply properly.' : null),
  },
  {
    id: 'email',
    question: 'Where should the reply go?',
    hint: 'One email, within 24 hours. Nothing else, ever.',
    type: 'email',
    placeholder: 'you@company.com',
    validate: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? null : 'That address looks incomplete.',
  },
  {
    id: 'company',
    question: 'What’s the business called?',
    hint: 'Optional — skip it if you’d rather not say yet.',
    type: 'text',
    placeholder: 'Company or practice name',
    optional: true,
  },
  {
    id: 'projectType',
    question: 'What are you after?',
    hint: 'Pick the closest. We’ll work out the detail on the call.',
    type: 'choice',
    options: [
      { value: 'website', label: 'A website', note: 'Design, build and handover' },
      { value: 'notion', label: 'A Notion workspace', note: 'One place for the whole operation' },
      { value: 'ai-automation', label: 'AI automations', note: 'The repetitive middle, handled' },
      { value: 'website-notion', label: 'Website + workspace', note: 'The two, talking to each other' },
      { value: 'unsure', label: 'Not sure yet', note: 'Most people start here' },
    ],
    validate: (v) => (v ? null : 'Pick one to carry on.'),
  },
  {
    id: 'message',
    question: 'What’s not working right now?',
    hint: 'A couple of sentences is plenty. The messier it is, the more useful it is.',
    type: 'textarea',
    placeholder: 'We keep re-entering the same job details in three places…',
    validate: (v) =>
      v.trim().length < 10 ? 'A little more detail makes the call worth having.' : null,
  },
]

const emptyValues: Record<FieldId, string> = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  message: '',
}

export default function ContactFlow() {
  const [index, setIndex] = useState(0)
  const [values, setValues] = useState(emptyValues)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle')
  /* Bots fill hidden fields; Formspree drops anything with _gotcha set. */
  const [gotcha, setGotcha] = useState('')

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  const step = steps[index]
  const value = values[step.id]
  const isLast = index === steps.length - 1

  /* Focus the field on every step change, so the keyboard never strands the
     user. Choice steps focus the heading instead — moving focus onto the first
     radio would look like a pre-selected answer. */
  useEffect(() => {
    if (status !== 'idle') return
    if (step.type === 'choice') headingRef.current?.focus()
    else inputRef.current?.focus()
  }, [index, step.type, status])

  const setValue = (v: string) => {
    setValues((prev) => ({ ...prev, [step.id]: v }))
    if (error) setError(null)
  }

  const back = () => {
    if (index === 0) return
    setError(null)
    setIndex((i) => i - 1)
  }

  const advance = async (override?: string) => {
    const current = override ?? value
    const problem = step.validate?.(current) ?? null

    if (problem && !step.optional) {
      setError(problem)
      return
    }

    if (!isLast) {
      setIndex((i) => i + 1)
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, [step.id]: current, _gotcha: gotcha }),
      })
      setStatus(res.ok ? 'done' : 'failed')
    } catch {
      setStatus('failed')
    }
  }

  const onChoice = (choice: string) => {
    setValues((prev) => ({ ...prev, projectType: choice }))
    setError(null)
    // Selecting a card is the answer — move straight on rather than making
    // them confirm a click they already made.
    setTimeout(() => setIndex((i) => i + 1), 140)
  }

  /* ------------------------------------------------------------- success */
  if (status === 'done') {
    return (
      <div className="animate-step-in rounded border-2 border-ink bg-clay p-8 text-center sm:p-12">
        <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-lime">
          <Check className="h-7 w-7 text-ink" strokeWidth={2.5} />
        </span>
        <h2 className="mb-3 text-[28px]">Got it{values.name ? `, ${values.name}` : ''}.</h2>
        <p className="mx-auto mb-7 max-w-[42ch] text-[16.5px] text-grey">
          Your message is in. You’ll get a reply within 24 hours — from a person, not an
          autoresponder.
        </p>
        <a
          href={BRAND.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-lime"
        >
          Skip the wait, book the call
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    )
  }

  const progress = ((index + (status === 'sending' ? 1 : 0)) / steps.length) * 100

  return (
    <div className="overflow-hidden rounded border border-line bg-clay">
      {/* --------------------------------------------------------- progress */}
      <div
        className="h-1 w-full bg-line"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={steps.length}
        aria-valuenow={index + 1}
        aria-label={`Question ${index + 1} of ${steps.length}`}
      >
        <div
          className="h-full bg-lime transition-[width] duration-500 ease-out"
          style={{ width: `${Math.max(progress, 4)}%` }}
        />
      </div>

      <div className="p-7 sm:p-10">
        <div className="mono mb-7 flex items-center justify-between text-grey">
          <span>
            {String(index + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
          </span>
          {index > 0 && (
            <button
              type="button"
              onClick={back}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-3 w-3" />
              Back
            </button>
          )}
        </div>

        {/* One question at a time. The key restarts the entrance animation. */}
        <div key={step.id} className="animate-step-in">
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="text-[26px] leading-[1.1] outline-none sm:text-[32px]"
          >
            {step.question}
          </h2>

          {step.hint && <p className="mt-3 text-[15px] text-grey">{step.hint}</p>}

          <div className="mt-7">
            {step.type === 'choice' ? (
              <div className="grid gap-2.5" role="group" aria-label={step.question}>
                {step.options?.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onChoice(option.value)}
                    aria-pressed={values.projectType === option.value}
                    className={`flex items-center justify-between gap-4 rounded border px-5 py-4 text-left transition-colors ${
                      values.projectType === option.value
                        ? 'border-ink bg-ink text-bone'
                        : 'border-line bg-bone hover:border-ink'
                    }`}
                  >
                    <span>
                      <span className="block text-[16.5px] font-semibold">{option.label}</span>
                      <span
                        className={`block text-[13.5px] ${
                          values.projectType === option.value ? 'text-[#A8A499]' : 'text-grey'
                        }`}
                      >
                        {option.note}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 opacity-40" />
                  </button>
                ))}
              </div>
            ) : step.type === 'textarea' ? (
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  // Enter makes a newline here; Ctrl/Cmd+Enter sends.
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault()
                    void advance()
                  }
                }}
                rows={5}
                placeholder={step.placeholder}
                aria-label={step.question}
                aria-invalid={Boolean(error)}
                className="w-full resize-y rounded border border-line bg-bone px-5 py-4 text-[17px] text-ink placeholder-grey transition-colors focus:border-ink focus:outline-none"
              />
            ) : (
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type={step.type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    void advance()
                  }
                }}
                placeholder={step.placeholder}
                aria-label={step.question}
                aria-invalid={Boolean(error)}
                autoComplete={
                  step.id === 'email' ? 'email' : step.id === 'name' ? 'name' : 'organization'
                }
                className="w-full rounded border border-line bg-bone px-5 py-4 text-[17px] text-ink placeholder-grey transition-colors focus:border-ink focus:outline-none"
              />
            )}
          </div>

          {/* Honeypot. Off-screen rather than display:none, which some bots skip. */}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={gotcha}
            onChange={(e) => setGotcha(e.target.value)}
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />

          <p className="mono mt-3 min-h-[1.2em] text-teal" role="alert" aria-live="polite">
            {error ?? (status === 'failed' ? 'That did not send. Try again, or email us.' : '')}
          </p>

          {step.type !== 'choice' && (
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => void advance()}
                disabled={status === 'sending'}
                className="btn btn-lime disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? (
                  'Sending…'
                ) : isLast ? (
                  <>
                    <Send className="h-4 w-4" />
                    Send it
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              {step.optional && (
                <button
                  type="button"
                  onClick={() => setIndex((i) => i + 1)}
                  className="mono text-grey underline-offset-4 transition-colors hover:text-ink hover:underline"
                >
                  Skip
                </button>
              )}

              <span className="mono hidden items-center gap-1.5 text-grey sm:inline-flex">
                <CornerDownLeft className="h-3 w-3" />
                {isLast ? 'Ctrl + Enter' : 'Enter'}
              </span>
            </div>
          )}
        </div>
      </div>

      <noscript>
        <p className="border-t border-line px-7 py-5 text-[15px] text-grey sm:px-10">
          This form needs JavaScript. Email{' '}
          <a href={`mailto:${BRAND.email}`} className="text-teal underline">
            {BRAND.email}
          </a>{' '}
          instead and you’ll get the same reply.
        </p>
      </noscript>
    </div>
  )
}
