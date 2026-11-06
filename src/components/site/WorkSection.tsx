import { brainstormFlow, links, toastedFlow } from "@/content/site";
import FlowDrawing from "./FlowDrawing";

const WorkSection = () => (
  <section id="work" className="work-section" aria-labelledby="work-heading">
    <div className="section-head">
      <h2 id="work-heading">Selected work</h2>
      <p>
        Two internships and product roles from 2026, written from what this site
        already claimed and from public code. Stats below come from the BrainStorm
        intern project — they are not independent achievements.
      </p>
    </div>

    <article id="brainstorm" className="exhibit" aria-labelledby="brainstorm-title">
      <header className="exhibit-header">
        <h3 id="brainstorm-title">Policy learning workflow</h3>
        <p className="exhibit-meta">
          BrainStorm Inc. · AI Adoption Intern · May–Aug 2026 · American Fork, UT
        </p>
      </header>

      <div className="exhibit-grid">
        <div className="exhibit-copy">
          <h4>Problem</h4>
          <p>
            Turning a company AI policy into usable employee learning materials took
            about two hours of manual work. The result still had to stay grounded in
            the source policy and be reviewable before anyone deployed it.
          </p>
          <h4>What I did</h4>
          <p>
            I owned a Claude-powered application from requirements through an
            employee pilot and a customer deployment, working from stakeholder
            needs rather than as a solo founder. After the intern cycle, the
            workflow was prepared for Product and Engineering.
          </p>
          <h4>How it works</h4>
          <p>
            The public toolkit that matches this intern workflow parses an
            acceptable-use policy, extracts sections, generates assessments and an
            employee PDF, then exports a Flow Builder workbook for the BSI
            platform. Human review of employee-facing content and assessment
            accuracy is part of the design, not an afterthought.
          </p>
          <h4>Outcome, as previously stated on this site</h4>
          <p>
            On this intern project, policy mobilization time went from about two
            hours to about 15 minutes (~88%). The same project was piloted with
            80+ employees and used in a customer workflow for the Town of
            Brookhaven. Those figures have not been independently verified here.
          </p>
          <p>
            <a href={links.aupToolkit} target="_blank" rel="noopener noreferrer">
              Public AUP toolkit on GitHub
            </a>
          </p>
        </div>
        <FlowDrawing title="Diagram · policy to BSI export" steps={brainstormFlow} />
      </div>
    </article>

    <article id="toasted" className="exhibit" aria-labelledby="toasted-title">
      <header className="exhibit-header">
        <h3 id="toasted-title">Customer workflow systems</h3>
        <p className="exhibit-meta">
          Toasted Tanz · AI Product Lead · Aug 2026–present · Provo, UT
        </p>
      </header>

      <div className="exhibit-grid">
        <div className="exhibit-copy">
          <h4>Problem</h4>
          <p>
            Toasted Tanz is software for a spray-tan business’s customer operations.
            Check-in and customer communication needed to match how the shop
            actually runs — including a reliable waiver and messages that do not
            fail silently.
          </p>
          <h4>What I did</h4>
          <p>
            I work with the founder as AI Product Lead: shaping product from
            customer and operational needs through delivery. This is a student
            product role, not a C-level title. I do not claim roadmap AI features
            as shipped.
          </p>
          <h4>How it works</h4>
          <p>
            Current shipped scope is a digital waiver that keeps an auditable
            agreement record, plus SMS and email workflows with rate limits,
            failure alerts, and recovery paths. Stack used on this work:
            TypeScript, React, Supabase, PostgreSQL, Twilio, and Resend.
          </p>
          <h4>Artifact</h4>
          <p>
            There is no public product screenshot or customer data in this
            repository. The diagram is a labeled flow of the shipped pieces, not
            a picture of the live app.
          </p>
        </div>
        <FlowDrawing title="Diagram · shipped customer path" steps={toastedFlow} />
      </div>
    </article>

    <article id="elsewhere" className="supporting" aria-labelledby="elsewhere-title">
      <h3 id="elsewhere-title">Also public</h3>
      <p>
        <a href={links.aiDigest} target="_blank" rel="noopener noreferrer">
          AI news digest agent
        </a>
        — a self-hosted Python tool that reads four AI newsletters, uses Claude
        to drop duplicates and rank stories, and emails one briefing. Personal
        utility software, not a company deployment.
      </p>
    </article>
  </section>
);

export default WorkSection;
