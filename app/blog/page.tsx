import { ArrowRight } from 'lucide-react';
import { getAllPosts, getAllCategories } from '@/lib/blog-utils';
import BlogGrid from '@/components/BlogGrid';

export const metadata = {
  title: 'Blog',
  description: 'Insights, tutorials, and stories from the world of web development, AI, and technology innovation.',
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getAllPosts(), getAllCategories()]);

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative py-28 px-6 lg:px-24">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto relative text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-400 border border-purple-500/40 bg-purple-500/10 rounded-full px-4 py-1.5 mb-6">
            Insights
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Blog
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Thoughts, tutorials, and stories from the world of web development, AI, and technology innovation.
          </p>
        </div>
      </section>

      {/* Search, filters, and grid */}
      <section className="py-16 px-6 lg:px-24 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <BlogGrid posts={posts} categories={categories} />
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-20 px-6 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-10 md:p-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Want to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                collaborate?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your project and build something worth writing about.
            </p>
            <a
              href="https://calendly.com/salahdevv/request-a-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-lg"
            >
              Book a discovery call
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
