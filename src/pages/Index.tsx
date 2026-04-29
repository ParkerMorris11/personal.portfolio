import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TechCarousel from "@/components/TechCarousel";
import ProjectsSection from "@/components/ProjectsSection";
import AIArchitectureSection from "@/components/AIArchitectureSection";
import ContactSection from "@/components/ContactSection";
import ScrollProgress from "@/components/ScrollProgress";

const Index = () => {
  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TechCarousel />
      <AIArchitectureSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
