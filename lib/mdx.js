import { supabaseAdmin } from '@/lib/supabase-admin';

function getAdminOrNull() {
  try {
    return supabaseAdmin;
  } catch {
    return null;
  }
}

function mapArticle(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.excerpt || '',
    date: row.created_at ? row.created_at.split('T')[0] : '',
    content: row.content || '',
    domain: row.domain,
    status: row.status,
  };
}

export async function getDomainSlugs() {
  const supabase = getAdminOrNull();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('articles')
    .select('domain')
    .eq('status', 'published')
    .not('domain', 'is', null);

  if (error || !data) return [];
  return [...new Set(data.map((row) => row.domain))].filter(Boolean).sort();
}

export async function getEntries(domain) {
  const supabase = getAdminOrNull();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('domain', domain)
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  return data.filter((row) => row.slug !== 'intro').map(mapArticle);
}

export async function getIntro(domain) {
  const supabase = getAdminOrNull();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('domain', domain)
    .eq('slug', 'intro')
    .eq('status', 'published')
    .single();

  if (error || !data) return null;

  const mapped = mapArticle(data);
  return {
    title: mapped.title,
    content: mapped.content,
    description: mapped.description,
  };
}

export async function getEntry(domain, slug) {
  const supabase = getAdminOrNull();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('domain', domain)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !data) return null;
  return mapArticle(data);
}
