import { motion } from "framer-motion";
import VideoPlayer from "./VideoPlayer";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Video Background */}
      <div className="absolute bottom-[35vh] left-0 right-0 h-[80vh] z-0">
        <VideoPlayer />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-24">
        {/* Badges */}
        <motion.div {...fadeUp(0.2)} className="flex gap-3 mb-8">
          {["React", "TypeScript", "Node.js"].map((tech) => (
            <span
              key={tech}
              className="flex items-center gap-2 px-4 py-2 text-xs text-white/70 rounded-full backdrop-blur-md bg-white/5 border border-white/10"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.4)}
          className="text-center text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-semibold tracking-tight text-white leading-[1.05] max-w-4xl"
        >
          Hi, I'm a
          <br />
          <span className="bg-gradient-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent">
            Developer
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          {...fadeUp(0.6)}
          className="mt-6 text-center text-base md:text-lg text-white/50 max-w-xl leading-relaxed"
        >
          I craft performant web experiences with clean code
          <br />
          and thoughtful design. Let's build something great.
        </motion.p>

        {/* Buttons */}
        <motion.div {...fadeUp(0.8)} className="flex gap-4 mt-10">
          <a
            href="#projects"
            className="px-6 py-3 text-sm font-medium text-white rounded-full bg-black border border-white/30 hover:border-white/60 transition-colors"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 text-sm font-medium text-white/80 rounded-full backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
