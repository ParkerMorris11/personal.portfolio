# Parker Morris: Portfolio

> My personal portfolio site, covering AI product work, projects, and how I build.

**Status:** Active · **Built with:** React, TypeScript, Vite, Tailwind CSS, Framer Motion

---

## Overview

A single-page portfolio for my work as an AI Product Lead and BYU Information Systems student. It shows featured projects, the skills and tools I use, how I design AI systems, and how to contact me.

## Sections

- **Hero and About:** who I am and what I work on
- **Projects:** featured work, including Toasted Tanz customer workflow systems, the BrainStorm AI policy learning workflow, and the AI news digest agent
- **AI architecture:** how I structure AI systems
- **Skills:** tools and languages, with a tech carousel
- **Contact**

Extra touches: dark and light theme toggle, scroll progress bar, cursor halo, and video player.

## Tech stack

| Layer | What it uses |
|---|---|
| Framework | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, shadcn/ui components |
| Motion | Framer Motion |
| Testing | Vitest |

## Run locally

```bash
git clone https://github.com/ParkerMorris11/personal.portfolio.git
cd personal.portfolio
npm install
npm run dev
```

Open the local address Vite prints.

## Project structure

```
src/components/   Page sections (Hero, About, Projects, Skills, Contact, ...)
src/components/ui shadcn/ui primitives
src/pages/        Index and NotFound
public/           Static assets
```
