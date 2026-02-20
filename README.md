# Pandu Ibuku Website

## Supabase Setup

1. Install dependency:

```bash
npm install @supabase/supabase-js
```

2. In Supabase, create project `pandu-ibuku`.

3. Run SQL in `supabase/schema.sql`.

4. Set env vars locally and in Vercel:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

5. Create admin user in Supabase Auth:
- Enable Email provider.
- Disable public signups.
- Create user manually from dashboard.

6. Optional migration from local markdown to Supabase:

```bash
node scripts/migrate-content-to-supabase.mjs
```

## Notes

- Admin routes now use Supabase (`articles` table).
- Public pages now read published articles from Supabase.
- `domain` is required to keep current URL structure (`/{domain}/{slug}`).
