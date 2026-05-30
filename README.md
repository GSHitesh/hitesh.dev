# hitesh.dev

Personal portfolio + résumé sources for **Sai Hitesh Gorantla**.

Live site: **https://gshitesh.github.io/hitesh.dev/**

This repo doubles as a reusable template. The portfolio is a React + Vite + TypeScript SPA with a 3D satellite-constellation hero, a CI/CD ribbon, a live boot-terminal, and a dark/light theme toggle. The résumé sources (`main.tex`, `Hitesh_Resume_21_12_2024.tex`) compile cleanly on Overleaf or any TeX Live / MiKTeX install.

---

## Repo layout

```
.
├── portfolio/                 # React + Vite + TS portfolio (deployed)
│   ├── src/
│   │   ├── components/        # HeroScene, BootTerminal, Pipeline, ServerLEDs, …
│   │   ├── data/resume.ts     # SINGLE SOURCE OF TRUTH for all résumé content
│   │   └── styles/globals.css
│   └── vite.config.ts
├── main.tex                   # Enhanced LaTeX résumé (recommended)
├── Hitesh_Resume_21_12_2024.tex   # Faithful 1:1 of the original PDF
├── .github/workflows/
│   └── deploy-pages.yml       # Auto-builds & deploys to GitHub Pages on push
└── README.md
```

---

## Use it as a template

1. **Click "Use this template"** on GitHub, or fork the repo, or:
   ```bash
   git clone https://github.com/GSHitesh/hitesh.dev.git my-portfolio
   cd my-portfolio
   rm -rf .git && git init
   ```

2. **Edit your content in one place** — `portfolio/src/data/resume.ts`:
   - `profile` — name, role, tagline, email, socials, summary, `highlights` chips
   - `experiences[]` — companies, roles, periods, bullets, stack chips
   - `projects[]` — title, date, description, bullets, accent colour
   - `skillGroups[]` — grouped skill chips with Lucide icons
   - `education`, `certifications`

3. **Tune the visuals**:
   - `portfolio/src/components/HeroScene.tsx` — 3D scene (Three.js)
   - `portfolio/src/components/BootTerminal.tsx` — boot script lines
   - `portfolio/src/styles/globals.css` — colour tokens, theme overrides
   - `portfolio/tailwind.config.js` — Tailwind theme

4. **Run locally**:
   ```bash
   cd portfolio
   npm install
   npm run dev          # http://localhost:5173
   ```

5. **Deploy to GitHub Pages**:
   - Push to a repo named anything (the workflow auto-detects the repo name and sets `VITE_BASE` accordingly).
   - In your repo: **Settings → Pages → Source: GitHub Actions**.
   - The workflow at `.github/workflows/deploy-pages.yml` builds `portfolio/` and publishes the `dist/`.

6. **Custom domain (optional)**:
   - Add a `CNAME` file inside `portfolio/public/` with your domain.
   - Point your DNS at GitHub Pages and toggle "Enforce HTTPS".

---

## LaTeX résumé

Two `.tex` files live at the repo root:

| File | Purpose |
|---|---|
| `main.tex` | Enhanced version aligned with the portfolio's expanded skill list |
| `Hitesh_Resume_21_12_2024.tex` | Faithful 1:1 transcription of the original PDF |

Build with:
```bash
pdflatex main.tex
```

Or paste into [Overleaf](https://overleaf.com) and compile in the browser. The template is based on Anubhav Singh's [resume-cv template](https://github.com/xprilion) (MIT).

---

## Tech stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Three.js (`@react-three/fiber`, `@react-three/drei`), Lucide icons
- **CI/CD**: GitHub Actions → GitHub Pages
- **Résumé**: LaTeX (xprilion template, MIT)

---

## License

Code: MIT (do whatever you want — attribution appreciated).
Personal content (name, photos, résumé bullets): not licensed for reuse — replace with your own.
