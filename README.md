# Landing page (01 Cover + 02.01 deck)

Plain HTML/CSS/JS for GitHub Pages. No framework, no build step.

```
.
├── index.html            # cover + deck views (switched by #deck / #cover)
├── styles/tokens.css     # Figma variables as CSS custom properties
├── styles/main.css
├── scripts/main.js       # routing, flip, 3→7 expansion, queen link
├── scripts/fetch-assets.sh
├── assets/               # filled by fetch-assets.sh
└── projects/             # your CURRENT landing page, moved here
```

## 1. Preview locally

1. Get the assets (needs internet; Figma links expire after 7 days):
   `bash scripts/fetch-assets.sh`
2. Start a static server from this folder (pick one):
   - `python3 -m http.server 8000`
   - `npx serve .`
   - VS Code: right-click `index.html` → *Open with Live Server*
3. Open http://localhost:8000 (don't open `index.html` by double-click; relative links work best on a server).
4. Test: cover → click the `sd` icon → deck → click a card (flips, deck expands to 7) → click a card again (flips back) → flip the third card (queen) → click it again → goes to `/projects/`.
5. Resize the window below 768px and compare with your mobile frame.

## 2. Deploy to al3he.github.io

1. In your repo, create a branch: `git checkout -b cover-redesign`.
2. Move the current site into `projects/` first: `mkdir projects && git mv index.html projects/` (move its assets/CSS too, and fix any relative paths).
3. Copy this folder's contents (`index.html`, `styles/`, `scripts/`, `assets/`) into the repo root. If the old site also has `styles/` or `assets/`, merge carefully or rename the old ones.
4. Commit and push, open a pull request, merge to the Pages branch.
5. Wait for the Pages build, then test https://al3he.github.io/ and https://al3he.github.io/projects/ (hard-refresh; Pages caches).

## Tweaks

- Queen slot: the card with `data-face="queen"` and `data-href="projects/"` in `index.html`.
- Random fronts: add names to `FACES` and `IMG` in `scripts/main.js`. A face is chosen on first flip, then persists.
