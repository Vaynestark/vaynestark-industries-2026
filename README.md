# Vayne Stark Industries — 2026

A fresh, dependency-free studio website built for GitHub Pages. All HTML, CSS, JavaScript, and imagery were created for this version; no previous website source or assets were reused.

## Publish

In this repository, open **Settings → Pages**. Choose **Deploy from a branch**, branch **main**, folder **/ (root)**, and Save.

Expected URL after GitHub completes deployment: https://vaynestark.github.io/vaynestark-industries-2026/

## Local preview

Run `python -m http.server 4173` in this directory, then open http://localhost:4173. No installation, build, backend, or external CDN is needed.

## Edit

- `index.html`: studio sections, project cards, navigation, and contact destination.
- `styles.css`: layout, colors, typography, responsive rules, and motion.
- `app.js`: project descriptions, journal articles, filters, accessible detail dialogs, and motion preference.
- `assets/`: original generated imagery, optimized to WebP. The source artwork was created specifically for this website.

Project names and themes follow the supplied reference. Descriptions and the three journal notes are newly written editorial starting points, not verified product release claims. The contact link opens the owner's GitHub profile. No email address, customer claims, product demos, financial performance figures, or invented contact service is supplied.

## Performance choices

- Zero runtime dependencies, font downloads, analytics, third-party requests, video, WebGL, canvas, or continuous JavaScript animation loops.
- Entrance and reveal animations use transforms and opacity, then finish. Offscreen reveals are observed once and disconnected.
- Native scrolling, lazy-loaded project images, responsive hero imagery, and fixed image dimensions.
- A persistent motion switch, operating-system reduced-motion support, and hidden-tab animation pausing.
- Native HTML dialog provides focus trapping; Escape closes details and focus returns to the opener.
- Direct project and journal links use hashes so they work on GitHub Pages without rewrite rules.

See `DESIGN-RESEARCH.md` for the research and design decisions.
