import { createFileRoute } from "@tanstack/react-router";

import { FloatingNav } from "@/components/hero/FloatingNav";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { CareerCta } from "@/components/sections/CareerCta";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Footer } from "@/components/sections/Footer";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

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
    <>
      <FloatingNav />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Experience />
        <CareerCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
