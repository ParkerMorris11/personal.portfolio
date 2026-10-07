import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const roles = [
  {
    title: "AI Product Lead",
    organization: "Toasted Tanz",
    location: "Provo, UT",
    dates: "Aug 2026 — Present",
    detail: "As AI Product Lead, partner with the founder to turn customer and operational needs into shipped product. Work includes a digital waiver with an auditable agreement record and SMS and email workflows with rate limits, failure alerts, and recovery paths.",
  },
  {
    title: "AI Adoption Intern",
    organization: "BrainStorm Inc.",
    location: "American Fork, UT",
    dates: "May 2026 — Aug 2026",
    detail: "Owned a Claude-powered policy learning application from requirements through customer deployment. Reduced policy mobilization time by 88% and piloted with 80+ employees.",
  },
  {
    title: "IT Specialist",
    organization: "BYU J. Reuben Clark Law School",
    location: "Provo, UT",
    dates: "Aug 2025 — Present",
    detail: "Resolve PC/Mac, software, printer, and network issues and supported PaperCut implementation troubleshooting.",
  },
];

const AboutSection = () => (
  <section id="about" className="editorial-section section-paper">
    <div className="section-wrap">
      <div className="section-intro">
        <p className="section-kicker">01 <span>—</span> About</p>
        <div>
          <motion.h2 {...fadeUp} className="section-title font-editorial">
            Building where AI, product, and real operations meet.
          </motion.h2>
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="section-lede">
            I’m a BYU Information Systems student who builds practical AI and software workflows with the people who use them. My recent work spans an employee-facing AI product, customer operations, and hands-on IT support. I care about translating a real need into something reliable enough to use.
          </motion.p>
        </div>
      </div>

      <motion.div
        id="experience"
        {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.12 }}
        className="experience-block scroll-mt-28"
      >
        <div className="section-intro experience-heading">
          <p className="section-kicker">02 <span>—</span> Experience</p>
          <h3 className="font-editorial">The work so far.</h3>
        </div>
        <div className="experience-list">
          {roles.map((role) => (
            <article key={role.title} className="experience-row">
              <div>
                <h4>{role.title}</h4>
                <p className="experience-meta">{role.organization} <span>·</span> {role.location}</p>
                <p className="experience-detail">{role.detail}</p>
              </div>
              <p className="experience-date">{role.dates}</p>
            </article>
          ))}
        </div>
      </motion.div>

      <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="education-row">
        <div>
          <p className="section-kicker">Education</p>
          <h3>Brigham Young University <span>·</span> Marriott School of Business</h3>
          <p>B.S. Information Systems</p>
        </div>
        <div className="education-year"><span>Expected</span><strong>2028</strong><span>Provo, UT</span></div>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
