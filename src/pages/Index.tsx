import SkipLink from "@/components/site/SkipLink";
import SiteHeader from "@/components/site/SiteHeader";
import Masthead from "@/components/site/Masthead";
import SectionIndex from "@/components/site/SectionIndex";
import WorkSection from "@/components/site/WorkSection";
import AboutSection from "@/components/site/AboutSection";
import SiteFooter from "@/components/site/SiteFooter";

const Index = () => (
  <div className="site">
    <SkipLink />
    <SiteHeader />
    <main id="main">
      <Masthead />
      <div className="site-body">
        <SectionIndex />
        <div className="site-main">
          <WorkSection />
          <AboutSection />
        </div>
      </div>
    </main>
    <SiteFooter />
  </div>
);

export default Index;
