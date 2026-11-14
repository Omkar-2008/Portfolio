import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";

import omkarPortrait from "@/assets/omkar-portrait.png";
import { DbBoardFigure } from "@/components/figures/db-board/DbBoardFigure";
import { ScrollLink } from "@/components/motion/ScrollLink";
import { PROFILE, STATS } from "@/data/profile";
import { ContactCard } from "./ContactCard";
import { GridOverlay } from "./GridOverlay";
import { Portrait } from "./Portrait";
import { SiteNav } from "./SiteNav";

gsap.registerPlugin(useGSAP);

const PORTRAIT = {
  src: omkarPortrait,
  width: 768,
  height: 1024,
};
const PORTRAIT_SRC = omkarPortrait;

const INTRO_LINES = ["I build practical", "engineering solutions", "through technology."];
const NAME = "OMKAR";
const AVAILABILITY = "Open to DAT & Junior Engineer roles";
const LEDE =
  "Third-year EEE diploma student at Govt. Polytechnic, Pendurthi — panel wiring, AutoCAD single-line diagrams, Arduino control and manual QA.";

function Availability({ className = "" }: { className?: string }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full bg-ink/85 py-1.5 pl-2.5 pr-3.5 text-[11px] font-semibold tracking-wide text-ink-foreground shadow-ink backdrop-blur-sm sm:text-xs ${className}`}
    >
      <span className="relative flex size-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-[oklch(0.8_0.2_145)] opacity-70" />
        <span className="relative size-2 rounded-full bg-[oklch(0.8_0.2_145)]" />
      </span>
      {AVAILABILITY}
    </p>
  );
}

function Actions({
  className = "",
  tone = "canvas",
}: {
  className?: string;
  tone?: "canvas" | "ink";
}) {
  const primary =
    tone === "canvas"
      ? "bg-ink text-ink-foreground shadow-ink hover:bg-paper hover:text-paper-foreground"
      : "bg-primary text-primary-foreground hover:bg-paper hover:text-paper-foreground";
  const secondary =
    tone === "canvas"
      ? "border-on-canvas/55 text-on-canvas hover:border-on-canvas hover:bg-on-canvas hover:text-paper-foreground"
      : "border-ink-foreground/25 text-ink-foreground hover:bg-ink-foreground hover:text-ink";
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      <ScrollLink
        href="#projects"
        className={`group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-300 ${primary}`}
      >
        View projects
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
      </ScrollLink>
      <ScrollLink
        href="#contact"
        className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-colors duration-300 ${secondary}`}
      >
        Get in touch
      </ScrollLink>
    </div>
  );
}

