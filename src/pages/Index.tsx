import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TechCarousel from "@/components/TechCarousel";
import ProjectsSection from "@/components/ProjectsSection";
import AIArchitectureSection from "@/components/AIArchitectureSection";
import ContactSection from "@/components/ContactSection";
import ScrollProgress from "@/components/ScrollProgress";
import CursorHalo from "@/components/CursorHalo";

const Index = () => {
  return (
    <div className="min-h-screen">
      <CursorHalo />
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <TechCarousel />
        <AIArchitectureSection />
        <ProjectsSection />
      </main>
      <ContactSection />
    </div>
  );
};

export default Index;
