import { ArrowUpRight } from "lucide-react";

import { ScrollLink } from "@/components/motion/ScrollLink";

type ContactCardProps = {
  thumbnail: string;
  className?: string;
};

export function ContactCard({ thumbnail, className = "" }: ContactCardProps) {
  return (
    <ScrollLink
      href="#contact"
      aria-label="Let's connect — go to the contact section"
      className={`group flex items-center gap-4 rounded-2xl bg-ink p-3 text-ink-foreground shadow-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper ${className}`}
    >
      <div className="size-16 shrink-0 overflow-hidden rounded-xl bg-primary sm:size-[4.5rem]">
        <img
          src={thumbnail}
          alt=""
          width={192}
          height={192}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="type-eyebrow text-[0.62rem] text-primary">Let's connect</p>
        <p className="mt-1 truncate font-display text-lg font-extrabold uppercase leading-tight tracking-tight">
          Omkar Potnuru
        </p>
        <p className="truncate text-xs text-ink-foreground/65">Electrical &amp; Electronics Engineering</p>
      </div>
      {/* Arrow swaps out top-right and back in from bottom-left on hover */}
      <span className="arrow-btn relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-paper text-paper-foreground transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        <ArrowUpRight className="arrow-out size-5" />
        <ArrowUpRight className="arrow-in absolute size-5" />
      </span>
    </ScrollLink>
  );
}
