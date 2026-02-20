import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function ProjectsIndex() {
  const { data: projects, error } = await supabase
    .from('articles')
    .select('*')
    .eq('domain', 'projects')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    return <div>Error loading posts</div>;
  }

  if (!projects || projects.length === 0) {
    return <div>No posts found</div>;
  }

  return (
    <div className="px-6 py-10 md:px-12 md:py-16 lg:px-20 max-w-6xl">
      <h1 className="font-serif text-4xl md:text-6xl uppercase mb-8">projects</h1>
      <ul className="space-y-4">
        {projects.map((post) => (
          <li key={post.id}>
            <Link href={`/projects/${post.slug}`} className="underline underline-offset-4">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
