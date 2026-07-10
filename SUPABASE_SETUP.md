# Supabase setup for Santosh Panwar portfolio

This website is already wired to Supabase through Vercel API routes. To connect your own Supabase project, configure the same environment variable names used by the existing backend.

## 1. Create a Supabase project

Create a new Supabase project from your Supabase dashboard. After the project is ready, open **Project Settings → API** and copy:

- Project URL
- Project anon/public key
- Project service role key

Keep the service role key private. It must only be used by server-side API routes.

## 2. Add these environment variables

Add the following keys in your deployment provider or Design Arena Secrets tab:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

For local development, create a local `.env` file with the same keys. Do not commit real secret values to Git.

## 3. Create and seed the database tables

Open your Supabase SQL editor and run:

```text
supabase/schema-and-seed.sql
```

That file creates all tables required by the portfolio and inserts the initial portfolio content, timeline placeholders, testimonials, stats, and one demo contact message.

## 4. Deploy again

After the variables are saved and the SQL has run successfully, redeploy the project. The API routes will automatically use your Supabase project.

## 5. Verify the connection

After deployment, check the serverless health endpoint:

```text
/api/supabase-health
```

It returns whether the required environment variables are present and whether the `portfolio_profile` table can be queried. It never returns secret values.

## App tables

- `portfolio_profile`
- `portfolio_nav_items`
- `portfolio_section_copy`
- `portfolio_stats`
- `portfolio_experience_items`
- `portfolio_timeline_entries`
- `portfolio_reviews`
- `contact_messages`

## Notes

- The frontend does not talk directly to Supabase. It fetches from `/api/portfolio` and posts contact messages to `/api/contact`.
- `SUPABASE_SERVICE_ROLE_KEY` is used only by the serverless API routes.
- If you replace seeded placeholders with real Santosh Panwar details, update the database rows instead of hardcoding content in React.
