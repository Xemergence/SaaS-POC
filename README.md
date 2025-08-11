# SaaS POC — Standardized Architecture (Vercel-ready)

This rewrite keeps your original pages, components, and styling, while standardizing the build for Vercel and Tempo.

## Key Tech
- Vite + React + TypeScript
- TailwindCSS + shadcn/ui primitives
- React Router 6
- Supabase helpers (optional via env)
- Tempo Devtools in **development only**

## Commands
- `npm run dev` — local dev
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the build locally

## Environment
Copy and fill `.env.example` to `.env`:
- `VITE_SUPABASE_URL=`
- `VITE_SUPABASE_ANON_KEY=`
- `VITE_TEMPO=false`

## Vercel
We ship `vercel.json` with:
- `"installCommand": "npm install"` (works even if no lockfile is present)
- `"buildCommand": "npm run build"`
- `"outputDirectory": "dist"`
- SPA rewrite so deep links do not 404.

If you prefer `npm ci`, generate and commit a fresh `package-lock.json` locally once: `rm -rf node_modules package-lock.json && npm install` then commit the lockfile.

## Tempo (beta)
- Local: set `VITE_TEMPO=true` to enable devtools and dynamic routes in development.
