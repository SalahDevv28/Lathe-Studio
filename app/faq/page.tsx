'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    question: 'How does the process work?',
    answer: 'First, you send us an email describing your project, your goals, and (if available) your website. Then we schedule a call via Calendly to discuss your needs. We propose a structure and provide an estimate that fits in your budget. If we agree to proceed, We email you a detailed Scope of work outlining deliverables, expected timeline, and next steps.',
  },
  {
    question: 'Can I request changes after the project?',
    answer: 'Yes, You are entitled to up to two free edits within the first month after project completion. Additional edits can be arranged separately.',
  },
  {
    question: 'How is payment structured?',
    answer: 'Payment is not required all at once. A 40% deposit is typically paid upfront. The remainder can be split into one or multiple installments, depending on the projects length and complexity. Exact terms are included in the Scope of Work.',
  },
  {
    question: 'Can I get tutorial or walkthrough videos with the project?',
    answer: 'Yes, walkthrough videos can be provided. These are offered as an optional add-on and will incur an additional fee.',
  },
  {
    question: 'How long does a project usually take?',
    answer: 'Most projects are completed within 1-4 weeks, depending on complexity and scope. The expected timeline is included in the Scope of Work.',
  },
  {
    question: "What if I don't know exactly what I want?",
    answer: 'During our initial call, We help clarify your goals and design a structure that fits your needs before work begins.',
  },
  {
    question: 'How do you ensure my data remains private?',
    answer: "All project data and materials are kept confidential and secure throughout the process, We'll ask for consent before posting the project on the portfolio, and We won't use the actual material in the pictures to keep your data private.",
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
      >
        <span className="text-lg font-semibold text-white pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-purple-400 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <p className="px-6 pb-6 text-gray-300 leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

export default function FAQPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Questions
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about working with us. Can&apos;t find what you&apos;re looking for? Feel free to reach out.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get in touch
          </a>
        </div>
      </div>
    </div>
  )
}
