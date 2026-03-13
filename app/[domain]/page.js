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
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <div className="mb-10 md:mb-12">
        <h1 className="text-5xl md:text-6xl font-serif tracking-tight">
          {sectionTitle}
        </h1>
        <div className="w-16 h-[3px] bg-accent-red mt-5 text-accent-red"></div>
      </div>

      {posts && posts.length > 0 ? (
        <div className="space-y-10 md:space-y-12">
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
              <article key={post.id} className="border-b border-border-subtle pb-8">
                <p className="text-xs uppercase tracking-widest text-black/50 mb-3">
                  {formattedDate}
                </p>

                <a href={`/${post.domain}/${post.slug}`} className="block group">
                  <h2 className="text-2xl md:text-3xl font-serif text-accent-red group-hover:opacity-70 transition-opacity mb-3">
                    {post.title}
                  </h2>
                </a>

                <p className="text-base md:text-lg leading-relaxed text-black/80">
                  {snippet}
                </p>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="text-black/50 italic">No published posts yet.</p>
      )}
    </div>
  );
}
