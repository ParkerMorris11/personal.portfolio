import { motion } from "framer-motion";
import VideoPlayer from "./VideoPlayer";

const badges = [
  { label: "Integrated with", icon: "⚡" },
  { label: "Integrated with", icon: "🔗" },
  { label: "Integrated with", icon: "🛡️" },
];

const logos = Array.from({ length: 6 }, (_, i) => `Logo ${i + 1}`);

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
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
          {badges.map((badge, i) => (
            <span
              key={i}
              className="flex items-center gap-2 px-4 py-2 text-xs text-white/70 rounded-full backdrop-blur-md bg-white/5 border border-white/10"
            >
              <span>{badge.icon}</span>
              {badge.label}
            </span>
          ))}
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.4)}
          className="text-center text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-semibold tracking-tight text-white leading-[1.05] max-w-4xl"
        >
          Where Innovation
          <br />
          Meets Execution
        </motion.h1>

        {/* Subtext */}
        <motion.p
          {...fadeUp(0.6)}
          className="mt-6 text-center text-base md:text-lg text-white/50 max-w-xl leading-relaxed"
        >
          Streamline your testing and deployment pipeline with
          <br />
          intelligent automation that scales with your team.
        </motion.p>

        {/* Buttons */}
        <motion.div {...fadeUp(0.8)} className="flex gap-4 mt-10">
          <button className="px-6 py-3 text-sm font-medium text-white rounded-full bg-black border border-white/30 hover:border-white/60 transition-colors">
            Get Started for Free
          </button>
          <button className="px-6 py-3 text-sm font-medium text-white/80 rounded-full backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            Let's Get Connected
          </button>
        </motion.div>

        {/* Logo Marquee */}
        <motion.div
          {...fadeUp(1.0)}
          className="mt-20 flex items-center gap-12 opacity-40"
        >
          {logos.map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center w-24 h-8 text-xs text-white/60 font-medium tracking-wide grayscale"
            >
              {logo}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
