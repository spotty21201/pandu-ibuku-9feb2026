import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
    try {
        const { title, domain, content, date } = await req.json();

        if (!title || !domain || !content) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const slug = title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        const contentDirectory = path.join(process.cwd(), 'content');
        const domainPath = path.join(contentDirectory, domain);

        if (!fs.existsSync(domainPath)) {
            return NextResponse.json({ error: 'Domain not found' }, { status: 404 });
        }

        const filePath = path.join(domainPath, `${slug}.md`);

        // Frontmatter construction
        const fileContent = `---
title: "${title}"
date: "${date || new Date().toISOString().split('T')[0]}"
---

${content}`;

        fs.writeFileSync(filePath, fileContent, 'utf8');

        return NextResponse.json({ success: true, slug });
    } catch (error) {
        console.error('Save error:', error);
        return NextResponse.json({ error: 'Failed to save post' }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const domain = searchParams.get('domain');
        const slug = searchParams.get('slug');

        if (!domain || !slug) {
            return NextResponse.json({ error: 'Missing domain or slug' }, { status: 400 });
        }

        const contentDirectory = path.join(process.cwd(), 'content');
        const filePath = path.join(contentDirectory, domain, `${slug}.md`);

        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        const fileContent = fs.readFileSync(filePath, 'utf8');
        return NextResponse.json({ content: fileContent });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        const { title, domain, content, slug, date } = await req.json();

        if (!domain || !slug || !content || !title) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const contentDirectory = path.join(process.cwd(), 'content');
        const filePath = path.join(contentDirectory, domain, `${slug}.md`);

        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }

        const updatedFileContent = `---\ntitle: "${title}"\ndate: "${date}"\n---\n\n${content}`;

        fs.writeFileSync(filePath, updatedFileContent, 'utf8');

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { slug, domain } = await req.json();

        if (!slug || !domain) {
            return NextResponse.json({ error: 'Missing slug or domain' }, { status: 400 });
        }

        const contentDirectory = path.join(process.cwd(), 'content');
        const filePath = path.join(contentDirectory, domain, `${slug}.md`);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}
