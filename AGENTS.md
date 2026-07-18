# AGENTS.md

## Project overview

- This is a React + TypeScript app for managing candidate records in a small HR workflow.
- The UI is client-side only; candidate data is kept in memory and resets on reload.
- The main app shell and route structure live under src/routes, while reusable UI and form helpers live under src/components.

## Working conventions

- Prefer functional components and hooks.
- Use the path alias @/ for imports (for example, @/models or @/schemas).
- Keep stateful logic centralized in the Zustand store under src/store/candidates.ts rather than introducing ad hoc local state for shared candidate data.
- Follow the existing form pattern: schema validation with Zod, TanStack Form helpers, and localized labels via react-i18next.
- New user-facing text should be added to the locale files in public/locales and consumed through the translation helper.

## Common commands

- Install dependencies: pnpm install
- Run unit tests: pnpm run test:unit
- Run lint: pnpm run lint
- Run typecheck: pnpm run typecheck
- Build the app: pnpm run build

## Testing expectations

- Unit tests use Vitest with Testing Library.
- Shared test setup is defined in src/test/setup.ts.
- Add or update tests alongside the component or feature being changed when behavior is affected.

## Project-specific notes

- The create/edit flows are modal-style routes handled by React Router.
- Candidate filtering and favorites are driven by the store and should be updated through the existing store actions.
- If you need context for the app’s intent or deployment setup, start with README.md.
