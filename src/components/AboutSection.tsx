import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const roles = [
  {
    title: "AI Product Lead",
    organization: "Toasted Tanz",
    location: "Provo, UT",
    dates: "Aug 2026 – Present",
    detail: "Partner with the founder to turn customer and operational needs into software. Shipped a digital waiver and built SMS and email workflows with rate limits, alerts, and recovery paths.",
  },
  {
    title: "AI Adoption Intern",
    organization: "BrainStorm Inc.",
    location: "American Fork, UT",
    dates: "May 2026 – Aug 2026",
    detail: "Owned a Claude-powered policy learning application from requirements through customer deployment. Reduced policy mobilization time by 88% and piloted with 80+ employees.",
  },
  {
    title: "IT Specialist",
    organization: "BYU J. Reuben Clark Law School",
    location: "Provo, UT",
    dates: "Aug 2025 – Present",
    detail: "Resolve PC/Mac, software, printer, and network issues and supported PaperCut implementation troubleshooting.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative py-32 px-4 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.span {...fadeUp} className="text-sm text-gray-900/70 dark:text-white/40 tracking-widest uppercase mb-4 block">
          About Me
        </motion.span>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-8"
        >
          Building where AI, product,
          <br />
          <span className="text-gray-900/75 dark:text-white/50">and real operations meet</span>
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          className="text-lg text-gray-900/75 dark:text-white/40 leading-relaxed max-w-2xl"
        >
          I'm a BYU Information Systems student who builds practical AI and software workflows with the people who use them.
          My recent work spans an employee-facing AI product, customer operations, and hands-on IT support.
          I care about translating a real need into something reliable enough to use.
        </motion.p>

        <motion.div id="experience" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.3 }} className="mt-10 scroll-mt-24">
          <p className="text-xs text-gray-900/80 dark:text-white/30 tracking-widest uppercase mb-4">Recent Experience</p>
          <div className="flex flex-col gap-3">
            {roles.map((role) => (
              <div key={role.title} className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <p className="text-gray-900 dark:text-white font-semibold text-lg">{role.title}</p>
                  <p className="text-gray-900/75 dark:text-white/50 text-sm mt-1">{role.organization} · {role.location}</p>
                  <p className="text-gray-900/70 dark:text-white/40 text-sm mt-3 max-w-xl leading-relaxed">{role.detail}</p>
                </div>
                <p className="text-gray-900 dark:text-white font-semibold text-sm shrink-0">{role.dates}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.4 }} className="mt-10">
          <p className="text-xs text-gray-900/80 dark:text-white/30 tracking-widest uppercase mb-4">Education</p>
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-6 flex items-center justify-between gap-6">
            <div>
              <p className="text-gray-900 dark:text-white font-semibold text-lg">Brigham Young University</p>
              <p className="text-gray-900/75 dark:text-white/50 text-sm mt-1">Marriott School of Business</p>
              <p className="text-gray-900/70 dark:text-white/40 text-sm mt-1">B.S. Information Systems</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-gray-900/80 dark:text-white/30 text-xs tracking-widest uppercase">Expected</p>
              <p className="text-gray-900 dark:text-white font-semibold text-2xl mt-1">2028</p>
              <p className="text-gray-900/80 dark:text-white/30 text-xs mt-1">Provo, UT</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
