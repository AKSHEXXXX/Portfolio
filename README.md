# Akshat | Full Stack Developer Portfolio

A full stack developer portfolio built with React and Vite. The site is designed as a motion-heavy single-page experience with a custom loading screen, animated WebGL background, curated skills section, project showcase, and contact marquee.

## Stack

- React 19
- Vite 6
- Tailwind CSS v4
- Motion
- GSAP + ScrollTrigger
- Lenis
- WebGL
- Lottie

## Highlights

- Cinematic landing section with responsive hero typography
- Custom loading screen driven by a Lottie asset
- Animated WebGL background with a Safari fallback and mobile tuning
- Skill matrix with custom brand-style icons
- Project and contact sections with motion-based interactions
- Local time display with microseconds and a browser-persisted visitor counter

## Project Structure

```text
src/
  App.tsx                         Main page composition
  index.css                       Global styles and theme tokens
  components/
    LoadingScreen.tsx             Intro animation
    WebGLBackground.tsx           Shader-based background
    CustomCursor.tsx              Desktop-only custom cursor
    sections/TechStack.tsx        Skill categories and icons

public/
  Card.png                        Quote section card artwork

Dark Profile Card Float.json      Lottie source
update_lottie.cjs                 Utility to replace text inside the Lottie JSON
```

## Run Locally

Prerequisite: Node.js 20+

```bash
npm ci
npm run dev
```

The dev server runs on `http://localhost:3000`.

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Deployment

This is a static Vite frontend and can be deployed directly to Vercel with default Vite settings.

- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: none required for the current frontend

## Notes

- Public images live in `public/`.
- The Lottie JSON can be updated with `node update_lottie.cjs`.
- Visitor count is stored locally in the browser with `localStorage`.
