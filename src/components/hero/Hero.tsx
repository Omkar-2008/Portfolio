import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import arduinoImage from "@/assets/arduino-control.jpg";
import portraitLarge from "@/assets/omkar-hero-965.webp.asset.json";
import portraitSmall from "@/assets/omkar-hero-720.webp.asset.json";
import portraitThumb from "@/assets/omkar-thumb.webp.asset.json";
import { ContactCard } from "./ContactCard";
import { GridOverlay } from "./GridOverlay";
import { Portrait } from "./Portrait";
import { ProjectCard } from "./ProjectCard";
import { SiteNav } from "./SiteNav";

gsap.registerPlugin(useGSAP);

const PORTRAIT = {
  src: portraitLarge.url,
  srcSet: `${portraitSmall.url} 720w, ${portraitLarge.url} 965w`,
  sizes: "(min-width: 1024px) 40vw, 100vw",
  width: 965,
  height: 1276,
};
const PORTRAIT_SRC = portraitThumb.url;

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

        // Pointer parallax: background type drifts against the cursor, portrait barely follows it.
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
        <div className="absolute inset-x-0 top-[38%] z-0 flex justify-center sm:top-[34%] lg:top-[20%]">
          <span
            data-reveal
            aria-hidden
            className="ghost-word type-ghost select-none whitespace-nowrap text-[16vw] lg:text-[clamp(10rem,14.5vw,17rem)]"
          >
            Engineer
          </span>
        </div>

        {/* Portrait — right-anchored on small screens so the photo's cropped shoulder sits off-canvas */}
        <div className="portrait-wrap absolute bottom-0 right-0 z-10 h-[60%] will-change-transform sm:h-[64%] lg:right-auto lg:left-[57%] lg:h-[86%] lg:-translate-x-1/2">
          <div data-reveal className="portrait portrait-shadow h-full">
            <Portrait {...PORTRAIT} className="lg:portrait-fade" />
          </div>
        </div>

        {/* Name overlaps only the lower torso, so the face stays clear */}
        <div className="pointer-events-none absolute bottom-[3%] left-4 z-20 sm:left-8 lg:bottom-[-1.5%] lg:left-10">
          <p data-reveal className="copyright mb-2 text-sm font-medium text-on-canvas lg:mb-4">
            © 2026
          </p>
          <h1 className="sr-only">Omkar Potnuru — Electrical &amp; Electronics Engineering</h1>
          <p
            aria-hidden
            className="type-mega flex overflow-hidden pb-[0.04em] text-[23vw] text-on-canvas lg:text-[clamp(8rem,14vw,16rem)]"
          >
            {NAME.split("").map((ch, i) => (
              <span key={i} data-reveal className="name-char inline-block">
                {ch}
              </span>
            ))}
          </p>
        </div>

        {/* Intro statement */}
        <div className="absolute left-5 top-[15%] z-20 sm:left-8 lg:left-10 lg:top-[50%]">
          <p className="max-w-[16rem] text-[15px] font-medium uppercase leading-snug tracking-[0.02em] text-on-canvas sm:max-w-[22rem] sm:text-base lg:text-[18px]">
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
        <div
          data-reveal
          className="float-card absolute right-4 top-[13%] z-30 hidden w-44 sm:block md:right-8 lg:right-10 lg:top-[24%] lg:w-56 xl:w-60"
        >
          <div className="float-card-inner">
            <ProjectCard image={arduinoImage} {...PROJECT} />
          </div>
        </div>

        {/* Floating contact card */}
        <div
          data-reveal
          className="float-card absolute bottom-10 right-10 z-30 hidden w-[21rem] lg:block xl:w-[23rem]"
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
