import { NextResponse } from 'next/server';
import { getDomainSlugs } from '@/lib/mdx';

export async function GET() {
    try {
        const domains = getDomainSlugs();
        return NextResponse.json({ domains });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch domains' }, { status: 500 });
    }
}
