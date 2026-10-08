# Redesign verification — October 8, 2026

Tested in local headless Chromium 151 with Playwright.

- No JavaScript errors or broken images.
- All four system selector controls updated the focus panel and opened the correct project brief.
- Project category filters, all four detail views, journal reading, Escape handling, direct hash links, and mobile navigation passed.
- Motion pause persisted after reload; system reduced-motion preference was respected.
- No horizontal overflow at 320, 390, 768, 1024, or 1440 CSS pixels.
- Desktop hero, project directory, and mobile hero screenshots visually reviewed.
- Local measured layout shift: 0.
- One 185 ms long task was observed during the sampled load while browser checks ran concurrently.
- After entrance animations completed: 0 running animations; approximately 0.29 ms of browser task activity over a two-second idle sample.
- Sampled JavaScript heap: approximately 1.29 MB. This is not total browser/GPU memory.
- The four production image files total 458,290 bytes. No third-party runtime assets are requested.

These measurements describe the local test session, not a promise of identical performance on all visitor devices or networks. GitHub Pages publication is verified separately after deployment.
