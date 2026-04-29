import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const AboutSection = () => {
  return (
    <section id="about" className="relative py-32 px-4 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.span {...fadeUp} className="text-sm text-gray-900/40 dark:text-white/40 tracking-widest uppercase mb-4 block">
          About Me
        </motion.span>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-8"
        >
          I build for the gap between
          <br />
          <span className="text-gray-900/50 dark:text-white/50">what exists and what should</span>
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          className="text-lg text-gray-900/50 dark:text-white/40 leading-relaxed max-w-2xl"
        >
          Most software is built for the average use case. I'm interested in the specific ones —
          the tanning studio that runs on spreadsheets, the professional who reads 12 newsletters to stay current.
          I'm a BYU Information Systems student who works at the intersection of AI, product design, and real operations.
          I care about maintainability, clean architecture, and shipping things that solve actual problems — not just things that demo well.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.3 }}
          className="mt-10"
        >
          <p className="text-xs text-gray-900/30 dark:text-white/30 tracking-widest uppercase mb-4">Education</p>
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-6 flex items-center justify-between gap-6">
            <div>
              <p className="text-gray-900 dark:text-white font-semibold text-lg">Brigham Young University</p>
              <p className="text-gray-900/50 dark:text-white/50 text-sm mt-1">Marriott School of Business</p>
              <p className="text-gray-900/40 dark:text-white/40 text-sm mt-1">B.S. Information Systems</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-gray-900/30 dark:text-white/30 text-xs tracking-widest uppercase">Expected</p>
              <p className="text-gray-900 dark:text-white font-semibold text-2xl mt-1">2028</p>
              <p className="text-gray-900/30 dark:text-white/30 text-xs mt-1">Provo, UT</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.4 }}
          className="mt-4"
        >
          <p className="text-xs text-gray-900/30 dark:text-white/30 tracking-widest uppercase mb-4">Experience</p>
          <div className="flex flex-col gap-3">
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-6 flex items-center justify-between gap-6">
              <div>
                <p className="text-gray-900 dark:text-white font-semibold text-lg">IT Specialist</p>
                <p className="text-gray-900/50 dark:text-white/50 text-sm mt-1">BYU J. Reuben Clark Law School</p>
                <p className="text-gray-900/40 dark:text-white/40 text-sm mt-1">Provo, UT</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-gray-900/30 dark:text-white/30 text-xs tracking-widest uppercase">Current</p>
                <p className="text-gray-900 dark:text-white font-semibold text-sm mt-1">Aug 2025 – Present</p>
              </div>
            </div>
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-6 flex items-center justify-between gap-6">
              <div>
                <p className="text-gray-900 dark:text-white font-semibold text-lg">Volunteer Representative</p>
                <p className="text-gray-900/50 dark:text-white/50 text-sm mt-1">The Church of Jesus Christ of Latter-day Saints</p>
                <p className="text-gray-900/40 dark:text-white/40 text-sm mt-1">Lubbock, TX</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-gray-900 dark:text-white font-semibold text-sm mt-1">Jun 2023 – Jun 2025</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
