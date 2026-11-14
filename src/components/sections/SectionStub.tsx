import { Reveal } from "@/components/motion/Reveal";

type SectionStubProps = {
  id: string;
  index: string;
  title: string;
};

/** Placeholder anchor for a section that hasn't been designed yet. */
export function SectionStub({ id, index, title }: SectionStubProps) {
  return (
    <Reveal
      as="section"
      id={id}
      className="relative mx-2 border-t border-on-canvas/15 px-5 py-24 sm:mx-3 sm:px-8 lg:mx-4 lg:px-10 lg:py-32"
    >
      <p data-reveal-item className="type-eyebrow text-primary">
        {index} / {title}
      </p>
      <h2
        data-reveal-item
        className="type-mega mt-6 text-[18vw] text-on-canvas/90 lg:text-[clamp(6rem,11vw,12rem)]"
      >
        {title}
      </h2>
      <p data-reveal-item className="mt-8 max-w-md text-sm text-muted-foreground">
        This section is on its way.
      </p>
    </Reveal>
  );
}
