"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

function DashboardContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const successMsg = searchParams.get("success");

    useEffect(() => {
        fetch("/api/admin/posts/list")
            .then((res) => res.json())
            .then((data) => {
                setPosts(data.posts || []);
                setLoading(false);
            });
    }, []);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
    };

    const deletePost = async (domain, slug) => {
        if (!confirm("Are you sure you want to delete this post from the archive?")) return;

        try {
            const res = await fetch("/api/admin/posts", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ domain, slug }),
            });

            if (res.ok) {
                setPosts(posts.filter((p) => p.slug !== slug || p.domain !== domain));
            } else {
                alert("Failed to delete post");
            }
        } catch (error) {
            console.error(error);
            alert("Error deleting post");
        }
    };

    return (
        <div className="space-y-12">
            <header className="flex justify-between items-end border-b border-border-subtle pb-8">
                <div>
                    <h2 className="text-4xl font-serif font-bold mb-2">Repository Dashboard</h2>
                    <p className="text-black/60">Manage your collection of ideas and articles.</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleLogout}
                        className="text-xs uppercase tracking-widest opacity-40 hover:opacity-100 px-4 py-2 hover:text-accent-red font-bold transition-all"
                    >
                        Logout
                    </button>
                    <Link
                        href="/admin/new"
                        className="bg-accent-red text-white px-6 py-2 uppercase tracking-widest text-xs font-bold hover:bg-black transition-colors"
                    >
                        + New Post
                    </Link>
                </div>
            </header>

            {successMsg && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 font-mono text-sm animate-in fade-in slide-in-from-top-4 duration-500">
                    Success: {successMsg === "post_created" ? "Post has been published to the archive." : "Archive entry has been updated."}
                </div>
            )}

            {loading ? (
                <div className="py-20 text-center font-mono opacity-50">Loading archive...</div>
            ) : (
                <div className="bg-white border border-border-subtle overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-card-bg/50 border-b border-border-subtle">
                            <tr>
                                <th className="px-6 py-4 text-xs uppercase tracking-widest opacity-50 font-bold">Domain</th>
                                <th className="px-6 py-4 text-xs uppercase tracking-widest opacity-50 font-bold">Title</th>
                                <th className="px-6 py-4 text-xs uppercase tracking-widest opacity-50 font-bold">Date</th>
                                <th className="px-6 py-4 text-xs uppercase tracking-widest opacity-50 font-bold">Status</th>
                                <th className="px-6 py-4 text-xs uppercase tracking-widest opacity-50 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {posts.map((post) => (
                                <tr key={`${post.domain}-${post.slug}`} className="hover:bg-cream-bg transition-colors group">
                                    <td className="px-6 py-4">
                                        <span className="text-[10px] uppercase tracking-widest bg-accent-red/10 text-accent-red px-2 py-1 rounded-sm font-bold">
                                            {post.domain.replace(/-/g, " ")}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        <Link href={`/${post.domain}/${post.slug}`} target="_blank" className="hover:text-accent-red transition-colors">
                                            {post.title}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs opacity-60">
                                        {post.date || "N/A"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-[10px] uppercase tracking-widest font-bold">{post.status || "draft"}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/admin/edit/${post.domain}/${post.slug}`}
                                            className="text-[10px] uppercase tracking-widest font-bold opacity-30 hover:opacity-100 hover:text-accent-red px-2"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => deletePost(post.domain, post.slug)}
                                            className="text-[10px] uppercase tracking-widest font-bold opacity-30 hover:opacity-100 hover:text-accent-red px-2"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {posts.length === 0 && (
                        <div className="py-20 text-center text-black/40 italic">
                            No entries found. Start by creating a new one.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function AdminDashboard() {
    return (
        <Suspense fallback={<div className="py-20 text-center font-mono opacity-50">Loading editor...</div>}>
            <DashboardContent />
        </Suspense>
    );
}
