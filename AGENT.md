> **Agent rule:** Before creating a commit or pushing to the remote PR, ask the human for approval.

# Agent Guide — Spin Wheel v2

Quick reference for AI agents working on this codebase.

## Project

Next.js 14 full-stack app with TypeScript, Tailwind CSS, shadcn/ui, MongoDB (Mongoose), iron-session.

## Docs

- `docs/SPEC.md` — product spec, tech-agnostic.
- `docs/ARCHITECTURE.md` — stack decisions and implementation binding.
- `docs/styling.md` — v1 → v2 Tailwind / styling mapping.
- `AGENT.md` — this file.

## System commands

```bash
# Install dependencies
npm install

# Run dev server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint

# Type check
npm run typecheck

# E2E tests
npm run test:e2e

# E2E tests with UI
npm run test:e2e:ui
```

## Docker

```bash
# Dev: hot-reload with mounted source + MongoDB
docker compose -f docker-compose.dev.yml up

# Prod: multi-stage build with app + MongoDB
docker compose up --build

# Stop
docker compose down
```

## Environment

Copy `.env.example` to `.env.local` and fill:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/spin-wheel
IRON_SESSION_PASSWORD=replace_with_32_char_min_random_string
RESEND_API_KEY=re_xxxxxxxx
GOOGLE_CLIENT_ID=xxxxxxxx
GOOGLE_CLIENT_SECRET=xxxxxxxx
```

## Database

Requires MongoDB running locally or via connection string.

Local MongoDB:

```bash
mongod --dbpath /path/to/db
# or
docker run -d -p 27017:27017 --name spin-wheel-mongo mongo:latest
```

## File structure

```
app/           # Next.js App Router (pages, API routes, layouts)
components/    # React components (shadcn/ui + custom)
lib/           # Utilities, db connection, shared helpers
types/         # TypeScript type declarations (e.g., spin-wheel.d.ts)
public/        # Static assets
e2e/           # Playwright end-to-end tests
```

## Agent conventions

- Use **shadcn/ui** primitives for modals, buttons, forms, etc. Do not add DaisyUI.
- Style with **Tailwind** using v1 token mapping in `docs/styling.md`.
- Prefer `clsx` + `tailwind-merge` (via `lib/utils.ts`) for conditional classes.
- Keep `SPEC.md` tech-agnostic. Put implementation notes in `ARCHITECTURE.md` or `AGENT.md`.
- Run `npm run lint && npm run typecheck` before finishing.
- **Ask human before committing or pushing.**
