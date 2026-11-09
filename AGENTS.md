<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BazarDor agent notes

Bengali market-price app: Next.js 16 App Router, React 19, HeroUI v3, Tailwind v4. Product data comes from a public third-party API; MongoDB is used only by Better Auth.

## Commands

- `npm run dev` — dev server. Requires the `.env` described below.
- `npm run lint` — ESLint 9 flat config; script is a bare `eslint` so it lints the whole repo. For one file: `npx eslint src/components/Foo.jsx`.
- `npm run build` — production build; the only compile/validation step (plain JavaScript, no TypeScript, no tests, no formatter).

Known lint baseline: `npm run lint` currently fails with two pre-existing errors (`react/no-unescaped-entities` in `src/app/not-found.jsx`, `react-hooks/set-state-in-effect` in `src/components/Banner.jsx`). Do not assume a lint failure was caused by your change, and do not "fix" unrelated files unless asked. `npm run build` passes.

## Setup / environment

`.env` is gitignored and required: `MONGODB_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, plus `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` and `GITHUB_CLIENT_ID`/`GITHUB_CLIENT_SECRET`. `src/lib/auth.js` builds the Mongo client at module load, so auth breaks without them. `BETTER_AUTH_URL` is a fallback: loopback hosts are accepted on any port, so email auth works when `next dev` picks 3002+ because 3000 is busy. OAuth redirect URIs must still be registered for the exact dev port in use (e.g. `http://localhost:3002/api/auth/callback/google`).

No local product data or fixtures: pages/`build` call `https://openapi.programming-hero.com/api/bazardor/*` at runtime, so network access is required and a failing API surfaces as page errors.

## Architecture

- `src/app` — App Router. Root `layout.jsx` mounts `Navbar` (server, calls `connection()`), `Marquee`, and `Footer` on every page. Auth pages live in the `(auth)` route group → `/sign-in`, `/sign-up`. Dynamic routes: `src/app/category/[categoryId]/page.jsx`, `src/app/product/[productId]/page.jsx`.
- `src/components` — data fetching happens directly inside server components (no shared data layer). Only `UserInfo` and the auth forms are `"use client"`.
- `src/lib/auth.js` / `auth-client.js` — Better Auth server/client split. `authClient` is created without a `baseURL`, so browser calls stay same-origin regardless of the dev port; do not reintroduce `process.env.BETTER_AUTH_URL` there (it is `undefined` in client bundles).
- Better Auth handler is mounted at `/api/auth/[...all]` via `toNextJsHandler`. `src/lib/db.js` is an unused lazy Mongo connection; product code does not touch MongoDB.
- `@/*` maps to `src/*` (`jsconfig.json`). Not TypeScript: use `.jsx`/`.js`.

## Data source quirks

- List endpoints (`/products`, `/categories`) return a **bare array** — code calls `.map`/`.filter` on the JSON directly. `/products/:id` returns a single object. Do not assume `{ data: [...] }`; the comment in `PriceIncreasedProducts.jsx` claiming otherwise is stale.
- The products list is fetched independently in `NavLinks`, `Marquee`, `AllProducts`, `PriceIncreasedProducts`, `PriceDecreasedProducts`, and `category/[categoryId]`; editing price logic may require changes in several places.
- Product "images" are emoji strings rendered as text (`{product.image}`), not `next/image` sources.
- UI copy, prices, and dates are Bengali (`bn-BD`, `Noto_Serif_Bengali`). Keep new user-facing text in Bengali and use the existing `টাকা`/unit wording.

## Next.js 16 specifics

- `next.config.mjs` enables `cacheComponents`, `partialPrefetching`, `reactCompiler`, `experimental.agentFeedback`, and a Turbopack Tailwind CSS rule. Read `node_modules/next/dist/docs/` before touching caching, routing, or data APIs.
- Under Cache Components `fetch` is uncached by default and blocks rendering; keep uncached work behind `<Suspense>` if you want it out of the static shell.
- `src/app/layout.jsx` sets `export const instant = false`, opting the whole app out of instant-navigation validation. The root layout reads request-time data (`connection()` in `Navbar`, client session UI), so removing the flag exposes blocking-prerender errors unless those reads are restructured first.
- `next dev` rewrites the managed block at the top of this file (and adds an agent-feedback block while `experimental.agentFeedback` is on). Leave the managed block in place and commit `AGENTS.md` with your changes.
