import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GraduationCap, MapPin, School } from "lucide-react";

import { DIPLOMA, SCHOOL } from "@/data/profile";
import { Panel } from "./Panel";
import { SectionHeading } from "./SectionHeading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Education() {
  const timeline = useRef<HTMLOListElement>(null);

  // The spine draws itself as the timeline scrolls through the viewport.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".timeline-progress",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: timeline.current, start: "top 75%", end: "bottom 60%", scrub: 0.6 },
          },
        );
      });
    },
    { scope: timeline },
  );

  return (
    <Panel id="education" tone="ink" index="02" label="Education">
      <SectionHeading
        lines={["My academic", "journey."]}
        aside={
          <p className="max-w-sm text-sm leading-relaxed text-ink-foreground/60">
            A diploma built on core electrical theory, hands-on labs and consistent academic performance.
          </p>
        }
      />

      <ol ref={timeline} className="relative mt-14 lg:mt-20">
        {/* Spine */}
        <span aria-hidden className="absolute bottom-6 left-[11px] top-3 w-px bg-on-canvas/12 md:left-[calc(25%-0.5px)]" />
        <span
          aria-hidden
          className="timeline-progress absolute bottom-6 left-[11px] top-3 w-px origin-top bg-primary md:left-[calc(25%-0.5px)]"
        />

        <TimelineItem
          marker="Now"
          period="Currently pursuing"
          active
          icon={<GraduationCap className="size-5" />}
        >
          <DiplomaCard />
        </TimelineItem>

        <TimelineItem marker="Before" period={SCHOOL.note} icon={<School className="size-5" />}>
          <div className="rounded-2xl border border-on-canvas/10 bg-ink-2 p-6 transition-colors duration-500 hover:border-on-canvas/25 sm:p-8">
            <p className="type-eyebrow text-[0.65rem] text-ink-foreground/50">Schooling</p>
            <h3 className="mt-3 font-display text-2xl font-extrabold uppercase leading-tight tracking-tight sm:text-3xl">
              {SCHOOL.title}
            </h3>
            <p className="mt-2 text-sm text-ink-foreground/60">{SCHOOL.note}</p>
          </div>
        </TimelineItem>
      </ol>
    </Panel>
  );
}

type TimelineItemProps = {
  marker: string;
  period: string;
  icon: ReactNode;
  active?: boolean;
  children: ReactNode;
};

function TimelineItem({ marker, period, icon, active, children }: TimelineItemProps) {
  return (
    <li data-reveal-item className="relative grid gap-5 pb-10 pl-12 last:pb-0 md:grid-cols-4 md:gap-10 md:pl-0">
      {/* Node */}
      <span
        aria-hidden
        className={`absolute left-0 top-1 flex size-[23px] items-center justify-center rounded-full border md:left-[calc(25%-11.5px)] ${
          active ? "border-primary bg-ink" : "border-on-canvas/25 bg-ink"
        }`}
      >
        <span className={`size-2 rounded-full ${active ? "animate-pulse bg-primary" : "bg-on-canvas/40"}`} />
      </span>

      {/* Left rail: when */}
      <div className="flex items-center gap-3 md:flex-col md:items-start md:pr-10 md:pt-0">
        <span className="flex size-10 items-center justify-center rounded-xl border border-on-canvas/15 text-primary">
          {icon}
        </span>
        <div>
          <p className="font-display text-2xl font-black uppercase tracking-tight md:mt-3 md:text-4xl">{marker}</p>
          <p className="type-eyebrow mt-1 text-[0.62rem] text-ink-foreground/50">{period}</p>
        </div>
      </div>

      <div className="md:col-span-3 md:pl-6">{children}</div>
    </li>
  );
}

function DiplomaCard() {
  return (
    <article className="overflow-hidden rounded-2xl border border-on-canvas/10 bg-ink-2 transition-colors duration-500 hover:border-primary/50">
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:p-10">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 type-eyebrow text-[0.62rem] text-primary">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            {DIPLOMA.status}
          </p>
          <h3 className="mt-5 max-w-2xl font-display text-[clamp(1.6rem,3.2vw,2.75rem)] font-black uppercase leading-[0.95] tracking-[-0.025em]">
            {DIPLOMA.title}
          </h3>
          <p className="mt-4 text-base font-semibold">{DIPLOMA.institute}</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-foreground/60">
            <MapPin className="size-3.5" />
            {DIPLOMA.location}
          </p>
        </div>

        {/* Score badge */}
        <div className="flex items-center gap-5 self-start rounded-2xl bg-canvas p-5 text-on-canvas lg:flex-col lg:items-start lg:gap-1 lg:p-6">
          <p className="type-mega text-6xl leading-none lg:text-7xl">{DIPLOMA.score}</p>
          <div>
            <p className="type-eyebrow text-[0.62rem]">CGPA</p>
            <p className="text-xs text-on-canvas/80">Academic score</p>
          </div>
        </div>
      </div>

      {/* Year progress */}
      <div className="border-t border-on-canvas/10 px-6 py-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between gap-4">
          <p className="type-eyebrow text-[0.62rem] text-ink-foreground/50">Programme progress</p>
          <p className="type-eyebrow text-[0.62rem] text-primary">
            Year {DIPLOMA.currentYear} / {DIPLOMA.years}
          </p>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {Array.from({ length: DIPLOMA.years }, (_, i) => {
            const current = i + 1 === DIPLOMA.currentYear;
            return (
              <span
                key={i}
                className={`h-1.5 rounded-full bg-primary ${current ? "animate-pulse" : ""}`}
              />
            );
          })}
        </div>
      </div>

      {/* Coursework */}
      <div className="border-t border-on-canvas/10 px-6 py-6 sm:px-8 lg:px-10 lg:py-8">
        <p className="font-display text-lg font-extrabold uppercase tracking-tight">{DIPLOMA.lead}</p>
        <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
          {DIPLOMA.coursework.map((course, i) => (
            <li
              key={course}
              className="group/course flex items-center gap-4 border-b border-on-canvas/8 py-3 text-sm text-ink-foreground/80 transition-colors hover:text-ink-foreground"
            >
              <span className="type-eyebrow w-6 text-[0.6rem] text-primary">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1">{course}</span>
              <span className="h-px w-0 bg-primary transition-[width] duration-500 group-hover/course:w-6" />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
