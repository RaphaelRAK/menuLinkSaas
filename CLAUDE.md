# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

Use `pnpm` as the package manager.

```bash
pnpm dev        # Start dev server
pnpm build      # Production build
pnpm start      # Run production server
pnpm lint       # Run ESLint
```

No test runner is configured.

## Architecture

**MenuLink back-office professional UI** — a Next.js 16 App Router application providing a back-office interface.

- **Routing**: `app/` directory with App Router. All pages live under `app/`.
- **Components**: Reusable UI components in `components/ui/` built with [shadcn/ui](https://ui.shadcn.com) (Radix UI primitives + CVA for variants). Add new shadcn components via `pnpm dlx shadcn@latest add <component>`.
- **Styling**: Tailwind CSS v4 — uses the new `@import "tailwindcss"` syntax in `app/globals.css` (not `@tailwind base/components/utilities`). Theme tokens are CSS variables in `globals.css`.
- **Utilities**: `lib/utils.ts` exports `cn()` (clsx + tailwind-merge) for conditional class composition.
- **Path alias**: `@/` resolves to the project root.
- **Icons**: `lucide-react`.

### Component pattern

UI components use CVA (class-variance-authority) for variant management and the `asChild` / Radix Slot pattern for polymorphic rendering. Follow `components/ui/button.tsx` as the reference implementation.
