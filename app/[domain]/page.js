import { supabase } from '@/lib/supabase';

const DOMAIN_TITLES = {
  'pandu-bangsaku': 'Pandu Bangsaku',
  'akhlaq-mulia': 'Akhlaq Mulia',
  'ilmu-baru-bilangan-prima': 'Ilmu Baru Bilangan Prima',
  'khayalan-kah': 'Khalayan-kah',
  miscellaneous: 'Miscellaneous',
};

export const dynamic = 'force-dynamic';

export default async function DomainPage({ params }) {
  const resolvedParams = await params;
  const domain = resolvedParams?.domain?.toLowerCase();
  const sectionTitle = DOMAIN_TITLES[domain] || '';

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

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="mb-16">
        <h1 className="text-7xl font-serif tracking-tight">
          {sectionTitle}
        </h1>
        <div className="w-16 h-[3px] bg-red-700 mt-6"></div>
      </div>

      {posts && posts.length > 0 ? (
        <div className="space-y-16">
          {posts.map((post) => {
            const snippet = post.content
              ?.split('\n')
              .filter((line) => line.trim() !== '')
              .slice(0, 2)
              .join(' ');

            const formattedDate = new Date(post.created_at)
              .toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              });

            return (
              <article key={post.id} className="border-b pb-12">
                <p className="text-sm uppercase tracking-wide text-neutral-500 mb-2">
                  {formattedDate}
                </p>

                <a href={`/${post.domain}/${post.slug}`}>
                  <h2 className="text-3xl font-serif hover:opacity-70 transition mb-4">
                    {post.title}
                  </h2>
                </a>

                <p className="text-lg leading-relaxed text-neutral-700">
                  {snippet}
                </p>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">No published posts yet.</p>
      )}
    </div>
  );
}
