"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
    const router = useRouter();
    const [domains, setDomains] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        domain: "",
        content: "",
        date: new Date().toISOString().split("T")[0],
    });

    useEffect(() => {
        fetch("/api/admin/domains")
            .then((res) => res.json())
            .then((data) => {
                setDomains(data.domains || []);
                if (data.domains?.length > 0) {
                    setFormData((prev) => ({ ...prev, domain: data.domains[0] }));
                }
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                            {domains.map((d) => (
                                <option key={d} value={d}>
                                    {d.replace(/-/g, " ")}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold opacity-50">Content (Markdown)</label>
                    <textarea
                        required
                        rows={15}
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full bg-white border border-border-subtle p-4 font-mono text-sm focus:outline-none focus:border-accent-red transition-colors resize-y"
                        placeholder="Write your content here..."
                    />
                    <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">
                        Tip: Line breaks are preserved. Use - or * for bullets. Use **bold** for emphasis.
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
