import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const digestSteps = [
  { label: "Sources", detail: "Multiple AI news feeds pulled on a weekday schedule" },
  { label: "Ingestion", detail: "Standardized parsing normalizes each source into a shared schema" },
  { label: "Filtering", detail: "Duplicate and low-signal stories removed before ranking" },
  { label: "Ranking", detail: "Stories scored by recency, source weight, and topic relevance" },
  { label: "Output", detail: "Concise digest delivered — structured, readable, consistent" },
];

const policySteps = [
  { label: "Policy", detail: "Company policy supplied as the source material" },
  { label: "Extraction", detail: "Grounded policy details structured for review" },
  { label: "Learning", detail: "Assessments and content generated from the source" },
  { label: "Pilot", detail: "Employee feedback incorporated in two-week cycles" },
  { label: "Deployment", detail: "Customer workflow prepared for delivery" },
];

const FlowDiagram = ({ steps }: { steps: typeof digestSteps }) => (
  <div className="flex flex-col md:flex-row items-stretch gap-0 mb-10">
    {steps.map((step, i) => (
      <div key={step.label} className="flex flex-row md:flex-col items-center flex-1">
        <div className="flex flex-col md:flex-row items-center flex-1 w-full">
          <div className="flex flex-col items-center flex-1 w-full">
            <div className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] p-4 text-center hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.06] dark:bg-white/[0.06] transition-all duration-300">
              <p className="text-gray-900 dark:text-white font-semibold text-sm mb-2">{step.label}</p>
              <p className="text-gray-900/65 dark:text-white/35 text-xs leading-relaxed">{step.detail}</p>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className="flex items-center justify-center mx-2 my-2 shrink-0">
              <span className="text-gray-900/20 dark:text-white/20 text-lg font-light rotate-90 md:rotate-0">→</span>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
);

const AIArchitectureSection = () => {
  return (
    <section id="architecture" className="editorial-section section-paper">
      <div className="max-w-5xl mx-auto">
        <motion.span {...fadeUp} className="section-kicker mb-4 block">
          03 <span>—</span> AI architecture
        </motion.span>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="font-editorial text-[clamp(2.35rem,5vw,4rem)] leading-[1.06] tracking-tight text-gray-900 dark:text-white mb-4"
        >
          Designing systems,
          <br />
          <span className="text-gray-900/65 dark:text-white/55">not just writing code</span>
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          className="text-base text-gray-900/70 dark:text-white/55 leading-relaxed max-w-2xl mb-16"
        >
          Building real tools means thinking through data flow, failure modes, and output consistency —
          not just wiring an API. Here's how two of my projects are designed under the hood.
        </motion.p>

        {/* BrainStorm policy learning workflow */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.3 }}
          className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-8 md:p-12 mb-8"
        >
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="text-xs text-gray-900/80 dark:text-white/30 tracking-widest uppercase mb-2">Case Study</p>
              <h3 className="font-editorial text-2xl text-gray-900 dark:text-white">AI Policy Learning Workflow — BrainStorm</h3>
              <p className="text-gray-900/70 dark:text-white/40 text-sm mt-1">Claude API · Next.js · TypeScript · Source Grounding</p>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Deployed</span>
          </div>

          <FlowDiagram steps={policySteps} />

          <div className="border-t border-black/10 dark:border-white/10 pt-8 grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-xs text-gray-900/80 dark:text-white/30 tracking-widest uppercase mb-3">The Problem</p>
              <p className="text-gray-900/75 dark:text-white/50 text-sm leading-relaxed">
                Turning a company AI policy into usable employee learning materials took about two hours of manual work.
                The workflow needed to stay grounded in the source policy and be reviewable before deployment.
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-900/80 dark:text-white/30 tracking-widest uppercase mb-3">The Design</p>
              <p className="text-gray-900/75 dark:text-white/50 text-sm leading-relaxed">
                A Claude-powered application extracts policy details, generates assessments and learning content,
                and prepares assets for deployment. Structured outputs, source grounding, and semantic matching
                support consistent results.
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-900/80 dark:text-white/30 tracking-widest uppercase mb-3">The Outcome</p>
              <p className="text-gray-900/75 dark:text-white/50 text-sm leading-relaxed">
                Reduced policy mobilization time by 88%, from about two hours to 15 minutes.
                The workflow was piloted with 80+ employees and deployed for the Town of Brookhaven,
                with feedback incorporated before transition to Product and Engineering.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Daily AI News Digest */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.4 }}
          className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-8 md:p-12"
        >
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="text-xs text-gray-900/80 dark:text-white/30 tracking-widest uppercase mb-2">Case Study</p>
              <h3 className="font-editorial text-2xl text-gray-900 dark:text-white">Daily AI News Digest Agent</h3>
              <p className="text-gray-900/70 dark:text-white/40 text-sm mt-1">Python · Automation · Scheduled Agent</p>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Shipped</span>
          </div>

          <FlowDiagram steps={digestSteps} />

          <div className="border-t border-black/10 dark:border-white/10 pt-8 grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-xs text-gray-900/80 dark:text-white/30 tracking-widest uppercase mb-3">The Problem</p>
              <p className="text-gray-900/75 dark:text-white/50 text-sm leading-relaxed">
                AI news moves fast and comes from many sources — blogs, newsletters, research digests.
                Reading all of them manually isn't sustainable. The signal-to-noise ratio is low and
                sources overlap constantly.
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-900/80 dark:text-white/30 tracking-widest uppercase mb-3">The Design</p>
              <p className="text-gray-900/75 dark:text-white/50 text-sm leading-relaxed">
                Each source is normalized into a shared schema on ingestion so ranking logic doesn't
                care where a story came from. Stories are scored by recency, source credibility weight,
                and topic relevance — then trimmed to a fixed-length digest. Consistent structure means
                the output is always readable, never bloated.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AIArchitectureSection;
