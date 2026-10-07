import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.65,
    delay,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
});

const HeroSection = () => {
  const [displayedName, setDisplayedName] = useState("");

  useEffect(() => {
    const name = "Parker Morris";
    let character = 0;
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        character += 1;
        setDisplayedName(name.slice(0, character));
        if (character === name.length && interval !== undefined) {
          window.clearInterval(interval);
        }
      }, 55);
    }, 450);

    return () => {
      window.clearTimeout(start);
      if (interval !== undefined) window.clearInterval(interval);
    };
  }, []);

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="hero-shell relative min-h-[100svh] overflow-hidden bg-black text-white"
    >
      {/* Keep the original moving wave video as the hero's defining backdrop. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 z-0 h-[200vh]">
        <VideoPlayer />
      </div>
      <div aria-hidden="true" className="hero-shade absolute inset-0 z-[1]" />

      <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-6xl items-center gap-12 px-6 pb-20 pt-32 md:grid-cols-[1.12fr_0.88fr] md:gap-16 md:px-10 md:pt-24">
        <div className="hero-copy">
          <motion.p
            {...fadeUp(0.05)}
            className="eyebrow mb-6 text-white/65"
          >
            Applied AI <span>·</span> Product systems <span>·</span> Workflow automation
          </motion.p>

          <motion.p {...fadeUp(0.12)} className="mb-3 text-sm text-white/70">
            Hi, I’m {displayedName}
            {displayedName.length < "Parker Morris".length ? (
              <span aria-hidden="true" className="ml-1 inline-block h-4 w-px animate-pulse bg-white/70 align-middle" />
            ) : null}
          </motion.p>

          <motion.h1
            id="hero-title"
            {...fadeUp(0.2)}
            className="font-editorial max-w-3xl text-5xl leading-[1.04] tracking-[-0.035em] text-white sm:text-6xl md:text-[clamp(3.7rem,6vw,5.5rem)]"
          >
            I turn complex workflows into <em className="text-white/65">useful AI products.</em>
          </motion.h1>

          <motion.p
            {...fadeUp(0.34)}
            className="mt-7 max-w-xl text-base leading-7 text-white/75 md:text-lg md:leading-8"
          >
            From customer discovery to deployment—and the work that comes after.
          </motion.p>

          <motion.div {...fadeUp(0.46)} className="mt-9 flex flex-wrap gap-3">
            <a href="#projects" className="hero-button hero-button-primary">
              See the work <span aria-hidden="true">↘</span>
            </a>
            <a href="#contact" className="hero-button hero-button-secondary">
              Get in touch
            </a>
          </motion.div>
        </div>

        <motion.aside
          {...fadeUp(0.32)}
          aria-label="Selected work and outcomes"
          className="hero-ledger"
        >
          <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-5">
            <p className="eyebrow text-white/65">Operating ledger</p>
            <span className="ledger-live"><span aria-hidden="true" /> 2026 · live</span>
          </div>

          <div className="border-b border-white/15 py-5">
            <p className="mb-2 text-xs text-white/45">Currently building</p>
            <p className="text-base font-semibold text-white">AI Product Lead</p>
            <p className="mt-1 text-sm text-white/55">Toasted Tanz · customer workflow systems</p>
          </div>

          <dl className="divide-y divide-white/15">
            <div className="ledger-row">
              <dt><strong>88%</strong><span>faster policy mobilization</span></dt>
              <dd>BrainStorm</dd>
            </div>
            <div className="ledger-row">
              <dt><strong>80+</strong><span>employees in pilot</span></dt>
              <dd>BrainStorm</dd>
            </div>
          </dl>

          <div className="flex items-end justify-between gap-4 pt-5 text-sm">
            <p className="text-white/55">B.S. Information Systems</p>
            <p className="font-mono text-xs text-white/70">BYU · 2028</p>
          </div>
        </motion.aside>
      </div>

      <a href="#about" className="hero-scroll" aria-label="Scroll to About">
        <span>Scroll to explore</span><span aria-hidden="true">↓</span>
      </a>
    </section>
  );
};

export default HeroSection;
