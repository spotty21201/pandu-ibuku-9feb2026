import { NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabase-admin';
import { requireAdminSession } from '@/lib/auth';

export async function POST(req) {
  try {
    const auth = await requireAdminSession();
    if (!auth.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { title, domain, content, status } = body;

    const cleanDomain = domain
      ?.toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');

    if (!title || !cleanDomain || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const slug = title
      ?.toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');

    const { data, error } = await supabase
      .from('articles')
      .insert([
        {
          title,
          domain: cleanDomain,
          slug,
          content,
          status: status || 'draft',
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save post' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const auth = await requireAdminSession();
    if (!auth.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const domain = searchParams.get('domain');
    const slug = searchParams.get('slug');

    if (!domain || !slug) {
      return NextResponse.json({ error: 'Missing domain or slug' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('domain', domain)
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({
      post: {
        title: data.title,
        domain: data.domain,
        content: data.content || '',
        date: data.created_at ? data.created_at.split('T')[0] : '',
        status: data.status || 'draft',
        excerpt: data.excerpt || '',
        coverImage: data.cover_image || '',
        author: data.author || '',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const auth = await requireAdminSession();
    if (!auth.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { title, domain, content, slug, date, excerpt, coverImage, status, author } = await req.json();

    if (!domain || !slug || !content || !title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { error } = await supabase
      .from('articles')
      .update({
        title,
        content,
        excerpt: excerpt || null,
        cover_image: coverImage || null,
        status: status || 'draft',
        author: author || auth.user.email || 'admin',
        created_at: date ? new Date(date).toISOString() : undefined,
        updated_at: new Date().toISOString(),
      })
      .eq('domain', domain)
      .eq('slug', slug);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const auth = await requireAdminSession();
    if (!auth.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { slug, domain } = await req.json();

    if (!slug || !domain) {
      return NextResponse.json({ error: 'Missing slug or domain' }, { status: 400 });
    }

    const { error } = await supabase.from('articles').delete().eq('domain', domain).eq('slug', slug);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
