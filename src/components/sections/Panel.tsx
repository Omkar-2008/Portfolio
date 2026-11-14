import type { ReactNode } from "react";
import { Plus } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";

export type Tone = "paper" | "ink" | "canvas";

const TONES: Record<Tone, { surface: string; meta: string; rule: string; mark: string }> = {
  paper: {
    surface: "bg-bone bg-blueprint-light text-paper-foreground border-paper-foreground/10",
    meta: "text-paper-foreground/55",
    rule: "bg-paper-foreground/10",
    mark: "text-paper-foreground/35",
  },
  ink: {
    surface: "bg-ink bg-blueprint text-ink-foreground border-on-canvas/10",
    meta: "text-ink-foreground/50",
    rule: "bg-on-canvas/10",
    mark: "text-ink-foreground/30",
  },
  canvas: {
    surface: "bg-canvas text-on-canvas border-on-canvas/40",
    meta: "text-on-canvas/75",
    rule: "bg-on-canvas/25",
    mark: "text-on-canvas/60",
  },
};

type PanelProps = {
  id: string;
  tone: Tone;
  /** Shown in the panel's top meta strip, e.g. "01" + "About". */
  index?: string;
  label?: string;
  children: ReactNode;
  /** Extra classes on the inner content container. */
  className?: string;
  /** Full-bleed content rendered before the padded container (e.g. a marquee band). */
  before?: ReactNode;
};

/**
 * A framed section that sits on the ember backdrop like the hero canvas does:
 * same outer gutter, hairline border and 3px radius, so the page reads as a
 * stack of drawing sheets.
 */
export function Panel({ id, tone, index, label, children, className = "", before }: PanelProps) {
  const t = TONES[tone];
  return (
    <Reveal as="section" id={id} className="px-2 pb-2 sm:px-3 sm:pb-3 lg:px-4 lg:pb-4">
      <div className={`relative isolate overflow-hidden rounded-[3px] border ${t.surface}`}>
        {before}

        {index && label && (
          <div
            className={`relative flex items-center justify-between gap-4 px-5 pt-5 sm:px-8 sm:pt-6 lg:px-10 xl:px-14 ${t.meta}`}
          >
            <p className="type-eyebrow flex items-center gap-3">
              <span>({index})</span>
              <span className={`hidden h-px w-10 sm:block ${t.rule}`} />
              <span>{label}</span>
            </p>
            <p className="type-eyebrow hidden sm:block">Omkar Potnuru — Portfolio ©2026</p>
          </div>
        )}

        {/* Registration marks in the corners, echoing the hero grid */}
        {(["left-3 top-3", "right-3 top-3", "bottom-3 left-3", "bottom-3 right-3"] as const).map((pos) => (
          <Plus
            key={pos}
            aria-hidden
            strokeWidth={1.5}
            className={`pointer-events-none absolute size-3 ${pos} ${t.mark}`}
          />
        ))}

        <div
          className={`relative mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28 xl:px-14 ${className}`}
        >
          {children}
        </div>
      </div>
    </Reveal>
  );
}
