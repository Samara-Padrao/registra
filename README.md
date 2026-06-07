# REGISTRA React + TypeScript + Vite

Small demo app showing local persistence, CEP lookup and a CRUD interface.

Quick start

Install:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

What changed in this branch

- Extracted shared utilities into `src/utils`.
- Centralized types under `src/types`.
- Replaced inline emoji UI with `react-icons`.
- Added a reusable `PersonForm` and `Modal` components.
- Fixed form input handlers so typing works correctly.
- Added fade/pop-in animation for modals (see `src/index.css`).
- Fixed a navigation route mismatch for the CEP page (`/api`).

Notes

- Modal transitions: CSS keyframes added to `src/index.css` (.animate-fadeIn and .animate-popIn).
- Shared data is persisted in `localStorage` under the `pessoas` key.

If you need a developer checklist or CI scripts, tell me which format you'd like (GitHub Actions, GitLab CI, etc.).
