# Copilot Instructions

## Commands

```bash
pnpm dev          # start dev server
pnpm build        # production build + framework checks
pnpm lint         # ESLint (Next core web vitals + TypeScript rules)
pnpm start        # serve production build

# Database
pnpm dlx create-db              # create a new hosted Postgres database
npx prisma migrate dev          # create + apply migration from schema changes
pnpm dlx auth@latest generate   # regenerate Better Auth / Prisma artifacts after auth schema changes
```

No test runner is configured. Validate changes with `pnpm lint && pnpm build`.

## Architecture

**Next.js 16 App Router** with two route groups:
- `src/app/(auth)/` — unauthenticated pages (sign-in, sign-up, two-factor). Layout centers content vertically.
- `src/app/(dashboard)/` — protected pages (update-profile, user-management). Layout adds a top nav with sign-out.

**Authentication** is handled entirely by [Better Auth](https://better-auth.com):
- Server config: `src/lib/auth.ts` — registers email/password, Google, GitHub, 2FA (OTP via email), and admin plugin.
- Client config: `src/lib/auth-client.ts` — `authClient` with `twoFactorClient` and `adminClient` plugins.
- Guard helpers in `src/lib/auth-utils.ts`: `authIsRequired()` redirects to `/sign-in`, `authIsNotRequired()` redirects away if already signed in. Call these in Server Components or route layouts.

**Database** uses Prisma 7 with the `@prisma/adapter-pg` driver adapter (direct `pg` connection, not via Data Proxy). The singleton client lives in `src/lib/db.ts`. Generated client outputs to `src/generated/prisma` — never edit those files manually.

**RBAC** is defined in `src/lib/permissions.ts` using Better Auth's access control. Three roles: `user` (no permissions), `admin` (list/set-password/update users), `superadmin` (all admin statements). The `roles` and `ac` objects must be passed to both the server `auth` config and the client `adminClient` plugin.

**Email** is sent through Resend. Email templates live in `src/components/emails/` (React Email components) and sending helpers in `src/lib/emails/`.

**File uploads** use UploadThing — router in `src/app/api/uploadthing/route.ts`, client helpers in `src/lib/uploadthing.ts`.

**Client state** uses Zustand. Stores live in `src/hooks/` as `use-*.ts` files and export a `useX` hook created with `create<State>(...)`.

## Key Conventions

- **Path alias**: always use `@/` for imports from `src/` (e.g., `@/lib/auth`, `@/components/ui/button`).
- **Prettier**: single quotes, semicolons, `printWidth: 140`.
- **UI primitives**: shadcn/ui components in `src/components/ui/`. Feature-level components (forms, flows) in `src/components/authentication/` or named subdirectories.
- **API routes**: only two exist — `src/app/api/auth/[...all]/route.ts` (Better Auth catch-all) and `src/app/api/uploadthing/route.ts`. Do not add middleware logic here; use `auth-utils.ts` helpers in layouts/pages instead.
- **Before changing Next.js APIs** (routing, rendering, navigation, config), check `node_modules/next/dist/docs/` for v16-specific guidance and deprecation notices.
- **After any Prisma schema change**, run `npx prisma migrate dev` and then `pnpm dlx auth@latest generate` to keep the generated client and Better Auth artifacts in sync.
- **Environment variables**: see `.env.example`. Required: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID/SECRET`, `GITHUB_CLIENT_ID/SECRET`, `RESEND_API_KEY`. Note `UPLOADTHING_TOKEN` if using file uploads.
