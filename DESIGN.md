---
name: Parker Morris Portfolio
description: Textmode recruiter site for Parker Morris
colors:
  paper: "#12150f"
  ink: "#efe9d6"
  quiet: "#9eaa7c"
  rule: "#3c4430"
  accent: "#d7e36a"
  hero: "#090b07"
typography:
  body:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  display:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "clamp(2.4rem, 7vw, 5.4rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.04em"
rounded:
  none: "0px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0.55rem 0.85rem"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
---

## Overview

A terminal-document portfolio: monospace type, box-drawing architecture, and a living character field behind the identity. Recruiters still scroll a normal page. Phosphor accent is the only saturated color.

## Colors

Olive-black paper (`#12150f`), cream ink (`#efe9d6`), olive quiet text (`#9eaa7c`), hairline rules (`#3c4430`), phosphor accent (`#d7e36a`). Hero ground is slightly darker (`#090b07`) so the ASCII field can sit dim behind copy.

## Typography

JetBrains Mono for every register, ligatures off. Display is heavy and tight; body stays 70ch. Architecture diagrams are smaller (`0.72rem`) so box-drawing stays aligned.

## Layout

Sticky status-bar header. Hero is full-bleed. Body is a two-column grid (jump list + main) collapsing to one column under 900px. Architecture diagrams swap from horizontal arrows to a stacked vertical pipe on small screens.

## Elevation & Depth

No shadows. Depth is contrast: dim field, then a solid identity slab, then the document. Optional scanline overlay is a toggle, not the default.

## Shapes

Square corners. One-pixel rules. ASCII boxes for system maps. No pills, glass, or serif slabs.

## Components

Primary action is an accent fill rectangle (`Read the work`). Secondary links are accent underline. Command palette and `/term` reuse the same border and type. Architecture lives in selectable `<pre>` text.

## Do's and Don'ts

- Do keep every claim on the live site; diagrams are generated from `src/content/site.ts`.
- Do keep the character field low-contrast so the name stays readable.
- Don't use a fake shell as the only navigation.
- Don't reintroduce DM Serif, the Mux wave, typewriter names, or ledger chrome.
- Don't invent metrics, projects, or a resume PDF.
