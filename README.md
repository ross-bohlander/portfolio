# Portfolio

Personal portfolio site — Angular, standalone components, no SSR (static SPA).

## Structure

```
src/app/
  layout/       header, footer — always-visible chrome
  pages/        one folder per route (home, projects, about, contact, not-found)
  shared/
    models/     TypeScript interfaces (e.g. Project)
    data/       static data feeding the pages (e.g. projects.data.ts)
```

Routes are lazy-loaded via `loadComponent` in `app.routes.ts`.

## Development

```bash
npm install
ng serve       # http://localhost:4200
ng build       # production build -> dist/
ng test        # unit tests (Vitest)
ng lint        # ESLint
```

## Status

Skeleton only — routing, folder structure, and data models are wired up; page content, the
projects tab UI, and visual design are still TODO.
