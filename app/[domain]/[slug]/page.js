import { getEntry, getEntries, getDomainSlugs } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  const domains = await getDomainSlugs();
  const paths = [];

  for (const domain of domains) {
    const entries = await getEntries(domain);
    for (const entry of entries) {
      paths.push({ domain, slug: entry.slug });
    }
  }

  return paths;
}

export default async function EntryPage({ params }) {
  const { domain, slug } = await params;
  const entry = await getEntry(domain, slug);

  if (!entry) {
    notFound();
  }

  return (
    <article className="px-6 py-10 md:px-12 md:py-16 lg:px-20 max-w-4xl">
      <header className="mb-12">
        <nav className="mb-8 text-xs uppercase tracking-widest text-black/60 font-mono">
          <Link href={`/${domain}`} className="hover:text-accent-red">{domain.replace(/-/g, ' ')}</Link>
          <span className="mx-2">/</span>
          <span className="text-black/30">ENTRI</span>
        </nav>

        <h1 className="text-3xl md:text-5xl font-serif font-bold mb-8 leading-tight tracking-tight">{entry.title}</h1>

        {entry.date && (
          <div className="font-mono text-sm tracking-wide mb-12 border-b border-border-subtle pb-4">[{entry.date}]</div>
        )}
      </header>

      <div className="prose prose-zinc prose-lg max-w-none prose-headings:font-serif prose-p:leading-relaxed prose-p:mb-8 text-black/90 whitespace-pre-wrap">
        {entry.content}
      </div>

      <footer className="mt-24 pt-10 border-t border-border-subtle">
        <Link href={`/${domain}`} className="inline-flex items-center text-sm font-semibold uppercase tracking-wider hover:opacity-70 group">
          <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span>
          Kembali ke {domain.replace(/-/g, ' ')}
        </Link>
      </footer>
    </article>
  );
}
