import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function DomainPage({ params }) {
  const resolvedParams = await params;
  const domain = resolvedParams?.domain?.toLowerCase();

  if (!domain) {
    return <div>Error loading posts</div>;
  }

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

  if (!posts || posts.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-serif tracking-wide uppercase mb-8">
          {domain.replace(/-/g, ' ')}
        </h1>
        <p className="text-gray-500">No published posts yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-serif tracking-wide uppercase mb-12">
        {domain.replace(/-/g, ' ')}
      </h1>

      <div className="space-y-12">
        {posts.map((post) => {
          const plain = (post.content || '').replace(/<[^>]+>/g, '').trim();
          const snippet = post.excerpt ? post.excerpt : `${plain.slice(0, 180)}${plain.length > 180 ? '...' : ''}`;

          return (
            <article key={post.id}>
              <a href={`/${domain}/${post.slug}`} className="block group">
                <h2 className="text-2xl font-serif group-hover:underline">
                  {post.title}
                </h2>

                <p className="mt-3 text-gray-700 leading-relaxed">
                  {snippet}
                </p>

                <span className="inline-block mt-4 text-sm tracking-wide uppercase">
                  Read more →
                </span>
              </a>
            </article>
          );
        })}
      </div>
    </div>
  );
}
