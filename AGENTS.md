## Project rules
- Hero pieces live in `src/components/hero/`; GSAP entrance targets are marked `data-reveal` and pre-hidden via the `.js` class set in the root head, so new animated elements must use the same pattern to avoid a flash before animation.
- The portrait is a single `PORTRAIT_SRC` constant in `Hero.tsx` feeding both the main portrait and the contact-card thumbnail, so swapping the photo is a one-line change.
- The hero figure (Fig 01, distribution board) is drawn with the vendored Anatomy kit: edit `scripts/figures/db-board.mjs`, then run `npm run figures` to regenerate `src/components/figures/db-board/art.generated.ts` (never edit the generated file). The ammeter and readout come from the pure model in `src/components/figures/db-board/model.ts`.
- Skill cards use Hairline figures from `@lucasmarkes/hairline/react`; theme them with the `--hairline-*` tokens in `src/styles.css`.
