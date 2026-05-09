# ParallaxOS — Marketing Website

The marketing site for **ParallaxOS**, the Sovereign Compliance Operating System for Australian rail subcontractors. Built by Parallax Industries Pty Ltd.

🌐 **Production:** [www.parallaxos.com.au](https://www.parallaxos.com.au)

---

## Stack

Pure static HTML / CSS / JavaScript — **no build step, no dependencies**. Drop the contents of this repo into any static host and it works.

- Plain HTML5 (16 pages)
- Single shared `styles.css` (Sovereign Protector design system: Naval Blue + Safety Orange)
- Vanilla `script.js` (mobile nav, parallax, scroll reveal, ROI calculator, Edge Mode banner, contact form)
- Inline SVG network logos (no external deps)
- Fonts via Google Fonts (Inter + JetBrains Mono)
- Animated logo as MP4 with poster fallback

## Project structure

```
.
├── index.html              # Landing page (hero with animated logo, network marquee, etc.)
├── features.html           # 18-module feature breakdown
├── pricing.html            # Three-tier pricing + ROI calculator + comparison table + FAQ
├── about.html              # Mission, Hunter Valley story, team, roadmap
├── contact.html            # Demo / Enterprise / Support / Partners forms
├── docs/
│   ├── index.html          # Documentation overview
│   ├── getting-started.html
│   ├── portals.html        # Three portals concept
│   ├── ai-agents.html      # The 9 specialist agents
│   ├── edge-mode.html      # Offline architecture
│   ├── avetta.html         # 3-second Monthly Pack
│   ├── api.html            # REST API reference
│   ├── security.html       # Security posture & subprocessors
│   ├── privacy.html        # Privacy Act compliance
│   ├── terms.html          # Terms of Service
│   └── status.html         # System status
├── assets/
│   ├── parallaxos-nav.png       # Brand logo (transparent, navigation)
│   ├── parallaxos-logo.mp4      # Animated brand reveal
│   ├── parallaxos-logo-poster.jpg  # Video poster fallback
│   └── networks/                # 12 brand-coloured SVG operator logos
│       ├── artc.svg
│       ├── aurizon.svg
│       ├── tfnsw.svg
│       ├── sydney-metro.svg
│       ├── queensland-rail.svg
│       ├── vline.svg
│       ├── metro-trains-melbourne.svg
│       ├── metro-trains-sydney.svg
│       ├── pta.svg
│       ├── adelaide-metro.svg
│       ├── arc-infrastructure.svg
│       └── bhp.svg
├── styles.css              # Sovereign Protector design system
├── script.js               # Site behaviour
├── robots.txt
└── sitemap.xml
```

## Deploy

Deploy configs are included for the three most common static hosts. Pick one — the others are ignored.

### Cloudflare Pages (recommended for Australia)

`_headers` and `_redirects` are included with sensible security headers, immutable asset caching, short HTML cache, and a few path redirects (`/home → /`, `/login → app.parallaxos.com.au`).

1. Connect the repo at https://dash.cloudflare.com/?to=/:account/pages
2. Build command: *(leave blank)*
3. Build output directory: `/`
4. Done — Cloudflare reads `_headers` and `_redirects` automatically.

### Vercel

`vercel.json` is included with security headers, immutable asset caching, and clean URLs.

```bash
vercel --prod
```

### GitHub Pages (auto-deploy on push)

`.github/workflows/pages.yml` is the workflow — every push to `main` builds and publishes.

1. Repo → Settings → Pages → Source: *GitHub Actions*
2. Push to `main` and the workflow handles the rest.

### AWS S3 + CloudFront

Upload the repo contents to an S3 bucket, set `index.html` as the default root object, set `404.html` as the error document, and front it with CloudFront.

### Local preview

```bash
# Any static server works
python3 -m http.server 8080
# or
npx serve .
```

Then visit `http://localhost:8080`.

## Design system

The Sovereign Protector tokens are defined as CSS custom properties at the top of `styles.css`:

| Token              | Value      | Use                                |
| ------------------ | ---------- | ---------------------------------- |
| `--bg-darkest`     | `#0B1929`  | Page background                    |
| `--bg-card`        | `#132D4A`  | Card backgrounds                   |
| `--brand`          | `#FF6B00`  | Safety Orange — primary actions    |
| `--status-cleared` | `#10B981`  | Compliance OK                      |
| `--status-blocked` | `#EF4444`  | Worker blocked                     |
| `--status-warning` | `#F59E0B`  | Action required                    |
| `--status-ai`      | `#8B5CF6`  | ParallaxOS AI                      |

Typography is Inter (sans) and JetBrains Mono (numerics, code).

## U