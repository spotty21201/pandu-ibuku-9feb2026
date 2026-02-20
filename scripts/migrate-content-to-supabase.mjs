import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const contentRoot = path.join(process.cwd(), 'content');
const domains = fs.readdirSync(contentRoot).filter((name) => fs.statSync(path.join(contentRoot, name)).isDirectory());

for (const domain of domains) {
  const domainPath = path.join(contentRoot, domain);
  const files = fs.readdirSync(domainPath).filter((name) => name.endsWith('.md'));

  for (const file of files) {
    const slug = file.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(domainPath, file), 'utf8');
    const { data, content } = matter(raw);

    const payload = {
      title: data.title || slug,
      slug,
      domain,
      content,
      excerpt: data.description || null,
      status: 'published',
      author: 'migration-script',
      created_at: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('articles')
      .upsert(payload, { onConflict: 'domain,slug' });

    if (error) {
      console.error(`Failed ${domain}/${slug}:`, error.message);
    } else {
      console.log(`Migrated ${domain}/${slug}`);
    }
  }
}
