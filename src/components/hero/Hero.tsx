import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import arduinoImage from "@/assets/arduino-control.jpg";
import omkarPortrait from "@/assets/omkar-portrait.png";
import { ContactCard } from "./ContactCard";
import { GridOverlay } from "./GridOverlay";
import { Portrait } from "./Portrait";
import { ProjectCard } from "./ProjectCard";
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
const PROJECT = { title: "Arduino Control", category: "Embedded Systems" };

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        tl.set("[data-reveal]", { autoAlpha: 1 })
          .from(".hero-canvas", { autoAlpha: 0, duration: 0.9, ease: "power2.out" }, 0)
          .from(".grid-line-v", { scaleY: 0, transformOrigin: "top", duration: 1.6, stagger: 0.07 }, 0.2)
          .from(".grid-line-h", { scaleX: 0, transformOrigin: "left", duration: 1.6, stagger: 0.09 }, 0.3)
          .from(".grid-plus", { scale: 0, rotate: -90, autoAlpha: 0, duration: 0.8, stagger: 0.015 }, 0.8)
          .from(".nav-item", { yPercent: -120, autoAlpha: 0, duration: 1, stagger: 0.06 }, 0.45)
          .from(".ghost-word", { yPercent: 20, autoAlpha: 0, duration: 1.8, ease: "power3.out" }, 0.55)
          .from(
            ".portrait",
            { scale: 0.92, y: 60, autoAlpha: 0, transformOrigin: "50% 100%", duration: 1.6 },
            0.75,
          )
          .from(".name-char", { yPercent: 110, duration: 1.2, stagger: 0.06 }, 1)
          .from(".copyright", { autoAlpha: 0, x: -16, duration: 0.8 }, 1.2)
          .from(".intro-line", { yPercent: 110, duration: 1, stagger: 0.1 }, 1.2)
          .from(".float-card", { y: 40, autoAlpha: 0, duration: 1.1, stagger: 0.15 }, 1.35);

        // Gentle idle drift on the floating cards
        gsap.to(".float-card-inner", {
          y: -8,
          duration: 3.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: 0.9,
          delay: 2.6,
        });

        // Pointer parallax: background type drifts against cursor, portrait follows softly
        if (!window.matchMedia("(pointer: fine)").matches) return;
        const layers = [
          { el: ".ghost-word", depth: -22 },
          { el: ".portrait-wrap", depth: 8 },
          { el: ".float-card", depth: 14 },
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
    <section ref={root} id="home" className="p-2 sm:p-3 lg:p-4">
      {/* Main canvas with thin rectangular border */}
      <div
        data-reveal
        className="hero-canvas relative isolate h-[calc(100svh-1rem)] min-h-[640px] overflow-hidden rounded-[3px] border border-on-canvas/40 bg-canvas sm:h-[calc(100svh-1.5rem)] lg:h-[calc(100svh-2rem)] lg:min-h-[720px]"
      >
        <GridOverlay columns={[25, 50, 75]} rows={[11, 58, 90]} className="lg:hidden" />
        <GridOverlay
          columns={[16.666, 33.333, 50, 66.666, 83.333]}
          rows={[12, 46, 84]}
          className="hidden lg:block"
        />

        <SiteNav />

        {/* Ghost word behind portrait */}
        <div className="pointer-events-none absolute inset-x-0 top-[26%] sm:top-[22%] md:top-[18%] lg:top-[14%] xl:top-[12%] z-0 flex justify-center select-none overflow-hidden">
          <span
            data-reveal
            aria-hidden
            className="ghost-word type-ghost whitespace-nowrap text-[17vw] sm:text-[15vw] lg:text-[clamp(9rem,14vw,17rem)] font-black text-center"
          >
            Engineer
          </span>
        </div>

        {/* Portrait — centered, large, naturally proportioned, main visual focus */}
        <div className="portrait-wrap pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-[68%] sm:h-[74%] md:h-[80%] lg:h-[87%] xl:h-[91%] items-end justify-center will-change-transform">
          <div data-reveal className="portrait portrait-shadow h-full flex items-end justify-center">
            <Portrait {...PORTRAIT} />
          </div>
        </div>

        {/* Balanced OMKAR typography centered at the bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[-1.5%] sm:bottom-[-2%] z-20 flex justify-center overflow-hidden pb-[0.02em]">
          <h1 className="sr-only">Omkar Potnuru — Electrical &amp; Electronics Engineering</h1>
          <p
            aria-hidden
            className="type-mega flex justify-center text-center text-[22vw] sm:text-[20vw] md:text-[18vw] lg:text-[clamp(8.5rem,15vw,17rem)] text-on-canvas select-none"
          >
            {NAME.split("").map((ch, i) => (
              <span key={i} data-reveal className="name-char inline-block">
                {ch}
              </span>
            ))}
          </p>
        </div>

        {/* Copyright badge bottom left */}
        <div className="pointer-events-none absolute bottom-4 left-4 sm:bottom-6 sm:left-8 lg:bottom-7 lg:left-10 z-30">
          <p data-reveal className="copyright text-xs sm:text-sm font-medium tracking-wider text-on-canvas/80 select-none">
            © 2026
          </p>
        </div>

        {/* Intro statement — left side */}
        <div className="absolute left-5 sm:left-8 lg:left-10 xl:left-14 top-[17%] sm:top-[22%] lg:top-[36%] z-20 max-w-[14rem] sm:max-w-[18rem] lg:max-w-[20rem]">
          <p className="text-[13px] sm:text-[15px] lg:text-[17px] font-medium uppercase leading-snug tracking-[0.03em] text-on-canvas/90">
            {INTRO_LINES.map((line) => (
              <span key={line} className="block overflow-hidden">
                <span data-reveal className="intro-line block">
                  {line}
                </span>
              </span>
            ))}
          </p>
        </div>

        {/* Floating project card — top right */}
        <div
          data-reveal
          className="float-card absolute right-4 sm:right-6 md:right-8 lg:right-10 xl:right-14 top-[15%] sm:top-[18%] lg:top-[20%] xl:top-[22%] z-30 hidden sm:block w-44 md:w-48 lg:w-56 xl:w-60"
        >
          <div className="float-card-inner">
            <ProjectCard image={arduinoImage} {...PROJECT} />
          </div>
        </div>

        {/* Floating contact card — bottom right */}
        <div
          data-reveal
          className="float-card absolute bottom-6 right-4 sm:right-6 md:right-8 lg:right-10 xl:right-14 z-30 hidden lg:block w-[19rem] lg:w-[21rem] xl:w-[23rem]"
        >
          <div className="float-card-inner">
            <ContactCard thumbnail={PORTRAIT_SRC} />
          </div>
        </div>
      </div>

      {/* Phone & tablet: cards flow beneath the canvas */}
      <div className="mt-2 grid gap-2 sm:grid-cols-1 lg:hidden">
        <ProjectCard image={arduinoImage} {...PROJECT} variant="row" className="sm:hidden" />
        <ContactCard thumbnail={PORTRAIT_SRC} />
      </div>
    </section>
  );
}
