import { BadgeCheck, Building2, Check } from "lucide-react";

import { TRAINING } from "@/data/profile";
import { Panel } from "./Panel";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <Panel id="experience" tone="paper" index="05" label="Experience">
      <SectionHeading
        lines={["Industry", "experience."]}
        aside={
          <p className="max-w-sm text-sm leading-relaxed text-paper-foreground/65">
            Hands-on industrial training that put verification and quality standards into daily practice.
          </p>
        }
      />

      <article
        data-reveal-item
        className="mt-14 grid overflow-hidden rounded-2xl border border-paper-foreground/10 shadow-float lg:mt-20 lg:grid-cols-12"
      >
        {/* Company block */}
        <div className="relative flex flex-col justify-between gap-10 overflow-hidden bg-ink p-6 text-ink-foreground sm:p-8 lg:col-span-5 lg:p-10">
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full bg-primary/25 blur-3xl"
          />
          <div className="relative flex items-center justify-between gap-4">
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Building2 className="size-5" />
            </span>
            <span className="type-eyebrow flex items-center gap-1.5 rounded-full border border-on-canvas/20 px-3 py-1.5 text-[0.6rem]">
              <BadgeCheck className="size-3.5 text-primary" />
              {TRAINING.status}
            </span>
          </div>
          <div className="relative">
            <p className="type-eyebrow text-[0.62rem] text-primary">{TRAINING.role}</p>
            <h3 className="type-display mt-3 text-[clamp(2.75rem,6vw,5rem)]">{TRAINING.company}</h3>
            <p className="mt-4 max-w-xs text-sm text-ink-foreground/60">
              Manual software testing · Verification standards · Technical workflows
            </p>
          </div>
        </div>

        {/* Details + coverage timeline */}
        <div className="bg-paper p-6 sm:p-8 lg:col-span-7 lg:p-10">
          <p className="text-base leading-relaxed text-paper-foreground/75 sm:text-lg">{TRAINING.description}</p>

          <div className="mt-8 flex items-center justify-between gap-4">
            <p className="type-eyebrow text-[0.62rem] text-paper-foreground/50">Training coverage</p>
            <p className="type-eyebrow text-[0.62rem] text-primary">
              {TRAINING.highlights.length} / {TRAINING.highlights.length} modules
            </p>
          </div>

          <ol className="relative mt-5">
            <span aria-hidden className="absolute bottom-5 left-[15px] top-5 w-px bg-primary/30" />
            {TRAINING.highlights.map((item, i) => (
              <li
                key={item}
                className="group/step relative flex items-center gap-5 py-2.5"
              >
                <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-paper text-[0.65rem] font-bold text-primary transition-colors duration-300 group-hover/step:bg-primary group-hover/step:text-primary-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex flex-1 items-center justify-between gap-4 rounded-xl border border-paper-foreground/8 bg-bone/60 px-4 py-3 transition-[border-color,translate] duration-300 group-hover/step:translate-x-1 group-hover/step:border-primary/40">
                  <span className="font-display text-base font-extrabold uppercase tracking-tight sm:text-lg">
                    {item}
                  </span>
                  <Check className="size-4 shrink-0 text-primary" />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </article>
    </Panel>
  );
}
