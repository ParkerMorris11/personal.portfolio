# Parker Morris: Portfolio

Personal site for Parker Morris, a BYU Information Systems student building software and AI tools for real business workflows.

**Status:** Active · **Built with:** React, TypeScript, Vite, Tailwind CSS

Live site: [parkermorris.org](https://parkermorris.org)

## What’s on the page

- Identity and current role on a textmode page with an ASCII character-field hero
- Two case studies: BrainStorm policy learning workflow, Toasted Tanz customer workflows
- ASCII architecture diagrams for interview walkthroughs
- Public code for the AUP toolkit and the AI news digest agent
- About, experience, and contact
- Optional `/term` command surface and Ctrl+K jump list

## Run locally

```bash
git clone https://github.com/ParkerMorris11/personal.portfolio.git
cd personal.portfolio
npm install
npm run dev
```

Open the local address Vite prints.

## Hero photograph

The ASCII hero dithers [Parthenon, east side, Acropolis of Athens](https://commons.wikimedia.org/wiki/File:Parthenon_east_side_Acropolis_Athens,_Greece.jpg) by [Jebulon](https://commons.wikimedia.org/wiki/User:Jebulon), released as [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). Credit is optional under CC0; the site still names the photographer. `public/hero-ascii-source.jpg` is a cropped, contrast-boosted 1920px version of that original, then sampled and Bayer-dithered in the canvas.

```bash
npm test
npm run lint
npm run build
```
