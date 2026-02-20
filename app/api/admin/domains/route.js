import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth';
import { DOMAINS } from '@/lib/domains';

export async function GET() {
  try {
    const auth = await requireAdminSession();
    if (!auth.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const domains = DOMAINS.filter((d) => d.slug).map((d) => d.slug);
    return NextResponse.json(domains);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch domains' }, { status: 500 });
  }
}
