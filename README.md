# hitesh.dev

Personal portfolio site for **Sai Hitesh Gorantla** — live at **https://gshitesh.github.io/hitesh.dev/**.

A single-page React + Vite + TypeScript portfolio with a 3D satellite-constellation hero, an animated CI/CD ribbon, a live boot-terminal section, and a dark/light theme toggle. Tailwind for styling, Framer Motion for transitions, Three.js for the scene.

## Highlights

- 3D hero scene (Three.js / `@react-three/fiber`) with a wireframe Earth, orbital satellites, and animated downlink beams
- Boot-terminal hero that types out a "system bring-up" log
- CI/CD pipeline ribbon and server-LED status panels
- Single source of truth for all content in `portfolio/src/data/resume.ts` — edit one file to update everything
- Light + dark theme with high-contrast tokens
- Responsive, keyboard-accessible, no analytics

## Use it as a template

```bash
git clone <this-repo> my-portfolio
cd my-portfolio/portfolio
npm install
npm run dev
```

Then open `src/data/resume.ts` and replace the profile, experiences, projects, and skill groups with your own. Tweak `src/components/HeroScene.tsx` and `src/styles/globals.css` for visual changes.

## Build

```bash
cd portfolio
npm run build      # outputs dist/
npm run preview    # local preview of the production build
```

## License

MIT for the code. Personal content (name, résumé bullets, photos) is not licensed for reuse — swap it for your own.
