import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type CounterProps = {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
};

const format = (n: number, decimals: number) => n.toFixed(decimals);

/**
 * Counts up from zero the first time it scrolls into view. The server renders
 * the final value, so the number is correct without JS and for screen readers.
 */
export function Counter({ value, decimals = 0, duration = 2, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const state = { n: 0 };
    el.textContent = format(0, decimals);
    gsap.to(state, {
      n: value,
      duration,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
      onUpdate: () => {
        el.textContent = format(state.n, decimals);
      },
    });
  });

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {format(value, decimals)}
    </span>
  );
}
