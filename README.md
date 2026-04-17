# Gurnaj Singh — Portfolio

A modern, production-ready developer portfolio built with vanilla HTML, CSS,
and JavaScript (ES modules). No build step, no framework — just static files
that deploy to GitHub Pages as-is.

**Live:** https://gurnaj1singh.github.io/Portfolio/

## Features

- Live GitHub API integration — fetches & renders all public repos with
  language filters, sorting (stars / recent / forks / name), loading
  skeletons, and error states.
- Dark / light theme with pre-paint FOUC avoidance and `prefers-color-scheme`
  detection.
- Mobile-first responsive layout (single breakpoint at 920px for layout,
  560px for compact adjustments).
- Scroll-reveal animations, typing hero intro, animated proficiency bars,
  floating tech cards, and a repo detail modal.
- Fully semantic HTML, skip-link, keyboard-navigable chips/cards, `aria-*`
  on all interactive elements, reduced-motion respected.
- Session-storage cache (30 min) for the GitHub API to stay under the
  unauthenticated rate limit.

## Run locally

Because `index.html` uses ES modules, serve it over HTTP (not `file://`):

```bash
# Python
python -m http.server 5173

# …or Node
npx serve .
```

Then open <http://localhost:5173/>.

## Project structure

```
Portfolio/
├── index.html                 # Semantic sections: hero, about, skills, xp, projects, contact
├── css/
│   └── styles.css             # Design tokens, reset, layout, components, sections, responsive
├── js/
│   ├── main.js                # App bootstrap, UI rendering, theme, nav, reveal, form, modal
│   ├── data.js                # Personal data (single source of truth — edit here)
│   └── github.js              # GitHub API fetch + sort/filter utilities with cache
├── assets/
│   ├── files/resume.pdf
│   └── images/                # Logos & static images
├── manifest.json              # PWA manifest
├── .nojekyll                  # Tell GitHub Pages not to run Jekyll
└── favicons, robots.txt, …
```

## Editing content

All personal data lives in `js/data.js` — update your name, bio, socials,
skills, education, experience, and highlights there. The GitHub section
auto-updates from your public repos; the username is `profile.handle`.

## Deploying on GitHub Pages

This repo is structured for Pages' **"Deploy from a branch"** flow with the
site root = the repo root:

1. Push to `master` (or `main`).
2. GitHub → Settings → Pages → Source: *Deploy from a branch* → Branch:
   `master` / `/ (root)`.
3. Done — the site will be live at
   `https://<username>.github.io/<repo-name>/`.

Asset paths in `index.html` are relative, so the site works at any base
path (`/`, `/Portfolio/`, or a custom domain) without changes.

## Credits

Personal info and section ideas were preserved from the original
DeveloperFolio template by Saad Pasta — everything else (UI, code,
interactions) is a ground-up rewrite in vanilla web tech.
