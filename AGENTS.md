# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router entry point. Keep route segments, layouts, and co-located components inside the relevant folder (e.g., `app/vr-buenos-aires`).
- `app/components/` & `app/lib/`: Shared UI pieces and utilities. Reuse from here instead of duplicating logic in route folders.
- `app/data/`: Static content and configuration blobs; prefer JSON/TS modules for easy imports.
- `public/`: Static assets referenced with `/asset.ext` paths in JSX.
- Root configs (`next.config.mjs`, `tailwind.config.ts`, `tsconfig.json`) control build, styling, and TypeScript behavior—coordinate changes through review.

## Build, Test, and Development Commands
- `npm run dev`: Launch the dev server with React Fast Refresh at `http://localhost:3000`.
- `npm run build`: Produce an optimized production bundle. Run before publishing or cutting releases.
- `npm run start`: Serve the production bundle locally to validate real-world behavior.
- `npm run lint`: Execute ESLint with the Next.js config; resolve all warnings before opening a PR.

## Coding Style & Naming Conventions
- You are a full-stack developer with 10 years of experience, specializing in Next.js and React. You have deep knowledge of modern JavaScript frameworks, and you follow best practices for performance optimization and code organization.
- TypeScript-first codebase; prefer functional React components and hooks.
- Use PascalCase for components (`HeroSection.tsx`) and camelCase for helpers (`formatPrice.ts`).
- Prefer Material UI primitives and follow Material Design spacing, typography, and color guidance where practical.
- Source icons from `public/assets/icons` to keep branding consistent; avoid external icon packs unless pre-approved.
- Name function arguments descriptively (e.g., `offer`, `planOption`); avoid single-letter identifiers.
- Keep one React component per file; extract helper components into their own module when they need reuse.
- Keep files under 300 lines when possible; extract primitives into `app/lib` or `app/components` to stay modular.
- Every component should have a clear, descriptive name that reflects its purpose.
- Use meaningful prop names that describe the data they accept (e.g., `offerId`, `planOptionId`).
- Avoid inline styles and use CSS classes or styled components for styling.
- Every new component should be added to specific folders based on client-side or server-side usage.
- Every type should be in allTypes.ts file.
- Treat modals, overlays, and other large UI primitives as abstract shells that accept arbitrary content so they can be reused across features.
- Render SEO-critical elements (such as heading tags and structured data wrappers) on the server so crawlers see optimized markup without relying on client hydration.
- Follow ESLint formatting (2-space indent, trailing commas, single quotes). Use your editor's ESLint integration or run `npm run lint -- --fix`.

## Testing Guidelines
- Adopt Jest for logic and React Testing Library or Playwright for UI flows. Place specs beside sources as `*.test.ts` / `*.test.tsx`.
- Name tests after observable behavior (e.g., `renders CTA button`).
- Add an `npm test` script when the first suite lands; document any additional tooling in this file.
- Gate merges on the full suite plus lint; note coverage deltas in PRs touching critical paths.

## Security & Configuration Tips
- Store secrets in `.env.local` (gitignored) or managed hosting env vars—never commit credentials.
- Review `app/api/` handlers and `next.config.mjs` for data exposure when adding endpoints or rewrites.
- Update this guide when tooling, build pipelines, or security posture changes.

## Version Control
- When you create new files, stage them alongside related changes so every commit stays self-contained and easy to review.
- When you document a new rule in this guide, audit the repository immediately and bring existing files into compliance before moving on.
