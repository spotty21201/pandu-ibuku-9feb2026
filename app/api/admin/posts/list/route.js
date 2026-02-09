import { NextResponse } from 'next/server';
import { getDomainSlugs, getEntries } from '@/lib/mdx';

export async function GET() {
    try {
        const domains = getDomainSlugs();
        const allPosts = [];

        for (const domain of domains) {
            const entries = getEntries(domain);
            allPosts.push(...entries.map(e => ({ ...e, domain })));
        }

        // Sort by date or title
        allPosts.sort((a, b) => b.date?.localeCompare(a.date) || a.title.localeCompare(b.title));

        return NextResponse.json({ posts: allPosts });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}
