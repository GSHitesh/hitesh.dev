# Hitesh · Portfolio

A production-ready, animated portfolio built with **React 18 + Vite + TypeScript + Tailwind + Framer Motion + React Three Fiber**.

## Quick start

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## What's inside

- 3D hero scene (R3F + drei) with morphing orb, orbit rings, particles & stars
- Custom magnetic cursor and scroll progress bar
- Active-section nav pill with smooth layout animations
- Bento + glassmorphism cards, gradient mesh backgrounds, marquee skill rail
- Animated timeline for experience, count-up stats, on-scroll reveals
- Fully responsive, dark-first, reduced-motion friendly, semantic HTML

## Edit your content

All copy lives in [src/data/resume.ts](src/data/resume.ts).
Drop your `Hitesh_Resume.pdf` into `public/` so the "Download résumé" button works.

## Deploy to GitHub Pages

A workflow is included at [.github/workflows/deploy-pages.yml](../.github/workflows/deploy-pages.yml). To enable it:

1. Push the repository to GitHub.
2. In **Settings → Pages**, set **Source = GitHub Actions**.
3. Push to `main` — the action builds `portfolio/` and publishes `dist/`.

The site will be available at `https://<user>.github.io/<repo>/`.

### Repo name vs. base path
Vite needs to know the public base path. The workflow handles this automatically by reading the repo name, but you can override it:

- **Project site** (default): base is `/<repo>/` — works out of the box.
- **User site** (`<user>.github.io`) or **custom domain**: add a repository variable `PAGES_BASE` with value `/`.

For local production builds with a custom base, run:

```bash
VITE_BASE=/Hitesh-Portfolio/ npm run build
```

## Stack

React · Vite · TypeScript · Tailwind CSS · Framer Motion · @react-three/fiber · @react-three/drei · lucide-react
