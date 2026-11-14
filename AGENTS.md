## Project rules
- Hero pieces live in `src/components/hero/`; GSAP entrance targets are marked `data-reveal` and pre-hidden via the `.js` class set in the root head, so new animated elements must use the same pattern to avoid a flash before animation.
- The portrait is a single `PORTRAIT_SRC` constant in `Hero.tsx` feeding both the main portrait and the contact-card thumbnail, so swapping the photo is a one-line change.
