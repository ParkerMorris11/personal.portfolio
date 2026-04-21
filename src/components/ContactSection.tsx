import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const ContactSection = () => {
  return (
    <section id="contact" className="relative py-32 px-4 bg-black border-t border-white/5">
      <div className="max-w-2xl mx-auto text-center">
        <motion.span {...fadeUp} className="text-sm text-white/40 tracking-widest uppercase mb-4 block">
          Contact
        </motion.span>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6"
        >
          Let's work together
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          className="text-lg text-white/40 mb-12"
        >
          Have a project in mind? I'd love to hear about it.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="mailto:hello@example.com"
            className="px-8 py-4 text-sm font-medium text-black rounded-full bg-gradient-to-r from-white to-white/70 hover:from-white/90 hover:to-white/60 transition-all"
          >
            hello@example.com
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 text-sm font-medium text-white/80 rounded-full backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 text-sm font-medium text-white/80 rounded-full backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            LinkedIn
          </a>
        </motion.div>

        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.4 }}
          className="mt-24 text-xs text-white/20"
        >
          © 2026 — Built with passion
        </motion.p>
      </div>
    </section>
  );
};

export default ContactSection;
