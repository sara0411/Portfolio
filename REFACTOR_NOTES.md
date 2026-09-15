# Editorial portfolio refactor

## Design

The new direction uses an editorial structure with generous spacing, strong serif display type, restrained system text, and Sara's portrait as the main visual. The palette uses warm paper tones in light mode and quiet charcoal tones in dark mode. A muted olive is the only accent color.

The site follows the operating system theme on first visit. The header also provides System, Light, and Dark choices and saves the visitor's preference locally. Motion follows an editorial print metaphor: oversized chapter titles cross the page between major sections, project and experience columns assemble from opposite sides, paragraphs and credentials unfold vertically, the contact underline draws with the email, headlines uncover horizontally, section rules draw as they enter the viewport, the portrait crop shifts gently with reading position, and the header rule shows page progress. A small requestAnimationFrame controller maps scroll position directly to the chapter and content movement. Every effect stops when the visitor stops. The motion uses measured linear or eased timing with no bounce and no hover animation. Reduced-motion preferences keep the content in its final position and remove every animation and transform.

Clipping reveals finish within the first 14 percent of viewport entry. This keeps the effect visible while ensuring text is fully readable near the end of the document. Split-column movement uses a longer range because it never crops content.

There are no gradients, shadows, icon libraries, terminal elements, card grids, glass effects, or decorative background patterns.

Projects read as full-width case notes with context, Sara's contribution, implementation details, factual evidence, technology, and public source links. Private work is labeled directly rather than showing a misleading repository link. Sections are separated with rules instead of floating containers. Most of the page remains server rendered. Client-side code is limited to theme preference and Escape handling for the mobile menu.

## Content status

- `profile.md` is the factual source for portfolio copy.
- Sara confirmed that her Deloitte internship ended at the end of July 2026.
- Sara confirmed that she is currently a Software Engineering Intern at Automai.
- The Automai start date, responsibilities, and technologies remain omitted until Sara provides them.
- Sara supplied the portrait stored at `public/sara-ferraa.jpg`.
- Public source links are shown for the AI Log Analyzer and Recruitment CV Management Platform. Private projects do not show a misleading repository link.
- Confirm that `public/resume.pdf` is current before release.
- Sara confirmed the LinkedIn profile URL: `https://www.linkedin.com/in/sara-ferraa-0aa73623a/`.

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
npm start
```

In another terminal:

```bash
npm run test:smoke
```

Browser checks cover desktop and mobile layouts, horizontal overflow, portrait loading, keyboard navigation, visible focus, mobile menu behavior, all three theme choices, the operating system theme, console errors, scroll-linked motion, and reduced-motion behavior.

### Verification completed in the editing environment

- ESLint, TypeScript, and the optimized Next.js production build passed.
- The production smoke test passed for server-rendered content, section anchors, project entries, theme setup, portrait, contact, metadata, resume PDF, and site icon.
- Desktop layout verification passed with no horizontal overflow, a loaded portrait, and no browser console errors or warnings.
- Mobile layout verification passed at the narrow responsive breakpoint with no horizontal overflow. The desktop navigation was hidden, the mobile menu was available, and Escape closed the menu and returned focus to its control.
- Keyboard verification passed for the first-tab skip link, its visible focus outline, and focus transfer to the main content.
- System, Light, and Dark theme choices resolved to the intended warm light and charcoal dark palettes.
- Chromium confirmed the section transitions now respond to scroll. The first chapter moved from `140.42px` on the right to `-33.01px` as it crossed the viewport, while the header progress rule advanced. Scroll-linked project rules, section text, and portrait crop motion also remained active.
- The rendered motion produced no browser console errors or horizontal overflow.
- Contact reveal timing was shortened so the email and profile links always reach their final unclipped state before they become readable. Desktop and mobile anchor checks confirmed a zero-percent clip for both elements.
- All five section anchors were checked at desktop and mobile widths. Visible unfolding content completed cleanly, split columns reached their final aligned positions with further scrolling, and off-canvas transforms no longer create horizontal page overflow.
- The reduced-motion media block removes animation, clipping, and transforms from every animated selector. A separate runtime with reduced motion emulation has not been run for this motion pass.
- The positioning and project-evidence pass kept the editorial design while giving the hero a direct engineering statement. Desktop and mobile browser checks confirmed the longer heading and evidence rows fit without horizontal overflow.
- A physical-phone check and a Lighthouse audit have not been run.

## Publishing

This refactor does not change Vercel settings and has not been published. Review the local result and factual content before deploying it to the existing Vercel project and canonical domain `https://ferraasara.vercel.app`.