function Stats({
  className = "",
  tone = "canvas",
}: {
  className?: string;
  tone?: "canvas" | "ink";
}) {
  const label = tone === "canvas" ? "text-on-canvas/75" : "text-ink-foreground/60";
  const rule = tone === "canvas" ? "divide-on-canvas/30" : "divide-ink-foreground/15";
  return (
    <dl className={`grid grid-cols-3 divide-x ${rule} ${className}`}>
      {STATS.map((stat) => (
        <div key={stat.label} className="flex flex-col px-3 first:pl-0 last:pr-0">
          <dt
            className={`order-2 mt-1 text-[10px] font-semibold uppercase leading-tight tracking-[0.12em] ${label}`}
          >
            {stat.caption}
          </dt>
          <dd className="order-1 font-display text-2xl font-extrabold leading-none tracking-tight lg:text-[1.7rem]">
            {stat.value.toLocaleString("en-IN", {
              minimumFractionDigits: stat.decimals ?? 0,
              maximumFractionDigits: stat.decimals ?? 0,
            })}
            {stat.suffix && <span className="text-[0.6em] align-top">{stat.suffix}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        tl.set("[data-reveal]", { autoAlpha: 1 })
          .from(".hero-canvas", { autoAlpha: 0, duration: 0.9, ease: "power2.out" }, 0)
          .from(
            ".grid-line-v",
            { scaleY: 0, transformOrigin: "top", duration: 1.6, stagger: 0.07 },
            0.2,
          )
          .from(
            ".grid-line-h",
            { scaleX: 0, transformOrigin: "left", duration: 1.6, stagger: 0.09 },
            0.3,
          )
          .from(
            ".grid-plus",
            { scale: 0, rotate: -90, autoAlpha: 0, duration: 0.8, stagger: 0.015 },
            0.8,
          )
          .from(".nav-item", { yPercent: -120, autoAlpha: 0, duration: 1, stagger: 0.06 }, 0.45)
          .from(
            ".ghost-word",
            { yPercent: 20, autoAlpha: 0, duration: 1.8, ease: "power3.out" },
            0.55,
          )
          .from(
            ".portrait",
            { scale: 0.92, y: 60, autoAlpha: 0, transformOrigin: "50% 100%", duration: 1.6 },
            0.75,
          )
          .from(".name-char", { yPercent: 110, duration: 1.2, stagger: 0.06 }, 1)
          .from(".hero-meta", { autoAlpha: 0, y: 12, duration: 0.8, stagger: 0.08 }, 1.1)
          .from(".intro-line", { yPercent: 110, duration: 1, stagger: 0.1 }, 1.15)
          .from(".hero-detail", { autoAlpha: 0, y: 18, duration: 0.9, stagger: 0.08 }, 1.35)
          .from(".float-card", { y: 40, autoAlpha: 0, duration: 1.1, stagger: 0.15 }, 1.35);

        // Pointer parallax: background type drifts against the cursor, portrait follows softly
        if (!window.matchMedia("(pointer: fine)").matches) return;
        const layers = [
          { el: ".ghost-word", depth: -22 },
          { el: ".portrait-wrap", depth: 8 },
        ].map(({ el, depth }) => ({
          depth,
          x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
        }));

        let frame = 0;
        const onMove = (e: PointerEvent) => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            for (const l of layers) {
              l.x(nx * l.depth);
              l.y(ny * l.depth * 0.5);
            }
          });
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => {
          cancelAnimationFrame(frame);
          window.removeEventListener("pointermove", onMove);
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-reveal]", { autoAlpha: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="home" className="relative p-2 sm:p-3 lg:p-4">
      {/* Main canvas with thin rectangular border */}
      <div
        data-reveal
        className="hero-canvas relative isolate h-[calc(100svh-1rem)] min-h-[620px] max-h-[980px] overflow-hidden rounded-[3px] border border-on-canvas/40 bg-canvas sm:h-[calc(100svh-1.5rem)] lg:h-[calc(100svh-2rem)] lg:min-h-[720px]"
      >
        <GridOverlay columns={[25, 50, 75]} rows={[10, 50, 88]} className="lg:hidden" />
        <GridOverlay
          columns={[16.666, 33.333, 50, 66.666, 83.333]}
          rows={[12, 46, 84]}
          className="hidden lg:block"
        />

        <SiteNav />

        {/* Ghost word behind portrait */}
        <div className="pointer-events-none absolute inset-x-0 top-[41%] sm:top-[36%] lg:top-[14%] xl:top-[12%] z-0 flex justify-center select-none overflow-hidden">
          <span
            data-reveal
            aria-hidden
            className="ghost-word type-ghost whitespace-nowrap text-[17vw] sm:text-[15vw] lg:text-[clamp(9rem,14vw,17rem)] font-black text-center"
          >
            Engineer
          </span>
        </div>

        {/* Portrait — centred, the main visual focus */}
        <div className="portrait-wrap pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-[58%] sm:h-[66%] md:h-[74%] lg:h-[86%] xl:h-[90%] items-end justify-center will-change-transform">
          <div
            data-reveal
            className="portrait portrait-shadow h-full flex items-end justify-center"
          >
            <Portrait {...PORTRAIT} />
          </div>
        </div>

        {/* Wordmark across the bottom — nothing overlaps it */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center overflow-hidden">
          <p
            aria-hidden
            className="type-mega flex translate-y-[6%] justify-center text-center text-[24vw] sm:text-[20vw] md:text-[18vw] lg:text-[clamp(8.5rem,15vw,17rem)] text-on-canvas select-none"
          >
            {NAME.split("").map((ch, i) => (
              <span key={i} data-reveal className="name-char inline-block">
                {ch}
              </span>
            ))}
          </p>
        </div>

        {/* Intro — top left on every size */}
        <div className="absolute left-5 right-5 top-[12%] z-30 sm:left-8 sm:top-[13%] lg:left-10 lg:right-auto lg:top-[20%] xl:left-14 lg:max-w-[27rem] xl:max-w-[31rem]">
          <div data-reveal className="hero-meta">
            <Availability />
          </div>
          <h1 className="mt-4 lg:mt-6">
            <span
              data-reveal
              className="hero-meta block text-[11px] font-semibold uppercase tracking-[0.2em] text-on-canvas/80 sm:text-xs"
            >
              {PROFILE.name} · Diploma in EEE
            </span>
            <span className="mt-2 block font-display text-[1.65rem] font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-on-canvas sm:text-[2rem] lg:text-[1.75rem] xl:text-[2rem] 2xl:text-[2.3rem]">
              {INTRO_LINES.map((line) => (
                <span key={line} className="block overflow-hidden pb-[0.04em]">
                  <span data-reveal className="intro-line block">
                    {line}
                  </span>
                </span>
              ))}
            </span>
          </h1>

          {/* Desktop details live in the left column */}
          <div className="hidden lg:block">
            <p
              data-reveal
              className="hero-detail mt-5 max-w-[24rem] text-[15px] leading-relaxed text-on-canvas/90"
            >
              {LEDE}
            </p>
            <div data-reveal className="hero-detail mt-6">
              <Actions />
            </div>
            <div
              data-reveal
              className="hero-detail mt-7 max-w-[21rem] border-t border-on-canvas/30 pt-4 text-on-canvas"
            >
              <Stats />
            </div>
          </div>
        </div>

        {/* Location — bottom left */}
        <div className="pointer-events-none absolute bottom-4 left-4 z-30 hidden sm:bottom-6 sm:left-8 sm:block lg:bottom-7 lg:left-10">
          <p
            data-reveal
            className="hero-meta flex items-center gap-1.5 text-xs font-medium tracking-wider text-on-canvas/85 select-none sm:text-sm"
          >
            <MapPin className="size-3.5" />
            {PROFILE.locationShort} · © 2026
          </p>
        </div>

        {/* Scroll cue — bottom right */}
        <div className="absolute bottom-6 right-8 z-30 hidden lg:bottom-7 lg:right-10 lg:block">
          <ScrollLink
            href="#about"
            data-reveal
            className="hero-meta group flex items-center gap-2 text-sm font-medium tracking-wider text-on-canvas/85 hover:text-on-canvas"
          >
            Scroll
            <span className="flex size-8 items-center justify-center rounded-full border border-on-canvas/50 transition-colors group-hover:bg-on-canvas group-hover:text-paper-foreground">
              <ArrowDown className="size-3.5 animate-bounce" />
            </span>
          </ScrollLink>
        </div>
      </div>

      {/* Phone & tablet: details flow beneath the canvas */}
      <div className="mt-2 grid gap-2 lg:hidden">
        <div className="rounded-2xl bg-ink p-5 text-ink-foreground shadow-ink sm:p-6">
          <p className="text-[15px] leading-relaxed text-ink-foreground/85">{LEDE}</p>
          <Actions tone="ink" className="mt-5 [&>*]:flex-1 [&>*]:justify-center" />
          <Stats tone="ink" className="mt-6 border-t border-ink-foreground/15 pt-4" />
        </div>
      </div>

      {/* One live figure: floats in the canvas on desktop, flows below it on smaller screens */}
      <div
        data-reveal
        className="float-card mt-2 lg:absolute lg:right-10 lg:top-[14%] lg:z-30 lg:mt-0 lg:w-[23rem] xl:right-14 xl:w-[27rem] 2xl:w-[30rem]"
      >
        <DbBoardFigure className="shadow-float [&_.db-plate]:rounded-2xl" />
      </div>

      <div className="mt-2 lg:hidden">
        <ContactCard thumbnail={PORTRAIT_SRC} />
      </div>
    </section>
  );
}
