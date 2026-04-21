import { motion } from "framer-motion";

const navLinks = [
  { label: "Features", active: true },
  { label: "Insights" },
  { label: "About" },
  { label: "Case Studies", strikethrough: true },
  { label: "Contact" },
];

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-xl bg-white/5 border-b border-white/10"
    >
      <span className="text-lg font-medium tracking-tight text-white">Synapse</span>

      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href="#"
            className={`text-sm transition-colors ${
              link.strikethrough
                ? "line-through text-white/40 hover:text-white/60"
                : link.active
                ? "text-white border-b border-transparent bg-gradient-to-r from-white/80 to-white/40 bg-clip-text"
                : "text-white/60 hover:text-white"
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>

      <button className="px-5 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-white to-white/70 text-black hover:from-white/90 hover:to-white/60 transition-all">
        Get Started for Free
      </button>
    </motion.nav>
  );
};

export default Navbar;
