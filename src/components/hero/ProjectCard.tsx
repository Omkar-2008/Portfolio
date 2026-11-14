import { ArrowUpRight } from "lucide-react";

import { ScrollLink } from "@/components/motion/ScrollLink";
import { useTilt } from "@/components/motion/useTilt";

type ProjectCardProps = {
  image: string;
  title: string;
  category: string;
  /** "stack" = floating card in the hero; "row" = compact horizontal card for phones. */
  variant?: "stack" | "row";
  className?: string;
};

const IMAGE_ALT = "Arduino Uno wired to a breadboard with LEDs and a servo motor";

export function ProjectCard({ image, title, category, variant = "stack", className = "" }: ProjectCardProps) {
  const tiltRef = useTilt<HTMLDivElement>(6);

  if (variant === "row") {
    return (
      <ScrollLink
        href="#projects"
        className={`group flex items-center gap-4 rounded-2xl bg-paper p-2.5 pr-4 text-paper-foreground shadow-float ${className}`}
      >
        <img
          src={image}
          alt={IMAGE_ALT}
          width={944}
          height={704}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-24 shrink-0 rounded-xl object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="type-eyebrow text-[0.6rem] text-primary">Featured project</p>
          <p className="mt-1 truncate font-display text-base font-extrabold uppercase tracking-tight">
            {title}
          </p>
          <p className="text-xs text-paper-foreground/60">{category}</p>
        </div>
        <ArrowUpRight className="size-5 shrink-0 transition-transform duration-300 group-hover:rotate-45" />
      </ScrollLink>
    );
  }

  return (
    <div ref={tiltRef} className={`will-change-transform [transform-style:preserve-3d] ${className}`}>
      <ScrollLink
        href="#projects"
        className="group block rounded-2xl bg-paper p-2.5 text-paper-foreground shadow-float"
      >
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={image}
            alt={IMAGE_ALT}
            width={944}
            height={704}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover transition-[scale] duration-700 group-hover:scale-105"
          />
          <span className="type-eyebrow absolute left-2 top-2 rounded-full bg-paper/90 px-2 py-1 text-[0.6rem] text-paper-foreground">
            Featured
          </span>
          <span className="type-eyebrow absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-ink/80 px-2 py-1 text-[0.55rem] text-ink-foreground">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            Live build
          </span>
        </div>
        <div className="flex items-end justify-between gap-3 px-1.5 pb-1 pt-3">
          <div className="min-w-0">
            <p className="font-display text-base font-extrabold uppercase leading-tight tracking-tight">
              {title}
            </p>
            <p className="mt-0.5 text-xs text-paper-foreground/60">{category}</p>
          </div>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-[rotate] duration-300 group-hover:rotate-45">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </ScrollLink>
    </div>
  );
}
