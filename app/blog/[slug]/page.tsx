import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag, User } from 'lucide-react';
import { getAllPosts, getPostBySlug } from '@/lib/blog-utils';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post not found',
      description: 'We could not find the blog post you are looking for.',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.slug !== post.slug &&
        (p.category === post.category || p.tags.some((tag: string) => post.tags.includes(tag)))
    )
    .slice(0, 3);

  const formattedDate =
    post.date
      ? new Date(post.date).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : null;

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative py-24 px-6 lg:px-24">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.1),transparent_50%)]" />

        <div className="max-w-4xl mx-auto relative">
          {/* Back button */}
          <div className="mb-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 hover:scale-105 shadow-lg text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all posts
            </Link>
          </div>

          {/* Category badge */}
          {post.category && (
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-pink-400 border border-pink-500/40 bg-pink-500/10 rounded-full px-3 py-1 mb-4">
              {post.category}
            </span>
          )}

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {post.title}
            </span>
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-lg text-gray-300 leading-relaxed border-l-2 border-pink-500/50 pl-4 mb-6">
              {post.excerpt}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            {post.author && (
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300">{post.author}</span>
              </div>
            )}
            {formattedDate && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>{formattedDate}</span>
              </div>
            )}
            {post.readTime > 0 && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>{post.readTime} min read</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured image */}
      {post.featuredImage && (
        <section className="pb-10 px-6 lg:px-24">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden border border-white/10">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </section>
      )}

      {/* Metadata + Content */}
      <section className="py-10 px-6 lg:px-24 bg-black/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">

          {/* Metadata cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <div className="group p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-purple-500/50 transition-all duration-300">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-3">
                Author
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-200 font-medium">{post.author}</span>
              </div>
            </div>

            <div className="group p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-purple-500/50 transition-all duration-300">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-3">
                Tags
              </h3>
              {post.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-gray-300 bg-white/5 border border-white/10 rounded-md px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-sm text-gray-500">No tags</span>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-700/60 to-transparent mb-12" />

          {/* Markdown content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags bottom */}
          {post.tags.length > 0 && (
            <div className="mt-14 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-5 h-5 text-purple-400" />
                <span className="text-white font-medium">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-sm rounded-full hover:border-purple-500/50 hover:text-purple-300 transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-6 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Related{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Posts
                </span>
              </h2>
              <p className="text-gray-400 mt-2">Continue reading with these similar articles.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02]"
                >
                  <span className="text-xs font-semibold text-pink-400 mb-2">{relatedPost.category}</span>
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-all">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">{relatedPost.excerpt}</p>
                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                      Read article
                    </span>
                    <span className="text-xs text-gray-500">{relatedPost.readTime} min read</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
