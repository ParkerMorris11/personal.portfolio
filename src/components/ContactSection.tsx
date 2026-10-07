import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const ContactSection = () => (
  <footer id="contact" className="contact-panel scroll-mt-20">
    <div className="contact-inner">
      <motion.p {...fadeUp} className="section-kicker">05 <span>—</span> Contact</motion.p>
      <motion.h2 {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="font-editorial">
        Let’s work on something useful.
      </motion.h2>
      <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.16 }} className="contact-lede">
        Have a project in mind? I’d love to hear about it.
      </motion.p>

      <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.24 }} className="contact-actions">
        <a href="mailto:parkerqmorris@gmail.com" className="contact-primary">Email Parker <span aria-hidden="true">↗</span></a>
        <a href="https://github.com/ParkerMorris11" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        <a href="https://www.linkedin.com/in/parker-morris11/" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
      </motion.div>

      <div className="contact-bottom">
        <span>© 2026 Parker Morris · Provo, UT</span>
        <a href="#top">Back to top ↑</a>
        <span>Built with care</span>
      </div>
    </div>
  </footer>
);

export default ContactSection;
