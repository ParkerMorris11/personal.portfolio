import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Architecture", href: "#architecture" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-xl bg-white/80 dark:bg-black/50 border-b border-black/10 dark:border-white/10"
    >
      <span className="text-lg font-medium tracking-tight text-gray-900 dark:text-white">Parker Morris</span>

      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm text-gray-900/60 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <a
          href="#contact"
          className="px-5 py-2 text-sm font-medium rounded-full bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-700 dark:hover:from-white/90 transition-all"
        >
          Let's Talk
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
