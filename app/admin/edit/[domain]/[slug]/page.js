"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

export default function EditPostPage({ params }) {
  const resolvedParams = use(params);
  const { domain, slug } = resolvedParams;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    domain,
    content: '',
    date: '',
    status: 'draft',
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/admin/posts?domain=${domain}&slug=${slug}`);
        if (res.ok) {
          const data = await res.json();
          if (data.post) {
            setFormData({
              title: data.post.title || '',
              domain,
              content: data.post.content || '',
              date: data.post.date || '',
              status: data.post.status || 'draft',
            });
          }
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [domain, slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/admin/posts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, slug }),
      });

      if (res.ok) {
        router.push('/admin?success=post_updated');
      } else {
        alert('Failed to update post');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="py-20 text-center font-mono opacity-50">Loading editor...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-10">
        <h2 className="text-3xl font-serif font-bold mb-2">Edit Post</h2>
        <p className="text-black/60 tracking-tight italic">Refining the entry: {slug.replace(/-/g, ' ')}</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold opacity-50">Title</label>
            <input required type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full bg-white border border-border-subtle p-3 font-sans focus:outline-none focus:border-accent-red transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold opacity-50">Date</label>
            <input required type="text" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full bg-white border border-border-subtle p-3 font-mono text-sm focus:outline-none focus:border-accent-red transition-colors" placeholder="YYYY-MM-DD" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold opacity-50">Status</label>
          <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full bg-white border border-border-subtle p-3 font-sans focus:outline-none focus:border-accent-red transition-colors">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold opacity-50">Content (Markdown)</label>
          <textarea required rows={15} value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full bg-white border border-border-subtle p-4 font-mono text-sm focus:outline-none focus:border-accent-red transition-colors resize-y leading-relaxed" />
        </div>

        <div className="flex justify-between items-center pt-6">
          <button type="button" onClick={() => router.back()} className="text-sm uppercase tracking-widest opacity-50 hover:opacity-100 p-2">Cancel</button>
          <button disabled={saving} type="submit" className="bg-accent-red text-white px-8 py-3 uppercase tracking-widest text-sm font-bold hover:bg-black transition-colors disabled:opacity-50">{saving ? 'Updating...' : 'Update Post'}</button>
        </div>
      </form>
    </div>
  );
}
