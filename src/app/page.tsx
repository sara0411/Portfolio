import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Motion from "@/components/Motion";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";

export default function Home() {
  return (
    <>
      <Motion />
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  );
}
