import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { ScrollLink } from "@/components/motion/ScrollLink";
import { useSmoothScroll } from "@/components/motion/SmoothScroll";

export const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

/** Menu close animation length, so scrolling starts once the page is unlocked. */
const MENU_CLOSE_MS = 320;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { stop, start } = useSmoothScroll();

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) stop();
    else start();
  };

  const closeThenScroll = () => {
    onOpenChange(false);
    return MENU_CLOSE_MS;
  };

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <nav
        aria-label="Primary"
        className="flex items-center justify-between px-5 py-5 sm:px-8 lg:px-10 lg:py-7"
      >
        <ScrollLink
          href="#home"
          data-reveal
          className="nav-item font-display text-2xl font-extrabold tracking-tight text-on-canvas"
        >
          Omkar<sup className="ml-0.5 text-[0.55em] font-semibold">®</sup>
        </ScrollLink>

        <ul className="hidden items-center gap-10 md:flex lg:gap-14">
          {NAV_ITEMS.map((item) => (
            <li key={item.label} data-reveal className="nav-item">
              <ScrollLink href={item.href} className="nav-link text-sm font-medium text-on-canvas">
                {item.label}
              </ScrollLink>
            </li>
          ))}
        </ul>

        <Dialog.Root open={open} onOpenChange={onOpenChange}>
          <Dialog.Trigger
            data-reveal
            aria-label="Open menu"
            className="nav-item group flex size-10 flex-col items-end justify-center gap-[7px] rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-canvas"
          >
            <span className="block h-[2px] w-8 bg-on-canvas transition-all duration-300 group-hover:w-6" />
            <span className="block h-[2px] w-6 bg-on-canvas transition-all duration-300 group-hover:w-8" />
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Content
              aria-describedby={undefined}
              className="fixed inset-0 z-50 flex flex-col bg-ink text-ink-foreground data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out duration-300"
            >
              <Dialog.Title className="sr-only">Site menu</Dialog.Title>
              <div className="flex items-center justify-between px-5 py-5 sm:px-8 lg:px-10 lg:py-7">
                <span className="font-display text-2xl font-extrabold tracking-tight">
                  Omkar<sup className="ml-0.5 text-[0.55em]">®</sup>
                </span>
                <Dialog.Close
                  aria-label="Close menu"
                  className="flex size-10 items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <X className="size-7" />
                </Dialog.Close>
              </div>
              <ul className="flex flex-1 flex-col justify-center gap-2 px-5 sm:px-8 lg:px-10">
                {NAV_ITEMS.map((item, i) => (
                  <li
                    key={item.label}
                    className="animate-in slide-in-from-bottom-6 fade-in fill-mode-both duration-500"
                    style={{ animationDelay: `${80 + i * 60}ms` }}
                  >
                    <ScrollLink
                      href={item.href}
                      beforeScroll={closeThenScroll}
                      className="group flex items-baseline gap-4 font-display text-5xl font-black uppercase tracking-tight transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none sm:text-7xl"
                    >
                      <span className="type-eyebrow text-primary">0{i + 1}</span>
                      {item.label}
                    </ScrollLink>
                  </li>
                ))}
              </ul>
              <p className="px-5 pb-8 text-xs text-ink-foreground/50 sm:px-8 lg:px-10">
                Omkar Potnuru · Electrical &amp; Electronics Engineering
              </p>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </nav>
    </header>
  );
}
