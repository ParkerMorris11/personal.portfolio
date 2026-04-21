import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Programming",
    skills: ["Python", "JavaScript", "TypeScript", "SQL", "Java", "C++", "HTML/CSS"],
  },
  {
    title: "Web & Frameworks",
    skills: ["React", "Node.js", "Express", "SQLite"],
  },
  {
    title: "AI & Automation",
    skills: ["LLM/API Integrations", "Claude API", "Claude Code", "Agents", "Workflow Automations"],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const SkillsSection = () => {
  return (
    <section id="skills" className="relative py-32 px-4 bg-black">
      <div className="max-w-5xl mx-auto">
        <motion.span {...fadeUp} className="text-sm text-white/40 tracking-widest uppercase mb-4 block">
          Skills
        </motion.span>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-16"
        >
          What I Work With
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]"
            >
              <h3 className="text-lg font-semibold text-white mb-6">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 text-sm text-white/60 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white/80 transition-colors"
                  >
                    {skill}
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

export default SkillsSection;
