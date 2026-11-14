import { ArrowUpRight } from "lucide-react";

type ContactCardProps = {
  thumbnail?: string | undefined;
  className?: string;
};

export function ContactCard({ thumbnail, className = "" }: ContactCardProps) {
  return (
    <a
      href="#contact"
      className={`group flex items-center gap-4 rounded-2xl bg-ink p-3 pr-3 text-ink-foreground shadow-ink ${className}`}
    >
      <div className="size-16 shrink-0 overflow-hidden rounded-xl bg-primary sm:size-[4.5rem]">
        {thumbnail ? (
          <img src={thumbnail} alt="Omkar Potnuru" className="h-full w-full object-cover object-top" />
        ) : (
          <span className="flex h-full w-full items-center justify-center font-display text-xl font-black text-primary-foreground">
            OP
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="type-eyebrow text-[0.62rem] text-primary">Let's connect</p>
        <p className="mt-1 font-display text-lg font-extrabold leading-tight tracking-tight">
          Omkar Potnuru
        </p>
        <p className="truncate text-xs text-ink-foreground/60">
          Electrical &amp; Electronics Engineering
        </p>
      </div>
      <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-paper text-paper-foreground transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:rotate-45" />
      </span>
    </a>
  );
}
