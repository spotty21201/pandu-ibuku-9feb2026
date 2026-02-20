import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ProjectPage({ params }) {
  const { slug } = params;

  const { data: post, error } = await supabase
    .from('articles')
    .select('*')
    .eq('domain', 'projects')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !post) {
    return notFound();
  }

  return (
    <article className="px-6 py-10 md:px-12 md:py-16 lg:px-20 max-w-4xl">
      <h1 className="text-3xl md:text-5xl font-serif font-bold mb-8">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
    </article>
  );
}
