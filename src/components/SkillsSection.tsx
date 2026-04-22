import { motion } from "framer-motion";

const macro = [
  {
    title: "System Design",
    detail: "Architecting multi-tenant SaaS products, defining type-safe data models with Drizzle ORM, and designing for reliability from the start — not as an afterthought.",
  },
  {
    title: "AI Orchestration",
    detail: "Building agentic workflows with LLMs — structured outputs, source ingestion pipelines, ranking logic, and re-engagement triggers that produce consistent, predictable results.",
  },
  {
    title: "Full-Stack Development",
    detail: "Owning the full product surface with a premium, minimalist aesthetic: React frontends in TypeScript, Node/Express APIs, relational databases, and Vercel deployments.",
  },
];

const micro = [
  { label: "Intelligence — The Brain", skills: ["Claude API", "OpenAI SDK", "Prompt Engineering", "Structured Outputs", "Agents", "LLM Orchestration"] },
  { label: "Application — The Interface", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Express"] },
  { label: "Infrastructure — The Foundation", skills: ["Drizzle ORM", "PostgreSQL", "SQLite", "Vercel", "Railway", "Supabase"] },
  { label: "Core — The Fundamentals", skills: ["Python", "Java", "C++", "SQL"] },
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

        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* Macro — Left */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 flex flex-col gap-8"
          >
            <p className="text-[10px] text-white/30 tracking-widest uppercase">Macro</p>
            {macro.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              >
                <p className="text-white font-semibold text-lg mb-2">{item.title}</p>
                <p className="text-white/40 text-sm leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Micro — Right */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.3 }}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 flex flex-col gap-7"
          >
            <p className="text-[10px] text-white/30 tracking-widest uppercase">Micro</p>
            {micro.map((group, i) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              >
                <p className="text-xs text-white/30 tracking-widest uppercase mb-3">{group.label}</p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm text-white/50 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white/70 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
