import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaYoutube } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

export default async function PostPage({ params }) {
  const resolvedParams = await params;
  const domain = resolvedParams?.domain?.toLowerCase();
  const slug = resolvedParams?.slug?.toLowerCase();

  if (!domain || !slug) {
    return notFound();
  }

  const { data: post, error } = await supabase
    .from('articles')
    .select('*')
    .eq('domain', domain)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !post) {
    return notFound();
  }

  return (
    <article className="px-6 py-10 md:px-12 md:py-16 lg:px-20 max-w-4xl">
      <h1 className="text-3xl md:text-5xl font-serif font-bold mb-8">{post.title}</h1>
      <div className="prose prose-neutral max-w-none leading-relaxed">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ href, children }) => {
              const isYoutube = href?.includes('youtube.com') || href?.includes('youtu.be');

              if (isYoutube) {
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-red-600 hover:opacity-80 transition"
                  >
                    <FaYoutube className="text-2xl" />
                    <span className="underline break-all">
                      Watch on YouTube
                    </span>
                  </a>
                );
              }

              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-neutral-700 hover:text-black"
                >
                  {children}
                </a>
              );
            },
          }}
        >
          {post.content || ''}
        </ReactMarkdown>
      </div>
    </article>
  );
}
