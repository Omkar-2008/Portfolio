import { useState } from "react";
import { X } from "lucide-react";

export const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <nav className="flex items-center justify-between px-5 py-5 sm:px-8 lg:px-10 lg:py-7">
        <a
          href="#home"
          data-reveal
          className="nav-item font-display text-2xl font-extrabold tracking-tight text-on-canvas"
        >
          Omkar<sup className="ml-0.5 text-[0.55em] font-semibold">®</sup>
        </a>

        <ul className="hidden items-center gap-10 md:flex lg:gap-14">
          {NAV_ITEMS.map((item) => (
            <li key={item.label} data-reveal className="nav-item">
              <a href={item.href} className="nav-link text-sm font-medium text-on-canvas">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          data-reveal
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="nav-item group flex size-10 flex-col items-end justify-center gap-[7px]"
        >
          <span className="block h-[2px] w-8 bg-on-canvas transition-all duration-300 group-hover:w-6" />
          <span className="block h-[2px] w-6 bg-on-canvas transition-all duration-300 group-hover:w-8" />
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ink text-ink-foreground animate-in fade-in duration-300">
          <div className="flex items-center justify-between px-5 py-5 sm:px-8 lg:px-10 lg:py-7">
            <span className="font-display text-2xl font-extrabold tracking-tight">
              Omkar<sup className="ml-0.5 text-[0.55em]">®</sup>
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex size-10 items-center justify-center"
            >
              <X className="size-7" />
            </button>
          </div>
          <ul className="flex flex-1 flex-col justify-center gap-2 px-5 sm:px-8 lg:px-10">
            {NAV_ITEMS.map((item, i) => (
              <li
                key={item.label}
                className="animate-in slide-in-from-bottom-6 fade-in fill-mode-both duration-500"
                style={{ animationDelay: `${80 + i * 60}ms` }}
              >
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-4 font-display text-5xl font-black uppercase tracking-tight transition-colors hover:text-primary sm:text-7xl"
                >
                  <span className="type-eyebrow text-primary">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
