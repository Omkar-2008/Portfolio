import { ArrowUpRight } from "lucide-react";

type ProjectCardProps = {
  image: string;
  title: string;
  category: string;
  className?: string;
};

export function ProjectCard({ image, title, category, className = "" }: ProjectCardProps) {
  return (
    <a
      href="#projects"
      className={`group block rounded-2xl bg-paper p-2.5 text-paper-foreground shadow-float transition-transform duration-500 hover:-translate-y-1 ${className}`}
    >
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={image}
          alt="Arduino board wired to a breadboard with LEDs and a servo"
          width={944}
          height={704}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="type-eyebrow absolute left-2 top-2 rounded-full bg-paper/90 px-2 py-1 text-[0.6rem] text-paper-foreground">
          Featured
        </span>
      </div>
      <div className="flex items-end justify-between gap-3 px-1.5 pb-1 pt-3">
        <div>
          <p className="font-display text-base font-extrabold uppercase leading-tight tracking-tight">
            {title}
          </p>
          <p className="mt-0.5 text-xs text-paper-foreground/60">{category}</p>
        </div>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </a>
  );
}
