import arduinoImage from "@/assets/arduino-control.jpg";
import { PROJECTS, type Project } from "@/data/profile";
import { Panel } from "./Panel";
import { ProjectArt } from "./ProjectArt";
import { SectionHeading } from "./SectionHeading";

const ARDUINO_ALT = "Arduino Uno wired to a breadboard with LEDs and a servo motor";

export function Projects() {
  const [featured, ...rest] = PROJECTS;
  const builds = PROJECTS.filter((p) => !p.status).length;
  const planned = PROJECTS.length - builds;

  return (
    <Panel id="projects" tone="ink" index="04" label="Projects">
      <SectionHeading
        lines={["Engineering", "in action."]}
        aside={
          <dl className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-on-canvas/12 p-4">
              <dt className="type-eyebrow text-[0.6rem] text-ink-foreground/50">Builds &amp; concepts</dt>
              <dd className="mt-1 font-display text-4xl font-black">{String(builds).padStart(2, "0")}</dd>
            </div>
            <div className="rounded-xl border border-on-canvas/12 p-4">
              <dt className="type-eyebrow text-[0.6rem] text-ink-foreground/50">In preparation</dt>
              <dd className="mt-1 font-display text-4xl font-black text-primary">{String(planned).padStart(2, "0")}</dd>
            </div>
          </dl>
        }
      />

      <div className="mt-14 space-y-3 lg:mt-20">
        {featured && <FeaturedProject project={featured} />}
        <div className="grid gap-3 md:grid-cols-2">
          {rest.map((project) =>
            project.status ? (
              <ComingSoonCard key={project.number} project={project} />
            ) : (
              <ProjectCard key={project.number} project={project} />
            ),
          )}
        </div>
      </div>
    </Panel>
  );
}

const CARD =
  "group relative flex flex-col overflow-hidden rounded-2xl border border-on-canvas/10 bg-ink-2 transition-[border-color,translate,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:border-primary/60 hover:shadow-ink";

/** Soft orange glow behind schematic art (separate layer so it doesn't replace the blueprint grid). */
function MediaGlow() {
  return (
    <span
      aria-hidden
      className="absolute inset-0 bg-[radial-gradient(70%_80%_at_50%_55%,oklch(0.68_0.21_40/0.16),transparent_70%)]"
    />
  );
}

function ProjectNumber({ number }: { number: string }) {
  return (
    <span className="type-mega absolute left-4 top-4 z-10 text-5xl text-on-canvas transition-colors duration-500 group-hover:text-primary sm:left-5 sm:top-5 sm:text-6xl">
      {number}
    </span>
  );
}

function ToolChips({ tools, className = "" }: { tools: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {tools.map((tool) => (
        <li
          key={tool}
          className="rounded-full border border-on-canvas/15 bg-ink/70 px-2.5 py-1 text-[0.7rem] font-semibold text-ink-foreground/85 backdrop-blur-sm"
        >
          {tool}
        </li>
      ))}
    </ul>
  );
}

