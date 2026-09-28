import { motion } from "framer-motion";


const projects = [
  {
    title: "AI Policy Learning Workflow — BrainStorm",
    status: "Deployed",
    why: "Turning an AI policy into useful employee learning materials was taking about two hours of manual work. I worked from stakeholder requirements through an employee pilot and customer deployment.",
    description:
      "Built a Claude-powered application for policy extraction, assessments, content generation, and deployment preparation. It reduced policy mobilization time by 88% (about two hours to 15 minutes), was piloted with 80+ employees, and supported a customer workflow for the Town of Brookhaven.",
    tags: ["Claude API", "Next.js", "TypeScript", "Source Grounding", "Jira"],
  },
  {
    title: "Customer Workflow Systems — Toasted Tanz",
    status: "In Use",
    why: "A small business needs software that fits its actual check-in and communication workflows. I work with the founder to turn those operational needs into usable systems.",
    description:
      "Designed and shipped a digital waiver with an auditable agreement record, plus SMS and email workflows with rate limits, failure alerts, and recovery paths.",
    tags: ["TypeScript", "React", "Supabase", "PostgreSQL", "Twilio", "Resend"],
  },
  {
    title: "Bronz Bliss — Tanning Studio CRM",
    status: "In Progress",
    why: "Tanning studios run on Square, spreadsheets, and manual texts — none of it built for how they actually work. I wanted to see what a purpose-built vertical SaaS looked like from the ground up.",
    description:
      "Multi-tenant CRM covering the full operator workflow: client management, appointment booking, session history, service packages, and payments. 20+ pages built as a purpose-built alternative to generalist tools like Vagaro.",
    tags: ["React", "TypeScript", "Node.js", "Express", "Drizzle ORM", "Tailwind CSS", "Vercel"],
  },
  {
    title: "Ledger — Personal Finance Tracker",
    status: "Shipped",
    why: "Every finance app I tried was either too complex or too simple. I wanted something fast to use daily — not a dashboard you open once a month.",
    description:
      "Full-stack expense tracker with auto-categorization, budget tracking, safe-to-spend calculation, and a natural quick-add input designed for real daily use.",
    tags: ["React", "Express", "SQLite"],
  },
  {
    title: "Daily AI News Digest Agent",
    status: "Shipped",
    why: "I wanted a more useful way to keep up with AI news without reading overlapping newsletters every morning.",
    description:
      "Self-hosted agent that aggregates four AI newsletters, deduplicates and ranks stories by relevance, and delivers a personalized HTML briefing in about 30 seconds per run.",
    tags: ["Python", "Claude", "Automation"],
    url: "https://github.com/ParkerMorris11/ai-digest",
  },
  {
    title: "Local Sleep Briefing Agent",
    status: "Shipped",
    why: "I wanted to understand how sleep quality actually affects output — not generic advice, but a daily recommendation tied to what I had planned.",
    description:
      "Generates personalized morning recommendations connecting sleep quality to planned workload and habits using the Claude API for structured, actionable daily output.",
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
    <section id="projects" className="relative py-32 px-4 bg-white dark:bg-black">
      <div className="max-w-5xl mx-auto">
        <motion.span {...fadeUp} className="text-sm text-gray-900/70 dark:text-white/40 tracking-widest uppercase mb-4 block">
          Projects
        </motion.span>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-16"
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
              className="group relative p-8 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-sm hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                <span className="text-sm font-bold text-gray-900 dark:text-white shrink-0 ml-3">
                  {project.status}
                </span>
              </div>
              <p className="text-xs text-gray-900/80 dark:text-white/30 tracking-widest uppercase mb-2">Why I built it</p>
              <p className="text-sm text-gray-900/80 dark:text-white/60 leading-relaxed mb-4 italic">{project.why}</p>
              <p className="text-sm text-gray-900/65 dark:text-white/35 leading-relaxed mb-6">{project.description}</p>
              <div className="flex gap-2 flex-wrap">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs text-gray-900/75 dark:text-white/50 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex mt-6 text-sm font-medium text-gray-900 dark:text-white underline underline-offset-4 hover:opacity-70 transition-opacity"
                >
                  View project on GitHub ↗
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.4 }}
          className="mt-16"
        >
          <p className="text-xs text-gray-900/80 dark:text-white/30 tracking-widest uppercase mb-4">GitHub Contributions</p>
          <div className="rounded-2xl overflow-hidden">
            <img
              src="https://raw.githubusercontent.com/ParkerMorris11/ParkerMorris11/main/profile-3d-contrib/profile-night-green.svg"
              alt="Parker Morris GitHub 3D contribution chart"
              className="w-full"
              style={{ mixBlendMode: "screen" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
