## Blog + Admin (GitHub JSON storage)

### Goals
- Public blog at `/blog` and `/blog/[slug]`
- Admin panel at `/admin` to create/edit posts
- Capture contact form submissions and review them in `/admin`
- No Supabase: persist data in JSON files stored in the repo via GitHub API

### Storage
Data is stored in these repo paths:
- `data/blog/posts.json`
- `data/contact/submissions.json`

The app reads and writes these files through the GitHub Contents API when GitHub env vars are configured.
When GitHub env vars are not configured (local dev), it reads/writes the local files on disk.

### Admin auth
Admin is protected by an HTTP-only cookie session.
Login requires the `ADMIN_KEY` value.

### Environment variables
Set these in Vercel (Project → Settings → Environment Variables):
- `ADMIN_KEY`
- `GITHUB_TOKEN` (needs `repo` scope for private repos, or `public_repo` for public repos)
- `GITHUB_OWNER`
- `GITHUB_REPO`
- `GITHUB_BRANCH` (optional, default `main`)

### Notes
- Using GitHub as a database works well for low traffic + internal admin workflows.
- For high traffic or frequent writes, a real database (Supabase / Postgres / Vercel Postgres) is recommended.

