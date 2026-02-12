import { getEntry, getEntries } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeExternalLinks from "rehype-external-links";



export async function generateStaticParams() {
    const entries = getEntries("projects");
    return entries.map((entry) => ({
        slug: entry.slug,
    }));
}

export default async function ProjectPage({ params }) {
    const { slug } = await params;
    const entry = getEntry("projects", slug);

    if (!entry) {
        notFound();
    }

    return (
        <article className="px-6 py-10 md:px-12 md:py-16 lg:px-20 max-w-5xl">
            <header className="mb-12">
                <nav className="mb-8 text-xs uppercase tracking-widest text-black/60 font-mono">
                    <Link href="/projects" className="hover:text-accent-red">
                        PROYEK
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-black/30">{entry.title.toUpperCase()}</span>
                </nav>

                <h1 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight tracking-tight">
                    {entry.title}
                </h1>

                <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs font-mono tracking-widest uppercase border-b border-border-subtle pb-6 mb-12">
                    {entry.year && <div>TAHUN: {entry.year}</div>}
                    {entry.status && <div className="text-accent-red font-bold">STATUS: {entry.status}</div>}
                    {entry.domains && (
                        <div>
                            DOMAIN: {entry.domains.join(", ")}
                        </div>
                    )}
                </div>
            </header>

            <section className="mb-16">
                <h2 className="uppercase text-xs font-mono tracking-[0.2em] mb-6 text-black/40">
                    Framing Intelektual
                </h2>
                <div className="text-xl md:text-2xl leading-relaxed font-serif italic text-black bg-card-bg/30 p-8 border-l-4 border-accent-red prose max-w-none">
                    <MDXRemote
                        source={entry.content}
                        options={{
                            mdxOptions: {
                                remarkPlugins: [remarkGfm, remarkBreaks],
                                rehypePlugins: [[rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }]],

                            }
                        }}
                    />

                </div>
            </section>

            {entry.link && (
                <section className="mt-12 p-8 md:p-12 bg-card-bg border border-border-subtle">
                    <h3 className="font-serif font-bold text-2xl mb-4 text-black">Tautan Instrumen</h3>
                    <p className="text-base text-black/70 mb-8 max-w-prose">
                        Klik tautan berikut untuk membuka instrumen/aplikasi eksternal yang merupakan manifestasi terapan dari ide ini.
                    </p>
                    <a
                        href={entry.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-10 py-4 bg-accent-red text-white font-mono uppercase tracking-widest text-sm hover:opacity-90 transition-opacity"
                    >
                        Buka Instrumen →
                    </a>
                </section>
            )}

            <footer className="mt-24 pt-10 border-t border-border-subtle">
                <Link
                    href="/projects"
                    className="inline-flex items-center text-sm font-semibold uppercase tracking-wider hover:opacity-70 group"
                >
                    <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span>
                    Kembali ke Daftar Proyek
                </Link>
            </footer>
        </article>
    );
}
