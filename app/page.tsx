import nextDynamic from "next/dynamic";
import HeroSection from "./components/HeroSection";
import ReactLenis from "lenis/react";
import { client } from "@/sanity/lib/client";
import {
  projectsQuery,
  servicesQuery,
  heroQuery,
  aboutQuery,
  conflictQuery,
  footerQuery,
  contactQuery,
} from "@/sanity/lib/queries";
import { projectId } from "@/sanity/env";

const ConflictSection = nextDynamic(() => import("./components/ConflictSection"), { ssr: true });
const ConvergenceSection = nextDynamic(() => import("./components/ConvergenceSection"), { ssr: true });
const SolutionsSection = nextDynamic(() => import("./components/SolutionsSection"), { ssr: true });
const ProjectsSection = nextDynamic(() => import("./components/ProjectsSection"), { ssr: true });
const AboutSection = nextDynamic(() => import("./components/AboutSection"), { ssr: true });
const ContactSection = nextDynamic(() => import("./components/ContactSection"), { ssr: true });
const Footer = nextDynamic(() => import("./components/Footer"), { ssr: true });

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  let projects = [];
  let services = [];
  let hero = null;
  let about = null;
  let conflict = null;
  let footer = null;
  let contact = null;

  if (projectId) {
    try {
      const [projectsData, servicesData, heroData, aboutData, conflictData, footerData, contactData] =
        await Promise.all([
          client.fetch(projectsQuery),
          client.fetch(servicesQuery),
          client.fetch(heroQuery),
          client.fetch(aboutQuery),
          client.fetch(conflictQuery),
          client.fetch(footerQuery),
          client.fetch(contactQuery),
        ]);
      projects = projectsData;
      services = servicesData;
      hero = heroData;
      about = aboutData;
      conflict = conflictData;
      footer = footerData;
      contact = contactData;
    } catch (error) {
      console.error("Sanity fetch error:", error);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--color-background)] relative">
      <ReactLenis root />
      <HeroSection data={hero} />
      <ConflictSection data={conflict} />
      <ConvergenceSection />
      <SolutionsSection data={services} />
      <ProjectsSection data={projects} />
      <AboutSection data={about} />
      <ContactSection data={contact} />
      <Footer data={footer} />
    </main>
  );
}
