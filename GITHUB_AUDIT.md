# GitHub Audit & Improvement Plan

This audit is based on the current repository state (single-page static site with custom headers and no CI automation).

## High-priority fixes (do these first)

1. **Fix license mismatch**
   - `README.md` says MIT, but the repository `LICENSE` file is GPLv3 text.
   - Mismatched licensing can create legal ambiguity for contributors and users.
   - Action: keep both files aligned and use one SPDX identifier consistently.

2. **Add repository security policy**
   - Add `SECURITY.md` so users know how to report vulnerabilities privately.
   - Include response-time expectations and supported versions.

3. **Enable branch protection + required checks**
   - Protect `main` with PR reviews and status checks.
   - Require signed commits if you want stronger supply-chain trust.

4. **Tighten CSP over time**
   - Current CSP still allows inline script/style (`'unsafe-inline'`).
   - Action path:
     - Move inline CSS/JS into external files.
     - Use nonces/hashes and remove `'unsafe-inline'`.

## Code quality improvements

1. **Split monolithic `index.html` into modular files**
   - Move styles to `assets/css/main.css`.
   - Move JS to `assets/js/terminal.js`.
   - Benefits: readability, easier testing, cleaner diffs.

2. **Add formatting and linting**
   - Add Prettier + HTML/CSS/JS lint config.
   - Optional: use `npm scripts` for `format` and `lint`.

3. **Accessibility pass**
   - Respect `prefers-reduced-motion` for flicker/scanline animations.
   - Add landmark semantics and improve contrast validation.

4. **Testability**
   - Add lightweight checks in CI:
     - HTML validation
     - Link checking
     - Optional Playwright smoke test to ensure terminal renders.

## Security hardening recommendations

1. **Keep secure headers and expand safely**
   - Existing headers are a good start (`HSTS`, `X-Frame-Options`, `nosniff`, `Permissions-Policy`, `CSP`).
   - Add/consider:
     - `frame-ancestors 'none'` (or expected domains)
     - `object-src 'none'`
     - `base-uri 'self'`

2. **Add GitHub security tooling**
   - Enable Dependabot alerts and secret scanning in repo settings.
   - Add CodeQL workflow for JavaScript (even on small repos, useful baseline).

3. **Publishing discipline**
   - If deploying on Netlify/Vercel/GitHub Pages, enforce HTTPS and immutable cache headers for versioned assets.

## Make it cooler (high-impact polish)

1. Add command themes ("hacker", "retro DOS", "sysadmin").
2. Add URL-driven presets (e.g. `?theme=amber&speed=fast`).
3. Add fake interactive mode after autoplay sequence.
4. Add optional CRT audio hum + keyclicks (toggleable).
5. Add screenshot/GIF in README for immediate visual impact.

## Suggested roadmap

- **Week 1:** License alignment, `SECURITY.md`, branch protection.
- **Week 2:** Split HTML/CSS/JS, add lint/format scripts.
- **Week 3:** CI checks + accessibility improvements.
- **Week 4:** Interactive/cool features + README media polish.
