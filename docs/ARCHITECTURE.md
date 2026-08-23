# Spin Wheel — Architecture & Tech Stack

> **Status:** Decided  
> **Bound to:** `SPEC.md` (which remains tech-stack-agnostic; this document is the
> implementation binding)

## 1. Decision summary

The application is implemented as a **single Next.js 14+ full-stack codebase** using
**TypeScript**, with **MongoDB** as the primary database. This replaces the
previous MERN split (Express backend + React frontend) with Next.js App Router
handling both the UI layer and the API layer.

## 2. Stack

| Layer | Technology | Role |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | Full-stack framework: React UI, API routes, SSR/SSG, sitemap/robots |
| Language | **TypeScript** | End-to-end type safety across client and server |
| Database | **MongoDB** | Document store for users, saved wheels, tokens, sessions |
| ODM | **Mongoose** | Schema modeling, validation, query building |
| Auth/session | **bcrypt** + **iron-session** | Password hashing + signed encrypted 30-day cookies (matches SPEC §3.4 Session) |
| OAuth | Custom Route Handler or **Auth.js (NextAuth v5)** | Google OAuth (AU-20); Facebook stub (AU-22) |
| Email | **Resend** (primary) / SMTP fallback | Verification, password reset, confirmation emails |
| Styling | **Tailwind CSS** | Utility-first CSS with built-in light/dark mode support |
| UI components | **shadcn/ui** (Radix + Tailwind) | Modals, sliders, toggles, toasts, forms |
| Wheel rendering | **spin-wheel** v5.x (vanilla-JS canvas library) wrapped in a React component | Animated wheel; supports manual stop, tick callback, and per-item styling. TypeScript types defined in-project (see §3.5). |
| Icons | **Lucide React** | Consistent iconography |
| State (client) | **React hooks / Zustand** | Live wheel snapshot, history, UI preferences |
| Deployment | **Vercel** (default) or self-hosted Docker | Serverless-first; Docker option for VPS parity |

## 3. Why this stack

### 3.1 Next.js as full-stack framework

- **SEO / content pages (CP-1, CP-2, CP-4):** App Router SSR and `generateMetadata`
  give each wheel type its own crawlable URL with SEO title and rich content. Static
  pages (About, Contact, Privacy, Terms) and `sitemap.xml` / `robots.txt` are simple
  to generate.
- **Sharing (F11):** A share link `<base-url><wheel-slug>?id=<wheel-id>` is handled
  by a server or client loader that fetches the wheel by id.
- **Single codebase:** Client types, server types, and domain types live in one repo,
  reducing the drift risk that the previous MERN split created.

### 3.2 TypeScript

- Enforces the contract between the spec's domain model and the code.
- `SpinConfig` field types are aligned with the `spin-wheel` API via a project-defined
  type declaration layer (see §3.5).

### 3.3 MongoDB + Mongoose

- The spec's domain model (User, SavedWheel, Token, Session, WheelTheme) maps
  naturally to documents.
- SavedWheel's discriminated-union `config` (§3.2.1) fits a Mongoose discriminator or
  a single schema with strict validation per `wheelType`.
- Keeps the project aligned with the existing MERN data shape, minimizing migration
  work for saved wheels and user accounts.

### 3.4 Auth: bcrypt + iron-session

- SPEC §3.4 defines a **server-side session identified by a signed cookie** lasting
  30 days. `iron-session` provides exactly that: encrypted, signed cookies with TTL,
  no JWT in localStorage.
- OAuth can be layered on top: either a custom Google OAuth route or Auth.js as a
  starting point that creates/updates the same `User` records and establishes the
  same `iron-session` session.

### 3.5 Wheel rendering: `spin-wheel` + in-project TypeScript declarations

We selected **`spin-wheel`** (v5.x) over `react-custom-roulette` because it supports
all v1 wheel behaviors required by the spec:

- `spinToItem()` with duration, revolutions, direction, and easing.
- `stop()` for the manual STOP feature (SB-3 / SE-5).
- `onCurrentIndexChange` for the per-segment tick sound (SE-4).
- `onRest` for resolving the winning item.
- Per-item `label`, `labelColor`, `backgroundColor`, and `value`.
- Repeating `itemBackgroundColors`, `borderWidth`, `borderColor`, `lineWidth`,
  `lineColor`, `rotation`, `radius`, label radius/font controls, and overlay images.

`spin-wheel` is vanilla JavaScript and ships without TypeScript declarations (v1
imported it with `@ts-ignore`). For v2 we define a **well-named project type layer**
instead of scattering `any` types or `// @ts-ignore` comments:

```ts
// types/spin-wheel.d.ts (or similar)
export interface SpinWheelItem {
  label: string;
  labelColor?: string;
  backgroundColor?: string;
  value?: unknown;
  weight?: number;
  image?: HTMLImageElement;
}

export interface SpinWheelProps {
  radius?: number;
  borderWidth?: number;
  borderColor?: string;
  lineWidth?: number;
  lineColor?: string;
  itemBackgroundColors?: string[];
  itemLabelColors?: string[];
  itemLabelFontSizeMax?: number;
  itemLabelRadius?: number;
  itemLabelRadiusMax?: number;
  itemLabelFont?: string;
  itemLabelAlign?: "left" | "center" | "right";
  itemLabelRotation?: number;
  itemLabelBaselineOffset?: number;
  itemLabelStrokeColor?: string;
  itemLabelStrokeWidth?: number;
  pointerAngle?: number;
  rotation?: number;
  overlayImage?: HTMLImageElement;
  isInteractive?: boolean;
  items: SpinWheelItem[];
  onSpin?: (event: SpinEvent) => void;
  onRest?: (event: RestEvent) => void;
  onCurrentIndexChange?: (event: CurrentIndexChangeEvent) => void;
}

export interface SpinWheelInstance {
  spinToItem: (
    itemIndex: number,
    duration?: number,
    spinToCenter?: boolean,
    numberOfRevolutions?: number,
    direction?: 1 | -1,
    easingFunction?: ((t: number) => number) | null
  ) => void;
  spin: (rotationSpeed?: number) => void;
  spinTo: (
    rotation?: number,
    duration?: number,
    easingFunction?: ((t: number) => number) | null
  ) => void;
  stop: () => void;
  raiseEvent_onRest: () => void;
  getCurrentIndex: () => number;
  remove: () => void;
}
```

