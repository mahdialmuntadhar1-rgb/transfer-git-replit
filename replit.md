# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── iraq-compass/       # Iraq Compass — Iraqi business directory (React + Vite)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
├── pnpm-workspace.yaml     # pnpm workspace
├── tsconfig.base.json      # Shared TS options
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## Iraq Compass (`artifacts/iraq-compass`)

Full Iraqi business directory app connecting to Supabase with 6,955+ real businesses.

### Features
- 3-language support: English, Arabic (RTL), Kurdish Sorani (RTL)
- City filter across all 20 Iraqi governorates
- Category grid (9 categories) with live counts from Supabase
- Business grid with 12-per-page pagination via Supabase `.range()`
- Search bar with voice input support
- Business listing form (submits to Supabase)
- Dark navy design with purple/pink gradient accents

### Key Files
- `src/lib/supabase.ts` — Supabase client (uses env vars)
- `src/lib/translations.ts` — EN/AR/KU translations
- `src/hooks/useBusinesses.ts` — Data fetching with filters + pagination
- `src/types/index.ts` — Business type, Language type
- `src/components/` — Header, Hero, CityFilter, CategoryGrid, BusinessCard, BusinessGrid, BusinessForm
- `src/App.tsx` — Root component with state management

### Environment Variables (Secrets)
- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — Supabase anon/public key

### Supabase Table: `businesses`
Columns: `id, name, phone, category, governorate, created_at`
No `status` column — do not filter by status.

## TypeScript & Composite Projects

Every lib package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all lib packages as project references.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references
