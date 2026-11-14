import { Counter } from "@/components/motion/Counter";
import { ABOUT_PARAGRAPHS, FACTS, PROFILE, STATS, type Stat } from "@/data/profile";
import { Panel } from "./Panel";
import { SectionHeading } from "./SectionHeading";

const STAT_STYLES = [
  "bg-canvas text-on-canvas border-transparent",
  "bg-ink text-ink-foreground border-transparent",
  "bg-paper text-paper-foreground border-paper-foreground/12",
];

export function About() {
  return (
    <Panel id="about" tone="paper" index="01" label="About">
      <SectionHeading
        lines={["Beyond the", "circuits."]}
        aside={
          <p className="max-w-sm text-sm leading-relaxed text-paper-foreground/65">
            Electrical &amp; Electronics Engineering student from {PROFILE.locationShort}, working where
            circuits, code and real-world hardware meet.
          </p>
        }
      />

      <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
        {/* Spec sheet */}
        <dl
          data-reveal-item
          className="order-2 grid self-start border-t border-paper-foreground/15 sm:grid-cols-2 lg:order-1 lg:col-span-4 lg:grid-cols-1"
        >
          {FACTS.map((fact) => (
            <div
              key={fact.label}
              className="flex items-baseline justify-between gap-6 border-b border-paper-foreground/15 py-4 sm:odd:pr-6 lg:odd:pr-0"
            >
              <dt className="type-eyebrow shrink-0 text-[0.65rem] text-paper-foreground/50">{fact.label}</dt>
              <dd className="text-right text-sm font-semibold">{fact.value}</dd>
            </div>
          ))}
        </dl>

        {/* Introduction */}
        <div className="order-1 space-y-6 lg:order-2 lg:col-span-7 lg:col-start-6">
          <p
            data-reveal-item
            className="font-display text-[clamp(1.4rem,2.6vw,2.15rem)] font-semibold leading-[1.18] tracking-[-0.02em] [font-variation-settings:'wdth'_92]"
          >
            I&apos;m <span className="text-primary">Omkar Potnuru</span>, a third-year Electrical &amp;
            Electronics Engineering diploma student passionate about practical engineering, circuit design
            and technology-driven innovation.
          </p>
          <p data-reveal-item className="max-w-2xl text-base leading-relaxed text-paper-foreground/70 sm:text-lg">
            {ABOUT_PARAGRAPHS[1]}
          </p>
        </div>
      </div>

      {/* Achievement cards */}
      <ul className="mt-16 grid gap-3 sm:grid-cols-3 lg:mt-24">
        {STATS.map((stat, i) => (
          <li key={stat.caption} data-reveal-item>
            <StatCard stat={stat} index={i} />
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  return (
    <article
      className={`group relative flex h-full min-h-[15rem] flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-transform duration-500 ease-out hover:-translate-y-1 sm:min-h-[17rem] lg:min-h-[20rem] lg:p-8 ${STAT_STYLES[index]}`}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="type-eyebrow text-[0.65rem] opacity-70">A / 0{index + 1}</p>
        <Gauge fraction={[0.98, 0.82, 1][index] ?? 1} />
      </div>
      <div>
        <p className="type-mega flex items-start text-[clamp(4.25rem,9vw,8rem)] leading-[0.85]">
          <Counter value={stat.value} decimals={stat.decimals ?? 0} />
          {stat.suffix && (
            <span className="ml-1 mt-[0.1em] text-[0.38em] tracking-normal">{stat.suffix}</span>
          )}
        </p>
        <div className="mt-5 flex items-end justify-between gap-3 border-t border-current/20 pt-4">
          <p className="font-display text-lg font-extrabold uppercase leading-tight tracking-tight">
            {stat.caption}
          </p>
          <p className="type-eyebrow text-[0.6rem] opacity-60">{stat.label}</p>
        </div>
      </div>
    </article>
  );
}

/** Small decorative dial — a nod to analogue meters. */
function Gauge({ fraction }: { fraction: number }) {
  const r = 18;
  const arc = Math.PI * r; // semicircle length
  return (
    <svg aria-hidden viewBox="0 0 44 26" className="h-6 w-11 opacity-80">
      <path d="M4 22a18 18 0 0 1 36 0" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path
        d="M4 22a18 18 0 0 1 36 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={`${arc * fraction} ${arc}`}
      />
      <circle cx="22" cy="22" r="2.5" fill="currentColor" />
    </svg>
  );
}