The application's `SpinConfig` type then aliases the subset of these props that are
user-configurable, so persisted wheel settings map 1:1 to the library's API without
parallel or contradictory definitions (per SPEC §3.3).

### 3.6 Tailwind + shadcn/ui

- Light/dark site theme (F15) is implemented via Tailwind's `dark` class strategy.
- shadcn/ui components are copy-paste primitives, so styling can be tuned to the
  project's design tokens without fighting a heavy theme system.

## 4. Key architectural decisions

### 4.1 Serverless MongoDB connection handling

If deployed on Vercel (serverless functions), MongoDB connections must be reused
across invocations. The standard pattern is:

```ts
// lib/db.ts
import mongoose from "mongoose";

const cached = globalThis as { mongoose?: { conn: typeof mongoose; promise: Promise<typeof mongoose> } };

export async function connectDB() {
  if (cached.mongoose?.conn) return cached.mongoose.conn;
  if (!cached.mongoose) cached.mongoose = { conn: undefined, promise: undefined };
  if (!cached.mongoose.promise) {
    cached.mongoose.promise = mongoose.connect(process.env.MONGODB_URI!);
  }
  cached.mongoose.conn = await cached.mongoose.promise;
  return cached.mongoose.conn;
}
```

On a VPS/Docker deployment (`next start`), this caching is unnecessary but harmless.

### 4.2 Data model → Mongoose mapping

| SPEC entity | Collection / model | Notes |
|---|---|---|
| `User` | `users` | `oauthAccounts` embedded array; `username`/`email` indexed with lowercase normalization for case-insensitive uniqueness |
| `SavedWheel` | `savedwheels` | `ownerId` indexed; `id` is unguessable (UUID/nanoid); `config` validated per `wheelType`; `history` capped to last 100 |
| `SpinConfig` | Embedded in `SavedWheel` | Fields alias/extend the wheel library's TS types |
| `Session` | `iron-session` cookie | No DB collection; session payload encrypted in the cookie |
| `Token` | `tokens` | Hashed token value; `consumedAt` marks single-use; supersession by `(userId, purpose)` |
| `WheelTheme` | `wheelthemes` | Seeded read-only catalog; referenced by `SavedWheel.spinConfig.wheelThemeId` |

### 4.3 Session vs token distinction

- **Session cookie:** 30-day signed cookie holding `userId` and minimal profile info.
  Destroyed on logout (AU-12); restored silently on page load (AU-13).
- **Token collection:** Short-lived, single-use email tokens for verification and
  password reset only. Never used for login state.

### 4.4 Share links

- SavedWheel ids are generated as unguessable random strings (UUID v4 / nanoid).
- A share link is `<base-url><wheel-slug>?id=<saved-wheel-id>`.
- Possession of the id grants read access. Revocation is out of scope for v2; it is
  listed as open question #6 in SPEC Appendix C.

### 4.5 Client-side preferences

- **Site theme** (`light` | `dark`): stored in `localStorage`; independent of wheel
  config and never shared (WT-55).
- **Volume** (0–100): stored in `localStorage`.
- **Wheel snapshot:** the live editing state; serializes 1:1 to/from `SavedWheel`.

## 5. Deployment

### 5.1 Vercel (default)

- Git push triggers preview + production deploys.
- Environment variables: `MONGODB_URI`, `IRON_SESSION_PASSWORD`, `RESEND_API_KEY`,
  `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_APP_URL`, etc.
- MongoDB Atlas recommended; ensure IP allow-list or VPC peering if required.

### 5.2 Docker / VPS

- `Dockerfile` uses multi-stage build → `next start`.
- Compose file: Next.js app + MongoDB.
- Useful for local parity and for avoiding serverless connection concerns.

## 6. Migration notes from v1 MERN codebase

- Existing `User`, `SavedWheel`, and token documents can be migrated with a one-time
  script.
- Key renames required if reusing v1 data:
  - `User.isVerified` → `emailVerified`
  - `User.oauthProviderId` → `oauthAccounts`
  - `SavedWheel.customWheelName` → `name`
  - `SavedWheel.inputNumbers` → `config.repetitions` (yes/no wheels)
  - `SavedWheel.selectedOption` / `customLetterList` / `lowerNumber` etc. → flattened
    into `config`
  - `SavedWheel.selectedTheme` colors → `spinConfig.wheelThemeId`
  - Sequential integer ids → unguessable string ids (or keep old links with a
    migration/alias table)

## 7. Open decisions

1. **OAuth implementation:** custom Google OAuth route vs Auth.js v5 integration.
2. **Deployment target:** Vercel vs Docker/VPS.

---

*This document is the technical binding for `SPEC.md`. If the spec changes in a way*
*that invalidates a choice here, both documents must be updated together.*
