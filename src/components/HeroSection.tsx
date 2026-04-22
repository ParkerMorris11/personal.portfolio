import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

const FULL_NAME = "Parker Morris";

const HeroSection = () => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(FULL_NAME.slice(0, i + 1));
        i++;
        if (i === FULL_NAME.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, 60);
      return () => clearInterval(interval);
    }, 800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative h-screen bg-black overflow-hidden">
      {/* Video Background */}
      <div className="absolute top-0 left-0 right-0 h-[200vh] z-0">
        <VideoPlayer />
      </div>

      {/* Hero Content — top half */}
      <div className="relative z-10 flex flex-col items-center justify-start px-4 pt-36">
        {/* Eyebrow */}
        <motion.p {...fadeUp(0.1)} className="text-xs text-white/40 tracking-widest uppercase mb-6">
          Full-Stack Developer · Based in Provo, Utah
        </motion.p>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.3)}
          className="text-center text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-semibold tracking-tight text-white leading-[1.05] max-w-4xl"
        >
          Hi, I'm
          <br />
          <span className="bg-gradient-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent">
            {displayed}
            {!done && (
              <span className="inline-block w-[3px] h-[0.85em] bg-white/60 ml-1 align-middle animate-pulse" />
            )}
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          {...fadeUp(0.5)}
          className="mt-6 text-center text-base md:text-lg text-white/50 max-w-xl leading-relaxed"
        >
          I build fast, thoughtful web apps — from clean UIs to solid backends.
          <br />
          Focused on writing code that's easy to maintain and great to use.
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
