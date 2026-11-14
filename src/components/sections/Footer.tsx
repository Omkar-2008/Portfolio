import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

import { NAV_ITEMS } from "@/components/hero/SiteNav";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollLink } from "@/components/motion/ScrollLink";
import { CONTACT, PROFILE } from "@/data/profile";

const SOCIALS = [
  { label: "Email", href: `mailto:${CONTACT.email}`, icon: Mail },
  { label: "LinkedIn", href: CONTACT.linkedin, icon: Linkedin },
  { label: "GitHub", href: CONTACT.github, icon: Github },
] as const;

export function Footer() {
  return (
    <Reveal as="footer" className="px-2 pb-2 sm:px-3 sm:pb-3 lg:px-4 lg:pb-4">
      <div className="relative overflow-hidden rounded-[3px] border border-on-canvas/15 px-5 pt-14 sm:px-8 sm:pt-16 lg:px-10 xl:px-14">
        <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-12">
          <div data-reveal-item className="md:col-span-5">
            <p className="font-display text-2xl font-extrabold tracking-tight">
              Omkar Potnuru<sup className="ml-0.5 text-[0.55em]">®</sup>
            </p>
            <p className="type-eyebrow mt-2 text-[0.62rem] text-primary">{PROFILE.discipline}</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-on-canvas/65">&ldquo;{PROFILE.tagline}&rdquo;</p>
          </div>

          <nav data-reveal-item aria-label="Footer" className="md:col-span-4">
            <p className="type-eyebrow text-[0.6rem] text-on-canvas/45">Index</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <ScrollLink href={item.href} className="nav-link text-sm text-on-canvas/80 hover:text-on-canvas">
                    {item.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </nav>

          <div data-reveal-item className="flex items-start justify-between gap-6 md:col-span-3 md:flex-col md:items-end">
            <ul className="flex gap-2">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex size-11 items-center justify-center rounded-full border border-on-canvas/20 transition-colors duration-300 hover:border-primary hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
            <ScrollLink
              href="#home"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-on-canvas/80 hover:text-on-canvas"
            >
              Back to top
              <span className="flex size-9 items-center justify-center rounded-full bg-on-canvas text-ink transition-transform duration-300 group-hover:-translate-y-1">
                <ArrowUp className="size-4" />
              </span>
            </ScrollLink>
          </div>
        </div>

        {/* Signature wordmark */}
        <p
          aria-hidden
          className="mx-auto mt-14 max-w-[1440px] overflow-hidden select-none sm:mt-20"
        >
          <span
            data-reveal-item="line"
            className="type-mega block whitespace-nowrap bg-[linear-gradient(180deg,var(--flame)_0%,var(--blaze)_100%)] bg-clip-text pb-[0.04em] text-[10vw] text-transparent lg:text-[10.6vw] 2xl:text-[min(10.6vw,10.7rem)]"
          >
            Omkar Potnuru<sup className="align-[0.9em] text-[0.22em] tracking-normal">®</sup>
          </span>
        </p>

        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 border-t border-on-canvas/15 py-6 text-xs text-on-canvas/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Omkar Potnuru. All Rights Reserved.</p>
          <p>Designed &amp; engineered in Visakhapatnam, India.</p>
        </div>
      </div>
    </Reveal>
  );
}
