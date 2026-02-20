import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function DomainPage({ params }) {
  const { domain } = params;

  const { data: posts, error } = await supabase
    .from('articles')
    .select('*')
    .eq('domain', domain)
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return <div>Error loading posts</div>;
  }

  if (!posts || posts.length === 0) {
    return <div>No posts found</div>;
  }

  return (
    <div className="px-6 py-10 md:px-12 md:py-16 lg:px-20 max-w-6xl">
      <h1 className="font-serif text-4xl md:text-6xl uppercase mb-8">{domain}</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/${domain}/${post.slug}`} className="underline underline-offset-4">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
