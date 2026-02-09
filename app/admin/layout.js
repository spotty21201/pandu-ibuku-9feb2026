export const metadata = {
    title: "Admin | Pandu Ibuku",
};

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-cream-bg text-black font-sans">
            <nav className="border-b border-border-subtle bg-white/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <h1 className="font-serif text-xl tracking-tight opacity-50">
                            Pandu Ibuku Admin
                        </h1>
                        <div className="flex gap-6 text-sm uppercase tracking-wider font-medium">
                            <a href="/admin" className="hover:text-accent-red">Dashboard</a>
                            <a href="/admin/new" className="hover:text-accent-red">New Post</a>
                        </div>
                    </div>
                    <div className="text-xs uppercase tracking-widest text-black/40">
                        Author Session
                    </div>
                </div>
            </nav>
            <main className="max-w-5xl mx-auto py-12 px-6">
                {children}
            </main>
        </div>
    );
}
