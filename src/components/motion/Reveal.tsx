import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "footer";
  id?: string;
};

/**
 * Reveals `[data-reveal-item]` descendants as each one scrolls into view.
 *  - `data-reveal-item` (empty / "up"): fade + rise.
 *  - `data-reveal-item="line"`: slides up out of an overflow-hidden mask (headings).
 *  - `data-reveal-item="scale"`: fade + slight scale (media, cards).
 * Items are pre-hidden by `.js [data-reveal-item]` in styles.css, so there's no flash.
 * Must not be nested: an outer Reveal would also animate the inner one's items.
 */
export function Reveal({ children, className, as = "div", id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal-item]");
      if (!items.length) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const kind = (el: HTMLElement) => el.dataset["revealItem"] || "up";
        ScrollTrigger.batch(items, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              {
                autoAlpha: (_i: number, el: HTMLElement) => (kind(el) === "line" ? 1 : 0),
                y: (_i: number, el: HTMLElement) => (kind(el) === "up" ? 40 : 0),
                yPercent: (_i: number, el: HTMLElement) => (kind(el) === "line" ? 110 : 0),
                scale: (_i: number, el: HTMLElement) => (kind(el) === "scale" ? 0.94 : 1),
              },
              {
                autoAlpha: 1,
                y: 0,
                yPercent: 0,
                scale: 1,
                duration: 1.1,
                ease: "expo.out",
                stagger: 0.08,
                overwrite: true,
              },
            ),
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(items, { autoAlpha: 1 });
      });
    },
    { scope: ref },
  );

  const Tag = as;
  return (
    <Tag ref={ref as never} id={id} className={className}>
      {children}
    </Tag>
  );
}
