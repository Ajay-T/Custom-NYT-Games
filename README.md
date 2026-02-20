# Custom NYT Games — Template

A customizable NYT-style mini games site featuring **Wordle**, **Connections**, and **Crossword Mini**. Built with Next.js and Tailwind CSS.

## Backstory

I built this for my girlfriend as a Valentine's Day 2026 gift — a custom version of her favorite NYT games with words and clues tailored specifically for her. It turned out great, so I cleaned it up into a template anyone can fork and personalize.

The original Valentine's Day version lives on the [`valentines-day-2026`](../../tree/valentines-day-2026) branch if you want to see how I customized it.

---

## How to Customize

All game content lives in a single file:

```
src/config/gameConfig.ts
```

Open that file and edit the three sections:

### Wordle
```ts
export const wordleConfig = {
  targetWord: "GAMES", // any 5-letter uppercase word
  maxGuesses: 6,
};
```

### Connections
Define 4 groups of 4 words. Assign difficulty via color: `yellow` (easiest) → `green` → `blue` → `purple` (hardest).
```ts
export const connectionsConfig = {
  groups: [
    { name: "Category Name", words: ["WORD1", "WORD2", "WORD3", "WORD4"], color: "yellow" },
    // ...
  ],
  maxMistakes: 4,
};
```

### Crossword Mini
Edit the 5×5 `grid` (use `null` for black cells, `""` for white), the `answers` grid (uppercase letters), and the `clues` lists.
> **Tip:** Make sure every intersection between an Across and a Down word shares the same letter.

---

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploying

The project exports as a static site (`output: "export"` in `next.config.ts`), so it can be hosted anywhere that serves static files — Vercel, Netlify, GitHub Pages, etc.

### GitHub Pages
1. In `next.config.ts`, uncomment and set `basePath` to your repo name:
   ```ts
   basePath: "/your-repo-name",
   ```
2. Enable GitHub Pages in your repo settings (Settings → Pages → source: GitHub Actions).
3. Add a workflow file at `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   permissions:
     contents: read
     pages: write
     id-token: write
   concurrency:
     group: "pages"
     cancel-in-progress: true
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: npm
         - run: npm ci
         - run: npm run build
         - uses: actions/upload-pages-artifact@v3
           with:
             path: out
     deploy:
       needs: build
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - id: deployment
           uses: actions/deploy-pages@v4
   ```

### Vercel / Netlify
Just connect your repo — no extra config needed.

---

## Tech Stack

- [Next.js](https://nextjs.org) (App Router, static export)
- [Tailwind CSS v4](https://tailwindcss.com)
- TypeScript
