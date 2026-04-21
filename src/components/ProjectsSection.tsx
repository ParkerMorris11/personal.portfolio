import { motion } from "framer-motion";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A modern online store with real-time inventory, payments, and a custom CMS.",
    tags: ["React", "Node.js", "Stripe"],
  },
  {
    title: "Analytics Dashboard",
    description: "Data visualization dashboard with live metrics, custom charts, and reporting.",
    tags: ["TypeScript", "D3.js", "PostgreSQL"],
  },
  {
    title: "Social Media App",
    description: "Full-stack social platform with real-time chat, feeds, and media sharing.",
    tags: ["Next.js", "Socket.io", "AWS"],
  },
  {
    title: "AI Content Tool",
    description: "AI-powered writing assistant with templates, tone control, and export options.",
    tags: ["Python", "OpenAI", "React"],
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
          Selected Work
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
              <div className="h-40 rounded-xl bg-white/5 mb-6 flex items-center justify-center text-white/10 text-sm">
                Preview
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed mb-4">{project.description}</p>
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
