import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Architecture", href: "#architecture" },
  { label: "Projects", href: "#projects" },
];

const Navbar = () => (
  <motion.header
    initial={{ y: -16, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="portfolio-header fixed inset-x-0 top-0 z-50"
  >
    <nav aria-label="Main navigation" className="mx-auto flex w-full max-w-6xl items-center justify-between gap-5 px-6 py-4 md:px-10">
      <a href="#top" className="brand-mark" aria-label="Parker Morris, home">
        Parker Morris
      </a>

      <div className="nav-links" aria-label="Portfolio sections">
        {navLinks.map((link) => (
          <a key={link.label} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <ThemeToggle />
        <a href="#contact" className="nav-contact">Let’s talk</a>
      </div>
    </nav>
  </motion.header>
);

export default Navbar;
