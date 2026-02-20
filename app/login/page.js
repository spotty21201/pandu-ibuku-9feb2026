"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-bg px-6">
      <div className="max-w-sm w-full bg-white border border-border-subtle p-8 md:p-12 shadow-sm">
        <header className="mb-10 text-center">
          <h1 className="font-serif text-2xl tracking-tight mb-2">Pandu Ibuku</h1>
          <p className="text-xs uppercase tracking-widest opacity-40">Admin Access</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            autoFocus
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-cream-bg/30 border-b border-border-subtle p-3 focus:outline-none focus:border-accent-red font-mono transition-colors"
          />

          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-cream-bg/30 border-b border-border-subtle p-3 focus:outline-none focus:border-accent-red font-mono transition-colors"
          />

          {error && <p className="text-[10px] text-accent-red uppercase tracking-widest font-bold mt-2">{error}</p>}

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-black text-white px-6 py-3 uppercase tracking-widest text-xs font-bold hover:bg-accent-red transition-colors disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Enter Repository'}
          </button>
        </form>
      </div>
    </div>
  );
}
