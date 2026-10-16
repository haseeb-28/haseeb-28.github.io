# Haseeb Ur Rehman — Portfolio

A responsive, single-page portfolio presenting Haseeb Ur Rehman's background, skills, projects, experience, and contact options. The site is implemented with semantic HTML, custom CSS, and browser-native JavaScript; it has no build step or runtime framework.

## Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Page structure](#page-structure)
- [Design system](#design-system)
- [Interactions](#interactions)
- [Assets](#assets)
- [Run locally](#run-locally)
- [Deployment](#deployment)
- [Maintenance](#maintenance)

## Overview

The portfolio is a static website. The browser loads `index.html`, which references the stylesheet in `css/style.css`, the interaction script in `js/main.js`, and local content assets in `assets/`. No package manager, build tool, server-side component, database, or API is required to render the page.

## Architecture

```text
Browser
  └── index.html             Semantic document and portfolio content
        ├── css/style.css    Layout, responsive rules, themes, visual design
        ├── js/main.js       Theme, menu, animation, tilt, and contact behavior
        └── assets/          Profile photo, resume, and technology/social icons
```

### Responsibilities

- **`index.html`** defines the document metadata, navigation, page sections, project cards, links, contact form, and footer. The content is authored directly in HTML rather than generated from a data source.
- **`css/style.css`** provides the complete presentation layer: theme variables, neumorphic surfaces, section-specific accent colors, layout grids, interactions, and responsive breakpoints.
- **`js/main.js`** adds progressive enhancement for theme switching, the mobile menu, the animated role label, scroll reveals, pointer-driven tilt effects, contact-form handoff, and the current year.
- **`assets/`** contains the résumé PDF, profile image, and SVG icons used by the page.

The page links to external GitHub repositories, LinkedIn, Gmail, and project demos. Those services are destinations only; this site does not integrate with their APIs.

## Page structure

The document is a single page with anchor navigation to these sections:

1. **Home** — Introductory headline, rotating role label, resume and project calls to action, social links, profile photo, and orbiting technology icons.
2. **About Me** — Short biography and education timeline.
3. **Skills** — A grid of technology cards for Flutter, Python, MySQL, JavaScript, TypeScript, Flask, PyTorch, and Supabase.
4. **Projects** — Nine project cards: Agriguard, SmartMeds, Mobile Repair POS, Arvyax, SentimentAI, SpendWise, Resume Forge, TaskNest, and The Book Empire. Cards include short descriptions, technology marks, and repository or demo links where available.
5. **Experience** — App Development Intern experience at CodeAlpha.
6. **Contact** — Email and location details, social links, résumé download, and a contact form.
7. **Footer** — Copyright line with a year inserted by JavaScript.

## Design system

### Neumorphic surfaces

The interface uses a soft, low-contrast neumorphic treatment. Shared CSS variables define the page background and two shadow colors. The `.raised` utility applies an outward pair of shadows, while `.inset` applies inward shadows. These primitives are reused on the navigation bar, cards, buttons, form fields, skill and project details, and contact information.

Interactive controls use raised, hover, active, and focus-visible states. Project links and navigation items also receive their own surface treatment so that text links remain visually identifiable as controls.

### Themes and accents

- The default theme is light and is declared on the root element in `index.html`.
- The dark theme is activated by setting `data-theme="dark"` on the root element. CSS variables update the surface, text, and shadow colors throughout the page.
- The selected theme is stored in `localStorage` when available. If storage is unavailable, the page continues to work for the current session.
- Sections define their own accent pairs. Gradients and accents are used for headings, project details, skill cards, and focus indicators.
- The `.inv` utility inverts selected icons for contrast in the dark theme.

### Layout and responsiveness

- The content uses a centered maximum width of 1,100px with consistent section spacing.
- CSS Grid lays out the hero, information cards, skills, and project gallery.
- At widths below 900px, the hero becomes a single column and multi-column grids reduce to two columns.
- At widths below 640px, the navigation changes to a toggleable menu, project and two-column content stacks vertically, and the hero illustration scales down.
- The `prefers-reduced-motion` media query disables animations and transitions and makes reveal content visible without motion.

## Interactions

`js/main.js` is an immediately invoked script that wires behaviors to elements by ID or class:

- **Theme toggle:** `#themeBtn` switches between light and dark mode, updates its moon/sun icon, and attempts to persist the setting.
- **Mobile navigation:** `#burger` toggles the menu's `open` class. Choosing a navigation link closes the menu.
- **Role rotator:** `#role` cycles through “Flutter Developer,” “AI Enthusiast,” and “Full Stack Developer” with a type/delete animation.
- **Scroll reveals:** `IntersectionObserver` adds and removes reveal classes as headings, cards, chips, and hero content enter or leave the viewport. Small per-element delays stagger the animation.
- **Pointer tilt:** On devices that support hover, elements marked `data-tilt` tilt slightly with pointer movement. The profile avatar also follows the pointer within its stage. These effects are skipped on touch-only devices.
- **Contact form:** The form validates its required name, email, and message fields through native HTML constraints. On submit, JavaScript creates a Gmail compose URL containing the entered details and opens it in a new tab. The form does **not** send a message to a backend.
- **Footer year:** `#year` is set to the current year at runtime.

## Assets

```text
assets/
├── Haseeb_Ur_Rehman_Resume.pdf
├── profile.jpg
└── icons/
    ├── anthropic.svg
    ├── appwrite.svg
    ├── css3.svg
    ├── dart.svg
    ├── flask.svg
    ├── flutter.svg
    ├── github.svg
    ├── html5.svg
    ├── javascript.svg
    ├── linkedin.svg
    ├── mail.svg
    ├── mysql.svg
    ├── nextjs.svg
    ├── pocketbase.svg
    ├── python.svg
    ├── pytorch.svg
    ├── react.svg
    ├── scikitlearn.svg
    ├── sql.svg
    ├── sqlite.svg
    ├── supabase.svg
    ├── tailwind.svg
    ├── typescript.svg
    └── vite.svg
```

The profile image and résumé are local files. SVGs are referenced directly by relative URL, which keeps the technology and social icons sharp at different display sizes. The MySQL logo has a dedicated `mysql.svg` asset used in the skills grid, hero technology ring, and The Book Empire project card.

## Run locally

No installation is needed. Open `index.html` directly in a browser, or serve the project directory with any static-file server. For example, if Python is installed:

```powershell
python -m http.server 8000
```

Then visit <http://localhost:8000>. Running through a local server more closely matches static hosting and avoids browser-specific restrictions on local files.

## Deployment

Deploy the project directory to any static web host. Preserve the relative paths and directory names for `css/`, `js/`, and `assets/`; the site has no build output or environment variables to configure.

## Maintenance

- Edit section copy, navigation, project links, and contact details in `index.html`.
- Update layout, themes, typography, and responsive behavior in `css/style.css`.
- Update client-side interactions in `js/main.js`.
- Keep the résumé, profile image, and icon paths synchronized with their references in the HTML.
- When adding a new section, give it an `id` if it should be reachable from the navigation and choose an accent pair alongside the other section tone declarations in the stylesheet.
