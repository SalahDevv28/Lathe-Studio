/**
 * The studio FAQ — one canonical list.
 *
 * Merged from the original /faq page and the homepage set, deduplicated, and
 * rewritten so each question reads like something a person would actually type
 * into a search box. All commercial facts (the 40% deposit, two free edit
 * rounds, the 1-4 week window) are carried over from the original answers
 * unchanged; only the phrasing around them is tightened.
 *
 * Ordered by likely search volume, since this order drives both the page and
 * the FAQPage structured data.
 */
export interface Faq {
  question: string
  answer: string
  /** Included in the homepage's shortlist. */
  featured?: boolean
}

export const faqs: Faq[] = [
  {
    question: 'How much does a project cost, and how is payment structured?',
    answer:
      'Every project is quoted as a fixed number before any work begins — no hourly billing and no surprises. Payment is not required all at once: a 40% deposit is typical, and the balance can be split into one or more instalments depending on the length and complexity of the project. The exact terms are written into the Scope of Work you approve.',
    featured: true,
  },
  {
    question: 'How long does a Notion system or website project take?',
    answer:
      'Most projects are completed within one to four weeks, depending on complexity and scope. The expected timeline is written into the Scope of Work before anything starts, so you know the finish date before you commit.',
    featured: true,
  },
  {
    question: 'How does the process work, from first call to handover?',
    answer:
      'You start by sending an email describing your project, your goals, and your current website if you have one. We then schedule a call to talk through what you need, propose a structure, and give you an estimate that fits your budget. If you decide to go ahead, you receive a detailed Scope of Work covering deliverables, expected timeline, and next steps.',
    featured: true,
  },
  {
    question: 'Do I need all three services, or can I start with one?',
    answer:
      'You can start with one. Most clients begin with the single thing that hurts most — usually the workspace or the website — and add the rest later. Because it is one studio, the second piece plugs into the first instead of becoming another silo.',
    featured: true,
  },
  {
    question: 'What kinds of businesses do you work with?',
    answer:
      'Mostly small and mid-sized teams that have outgrown their spreadsheets: clinics and medical practices, property and lettings agencies, and engineering teams. If your team retypes the same information into more than one place, the underlying work is much the same whatever the industry.',
    featured: true,
  },
  {
    question: 'Will AI automation replace my staff?',
    answer:
      'No, and that is not what these systems are built to do. Automation takes the repetitive middle of a job — intake, chasing, reporting. Judgement, relationships and the awkward edge cases stay with your people, and a person always reviews anything the AI produces.',
    featured: true,
  },
  {
    question: 'What if I don’t know exactly what I need yet?',
    answer:
      'That is normal, and it is what the first call is for. We talk through your goals, look at how the work actually happens now, and design a structure that fits your needs before any building begins.',
  },
  {
    question: 'Can I request changes after the project is finished?',
    answer:
      'Yes. You are entitled to up to two free rounds of edits within the first month after the project is completed. Anything beyond that can be arranged separately.',
  },
  {
    question: 'Do you provide training or walkthrough videos for my team?',
    answer:
      'Yes. Walkthrough videos can be recorded so your team can be onboarded without you having to repeat yourself. These are offered as an optional add-on and carry an additional fee.',
  },
  {
    question: 'How do you keep my business data private and secure?',
    answer:
      'All project data and materials are kept confidential and handled securely throughout the process. We ask for your consent before showing any project publicly, and when we do, real data is replaced with realistic stand-ins so nothing identifiable appears in screenshots.',
  },
]

/** The shortlist shown on the homepage. */
export const featuredFaqs = faqs.filter((f) => f.featured)
