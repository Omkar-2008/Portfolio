import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, MapPin } from "lucide-react";

import { CONTACT, PROFILE } from "@/data/profile";
import { Panel } from "./Panel";
import { SectionHeading } from "./SectionHeading";

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(PROFILE.location)}`;

export function Contact() {
  const { copied, copy } = useCopy(CONTACT.email);

  return (
    <Panel id="contact" tone="ink" index="06" label="Contact">
      <SectionHeading
        lines={["Let's", "connect."]}
        size="xl"
        aside={
          <p className="max-w-sm text-base leading-relaxed text-ink-foreground/65">
            Have an opportunity, engineering project or collaboration in mind? Let&apos;s talk.
          </p>
        }
      />

      <div className="mt-14 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
        {/* Primary call to action */}
        <div className="min-w-0 lg:col-span-7">
          <p data-reveal-item className="type-eyebrow text-[0.65rem] text-ink-foreground/50">
            Drop a line
          </p>
          <a
            data-reveal-item
            href={`mailto:${CONTACT.email}`}
            className="group mt-4 inline-block max-w-full font-display text-[clamp(1.05rem,5.2vw,2.4rem)] lg:text-[clamp(1.6rem,2.8vw,2.6rem)] font-extrabold tracking-[-0.03em] [overflow-wrap:anywhere]"
          >
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size,color] duration-500 group-hover:bg-[length:100%_2px] group-hover:text-primary">
              {CONTACT.email}
            </span>
          </a>

          <div data-reveal-item className="mt-8 flex flex-wrap gap-2.5">
            <a
              href={`mailto:${CONTACT.email}`}
              className="group inline-flex items-center gap-3 rounded-full bg-primary py-2 pl-5 pr-2 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <Mail className="size-4" />
              Send an email
              <span className="flex size-8 items-center justify-center rounded-full bg-ink text-ink-foreground transition-[rotate] duration-300 group-hover:rotate-45">
                <ArrowUpRight className="size-4" />
              </span>
            </a>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-2 rounded-full border border-on-canvas/20 px-5 py-3 text-sm font-semibold transition-colors duration-300 hover:border-on-canvas/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
              {copied ? "Copied!" : "Copy email"}
            </button>
            <SocialButton href={CONTACT.linkedin} icon={<Linkedin className="size-4" />} label="LinkedIn" />
            <SocialButton href={CONTACT.github} icon={<Github className="size-4" />} label="GitHub" />
          </div>
          <p role="status" aria-live="polite" className="sr-only">
            {copied ? "Email address copied to clipboard" : ""}
          </p>

          <LocalTime />
        </div>

        {/* Contact cards */}
        <ul className="grid min-w-0 grid-cols-1 gap-2 self-start lg:col-span-5">
          <InfoCard
            icon={<Mail className="size-5" />}
            label="Email"
            value={CONTACT.email}
            href={`mailto:${CONTACT.email}`}
            action={
              <button
                type="button"
                onClick={copy}
                aria-label="Copy email address"
                className="relative z-10 flex size-10 items-center justify-center rounded-lg border border-on-canvas/15 transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
              >
                {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
              </button>
            }
          />
          <InfoCard icon={<Linkedin className="size-5" />} label="LinkedIn" value={CONTACT.linkedinHandle} href={CONTACT.linkedin} external />
          <InfoCard icon={<Github className="size-5" />} label="GitHub" value={CONTACT.githubHandle} href={CONTACT.github} external />
          <InfoCard icon={<MapPin className="size-5" />} label="Location" value={PROFILE.location} href={MAPS_URL} external />
        </ul>
      </div>
    </Panel>
  );
}

function SocialButton({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-on-canvas/20 px-5 py-3 text-sm font-semibold transition-colors duration-300 hover:border-on-canvas hover:bg-on-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      {icon}
      {label}
    </a>
  );
}

type InfoCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  action?: ReactNode;
};

function InfoCard({ icon, label, value, href, external, action }: InfoCardProps) {
  return (
    <li
      data-reveal-item
      className="group relative flex items-center gap-4 rounded-2xl border border-on-canvas/10 bg-ink-2 p-4 transition-colors duration-300 focus-within:border-primary/60 hover:border-primary/60 sm:p-5"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-on-canvas/5 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="type-eyebrow text-[0.6rem] text-ink-foreground/45">{label}</p>
        {/* Stretched link: the whole card is clickable, the action button sits above it */}
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="mt-1 block truncate text-sm font-semibold after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none sm:text-base"
        >
          {value}
        </a>
      </div>
      {action ?? (
        <ArrowUpRight className="size-5 shrink-0 text-ink-foreground/35 transition-[color,rotate] duration-300 group-hover:rotate-45 group-hover:text-primary" />
      )}
    </li>
  );
}

/** Live clock in Omkar's time zone; renders a placeholder on the server to avoid hydration mismatch. */
function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: PROFILE.timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div data-reveal-item className="mt-12 flex items-center gap-4 border-t border-on-canvas/10 pt-6 text-sm text-ink-foreground/60">
      <span className="relative flex size-2.5">
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/60" />
        <span className="relative size-2.5 rounded-full bg-primary" />
      </span>
      <span>
        Local time in Visakhapatnam{" "}
        <span className="font-semibold text-ink-foreground tabular-nums">{time ?? "--:--"}</span> IST
      </span>
    </div>
  );
}

function useCopy(text: string) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for insecure contexts / older browsers
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  return { copied, copy };
}
