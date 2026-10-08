# Design research — October 8, 2026

## Direction

The supplied reference is the primary art direction: black glass architecture, warm metallic light, an oversized V, restrained uppercase typography, fine dividing lines, and project-specific amber, blue, violet, and mint accents. This site implements that direction with freshly written code and original imagery.

The revised design is a futuristic invention command interface: a cyan-lit sculptural V core, metallic panel edges, technical typography, a functional four-system selector, and a compact project directory. The user requested a much stronger advanced-inventor / Tony Stark-like direction after reviewing the initial version. Original artwork was generated specifically for this revision. Project categories filter instantly, individual projects open in accessible deep-linkable detail views, and journal cards open complete field notes. All site assets are served by GitHub Pages itself.

## Sources reviewed

1. [Lumaro Digital: Latest Web Design Styles You Need to Know in 2026](https://www.lumarodigital.com.au/blog/latest-web-design-styles-you-need-to-know/) — published October 6, 2026. Supports bold typography, intentional dark contrast, purposeful interaction, and performance-conscious imagery. These are design recommendations, not universal empirical findings.
2. [Anthropic: Claude Opus](https://www.anthropic.com/claude/opus) — reviewed October 8, 2026 in response to the request about Opus 5.5. The official page discusses coding and agentic capabilities; it does not define a single “Opus 5.5 website style.” This design uses the user's visual reference and does not claim to reproduce the model's internal process or benchmark its output.
3. [web.dev: Animations and performance](https://web.dev/articles/animations-and-performance) — primary browser performance guidance. Transform and opacity animations can avoid repeated layout and painting. This informed the motion implementation.
4. [web.dev: How to create high-performance CSS animations](https://web.dev/articles/animations-guide) — use compositor-friendly properties and avoid unnecessary layer promotion.

## Hardware considerations

A compressed futuristic laboratory still provides the scene's visual complexity. A short, finite image entrance replaces real-time 3D rendering. A scan line crosses the hero once and content reveals stop after one entrance. System selection triggers a 240 ms panel transition only on interaction. There is no autoplay video, WebGL scene, pointer-tracking loop, synthetic cursor, scroll hijacking, or recurring JavaScript timer.

Performance results in `QA.md` are local browser checks, not measurements of real visitor devices. Different network and hardware conditions can produce different results.
