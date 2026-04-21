import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const AboutSection = () => {
  return (
    <section id="about" className="relative py-32 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.span {...fadeUp} className="text-sm text-white/40 tracking-widest uppercase mb-4 block">
          About Me
        </motion.span>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-8"
        >
          Building things that
          <br />
          <span className="text-white/50">actually work</span>
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          className="text-lg text-white/40 leading-relaxed max-w-2xl"
        >
          I'm an Information Systems student at Brigham Young University with a focus on AI-driven tools,
          full-stack applications, and workflow automation. I work with Python, LLM APIs, and React to build
          practical software — not just proofs of concept, but things people actually use day to day.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.3 }}
          className="grid grid-cols-3 gap-8 mt-16"
        >
          {[
            { number: "BYU", label: "Marriott School of Business" },
            { number: "2028", label: "Expected Graduation" },
            { number: "3", label: "Projects Shipped" },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-bold text-white">{stat.number}</div>
              <div className="text-sm text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.4 }}
          className="mt-16"
        >
          <p className="text-xs text-white/30 tracking-widest uppercase mb-4">GitHub Contributions</p>
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <img
              src="https://raw.githubusercontent.com/ParkerMorris11/ParkerMorris11/main/profile-3d-contrib/profile-night-view.svg"
              alt="Parker Morris GitHub 3D contribution chart"
              className="w-full mix-blend-mode-screen"
              style={{ mixBlendMode: "screen" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
