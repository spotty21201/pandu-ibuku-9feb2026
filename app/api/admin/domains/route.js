import { NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabase-admin';
import { requireAdminSession } from '@/lib/auth';

const defaultDomains = ['akhlaq-mulia', 'pandu-bangsaku', 'ilmu-baru-bilangan-prima', 'khayalan-kah', 'projects', 'miscellaneous'];

export async function GET() {
  try {
    const auth = await requireAdminSession();
    if (!auth.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { data } = await supabase.from('articles').select('domain').not('domain', 'is', null);
    const dbDomains = [...new Set((data || []).map((row) => row.domain).filter(Boolean))];
    const domains = dbDomains.length > 0 ? dbDomains.sort() : defaultDomains;

    return NextResponse.json({ domains });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch domains' }, { status: 500 });
  }
}
