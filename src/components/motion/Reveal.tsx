import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
  id?: string;
};

/**
 * Fades its `[data-reveal-item]` descendants up once as they scroll into view.
 * ScrollTriggers are created inside useGSAP, so they are killed on unmount.
 */
export function Reveal({ children, className, as = "div", id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-reveal-item]", {
          y: 36,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
        });
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
