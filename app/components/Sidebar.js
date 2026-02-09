"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ navItems }) {
    const pathname = usePathname();

    return (
        <aside className="w-full md:w-64 lg:w-72 md:h-screen md:sticky md:top-0 border-r border-border-subtle flex flex-col justify-between p-6 md:p-8 shrink-0 bg-cream-bg">
            <div>
                <div className="mb-10 md:mb-16">
                    <h1 className="font-serif text-3xl tracking-tight font-normal text-black/40">
                        <Link href="/">Pandu Ibuku</Link>
                    </h1>
                </div>

                <nav aria-label="Main Navigation">
                    <ul className="space-y-4 md:space-y-5 text-sm font-medium tracking-wide">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`sidebar-link block uppercase text-black ${isActive ? 'font-bold' : ''} ${item.multiline ? 'leading-snug' : ''}`}
                                    >
                                        {item.name === "Ilmu Baru Bilangan Prima" ? (
                                            <>Ilmu Baru <br /> Bilangan Prima</>
                                        ) : item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>

            <div className="mt-10 md:mt-0">
                {/* Space for lower-sidebar elements if needed */}
            </div>
        </aside>
    );
}
