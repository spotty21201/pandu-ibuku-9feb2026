import { supabase } from '@/lib/supabase';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

export const dynamic = 'force-dynamic';

export default async function DomainPage({ params }) {
  const resolvedParams = await params;
  const domain = resolvedParams?.domain?.toLowerCase();

  if (!domain) {
    return <div>Error loading posts</div>;
  }

  const { data: page } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', domain)
    .single();

  const { data: posts, error } = await supabase
    .from('articles')
    .select('*')
    .eq('domain', domain)
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('DOMAIN FETCH ERROR:', error);
    return <div>Error loading posts</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {page && (
        <>
          <h1 className="text-5xl font-serif mb-8">{page.title}</h1>
          <ReactMarkdown
            remarkPlugins={[remarkBreaks]}
            className="prose prose-neutral max-w-none leading-relaxed mb-16"
          >
            {page.content || ''}
          </ReactMarkdown>
        </>
      )}

      {posts && posts.length > 0 ? (
        <div className="space-y-12">
          {posts.map((post) => (
            <article key={post.id}>
              <a href={`/${domain}/${post.slug}`}>
                <h2 className="text-2xl font-serif">{post.title}</h2>
              </a>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No published posts yet.</p>
      )}
    </div>
  );
}
