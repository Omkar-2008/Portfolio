import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ClipboardCheck, Cpu, PenTool, PlugZap, type LucideIcon } from "lucide-react";
import { Format, Hub, Loupe, Plug } from "@lucasmarkes/hairline/react";

import { Counter } from "@/components/motion/Counter";
import { SKILL_GROUPS, TOOLCHAIN, type SkillGroup } from "@/data/profile";
import { Panel } from "./Panel";
import { SectionHeading } from "./SectionHeading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ICONS: Record<SkillGroup["icon"], LucideIcon> = {
  drafting: PenTool,
  wiring: PlugZap,
  embedded: Cpu,
  testing: ClipboardCheck,
};

/**
 * Hairline figures (MIT, hairline.lucasmarkes.com): one per discipline, each a
 * small machine that answers the pointer and plays on its own until touched.
 */
const FIGURES: Record<SkillGroup["icon"], { Figure: typeof Plug; label: string }> = {
  drafting: {
    Figure: Format,
    label: "Crooked lines snapping square to their indents, like a drawing being drafted",
  },
  wiring: { Figure: Plug, label: "A wall socket with a plug drawn up towards it on its cord" },
  embedded: {
    Figure: Hub,
    label: "A hub with eight linked tiles, like a microcontroller and its sensors",
  },
  testing: {
    Figure: Loupe,
    label: "A stand loupe passing over a ruled sheet, inspecting it line by line",
  },
};

/** Checkerboard of light and dark cards on the orange canvas. */
const CARD_TONE = ["light", "dark", "dark", "light"] as const;

export function Skills() {
  return (
    <Panel id="skills" tone="canvas" index="03" label="Skills">
      <SectionHeading
        lines={["My technical", "arsenal."]}
        accentClass="text-primary"
        aside={
          <p className="max-w-sm text-sm leading-relaxed text-on-canvas/85">
            Four disciplines I practise across drafting, installation, embedded control and quality
            assurance.
          </p>
        }
      />

      <div className="mt-14 grid gap-3 md:grid-cols-2 lg:mt-20">
        {SKILL_GROUPS.map((group, i) => (
          <SkillCard key={group.id} group={group} index={i} tone={CARD_TONE[i] ?? "light"} />
        ))}
      </div>

      {/* Toolchain */}
      <div
        data-reveal-item
        className="mt-3 grid gap-6 rounded-2xl border border-on-canvas/30 bg-ink/10 p-6 backdrop-blur-[2px] sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-10"
      >
        <div className="lg:col-span-3">
          <p className="type-eyebrow text-[0.65rem] text-on-canvas/75">Toolchain</p>
          <p className="mt-2 font-display text-3xl font-black uppercase tracking-tight">
            {TOOLCHAIN.length} tools<span className="text-ink">.</span>
          </p>
        </div>
        <ul className="flex flex-wrap gap-2 lg:col-span-9">
          {TOOLCHAIN.map((tool) => (
            <li
              key={tool}
              className="cursor-default rounded-full border border-on-canvas/45 px-4 py-2 text-sm font-semibold transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-ink-foreground"
            >
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}

type SkillCardProps = { group: SkillGroup; index: number; tone: "light" | "dark" };

function SkillCard({ group, index, tone }: SkillCardProps) {
  const ref = useRef<HTMLElement>(null);
  const Icon = ICONS[group.icon];
  const figure = FIGURES[group.icon];
  const Figure = figure.Figure;
  const dark = tone === "dark";

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".skill-fill",
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.12,
            scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <article
      ref={ref}
      data-reveal-item
      className={`group relative flex flex-col overflow-hidden rounded-2xl p-6 shadow-float transition-transform duration-500 ease-out hover:-translate-y-1 sm:p-8 lg:p-10 ${
        dark ? "bg-ink text-ink-foreground" : "bg-paper text-paper-foreground"
      }`}
    >
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform duration-500 group-hover:-rotate-6">
            <Icon className="size-5" />
          </span>
          <p
            className={`type-eyebrow text-[0.62rem] ${dark ? "text-ink-foreground/50" : "text-paper-foreground/50"}`}
          >
            Discipline 0{index + 1}
          </p>
        </div>
        <Figure
          play
          intensity={0.6}
          theme={dark ? "dark" : "light"}
          label={figure.label}
          className={`skill-figure -mr-2 -mt-2 size-28 shrink-0 sm:size-32 lg:-mr-4 lg:-mt-4 lg:size-40 ${dark ? "skill-figure-dark" : "skill-figure-light"}`}
        />
      </div>

      <h3 className="relative mt-6 font-display text-[clamp(1.6rem,2.8vw,2.4rem)] font-black uppercase leading-[0.95] tracking-[-0.025em]">
        {group.title}
      </h3>
      <p
        className={`relative mt-3 max-w-md text-sm leading-relaxed ${dark ? "text-ink-foreground/65" : "text-paper-foreground/65"}`}
      >
        {group.description}
      </p>

      <ul className="relative mt-8 space-y-5">
        {group.skills.map((skill) => (
          <li key={skill.name}>
            <div className="flex items-baseline justify-between gap-4 text-sm font-semibold">
              <span>{skill.name}</span>
              <span className="font-display text-base font-extrabold">
                <Counter value={skill.level} duration={1.8} />%
              </span>
            </div>
            <div
              role="meter"
              aria-label={skill.name}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={skill.level}
              className={`relative mt-2 h-2 overflow-hidden rounded-full ${dark ? "bg-on-canvas/10" : "bg-paper-foreground/8"}`}
            >
              <span
                className="skill-fill absolute inset-y-0 left-0 origin-left rounded-full bg-primary"
                style={{ width: `${skill.level}%` }}
              />
              {/* Instrument ticks every 10% */}
              <span
                aria-hidden
                className="absolute inset-0"
                style={{
                  backgroundImage: `repeating-linear-gradient(90deg, transparent 0 calc(10% - 1px), ${
                    dark ? "oklch(0.16 0.02 40 / 0.6)" : "oklch(1 0 0 / 0.7)"
                  } calc(10% - 1px) 10%)`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