function Specs({ specs }: { specs: Project["specs"] }) {
  return (
    <dl className={`grid grid-cols-2 border-t border-on-canvas/10 ${specs.length === 3 ? "lg:grid-cols-3" : ""}`}>
      {specs.map((spec) => (
        <div key={spec.label} className="border-b border-on-canvas/10 py-3 pr-4">
          <dt className="type-eyebrow text-[0.58rem] text-ink-foreground/45">{spec.label}</dt>
          <dd className="mt-1 text-sm font-semibold">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article data-reveal-item className={`${CARD} lg:grid lg:grid-cols-12`}>
      <div className="relative aspect-[4/3] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[30rem]">
        <img
          src={arduinoImage}
          alt={ARDUINO_ALT}
          width={944}
          height={704}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-[scale] duration-[1.2s] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/30" />
        <ProjectNumber number={project.number} />
        <span className="type-eyebrow absolute right-4 top-5 z-10 flex items-center gap-1.5 rounded-full bg-paper px-3 py-1.5 text-[0.58rem] text-paper-foreground sm:right-5 sm:top-6">
          <span className="size-1.5 rounded-full bg-primary" />
          Featured build
        </span>
        <ToolChips tools={project.tools} className="absolute bottom-4 left-4 z-10 sm:bottom-5 sm:left-5" />
      </div>

      <div className="flex flex-col p-6 sm:p-8 lg:col-span-5 lg:p-10">
        <p className="type-eyebrow text-[0.62rem] text-primary">{project.subtitle}</p>
        <h3 className="mt-4 font-display text-[clamp(1.8rem,3.4vw,3rem)] font-black uppercase leading-[0.92] tracking-[-0.03em]">
          {project.title}
        </h3>
        <p className="mt-5 text-sm leading-relaxed text-ink-foreground/65 sm:text-base">{project.description}</p>
        <div className="mt-8 lg:mt-auto lg:pt-8">
          <Specs specs={project.specs} />
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article data-reveal-item className={CARD}>
      <div className={`relative aspect-[16/10] overflow-hidden border-b border-on-canvas/10 bg-ink bg-blueprint`}>
        <MediaGlow />
        {project.art !== "arduino" && (
          <ProjectArt
            kind={project.art}
            className="absolute inset-0 h-full w-full p-6 pt-16 text-ink-foreground/70 transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:p-8 sm:pt-16"
          />
        )}
        <ProjectNumber number={project.number} />
        <ToolChips tools={project.tools} className="absolute right-4 top-5 z-10 justify-end sm:right-5" />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="type-eyebrow text-[0.62rem] text-primary">{project.subtitle}</p>
        <h3 className="mt-3 font-display text-[clamp(1.4rem,2.3vw,2rem)] font-black uppercase leading-[0.95] tracking-[-0.025em]">
          {project.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-ink-foreground/65">{project.description}</p>
        <div className="mt-6 sm:mt-auto sm:pt-6">
          <Specs specs={project.specs} />
        </div>
      </div>
    </article>
  );
}

function ComingSoonCard({ project }: { project: Project }) {
  return (
    <article
      data-reveal-item
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-dashed border-on-canvas/25 bg-ink-2/50 transition-colors duration-500 hover:border-primary/70"
    >
      <div className={`relative aspect-[16/10] overflow-hidden border-b border-dashed border-on-canvas/20 bg-ink bg-blueprint`}>
        <MediaGlow />
        <ProjectArt
          kind="blueprint"
          className="absolute inset-0 h-full w-full p-6 pt-16 text-ink-foreground/60 sm:p-8 sm:pt-16"
        />
        <span className="type-mega absolute left-4 top-4 z-10 text-5xl text-on-canvas/40 sm:left-5 sm:top-5 sm:text-6xl">
          {project.number}
        </span>
        <span className="type-eyebrow absolute right-4 top-5 z-10 flex items-center gap-1.5 rounded-full border border-primary/50 bg-primary/10 px-3 py-1.5 text-[0.58rem] text-primary sm:right-5">
          <span className="size-1.5 animate-pulse rounded-full bg-primary" />
          Coming soon
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="type-eyebrow text-[0.62rem] text-primary">Status · {project.subtitle}</p>
        <h3 className="mt-3 font-display text-[clamp(1.4rem,2.3vw,2rem)] font-black uppercase leading-[0.95] tracking-[-0.025em]">
          {project.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-ink-foreground/65">{project.description}</p>
        <div className="mt-6 border-t border-dashed border-on-canvas/15 pt-4 sm:mt-auto">
          <p className="type-eyebrow text-[0.58rem] text-ink-foreground/45">Planned integration</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.tools.map((tool) => (
              <li key={tool} className="rounded-full border border-dashed border-on-canvas/25 px-2.5 py-1 text-[0.7rem] font-semibold text-ink-foreground/75">
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
