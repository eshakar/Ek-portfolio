# Portfolio — Session Notes

Working log for Esha Kar's portfolio (Next.js 16.3.0, Tailwind v4, framer-motion,
dark-only). Captures what was built this session, key decisions, and what's left.

## Stack / conventions
- **Next.js 16.3.0 + Turbopack**, Tailwind v4 (`@theme inline` in `globals.css`),
  framer-motion, dark-only (`<html class="dark">`).
- **Fonts** (`src/app/layout.tsx`): Geist (sans), Geist Mono, Bangers (`--font-bangers`,
  comic display), Caveat (`--font-caveat`, handwriting), Fraunces (`--font-fraunces`,
  editorial serif), Noto Sans + Noto Serif Bengali/Devanagari.
  - ⚠️ **Noto CJK (Japanese) crashes Turbopack** — Japanese text uses the **system
    CJK stack** instead (see `name-intro.tsx`). Do not add `Noto_Sans_JP` / `Noto_Serif_JP`.
- Dev server runs on **port 3000**.
- Stale HMR `ReferenceError`s in the browser console / `preview_logs` are normal after
  multi-step edits — verify against a fresh load, not the rolling log buffer.

## Design direction
- **Home** = cinematic dark hero with seasonal artwork.
- **Inner pages** = **comic / manga / anime** aesthetic (hard borders, offset shadows,
  halftone, Bangers headings, speech bubbles, sparkles, playful copy). A calmer
  "cinematic continuation" style was tried for Skills and then reverted — the comic
  look is the chosen direction.

## Season theming (global)
- `src/components/season-provider.tsx` — React context holding the season, persisted to
  `localStorage` (`esha-season`). It sets the whole `--accent-100…900` scale (derived
  from the season's base color via `color-mix`) on a wrapper, so **every `accent-*`
  utility across the site re-tints** with the selected season.
- Seasons + accents in `src/data/seasons.ts`: spring `#ff8fb3` (pink), summer `#8fd15c`
  (green), rainy `#6ab0d4` (blue), winter `#8fd0e8` (icy).
- Season is chosen via the selector in the home hero; choice carries across all pages.
- **Falling particles appear on the HOME page only** (season-matched). Particles were
  removed from About/Skills/Projects/Experience/Connect.
- **Contrast rule:** text sitting on the accent color uses **dark ink** (`text-band-foreground`),
  never white — white washes out on the pastel summer/winter accents. Applied to burst
  badges, caption boxes, chip hovers, the Chapter accent band, the manifesto, and the
  home CTA hover. The manifesto punchline uses a cream "highlighter" span.

## Pages / components
- **Home** — `cinematic-hero.tsx`: dark stage + seasonal `season-backdrop.tsx`
  (`object-cover` + feathered edges), `season-particles.tsx`, `season-selector.tsx`.
  Left column: editorial greeting metadata + huge animated multilingual name
  (`name-intro.tsx`, Fraunces + Noto serif, English write-on / others blur-fade),
  `FULL STACK DEVELOPER` + language dots, `RESEARCH · SYSTEMS · PRODUCT · CODE`,
  handwritten note (`handwritten-note.tsx`), refined CTAs, research metadata line.
- **/about** — `origin-story.tsx`: comic manga "Origin Story". Alternating cream/dark
  panels with manga caption boxes, sparkles, layered-shadow title, a **speech-bubble
  manifesto** (center of attraction), playful first-person copy, and the **chai/coding
  cat mascot** (`mascot.tsx`) in the footer with a speech bubble.
- **/skills** — `skills-arsenal.tsx`: comic "Skills & Arsenal". Alternating cream/dark
  panels, caption boxes (`icon · 01 · LABEL`), sticker chips (hover → accent), sparkles,
  layered title, playful subtitle. Data from `src/data/resume.ts` `skillGroups`.
- **Nav** — `nav.tsx`:
  - **Resume download button** right after the name (`Download` icon, links to
    `/Esha_resume.pdf` via `contact.resume`).
  - **Traveling love-cat**: a dotLottie (`/images/cat_love.lottie`) that rests to the
    LEFT of "HOME" by default and **glides smoothly (1.5s easeInOut) over to the Resume
    button while it's hovered**, then back. It's flipped (scaleX -1), sized `CAT = 88`,
    and sits on the nav's bottom line (`y = max(0, host.height - CAT)`); positions are
    measured live from two invisible anchor `<span>`s and recomputed on resize.
    Desktop-only. Uses `@lottiefiles/dotlottie-react`.
- **/projects** — `projects-grid.tsx`:
  - **Hover thought-cloud** (`comic-cloud.tsx`): hovering a card pops a comic cloud
    **outside** the grid — left column pops left, right column pops right — with a
    random motivational/funny line (`cloudMessages`, never repeating back-to-back),
    set in Caveat. The cloud is a union of circles; SVG can't stroke a union, so the
    puffs are drawn twice (stroked pass, then fill-only pass on top) which leaves only
    the outer scalloped edge. **xl+ only** — narrower viewports don't have gutter room
    beside the `max-w-4xl` chapter card, and the section is `overflow-hidden`.
  - **Runner** (`lottie-runner.tsx`): `/images/run_cycle.lottie` jogs along a ground
    line above the grid, measures its track with a `ResizeObserver`, and **mirrors
    (`scaleX`) at each end** so it faces the way it's going. `FACES_RIGHT` flips the
    base orientation if the source art ever changes.
- Shared: `chapter.tsx` (issue-style card), `burst-badge.tsx`, `issue-nav.tsx`,
  `particles.tsx`, `theme-provider.tsx`.

## Assets
- `public/images/{spring,summer,rainy,winter,autumn}.png` — season artwork.
- `public/images/cat_love.lottie` — nav love-cat (renamed from a spaced filename).
- `public/images/cat_reumse_button.lottie` — earlier resume-button cat (no longer used).
- `public/images/run_cycle.lottie` — the runner above the projects grid.
- `public/Esha_resume.pdf` — resume download target.

## Dependencies added this session
- `@lottiefiles/dotlottie-react` (for the nav love-cat).

## Still TODO / not yet done
- **Projects, Experience, Connect** still use the older `Chapter` comic style — not yet
  brought into the refined comic aesthetic used on About/Skills. (Contrast + no-particles
  fixes already applied to them.)
- Optional: reuse the `mascot.tsx` character on other sections.
- The nav love-cat is desktop-only; no mobile treatment.
