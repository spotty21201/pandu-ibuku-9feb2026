import { NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabase-admin';
import { requireAdminSession } from '@/lib/auth';

export async function GET(_req, { params }) {
  try {
    const auth = await requireAdminSession();
    if (!auth.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const resolvedParams = await params;
    const slug = resolvedParams?.slug;
    if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 });

    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ page: data });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const auth = await requireAdminSession();
    if (!auth.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const resolvedParams = await params;
    const slug = resolvedParams?.slug;
    if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 });

    const { title, content } = await req.json();
    if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

    const { error } = await supabase
      .from('pages')
      .update({ title, content: content || '', updated_at: new Date().toISOString() })
      .eq('slug', slug);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
  }
}
