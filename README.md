# Sara Ferraa Portfolio

A responsive personal portfolio for Sara Ferraa, built with Next.js, React, and TypeScript.

**Production website:** [ferraasara.vercel.app](https://ferraasara.vercel.app). The current local refactor still requires review and a separate deployment.

## Design

- Editorial layout built around Sara's real portrait and project writing
- Warm light palette and quiet dark palette
- System theme by default, with an explicit System, Light, or Dark control
- System UI text with Georgia for display type
- Text links, ruled sections, and long-form project entries
- Scroll-linked chapter passages, assembling content columns, editorial unfolds, and reading progress with reduced-motion support
- No bounce effects, gradients, shadows, icon library, or decorative backgrounds
- Responsive desktop and mobile navigation

## Stack

- Next.js 15 with the App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Vercel deployment

## Run locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Create and check a production build with:

```bash
npm run lint
npx tsc --noEmit
npm run build
npm start
```

With the production server running, use `npm run test:smoke` to check the server-rendered content and key assets.

## Structure

```text
src/
├── app/              # Layout, metadata, route, and global styles
├── components/       # Portfolio sections and theme control
└── data/             # Verified portfolio content
public/               # Portrait, resume, and static assets
```

See [REFACTOR_NOTES.md](REFACTOR_NOTES.md) for the design decisions, content checklist, verification results, and release notes.
