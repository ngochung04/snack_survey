# Snack Survey

Web voting app for team snack / topic polls. Built with Vue 3, Vite, Tailwind CSS v4, Pinia, Vue Router, and Firebase (Auth + Firestore + Storage via VueFire).

## Features

- **Auth** — email/password sign-in and register (Firebase Auth + `accounts` collection)
- **Home** — browse open/closed topics by team (`FE` / `BE` / `ALL`), search, see top options
- **Vote** — open a topic (`#/vote-topic/:id`), single or multiple vote modes, optional link/title fields
- **Admin** — manage topics and options (path from `VUE_APP_ADMIN_PATH`)
- **Option library** — reuse options across topics (paginated Firestore collection)
- **Theme switcher** — three design languages, persisted in `localStorage`

## Themes

Theme id is applied on `<html data-theme="...">`. Default: `stall`.

| Id | Label | Style |
| --- | --- | --- |
| `classic` | Classic | Neo-brutal — thick stroke, hard offset shadow |
| `snack` | Snack Soft | Soft food / Fresh Appetite — large radius, soft depth |
| `stall` | Stall Label | Kraft packaging label — grain, stamp type |

Key files:

- `src/core/theme/themes.ts` — registry + storage key
- `src/core/theme/applyTheme.ts` — apply / persist / boot
- `src/core/hooks/useTheme.ts` — Vue hook
- `src/components/ui/ThemeSwitcher.vue` — floating control (bottom-right)
- `src/index.css` — CSS variables + `@utility theme-*` helpers
- `index.html` — inline script to set theme before paint (avoids flash)

## Stack

| Layer | Choice |
| --- | --- |
| UI | Vue 3 + TypeScript |
| Build | Vite 5 (`base: /snack_survey/`) |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| State | Pinia |
| Routing | Vue Router (hash history) |
| Backend | Firebase Auth, Firestore, Storage |
| Icons / fonts | MDI, Google Fonts (per theme) |

Node `>=22`, npm `>=8` (see `.nvmrc`).

## Setup

```sh
cp .env.example .env
# fill Firebase + admin path
npm install
npm run dev
```

Dev server runs with HTTPS (`@vitejs/plugin-basic-ssl`) and `host: true`.

### Environment

Copy from `.env.example`:

| Variable | Purpose |
| --- | --- |
| `VUE_APP_API_KEY` | Firebase API key |
| `VUE_APP_AUTH_DOMAIN` | Firebase auth domain |
| `VUE_APP_PROJECT_ID` | Firebase project id |
| `VUE_APP_STORAGE_BUCKET` | Firebase storage bucket |
| `VUE_APP_MESSAGING_SENDER_ID` | Firebase messaging sender |
| `VUE_APP_APP_ID` | Firebase app id |
| `VUE_APP_MEASURE_MEMBER_ID` | Analytics / measure id (optional) |
| `VUE_APP_ADMIN_PATH` | Admin route path segment |

Values are injected via `vite.config.mts` → `process.env.VUE_APP_*`.

## Scripts

```sh
npm run dev          # Vite dev server
npm run build        # type-check + production build
npm run preview      # preview production build
npm run type-check   # vue-tsc --noEmit
npm run lint         # ESLint
npm run format       # Prettier on src/
```

Production build base path: `/snack_survey/`. Deploy is wired to GitHub Pages (`.github/workflows/jekyll-gh-pages.yml`) on `main`.

## Project structure

```text
src/
  components/ui/     # Shared UI (UiButton, UiCard, ThemeSwitcher, …)
  core/
    theme/           # Theme registry + apply/persist
    hooks/           # useTheme, useCommon
    interfaces/      # Domain models (topic, option, user, …)
    constants/       # Enums, app constants
    utils/           # storage, date, validation helpers
  views/
    Home/            # Topic list + auth
    Topic/           # Vote page
    Admin/           # Topic/option management + option library
  services/          # Firebase / API services
  stores/            # Pinia stores
  plugins/firebase.ts
  index.css          # Design tokens + theme utilities
```

## Routes

| Path | View |
| --- | --- |
| `/` | Home (login + topic list) |
| `/{VUE_APP_ADMIN_PATH}` | Admin |
| `/vote-topic/:id` | Topic vote |

Hash mode: URLs look like `/snack_survey/#/…`.
