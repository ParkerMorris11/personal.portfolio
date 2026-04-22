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

const bronzSteps = [
  { label: "Booking", detail: "Client selects service, date, and time through a studio-branded flow" },
  { label: "Session", detail: "Session logged with skin tone history, service type, and notes" },
  { label: "CRM Profile", detail: "Client record updated — full history, preferences, lapse tracking" },
  { label: "AI Layer", detail: "Lapsed clients identified and outreach triggered automatically" },
  { label: "Dashboard", detail: "Studio owner sees revenue, bookings, and re-engagement metrics" },
];

const FlowDiagram = ({ steps }: { steps: typeof digestSteps }) => (
  <div className="flex flex-col md:flex-row items-stretch gap-0 mb-10">
    {steps.map((step, i) => (
      <div key={step.label} className="flex flex-row md:flex-col items-center flex-1">
        <div className="flex flex-col md:flex-row items-center flex-1 w-full">
          <div className="flex flex-col items-center flex-1 w-full">
            <div className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300">
              <p className="text-white font-semibold text-sm mb-2">{step.label}</p>
              <p className="text-white/35 text-xs leading-relaxed">{step.detail}</p>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className="flex items-center justify-center mx-2 my-2 shrink-0">
              <span className="text-white/20 text-lg font-light rotate-90 md:rotate-0">→</span>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
);

const AIArchitectureSection = () => {
  return (
    <section id="architecture" className="relative py-32 px-4 bg-black">
      <div className="max-w-5xl mx-auto">
        <motion.span {...fadeUp} className="text-sm text-white/40 tracking-widest uppercase mb-4 block">
          AI Architecture
        </motion.span>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4"
        >
          Designing systems,
          <br />
          <span className="text-white/50">not just writing code</span>
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          className="text-lg text-white/40 leading-relaxed max-w-2xl mb-16"
        >
          Building real tools means thinking through data flow, failure modes, and output consistency —
          not just wiring an API. Here's how two of my projects are designed under the hood.
        </motion.p>

        {/* Bronz Bliss */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.3 }}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-12 mb-8"
        >
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="text-xs text-white/30 tracking-widest uppercase mb-2">Case Study</p>
              <h3 className="text-2xl font-semibold text-white">Bronz Bliss — Tanning Studio CRM</h3>
              <p className="text-white/40 text-sm mt-1">React · Node.js · Express · Drizzle ORM · Vercel</p>
            </div>
            <span className="text-sm font-bold text-white">In Progress</span>
          </div>

          <FlowDiagram steps={bronzSteps} />

          <div className="border-t border-white/10 pt-8 grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-xs text-white/30 tracking-widest uppercase mb-3">The Problem</p>
              <p className="text-white/50 text-sm leading-relaxed">
                Tanning studios run on a mix of Square, manual texts, and spreadsheets — none built for their workflow.
                No client skin tone history, no lapse detection, no business intelligence specific to tanning patterns.
              </p>
            </div>
            <div>
              <p className="text-xs text-white/30 tracking-widest uppercase mb-3">The Design</p>
              <p className="text-white/50 text-sm leading-relaxed">
                Multi-tenant architecture gives each studio fully isolated data under one codebase.
                The CRM layer tracks session history per client so the AI re-engagement feature has a real signal to
                work from — not just a timestamp, but actual lapse patterns relative to their tanning cadence.
              </p>
            </div>
            <div>
              <p className="text-xs text-white/30 tracking-widest uppercase mb-3">Strategic Layer</p>
              <p className="text-white/50 text-sm leading-relaxed">
                Bronz Bliss also functions as a proof-of-capability demo for Clearpath AI sales conversations.
                Design quality matters as much as functionality — it needs to show what a purpose-built vertical
                SaaS looks like when done right.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Daily AI News Digest */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.4 }}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-12"
        >
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="text-xs text-white/30 tracking-widest uppercase mb-2">Case Study</p>
              <h3 className="text-2xl font-semibold text-white">Daily AI News Digest Agent</h3>
              <p className="text-white/40 text-sm mt-1">Python · Automation · Scheduled Agent</p>
            </div>
            <span className="text-sm font-bold text-white">Shipped</span>
          </div>

          <FlowDiagram steps={digestSteps} />

          <div className="border-t border-white/10 pt-8 grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-xs text-white/30 tracking-widest uppercase mb-3">The Problem</p>
              <p className="text-white/50 text-sm leading-relaxed">
                AI news moves fast and comes from many sources — blogs, newsletters, research digests.
                Reading all of them manually isn't sustainable. The signal-to-noise ratio is low and
                sources overlap constantly.
              </p>
            </div>
            <div>
              <p className="text-xs text-white/30 tracking-widest uppercase mb-3">The Design</p>
              <p className="text-white/50 text-sm leading-relaxed">
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
