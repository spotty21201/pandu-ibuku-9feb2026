"use client";

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminEditPage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams?.slug;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`/api/admin/pages/${slug}`);
        const data = await res.json();
        if (res.ok && data.page) {
          setTitle(data.page.title || '');
          setContent(data.page.content || '');
        } else {
          alert('Failed to load page');
        }
      } catch {
        alert('Failed to load page');
      } finally {
        setLoading(false);
      }
    };

    if (slug) run();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/pages/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        router.push('/admin?success=page_updated');
      } else {
        alert('Failed to update page');
      }
    } catch {
      alert('Failed to update page');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="py-20 text-center font-mono opacity-50">Loading page editor...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-10">
        <h2 className="text-3xl font-serif font-bold mb-2">Edit Menu Page</h2>
        <p className="text-black/60">Editing: {slug}</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold opacity-50">Title</label>
          <input
            required
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white border border-border-subtle p-3 font-sans focus:outline-none focus:border-accent-red transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold opacity-50">Content (HTML/Plain Text)</label>
          <textarea
            rows={14}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-white border border-border-subtle p-4 font-mono text-sm focus:outline-none focus:border-accent-red transition-colors resize-y"
          />
        </div>

        <div className="flex justify-between items-center pt-6">
          <button
            type="button"
            onClick={() => router.push('/admin')}
            className="text-sm uppercase tracking-widest opacity-50 hover:opacity-100 p-2"
          >
            Back
          </button>
          <button
            disabled={saving}
            type="submit"
            className="bg-accent-red text-white px-8 py-3 uppercase tracking-widest text-sm font-bold hover:bg-black transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Update Page'}
          </button>
        </div>
      </form>
    </div>
  );
}
