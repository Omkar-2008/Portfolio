import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import arduinoImage from "@/assets/arduino-control.jpg";
import { ContactCard } from "./ContactCard";
import { GridOverlay } from "./GridOverlay";
import { Portrait } from "./Portrait";
import { ProjectCard } from "./ProjectCard";
import { SiteNav } from "./SiteNav";

gsap.registerPlugin(useGSAP);

/** Set to the portrait cut-out URL once omkar-hero.png is uploaded. */
const PORTRAIT_SRC: string | undefined = undefined;

const INTRO_LINES = ["I build practical", "engineering solutions", "through technology."];
const NAME = "OMKAR";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        tl.set("[data-reveal]", { autoAlpha: 1 })
          .from(".grid-line-v", { scaleY: 0, transformOrigin: "top", duration: 1.4, stagger: 0.06 }, 0)
          .from(".grid-line-h", { scaleX: 0, transformOrigin: "left", duration: 1.4, stagger: 0.08 }, 0.1)
          .from(".grid-plus", { scale: 0, rotate: -90, autoAlpha: 0, duration: 0.8, stagger: 0.015 }, 0.5)
          .from(".nav-item", { y: -24, autoAlpha: 0, duration: 0.9, stagger: 0.06 }, 0.3)
          .from(".ghost-word", { yPercent: 25, autoAlpha: 0, duration: 1.6 }, 0.35)
          .from(".portrait", { y: 120, autoAlpha: 0, duration: 1.6 }, 0.55)
          .from(".name-char", { yPercent: 110, duration: 1.2, stagger: 0.06 }, 0.8)
          .from(".copyright", { autoAlpha: 0, x: -16, duration: 0.8 }, 1)
          .from(".intro-line", { yPercent: 110, duration: 1, stagger: 0.1 }, 1)
          .from(".float-card", { y: 50, autoAlpha: 0, scale: 0.94, duration: 1.1, stagger: 0.15 }, 1.15);

        // Idle drift on the floating cards
        gsap.to(".float-card-inner", {
          y: -10,
          duration: 3.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: 0.8,
          delay: 2.4,
        });

        // Subtle pointer parallax (desktop pointers only)
        if (!window.matchMedia("(pointer: fine)").matches) return;
        const layers = [
          { el: ".ghost-word", depth: -18 },
          { el: ".portrait-wrap", depth: 10 },
          { el: ".float-card", depth: 22 },
        ].map(({ el, depth }) => ({
          depth,
          x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
        }));

        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          layers.forEach((l) => {
            l.x(nx * l.depth);
            l.y(ny * l.depth * 0.6);
          });
        };
        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
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
      <div className="relative isolate h-[calc(100svh-1rem)] min-h-[640px] overflow-hidden rounded-[3px] border border-on-canvas/40 bg-canvas sm:h-[calc(100svh-1.5rem)] lg:h-[calc(100svh-2rem)] lg:min-h-[720px]">
        <GridOverlay columns={[25, 50, 75]} rows={[11, 58, 90]} className="lg:hidden" />
        <GridOverlay
          columns={[16.666, 33.333, 50, 66.666, 83.333]}
          rows={[12, 46, 84]}
          className="hidden lg:block"
        />

        <SiteNav />

        {/* Ghost word behind portrait */}
        <div className="absolute inset-x-0 top-[30%] z-0 flex justify-center overflow-hidden lg:top-[20%]">
          <span
            data-reveal
            aria-hidden
            className="ghost-word type-ghost select-none whitespace-nowrap text-[17vw] lg:text-[clamp(10rem,14.5vw,17rem)]"
          >
            Engineer
          </span>
        </div>

        {/* Name overlaps only the lower torso, so the face stays clear */}
        <div className="absolute bottom-[3%] left-4 z-20 sm:left-8 lg:bottom-[-1.5%] lg:left-10">
          <p data-reveal className="copyright mb-2 text-sm font-medium text-on-canvas lg:mb-4">
            © 2026
          </p>
          <h1 className="sr-only">Omkar Potnuru — Electrical &amp; Electronics Engineering</h1>
          <p aria-hidden className="type-mega flex overflow-hidden pb-[0.04em] text-[26vw] text-on-canvas lg:text-[clamp(8rem,14vw,16rem)]">
            {NAME.split("").map((ch, i) => (
              <span key={i} data-reveal className="name-char inline-block">
                {ch}
              </span>
            ))}
          </p>
        </div>

        {/* Portrait */}
        <div className="portrait-wrap absolute bottom-0 left-1/2 z-10 h-[64%] -translate-x-1/2 sm:h-[70%] lg:left-[57%] lg:h-[84%]">
          <div data-reveal className="portrait h-full">
            <Portrait src={PORTRAIT_SRC} />
          </div>
        </div>

        {/* Intro statement */}
        <div className="absolute left-5 top-[15%] z-20 sm:left-8 lg:left-10 lg:top-[50%]">
          <p className="max-w-[22rem] text-[15px] font-medium uppercase leading-snug tracking-[0.02em] text-on-canvas sm:text-base lg:text-[18px]">
            {INTRO_LINES.map((line) => (
              <span key={line} className="block overflow-hidden">
                <span data-reveal className="intro-line block">
                  {line}
                </span>
              </span>
            ))}
          </p>
        </div>

        {/* Floating project card */}
        <div data-reveal className="float-card absolute right-4 top-[14%] z-20 hidden w-44 sm:block md:right-8 lg:right-10 lg:top-[24%] lg:w-56 xl:w-60">
          <div className="float-card-inner">
            <ProjectCard image={arduinoImage} title="Arduino Control" category="Embedded Systems" />
          </div>
        </div>

        {/* Floating contact card */}
        <div data-reveal className="float-card absolute bottom-6 right-6 z-20 hidden w-[21rem] md:block lg:bottom-10 lg:right-10 xl:w-[23rem]">
          <div className="float-card-inner">
            <ContactCard thumbnail={PORTRAIT_SRC} />
          </div>
        </div>
      </div>

      {/* Mobile: cards flow beneath the canvas */}
      <div className="mt-2 grid gap-2 md:hidden">
        <ContactCard thumbnail={PORTRAIT_SRC} />
      </div>
    </section>
  );
}
