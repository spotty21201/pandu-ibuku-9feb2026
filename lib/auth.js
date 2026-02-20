import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export async function requireAdminSession() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('sb_access_token')?.value;

  if (!accessToken) return { ok: false };

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) return { ok: false };

  const authClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await authClient.auth.getUser(accessToken);

  if (error || !data?.user) return { ok: false };
  return { ok: true, user: data.user };
}
