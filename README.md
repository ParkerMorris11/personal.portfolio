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

The ASCII hero dithers [Mount Timpanogos from Provo](https://commons.wikimedia.org/wiki/File:Mount_Timpanogos_-_01-07-08.jpg) by [a4gpa](https://www.flickr.com/people/94833286@N00), licensed [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/). The file in `public/hero-ascii-source.jpg` is a 1920px Wikimedia thumbnail of that original, then sampled and Bayer-dithered in the canvas.

```bash
npm test
npm run lint
npm run build
```
