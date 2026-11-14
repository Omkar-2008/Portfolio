import type { ReactNode } from "react";

type SectionHeadingProps = {
  /** One string per visual line; the trailing punctuation of the last line is accented. */
  lines: string[];
  /** Colour class for the accented punctuation. */
  accentClass?: string;
  /** Optional supporting copy, aligned to the heading's baseline on wide screens. */
  aside?: ReactNode;
  className?: string;
  size?: "lg" | "xl";
};

const SIZES = {
  lg: "text-[clamp(2.5rem,10.5vw,8.5rem)]",
  xl: "text-[clamp(2.75rem,12.5vw,11rem)]",
};

export function SectionHeading({
  lines,
  accentClass = "text-primary",
  aside,
  className = "",
  size = "lg",
}: SectionHeadingProps) {
  const last = lines.length - 1;

  return (
    <header className={`grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10 ${className}`}>
      <h2 className={`type-display lg:col-span-12 xl:col-span-9 ${SIZES[size]}`}>
        {lines.map((line, i) => {
          const punct = i === last ? line.match(/[.?!]$/)?.[0] : undefined;
          const text = punct ? line.slice(0, -1) : line;
          return (
            // pt/pb keep caps and the accent from being clipped by the reveal mask
            <span key={line} className="block overflow-hidden pb-[0.06em] pt-[0.02em]">
              <span data-reveal-item="line" className="block">
                {text}
                {punct && <span className={accentClass}>{punct}</span>}
              </span>
            </span>
          );
        })}
      </h2>
      {aside && (
        <div data-reveal-item className="lg:col-span-6 lg:col-start-7 xl:col-span-3 xl:col-start-10 xl:pb-3">
          {aside}
        </div>
      )}
    </header>
  );
}
