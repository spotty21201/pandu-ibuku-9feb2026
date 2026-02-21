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
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="mb-16">
        <h1 className="text-7xl font-serif tracking-tight">
          PROJECTS
        </h1>
        <div className="w-16 h-[3px] bg-red-700 mt-6"></div>
      </div>
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
