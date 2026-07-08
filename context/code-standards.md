# Code Standards

## TypeScript

- Keep `strict` TypeScript enabled.
- Define product entities in `src/domain/types.ts`.
- Use shared domain types in pages, services, repositories, and mock data.
- Avoid `any`.

## Next.js

- Use App Router route folders.
- Keep page components focused on composition and presentation.
- Use API route handlers for backend contracts.
- API handlers should call services instead of reading mock data directly.

## Components

- Keep reusable primitives in `src/components/ui`.
- Keep shell-level components in `src/components/shell`.
- Keep domain components grouped by product area when they become large enough.
- Prefer simple components over introducing a large UI framework.

## Styling

- Use Tailwind classes.
- Use existing color tokens from `tailwind.config.ts`.
- Keep cards at `rounded-md`.
- Use consistent spacing: 4, 5, 6, and 8.
- Avoid custom CSS unless it belongs globally.

## API Shape

- Return JSON objects with named top-level keys.
- Return 404 JSON for missing hand, run, customer, or approval resources.
- Keep mock API routes aligned with the documented production contract.

## Documentation

- Update `docs/system-design.md` when IA, APIs, entities, or architecture changes.
- Update `context/progress-tracker.md` after meaningful implementation changes.
