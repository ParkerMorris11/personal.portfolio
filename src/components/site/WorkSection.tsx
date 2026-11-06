import { brainstormFlow, links, toastedFlow } from "@/content/site";
import FlowDrawing from "./FlowDrawing";

const WorkSection = () => (
  <section id="work" className="work-section" aria-labelledby="work-heading">
    <div className="section-head">
      <h2 id="work-heading">Selected work</h2>
      <p>
        Two recent roles: an employee AI learning workflow at BrainStorm, and
        customer operations software at Toasted Tanz.
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
            As an intern I owned a Claude-powered application from requirements
            through an employee pilot and a customer deployment, working with
            stakeholders along the way. After the intern cycle, the workflow was
            handed to Product and Engineering.
          </p>
          <h4>How it works</h4>
          <p>
            The app parses an acceptable-use policy, extracts sections, generates
            assessments and an employee PDF, then exports a Flow Builder workbook
            for the BSI platform. People can edit employee-facing content and
            assessments before anything is deployed.
          </p>
          <h4>Outcome</h4>
          <p>
            On this intern project, policy mobilization time went from about two
            hours to about 15 minutes (~88%). It was piloted with 80+ employees
            and used in a customer workflow for the Town of Brookhaven.
          </p>
          <p>
            <a href={links.aupToolkit} target="_blank" rel="noopener noreferrer">
              AUP toolkit on GitHub
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
            I partner with the founder on product: taking customer and operational
            needs through to delivery.
          </p>
          <h4>How it works</h4>
          <p>
            What’s shipped today is a digital waiver with an auditable agreement
            record, plus SMS and email workflows with rate limits, failure alerts,
            and recovery paths. Built with TypeScript, React, Supabase, PostgreSQL,
            Twilio, and Resend.
          </p>
        </div>
        <FlowDrawing title="Diagram · customer path" steps={toastedFlow} />
      </div>
    </article>

    <article id="elsewhere" className="supporting" aria-labelledby="elsewhere-title">
      <h3 id="elsewhere-title">Also on GitHub</h3>
      <p>
        <a href={links.aiDigest} target="_blank" rel="noopener noreferrer">
          AI news digest agent
        </a>
        — a self-hosted Python tool that reads four AI newsletters, uses Claude
        to drop duplicates and rank stories, and emails one briefing.
      </p>
    </article>
  </section>
);

export default WorkSection;
