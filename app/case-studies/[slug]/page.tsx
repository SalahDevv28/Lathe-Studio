import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getCaseStudyBySlug } from '@/lib/mdx-utils';

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
  const caseStudy = await getCaseStudyBySlug(params.slug);
  if (!caseStudy) {
    return {
      title: 'Case Study not found',
      description: 'We could not find the case study you are looking for.',
    };
  }
  return {
    title: caseStudy.title,
    description: caseStudy.description ?? `Read the case study about ${caseStudy.title}`,
  };
};

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudy = await getCaseStudyBySlug(params.slug);

  if (!caseStudy) {
    notFound();
  }

  const hasMetadata =
    (caseStudy.technicalStack && caseStudy.technicalStack.length > 0) ||
    (caseStudy.outcomes && caseStudy.outcomes.length > 0);

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative py-24 px-6 lg:px-24">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.1),transparent_50%)]" />

        <div className="max-w-4xl mx-auto relative">
          {/* Back button */}
          <div className="mb-10">
            <a
              href="/case-studies"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 hover:scale-105 shadow-lg text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all case studies
            </a>
          </div>

          {/* Category badge */}
          {caseStudy.category && (
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-pink-400 border border-pink-500/40 bg-pink-500/10 rounded-full px-3 py-1 mb-4">
              {caseStudy.category}
            </span>
          )}

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {caseStudy.title}
            </span>
          </h1>

          {/* Date + Client */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
            {caseStudy.date && (
              <span>
                {new Date(caseStudy.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            )}
            {caseStudy.client && (
              <>
                <span className="text-gray-600">·</span>
                <span className="text-gray-300">{caseStudy.client}</span>
              </>
            )}
          </div>

          {/* Description */}
          {caseStudy.description && (
            <p className="text-lg text-gray-300 leading-relaxed border-l-2 border-pink-500/50 pl-4">
              {caseStudy.description}
            </p>
          )}
        </div>
      </section>

      {/* Metadata + Content */}
      <section className="py-10 px-6 lg:px-24 bg-black/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">

          {/* Metadata cards */}
          {hasMetadata && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {caseStudy.technicalStack && caseStudy.technicalStack.length > 0 && (
                <div className="group p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-purple-500/50 transition-all duration-300">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-3">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.technicalStack.map((tech: string) => (
                      <span
                        key={tech}
                        className="text-xs font-medium text-gray-300 bg-white/5 border border-white/10 rounded-md px-2.5 py-1"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {caseStudy.outcomes && caseStudy.outcomes.length > 0 && (
                <div className="group p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-purple-500/50 transition-all duration-300">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-3">
                    Key Outcomes
                  </h3>
                  <ul className="space-y-1.5">
                    {caseStudy.outcomes.map((outcome: string) => (
                      <li key={outcome} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-pink-400 mt-0.5 shrink-0">✓</span>
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-700/60 to-transparent mb-12" />

          {/* Markdown content */}
          <div
            className="case-study-content"
            dangerouslySetInnerHTML={{ __html: caseStudy.content }}
          />

          {/* Testimonial */}
          {caseStudy.testimonial && (
            <div className="mt-14 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <span className="text-4xl text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-pink-400 leading-none select-none font-bold">&quot;</span>
                <div>
                  <p className="text-gray-200 text-lg italic leading-relaxed mb-4">
                    {caseStudy.testimonial.content}
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {caseStudy.testimonial.author}
                  </p>
                  {caseStudy.testimonial.role && (
                    <p className="text-xs text-gray-400 mt-0.5">{caseStudy.testimonial.role}</p>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
