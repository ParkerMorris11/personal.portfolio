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
          Passionate about building
          <br />
          <span className="text-white/50">digital experiences</span>
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          className="text-lg text-white/40 leading-relaxed max-w-2xl"
        >
          I'm a full-stack developer with a love for clean architecture, intuitive interfaces, 
          and performant applications. With experience across the modern web stack, I bring ideas 
          to life through code — from concept to deployment. I thrive in collaborative environments 
          and believe great software is built at the intersection of design and engineering.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.3 }}
          className="grid grid-cols-3 gap-8 mt-16"
        >
          {[
            { number: "3+", label: "Years Experience" },
            { number: "20+", label: "Projects Completed" },
            { number: "10+", label: "Happy Clients" },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-bold text-white">{stat.number}</div>
              <div className="text-sm text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
