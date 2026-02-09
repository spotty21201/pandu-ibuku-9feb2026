import { getIntro, getEntries, getDomainSlugs } from "@/lib/mdx";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
    const domains = getDomainSlugs();
    return domains.map((domain) => ({
        domain,
    }));
}

export default async function DomainPage({ params }) {
    const { domain } = await params;
    const intro = getIntro(domain);
    const entries = getEntries(domain);

    if (!intro) {
        notFound();
    }

    // Format domain title for the large header
    const domainParts = domain.split("-").map(p => p.toUpperCase());

    return (
        <div className="px-6 py-10 md:px-12 md:py-16 lg:px-20 max-w-5xl">
            <header className="mb-4">
                <h2 className="font-serif font-normal text-4xl md:text-6xl lg:text-7xl leading-[0.85] tracking-tight text-black uppercase">
                    {domainParts.map((part, i) => (
                        <span key={i} className="block">{part}</span>
                    ))}
                </h2>
            </header>

            <section className="bg-card-bg p-8 md:p-12 border-l-[8px] border-accent-red mb-16">
                <div className="text-lg md:text-xl font-sans leading-relaxed text-black/90 prose max-w-none">
                    <MDXRemote source={intro.content} />
                </div>
            </section>

            <div className="mb-6">
                <h3 className="uppercase text-base font-medium tracking-wide">Arsip Entri</h3>
            </div>

            <div className="space-y-8">
                {entries.length > 0 ? (
                    entries.map((entry) => (
                        <article key={entry.slug} className="bg-card-bg p-8 md:p-10 lg:p-12">
                            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                                <div className="w-full md:w-[160px] shrink-0">
                                    <span className="font-mono text-base md:text-lg text-black block">
                                        [{entry.date || "N/A"}]
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl md:text-3xl font-bold leading-tight mb-4 tracking-tight font-sans text-black whitespace-pre-line">
                                        {entry.title.replace(/\s+/g, '\n')}
                                    </h3>
                                    <p className="text-base md:text-lg leading-relaxed mb-6 max-w-prose text-black">
                                        {entry.description}
                                    </p>
                                    <Link
                                        href={`/${domain}/${entry.slug}`}
                                        className="inline-flex items-center text-sm font-semibold uppercase tracking-wider hover:underline underline-offset-4 group text-black"
                                    >
                                        BACA SELENGKAPNYA
                                        <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))
                ) : (
                    <p className="italic opacity-60">Belum ada entri di domain ini.</p>
                )}
            </div>
        </div>
    );
}
