import { motion } from "framer-motion";

const projects = [
  {
    title: "Customer Workflow Systems — Toasted Tanz",
    status: "AI Product Lead · In use",
    why: "The business needed check-in and customer communication that fit its actual workflows. I work with the founder to shape practical product changes around those needs.",
    description: "Led product work from customer and operational needs through delivery. Shipped a digital waiver with an auditable agreement record, plus SMS and email workflows with rate limits, failure alerts, and recovery paths.",
    tags: ["TypeScript", "React", "Supabase", "PostgreSQL", "Twilio", "Resend"],
  },
  {
    title: "AI Policy Learning Workflow — BrainStorm",
    status: "Deployed",
    why: "Turning an AI policy into useful employee learning materials was taking about two hours of manual work. I worked from stakeholder requirements through an employee pilot and customer deployment.",
    description: "Built a Claude-powered application for policy extraction, assessments, content generation, and deployment preparation. It reduced policy mobilization time by 88% (about two hours to 15 minutes), was piloted with 80+ employees, and supported a customer workflow for the Town of Brookhaven.",
    tags: ["Claude API", "Next.js", "TypeScript", "Source grounding", "Jira"],
  },
  {
    title: "Ledger — Personal Finance Tracker",
    status: "Shipped",
    why: "Every finance app I tried was either too complex or too simple. I wanted something fast to use daily — not a dashboard you open once a month.",
    description: "Full-stack expense tracker with auto-categorization, budget tracking, safe-to-spend calculation, and a natural quick-add input designed for real daily use.",
    tags: ["React", "Express", "SQLite"],
  },
  {
    title: "Daily AI News Digest Agent",
    status: "Shipped",
    why: "I wanted a more useful way to keep up with AI news without reading overlapping newsletters every morning.",
    description: "Self-hosted agent that aggregates four AI newsletters, deduplicates and ranks stories by relevance, and delivers a personalized HTML briefing in about 30 seconds per run.",
    tags: ["Python", "Claude", "Automation"],
    url: "https://github.com/ParkerMorris11/ai-digest",
  },
  {
    title: "Local Sleep Briefing Agent",
    status: "Shipped",
    why: "I wanted to understand how sleep quality actually affects output — not generic advice, but a daily recommendation tied to what I had planned.",
    description: "Generates personalized morning recommendations connecting sleep quality to planned workload and habits using the Claude API for structured, actionable daily output.",
    tags: ["Python", "Claude API"],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const ProjectsSection = () => (
  <section id="projects" className="editorial-section section-paper">
    <div className="section-wrap">
      <div className="section-intro projects-intro">
        <p className="section-kicker">04 <span>—</span> Projects</p>
        <div>
          <motion.h2 {...fadeUp} className="section-title font-editorial">Built, shipped, and put to work.</motion.h2>
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="section-lede">
            Product work across customer operations, employee learning, and practical automation.
          </motion.p>
        </div>
      </div>

      <div className="project-list">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: Math.min(index * 0.06, 0.24) }}
            className="project-row"
          >
            <div className="project-heading">
              <p className="project-index">P.{String(index + 1).padStart(2, "0")} <span>·</span> {project.status}</p>
              <h3 className="font-editorial">{project.title}</h3>
            </div>
            <div className="project-copy">
              <p className="project-why-label">Why I built it</p>
              <p className="project-why">{project.why}</p>
              <p className="project-description">{project.description}</p>
              <div className="project-footer">
                <ul className="project-tags" aria-label={`Technologies used for ${project.title}`}>
                  {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                {project.url ? (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">
                    View on GitHub <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="contribution-block">
        <p className="section-kicker">In the open</p>
        <div className="contribution-frame">
          <img
            src="https://raw.githubusercontent.com/ParkerMorris11/ParkerMorris11/main/profile-3d-contrib/profile-night-green.svg"
            alt="Parker Morris GitHub contribution chart"
            className="w-full"
            loading="lazy"
          />
        </div>
      </motion.div>
    </div>
  </section>
);

export default ProjectsSection;
