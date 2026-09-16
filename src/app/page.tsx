import AboutSection from "@/components/AboutSection";
import ChapterTransition from "@/components/ChapterTransition";
import ContactSection from "@/components/ContactSection";
import EditorialMotion from "@/components/EditorialMotion";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ProjectEvidenceBand from "@/components/ProjectEvidenceBand";
import SkillsSection from "@/components/SkillsSection";

export default function Home() {
  return (
    <>
      <EditorialMotion />
      <HeroSection />
      <ChapterTransition number="01" label="Selected work" />
      <ProjectsSection />
      <ProjectEvidenceBand />
      <ChapterTransition number="02" label="About" />
      <AboutSection />
      <ChapterTransition number="03" label="Experience" />
      <ExperienceSection />
      <ChapterTransition number="04" label="Skills" />
      <SkillsSection />
      <ChapterTransition number="05" label="Contact" />
      <ContactSection />
      <Footer />
    </>
  );
}
