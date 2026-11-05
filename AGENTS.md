# Agent instructions

## Project

Tailwind CSSTree is a JavaScript library that extends CSSTree syntax parsing for Tailwind CSS v3 and v4. The package exports `tailwind3` and `tailwind4`.

## Repository layout

- `src/index.js` exposes the public API; `src/tailwind3.js` and `src/tailwind4.js` assemble the version-specific syntax.
- `src/atrule/`, `src/node/`, `src/scope/`, and `src/types/` contain syntax definitions and parsing helpers.
- `tests/` contains Mocha tests, shared helpers, and Tailwind CSS fixtures.
- `.github/workflows/` contains the Node.js, Bun, and release workflows.

## Setup and validation

- Use Node.js 18.18 or newer.
- Install dependencies with `npm install`.
- Run `npm run build` to compile and type-check the source into `dist/`.
- Run `npm run test:unit` for the Mocha tests. `npm test` builds first, then runs the unit tests and Are The Types Wrong checks.
- Run `npm run lint` to lint `src/` and `tests/`.
- Run `npm run fmt` to format the repository with Prettier; review its changes before including them.
- `npm run test:jsr` requires access to the Deno registry and may fail in network-restricted environments.

## Development practices

- Keep Tailwind v3 and v4 syntax changes in the corresponding syntax assembly and test files; use shared definitions where the behavior is common to both versions.
- Add or update tests and fixtures for parsing behavior changes. Preserve existing behavior for both syntax versions unless a change intentionally alters it.
- Follow the existing JavaScript module style, syntax-definition patterns, and formatting.
- Keep changes focused, and do not edit generated output or unrelated files unless the task calls for it.

## Commit messages and pull request titles

Both commit messages and pull request titles **must use Conventional Commits format**:

```text
type(scope): description
```

Choose an appropriate type such as `feat`, `fix`, `docs`, `test`, `refactor`, or `chore`. The scope is optional; when useful, use a repo-appropriate scope such as `tailwind3`, `tailwind4`, `tests`, or `docs`. Use an imperative, concise description. Examples:

- `docs: add agent instructions`
- `fix(tailwind4): parse nested theme declarations`
