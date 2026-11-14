import { ArrowUpRight, Mail } from "lucide-react";

import { ScrollLink } from "@/components/motion/ScrollLink";
import { CONTACT, OPPORTUNITIES } from "@/data/profile";
import { Panel } from "./Panel";
import { SectionHeading } from "./SectionHeading";

export function CareerCta() {
  return (
    <Panel id="career" tone="canvas" before={<Ticker />}>
      <SectionHeading
        lines={["Ready to", "build what's", "next?"]}
        accentClass="text-ink"
        aside={<OpenBadge />}
      />

      <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-10">
        <div data-reveal-item className="lg:col-span-5">
          <p className="max-w-md text-lg font-medium leading-relaxed sm:text-xl">
            I&apos;m actively looking for opportunities to apply my engineering knowledge, learn from industry
            professionals and contribute to meaningful technical projects.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ScrollLink
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-sm font-semibold text-ink-foreground shadow-ink transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              Start a conversation
              <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-[rotate] duration-300 group-hover:rotate-45">
                <ArrowUpRight className="size-4" />
              </span>
            </ScrollLink>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-on-canvas/60 px-6 py-3.5 text-sm font-semibold transition-colors duration-300 hover:bg-paper hover:text-paper-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              <Mail className="size-4" />
              Email me
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p data-reveal-item className="type-eyebrow text-[0.65rem] text-on-canvas/80">
            Open to roles in
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {OPPORTUNITIES.map((role, i) => (
              <li
                key={role}
                data-reveal-item
                className="group flex items-center gap-4 rounded-xl bg-ink px-4 py-4 text-ink-foreground transition-[translate,background-color] duration-300 hover:-translate-y-0.5 hover:bg-ink-2 sm:px-5"
              >
                <span className="type-eyebrow text-[0.6rem] text-primary">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-sm font-semibold sm:text-[0.95rem]">{role}</span>
                <ArrowUpRight className="size-4 text-ink-foreground/30 transition-[color,rotate] duration-300 group-hover:rotate-45 group-hover:text-primary" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Panel>
  );
}

/** Black ticker band across the top of the panel. */
function Ticker() {
  const items = ["Open to opportunities", "Electrical engineering", "Automation", "Embedded systems", "Available 2026"];
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-6 px-6 font-display text-sm font-extrabold uppercase tracking-tight sm:text-base">
          {item}
          <span className="text-primary">✦</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="relative overflow-hidden border-b border-on-canvas/20 bg-ink py-3 text-ink-foreground">
      <div className="animate-marquee flex w-max">
        {row(false)}
        {row(true)}
        {row(true)}
        {row(true)}
      </div>
    </div>
  );
}

/** Slowly rotating "open to work" seal. */
function OpenBadge() {
  const text = "Open to work • Available 2026 • ";
  return (
    <div className="relative hidden size-36 xl:ml-auto xl:block 2xl:size-40">
      <svg viewBox="0 0 160 160" className="animate-spin-slow absolute inset-0 size-full" aria-hidden>
        <defs>
          <path id="seal-path" d="M80 80m-62 0a62 62 0 1 1 124 0a62 62 0 1 1-124 0" />
        </defs>
        {/* textLength stretches the phrase to exactly one lap of the circle (2π·62 ≈ 389) */}
        <text fill="currentColor" fontSize="12.5" fontWeight="700" style={{ textTransform: "uppercase" }}>
          <textPath href="#seal-path" textLength={386} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-[30%] flex items-center justify-center rounded-full bg-ink text-primary">
        <ArrowUpRight className="size-6" />
      </span>
    </div>
  );
}
