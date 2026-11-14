import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { ScrollLink } from "@/components/motion/ScrollLink";
import { useSmoothScroll } from "@/components/motion/SmoothScroll";
import { CONTACT } from "@/data/profile";

/** Page sections in document order. `inHero` items also show in the hero's desktop nav. */
export const NAV_ITEMS = [
  { label: "Home", href: "#home", inHero: true },
  { label: "About", href: "#about", inHero: true },
  { label: "Education", href: "#education", inHero: false },
  { label: "Skills", href: "#skills", inHero: true },
  { label: "Projects", href: "#projects", inHero: true },
  { label: "Experience", href: "#experience", inHero: false },
  { label: "Contact", href: "#contact", inHero: true },
] as const;

/** Menu close animation length, so scrolling starts once the page is unlocked. */
const MENU_CLOSE_MS = 320;

type SiteMenuProps = {
  triggerClassName?: string;
  /** Mark the trigger for the hero's GSAP entrance (pre-hidden until the hero timeline runs). */
  reveal?: boolean;
};

/** Full-screen menu with its hamburger trigger. */
export function SiteMenu({ triggerClassName = "", reveal = true }: SiteMenuProps) {
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
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger
        {...(reveal ? { "data-reveal": "" } : {})}
        aria-label="Open menu"
        className={`group flex size-10 flex-col items-end justify-center gap-[7px] rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-canvas ${triggerClassName}`}
      >
        <span className="block h-[2px] w-8 bg-on-canvas transition-all duration-300 group-hover:w-6" />
        <span className="block h-[2px] w-6 bg-on-canvas transition-all duration-300 group-hover:w-8" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink text-ink-foreground data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out duration-300"
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
          <ul className="flex flex-1 flex-col justify-center gap-1 px-5 py-6 sm:px-8 lg:px-10">
            {NAV_ITEMS.map((item, i) => (
              <li
                key={item.label}
                className="animate-in slide-in-from-bottom-6 fade-in fill-mode-both duration-500"
                style={{ animationDelay: `${80 + i * 50}ms` }}
              >
                <ScrollLink
                  href={item.href}
                  beforeScroll={closeThenScroll}
                  className="group flex items-baseline gap-4 font-display text-[clamp(2.25rem,9vw,4.5rem)] font-black uppercase leading-[1.02] tracking-tight transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none"
                >
                  <span className="type-eyebrow text-primary">0{i + 1}</span>
                  {item.label}
                </ScrollLink>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 px-5 pb-8 text-xs text-ink-foreground/50 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
            <p>Omkar Potnuru · Electrical &amp; Electronics Engineering</p>
            <a href={`mailto:${CONTACT.email}`} className="hover:text-primary">
              {CONTACT.email}
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
