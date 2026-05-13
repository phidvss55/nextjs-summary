# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 16 App Router project. Application routes live in `src/app`, with route groups such as `src/app/(auth)/sign-in`. Shared UI primitives are in `src/components/ui`, feature components are in `src/components/authentication`, hooks are in `src/hooks`, and shared helpers such as auth, database access, and class merging are in `src/lib`. Static assets live in `public`. Prisma schema and migrations are in `prisma`; generated Prisma client files are emitted to `src/generated/prisma` and should not be edited by hand.

## Build, Test, and Development Commands

Use pnpm for local work because the repository includes `pnpm-lock.yaml`.

- `pnpm dev`: start the local Next.js development server.
- `pnpm build`: create a production build and run framework checks.
- `pnpm start`: serve the production build after `pnpm build`.
- `pnpm lint`: run ESLint with Next core web vitals and TypeScript rules.
- `pnpm dlx create-db`: create a development database, as noted in `README.md`.
- `pnpm dlx auth@latest generate`: regenerate Better Auth/Prisma artifacts when auth schema changes.

## Coding Style & Naming Conventions

Write TypeScript and TSX with strict mode in mind. Prefer the `@/*` path alias for imports from `src`, for example `@/lib/utils` and `@/components/ui/button`. Format with Prettier settings from `.prettierrc`: single quotes, semicolons, and `printWidth: 140`. Components use PascalCase, hooks use `use-*` filenames and `useX` exports, and route files follow App Router conventions such as `page.tsx` and `layout.tsx`.

## Testing Guidelines

There is no committed test runner or test directory yet. For now, run `pnpm lint` and `pnpm build` before opening a PR. When adding tests, colocate them near the code or use a clearly named test directory, and use `*.test.ts` or `*.test.tsx` naming. Add Playwright or component tests for user-facing flows such as authentication pages.

## Commit & Pull Request Guidelines

Recent history mixes sentence-style commits and Conventional Commit prefixes, for example `Add new UI components and utility functions` and `feat(create-turbo): apply package-manager transform`. Prefer concise, imperative commit messages; use `feat(scope): ...` or `fix(scope): ...` when a clear scope exists. Pull requests should include a short summary, validation commands run, linked issues when applicable, and screenshots for UI changes. Note Prisma migrations or environment variable changes explicitly.

## Agent-Specific Instructions

This repository uses a newer Next.js version with breaking changes. Before changing Next.js APIs, routing, rendering, navigation, or configuration, read the relevant local guide in `node_modules/next/dist/docs/` and heed deprecation notices.
