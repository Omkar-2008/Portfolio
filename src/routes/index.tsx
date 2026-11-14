import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "@/components/hero/Hero";
import { SectionStub } from "@/components/sections/SectionStub";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Omkar Potnuru — Electrical & Electronics Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Omkar Potnuru, an Electrical & Electronics Engineering student building practical solutions in embedded systems and technology.",
      },
      { property: "og:title", content: "Omkar Potnuru — Electrical & Electronics Engineer" },
      {
        property: "og:description",
        content: "Practical engineering solutions through technology — embedded systems, electronics and more.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Hero />
      <SectionStub id="about" index="01" title="About" />
      <SectionStub id="projects" index="02" title="Projects" />
      <SectionStub id="skills" index="03" title="Skills" />
      <SectionStub id="contact" index="04" title="Contact" />
    </main>
  );
}
