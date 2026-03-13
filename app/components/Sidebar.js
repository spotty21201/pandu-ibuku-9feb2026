"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function Sidebar({ navItems }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Close sidebar on navigation
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <>
            {/* Mobile Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-50 glass-panel px-6 py-4 flex justify-between items-center">
                <h1 className="font-serif text-2xl tracking-tight">
                    <Link href="/" className="opacity-60 hover:opacity-100 transition-opacity">Pandu Ibuku</Link>
                </h1>
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 transition-transform active:scale-95"
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
                </button>
            </header>

            {/* Sidebar Overlay (Mobile) */}
            <div 
                className={`fixed inset-0 bg-black/5 z-40 transition-opacity duration-500 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            />

            {/* Sidebar Aside */}
            <aside className={`
                w-[85vw] max-w-[320px] md:w-56 lg:w-64 
                fixed md:sticky top-0 left-0 h-screen z-50
                bg-cream-bg border-r border-border-subtle 
                flex flex-col justify-between p-8 md:p-10 shrink-0
                transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="mt-10 md:mt-0">
                    <div className="mb-10 md:mb-16">
                        <h1 className="font-serif text-4xl md:text-5xl tracking-tight font-normal">
                            <Link href="/" className="text-black/50 hover:text-black transition-colors duration-500">
                                Pandu Ibuku
                            </Link>
                        </h1>
                    </div>

                    <nav aria-label="Main Navigation">
                        <ul className="space-y-4 md:space-y-5 text-[13px] font-medium tracking-[0.15em]">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                                return (
                                    <li key={item.href} className="overflow-hidden">
                                        <Link
                                            href={item.href}
                                            className={`sidebar-link block uppercase ${isActive ? 'active' : 'text-black/60'} ${item.multiline ? 'leading-snug' : ''}`}
                                        >
                                            {item.name === "Ilmu Baru Bilangan Prima" ? (
                                                <>Ilmu Baru <br className="hidden md:block" /> Bilangan Prima</>
                                            ) : item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>

                <div className="mt-auto pt-8 text-[10px] uppercase tracking-widest opacity-30">
                    Digital Archives
                </div>
            </aside>
        </>
    );
}
