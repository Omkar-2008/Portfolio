import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { ScrollLink } from "@/components/motion/ScrollLink";
import { NAV_ITEMS, SiteMenu } from "./SiteMenu";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Compact nav that slides in once the hero has scrolled away, highlighting
 * the section currently in view.
 */
export function FloatingNav() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>("#home");

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.set(el, { yPercent: -160, autoAlpha: 0 });
    ScrollTrigger.create({
      trigger: "#home",
      start: "bottom 12%",
      onEnter: () => gsap.to(el, { yPercent: 0, autoAlpha: 1, duration: reduce ? 0 : 0.7, ease: "expo.out" }),
      onLeaveBack: () =>
        gsap.to(el, { yPercent: -160, autoAlpha: 0, duration: reduce ? 0 : 0.35, ease: "power2.in" }),
    });

    for (const item of NAV_ITEMS) {
      if (!document.querySelector(item.href)) continue;
      ScrollTrigger.create({
        trigger: item.href,
        start: "top 45%",
        end: "bottom 45%",
        onToggle: (self) => self.isActive && setActive(item.href),
      });
    }
  });

  return (
    <div
      ref={ref}
      data-reveal
      className="fixed inset-x-2 top-2 z-40 sm:inset-x-3 sm:top-3 lg:inset-x-auto lg:left-1/2 lg:-translate-x-1/2"
    >
      <nav
        aria-label="Sections"
        className="flex items-center justify-between gap-2 rounded-full border border-on-canvas/10 bg-ink/85 py-1.5 pl-5 pr-1.5 text-ink-foreground shadow-ink backdrop-blur-md lg:pr-1.5"
      >
        <ScrollLink href="#home" className="mr-4 font-display text-lg font-extrabold tracking-tight">
          Omkar<sup className="ml-0.5 text-[0.55em]">®</sup>
        </ScrollLink>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV_ITEMS.filter((i) => i.href !== "#home").map((item) => {
            const current = active === item.href;
            return (
              <li key={item.href}>
                <ScrollLink
                  href={item.href}
                  aria-current={current ? "true" : undefined}
                  className={`block rounded-full px-3.5 py-2 text-[0.8rem] font-semibold transition-colors duration-300 xl:px-4 ${
                    current ? "bg-primary text-primary-foreground" : "text-ink-foreground/70 hover:text-ink-foreground"
                  }`}
                >
                  {item.label}
                </ScrollLink>
              </li>
            );
          })}
        </ul>

        <span className="flex size-10 items-center justify-center rounded-full bg-on-canvas/5 lg:hidden">
          <SiteMenu reveal={false} triggerClassName="!size-8 scale-75" />
        </span>
      </nav>
    </div>
  );
}
