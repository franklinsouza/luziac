# AGENTS.md

Marketing site for Luziac (Brazilian real-estate marketing agency). Next.js 14 App Router + TypeScript + React 18. All user-facing copy is Portuguese (pt-br); keep it that way.

## Commands
- `npm run dev` — dev server on http://localhost:3000
- `npm run build` / `npm run start`
- `npm run lint` — `next lint` (eslint-config-next, core-web-vitals)
- Typecheck: `npx tsc --noEmit` (no `typecheck` script exists)
- No test runner is configured; do not assume one.

## API routes live in `app/pages/api/`
Despite the name, these are **App Router route handlers**, not Next's `pages/` router. `app/api/` and root `pages/` do not exist.
- `app/pages/api/email/route.ts` — POST sends SMTP mail (nodemailer/Hostinger) *and* posts form data to a webhook. Clients call it as `/pages/api/email`.
- `app/pages/api/blog/route.ts` — GET returns the blog list, hardcoded in the file.
- Add new endpoints as `app/pages/api/<name>/route.ts`.

## Env vars (`.env` is gitignored; no `.env.example`)
- `USR`, `PASS` — SMTP credentials for the email route.
- `BOTCONVERSA` — webhook URL (posted on every contact submission).
Missing values fail only at runtime in the email route.

## Blog gotchas
- Blog content is **hardcoded** in `app/pages/api/blog/route.ts`, and blog pages fetch it from the absolute production URL `https://www.luziac.com.br/pages/api/blog` — both client-side (`app/Blog/[slug]/page.tsx`) and at build time (`app/Blog/[slug]/layout.tsx` `generateStaticParams`/`generateMetadata`). Local edits to that array are not enough; local dev also reads production.
- Article slugs are full sentences and are URL-encoded; matching is exact against the `slug` field.

## Structure & conventions
- Components + colocated CSS Modules live in `app/common/` (e.g. `navbar.tsx` + `navbar.module.css`). Page-local styles sit next to their page.
- Path alias `@/*` maps to the repo root (per `tsconfig.json`).
- Global font is Epilogue via `next/font/google`; global metadata and Google Tag Manager scripts are in `app/layout.tsx` (GTM IDs are hardcoded there).
- `sitemap()` in `app/layout.tsx` is not a real Next sitemap (that would require `app/sitemap.ts`); it is not wired into routing.
