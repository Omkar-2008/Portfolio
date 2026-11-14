import type { ReactNode } from "react";
import { Plus } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";

export type Tone = "paper" | "ink" | "canvas";

/**
 * Three surfaces, all lifted from the hero:
 *  - canvas: the hero's orange gradient
 *  - ink:    the hero's deep-red ember frame (cards on it use near-black ink, like the hero contact card)
 *  - paper:  the warm white of the hero's project card
 */
const TONES: Record<Tone, { surface: string; meta: string; rule: string; mark: string; line: string }> = {
  paper: {
    surface: "bg-paper text-paper-foreground border-on-canvas/40",
    meta: "text-paper-foreground/55",
    rule: "bg-paper-foreground/10",
    mark: "text-paper-foreground/35",
    line: "bg-paper-foreground/[0.07]",
  },
  ink: {
    surface: "bg-frame text-ink-foreground border-on-canvas/25",
    meta: "text-ink-foreground/55",
    rule: "bg-on-canvas/15",
    mark: "text-on-canvas/45",
    line: "bg-on-canvas/[0.08]",
  },
  canvas: {
    surface: "bg-canvas text-on-canvas border-on-canvas/40",
    meta: "text-on-canvas/75",
    rule: "bg-on-canvas/25",
    mark: "text-on-canvas/60",
    line: "bg-grid",
  },
};

/** Same column rhythm as the hero's GridOverlay. */
const GRID_COLS_SM = [25, 50, 75];
const GRID_COLS_LG = [16.666, 33.333, 50, 66.666, 83.333];

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

        {/* Hairline columns, echoing the hero grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {GRID_COLS_SM.map((x) => (
            <span key={`s${x}`} className={`absolute inset-y-0 w-px lg:hidden ${t.line}`} style={{ left: `${x}%` }} />
          ))}
          {GRID_COLS_LG.map((x) => (
            <span key={`l${x}`} className={`absolute inset-y-0 hidden w-px lg:block ${t.line}`} style={{ left: `${x}%` }} />
          ))}
        </div>

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
