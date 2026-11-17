---
name: Parker Morris Portfolio
description: Light premium portfolio with a full-viewport ASCII form
colors:
  paper: "#f5f3ef"
  ink: "#161513"
  quiet: "#5c574e"
  surface: "#fffcf8"
  accent: "#3f6fbf"
  gold: "#c49a5c"
  ascii-dark: "#11130f"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Source Sans 3, sans-serif"
    fontSize: "clamp(3.4rem, 9vw, 7.2rem)"
    fontWeight: 500
    lineHeight: 0.92
    letterSpacing: "-0.045em"
  body:
    fontFamily: "Source Sans 3, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.78rem"
    fontWeight: 400
    lineHeight: 1.22
    letterSpacing: "normal"
rounded:
  card: "1.4rem"
  pill: "999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.25rem"
---

## Overview

A recruiter site whose first impression is a dense, two-tone ASCII object on warm paper, with a large sans headline sitting on top. The rest of the page is a generous, modern layout. Monospace is reserved for architecture maps and keys.

## Colors

Paper `#f5f3ef`, ink `#161513`, quiet brown-gray `#5c574e`, white cards `#fffcf8`. ASCII ink interpolates steel blue to sand gold. Diagrams sit on `#11130f`.

## Typography

Bricolage Grotesque for name and section titles (weight 500, tight tracking). Source Sans 3 for reading. JetBrains Mono for selectable diagrams.

## Layout

Full-viewport hero. Identity left, facts right. Body is a two-column grid collapsing under 900px. Project stories are padded cards.

## Elevation & Depth

Soft layered shadows on cards. ASCII supplies the only spectacle. No glass slabs over the hero copy.

## Shapes

Large card radii, pill primary button, square-ish diagram inset with a 1rem radius.

## Components

Primary action is a black pill. Secondary is an underline. Architecture is a dark inset with box-drawing text.

## Do's and Don'ts

- Do keep the ASCII dense enough to read as an image.
- Do keep claims identical to the live site.
- Don't set the whole page in monospace.
- Don't copy Synara's map or assets.
