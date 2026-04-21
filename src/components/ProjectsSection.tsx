import { motion } from "framer-motion";

const projects = [
  {
    title: "Ledger — Personal Finance Tracker",
    description:
      "Full-stack expense tracker with auto-categorization, budget tracking, safe-to-spend calculation, and a natural quick-add input. Built for everyday use, not just demos.",
    tags: ["React", "Express", "SQLite"],
  },
  {
    title: "Daily AI News Digest Agent",
    description:
      "Automated weekday agent that pulls stories from multiple AI news sources, then filters and ranks them into a concise overview. Standardized source ingestion for consistent output.",
    tags: ["Python", "Automation"],
  },
  {
    title: "Local Sleep Briefing Agent",
    description:
      "Generates daily recommendations connecting sleep quality to planned workload and habits. Uses the Claude API to surface personalized, actionable insights each morning.",
    tags: ["Python", "Claude API"],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative py-32 px-4 bg-black">
      <div className="max-w-5xl mx-auto">
        <motion.span {...fadeUp} className="text-sm text-white/40 tracking-widest uppercase mb-4 block">
          Projects
        </motion.span>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-16"
        >
          Things I've Built
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="group relative p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed mb-6">{project.description}</p>
              <div className="flex gap-2 flex-wrap">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs text-white/50 rounded-full border border-white/10 bg-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
