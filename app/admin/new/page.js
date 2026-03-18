"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MarkdownEditor from "@/app/components/MarkdownEditor";
import { DOMAINS } from "@/lib/domains";

export default function NewPostPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const domainOptions = DOMAINS.filter((d) => d.slug);
    const [formData, setFormData] = useState({
        title: "",
        domain: domainOptions[0]?.slug || "",
        content: "",
        date: new Date().toISOString().split("T")[0],
        status: "draft",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.content.trim()) {
            alert("Content is required");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/admin/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin?success=post_created");
            } else {
                alert("Failed to save post");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <header className="mb-10">
                <h2 className="text-3xl font-serif font-bold mb-2">Create New Post</h2>
                <p className="text-black/60">Compose your ideas for the archive.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest font-bold opacity-50">Title</label>
                        <input
                            required
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-white border border-border-subtle p-3 font-sans focus:outline-none focus:border-accent-red transition-colors"
                            placeholder="Post Title"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest font-bold opacity-50">Domain</label>
                        <select
                            value={formData.domain}
                            onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                            className="w-full bg-white border border-border-subtle p-3 font-sans focus:outline-none focus:border-accent-red transition-colors"
                        >
                            {domainOptions.map((d) => (
                                <option key={d.slug} value={d.slug}>
                                    {d.label}
                                </option>
                            ))}
                        </select>
                    </div>
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold opacity-50">Status</label>
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full bg-white border border-border-subtle p-3 font-sans focus:outline-none focus:border-accent-red transition-colors"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>

                </div>

                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold opacity-50">Content</label>
                    <MarkdownEditor
                        value={formData.content}
                        onChange={(content) => setFormData((current) => ({ ...current, content }))}
                        placeholder="Write your content here..."
                    />
                    <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">
                        Visual editor, stored as markdown.
                    </p>

                </div>

                <div className="flex justify-between items-center pt-6">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="text-sm uppercase tracking-widest opacity-50 hover:opacity-100 p-2"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={loading}
                        type="submit"
                        className="bg-accent-red text-white px-8 py-3 uppercase tracking-widest text-sm font-bold hover:bg-black transition-colors disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Publish Post"}
                    </button>
                </div>
            </form>
        </div>
    );
}
