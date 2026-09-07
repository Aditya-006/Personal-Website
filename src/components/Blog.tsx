import React, { useState } from 'react';
import { BookOpen, Clock, Eye, Tag, ArrowRight, X, Share2, Check, ArrowUpRight } from 'lucide-react';
import { BLOG_POSTS } from '../data/portfolioData';
import { BlogPost } from '../types';
import { analytics } from '../utils/analytics';

export const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Performance', 'UI Philosophy', 'Bangalore Tech'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    return selectedCategory === 'All' || post.category === selectedCategory;
  });

  const handleOpenArticle = (post: BlogPost) => {
    setSelectedPost(post);
    analytics.trackEvent('blog_read', `Opened Article: ${post.title}`, {
      slug: post.slug,
      category: post.category
    });
  };

  const handleShare = (slug: string) => {
    const url = `${window.location.origin}/#blog-${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(true);
    analytics.trackEvent('blog_read', `Shared Article: ${slug}`);
    setTimeout(() => setCopiedSlug(false), 2000);
  };

  return (
    <section id="blog" aria-label="Technical Articles and Writing" className="py-20 sm:py-28 border-b border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-neutral-200/70 dark:border-neutral-800/70">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-1">
              Engineering Notes & Publications
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
              Technical Writing
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2 max-w-xl">
              Deep dives into edge computing latencies, minimal interface psychology, and building resilient systems in Bangalore.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                  selectedCategory === cat
                    ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-medium'
                    : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Article Cards */}
        <div className="divide-y divide-neutral-200/80 dark:divide-neutral-800/80">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              id={`article-card-${post.slug}`}
              className="py-8 sm:py-10 group cursor-pointer"
              onClick={() => handleOpenArticle(post)}
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">
                      {post.category}
                    </span>
                    <span>{post.publishedAt}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {post.views.toLocaleString()} reads
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900/60 px-2 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-1 text-sm font-medium text-neutral-900 dark:text-neutral-100 group-hover:translate-x-1 transition-transform self-center shrink-0">
                  <span>Read Essay</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <div
          id="article-reader-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reader-post-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
        >
          <div
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-10 shadow-2xl animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2">
                  <span>Aditya Santhosh</span>
                  <span>•</span>
                  <span>{selectedPost.publishedAt}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
                <h2 id="reader-post-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
                  {selectedPost.title}
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-1">
                  {selectedPost.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-4">
                <button
                  onClick={() => handleShare(selectedPost.slug)}
                  className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  title="Share link to article"
                  aria-label="Share link to article"
                >
                  {copiedSlug ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                </button>
                <button
                  id="close-reader-modal-btn"
                  onClick={() => setSelectedPost(null)}
                  className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  aria-label="Close article reader"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Key Takeaways Box */}
            <div className="my-6 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
                Executive Takeaways
              </div>
              <ul className="space-y-1.5">
                {selectedPost.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2">
                    <span className="text-neutral-400 font-mono">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Table of Contents */}
            <div className="mb-6 p-4 rounded-lg bg-neutral-100/50 dark:bg-neutral-800/30 text-xs font-mono">
              <div className="text-neutral-400 uppercase tracking-wider mb-2">Table of Contents</div>
              <div className="space-y-1">
                {selectedPost.tableOfContents.map((toc, idx) => (
                  <div key={idx} className="text-neutral-600 dark:text-neutral-300">
                    {idx + 1}. {toc.title}
                  </div>
                ))}
              </div>
            </div>

            {/* Full Essay Content */}
            <div className="prose prose-neutral dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 space-y-4 font-sans whitespace-pre-line">
              {selectedPost.content}
            </div>

            {/* Modal Author Sign-off */}
            <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-mono flex items-center justify-center text-xs font-bold">
                  AS
                </div>
                <div>
                  <div className="text-xs font-medium text-neutral-900 dark:text-neutral-100">Written by Aditya Santhosh</div>
                  <div className="text-[11px] text-neutral-500 font-mono">Bangalore, India • Systems & Web Performance</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleShare(selectedPost.slug)}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono border border-neutral-300 dark:border-neutral-700 hover:border-neutral-500 flex items-center gap-1.5"
                >
                  {copiedSlug ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedSlug ? 'Link Copied' : 'Share Article'}</span>
                </button>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-4 py-1.5 rounded-lg text-xs font-mono font-medium bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
