import { NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabase-admin';
import { requireAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const auth = await requireAdminSession();
    if (!auth.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { data, error } = await supabase
      .from('articles')
      .select('slug,title,domain,status,created_at')
      .order('created_at', { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const posts = (data || []).map((row) => ({
      slug: row.slug,
      title: row.title,
      domain: row.domain,
      status: row.status,
      date: row.created_at ? row.created_at.split('T')[0] : '',
    }));

    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
