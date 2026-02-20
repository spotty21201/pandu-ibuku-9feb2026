import { getIntro, getEntries } from "@/lib/mdx";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeExternalLinks from "rehype-external-links";



export default async function ProjectsIndex() {
    const intro = await getIntro("projects");
    const projects = await getEntries("projects");

    return (
        <div className="px-6 py-10 md:px-12 md:py-16 lg:px-20 max-w-5xl">
            <header className="mb-4">
                <h2 className="font-serif font-normal text-4xl md:text-6xl lg:text-7xl leading-[0.85] tracking-tight text-black uppercase">
                    <span className="block">PROYEK &</span>
                    <span className="block">INSTRUMEN</span>
                </h2>
            </header>

            <section className="bg-card-bg p-8 md:p-12 border-l-[8px] border-accent-red mb-16">
                <div className="text-lg md:text-xl font-sans leading-relaxed text-black/90 prose max-w-none">
                    <MDXRemote
                        source={intro?.content || "Instrumen demonstrasi dari ide-ide Pandu Ibuku."}
                        options={{
                            mdxOptions: {
                                remarkPlugins: [remarkGfm, remarkBreaks],
                                rehypePlugins: [[rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }]],

                            }
                        }}
                    />

                </div>
            </section>

            <div className="mb-6">
                <h3 className="uppercase text-base font-medium tracking-wide">Daftar Instrumen</h3>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <article key={project.slug} className="bg-card-bg p-8 md:p-12 border border-border-subtle hover:border-accent-red/30 transition-all">
                            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                                <div className="w-full md:w-[160px] shrink-0">
                                    <span className="font-mono text-base md:text-lg text-black block">
                                        [{project.year || "N/A"}]
                                    </span>
                                    <span className="text-xs uppercase tracking-widest text-accent-red font-bold mt-2 block">
                                        {project.status}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl md:text-3xl font-bold leading-tight mb-4 tracking-tight font-sans text-black">
                                        {project.title}
                                    </h3>
                                    <p className="text-base md:text-lg leading-relaxed mb-8 max-w-prose text-black italic opacity-80">
                                        {project.description || "Klik untuk melihat Framing Intelektual proyek ini."}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <Link
                                            href={`/projects/${project.slug}`}
                                            className="inline-flex items-center text-sm font-semibold uppercase tracking-wider hover:opacity-70 group underline underline-offset-4"
                                        >
                                            LIHAT DETAIL
                                            <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                                        </Link>
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-black/60 hover:text-black text-xs font-mono uppercase tracking-widest border-b border-black/10"
                                            >
                                                KUNJUNGI SITUS ↗
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))
                ) : (
                    <p className="italic opacity-60">Belum ada proyek yang ditampilkan.</p>
                )}
            </div>
        </div>
    );
}
