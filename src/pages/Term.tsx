import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import SiteShell from "@/components/site/SiteShell";
import SiteFooter from "@/components/site/SiteFooter";
import { links, profile, roles } from "@/content/site";

type Line = { kind: "in" | "out"; text: string };

const helpText = [
  "help       list commands",
  "whoami     identity and current role",
  "projects   BrainStorm, Toasted Tanz, AI digest",
  "resume     experience from this site (no PDF)",
  "contact    email, GitHub, LinkedIn",
  "home       back to the portfolio",
  "clear      clear the screen",
].join("\n");

const whoamiText = [
  profile.name,
  profile.statement,
  `Now: AI Product Lead, Toasted Tanz`,
  `${profile.degree}, ${profile.school} · expected ${profile.expected}`,
  profile.location,
].join("\n");

const projectsText = [
  "Policy learning workflow — BrainStorm Inc. · AI Adoption Intern",
  "Customer workflow systems — Toasted Tanz · AI Product Lead",
  `AI news digest agent — ${links.aiDigest}`,
].join("\n");

const resumeText = roles
  .map(
    (role) =>
      `${role.title} · ${role.organization} · ${role.dates}\n${role.location}\n${role.detail}`,
  )
  .join("\n\n");

const contactText = [profile.email, links.github, links.linkedin].join("\n");

const Term = () => {
  const [history, setHistory] = useState<Line[]>([
    { kind: "out", text: `parkermorris.org — type help or click a command.` },
  ]);
  const [value, setValue] = useState("");

  const run = (raw: string) => {
    const command = raw.trim().toLowerCase();
    const next: Line[] = [...history, { kind: "in", text: `> ${raw}` }];
    if (!command) {
      setHistory(next);
      return;
    }
    if (command === "clear") {
      setHistory([]);
      return;
    }
    const output =
      command === "help"
        ? helpText
        : command === "whoami"
          ? whoamiText
          : command === "projects"
            ? projectsText
            : command === "resume"
              ? resumeText
              : command === "contact"
                ? contactText
                : command === "home"
                  ? "opening /"
                  : `command not found: ${raw}`;
    setHistory([...next, { kind: "out", text: output }]);
    if (command === "home") {
      window.location.href = "/";
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    run(value);
    setValue("");
  };

  return (
    <SiteShell>
      <main id="main" className="term-page">
        <p className="panel-rule" aria-hidden="true">
          ── /term ──
        </p>
        <h1>term</h1>
        <p>
          Small command surface. The rest of the site is still a normal page.{" "}
          <Link to="/">Return home</Link>
        </p>
        <p className="term-commands" aria-label="Commands">
          {["help", "whoami", "projects", "resume", "contact"].map((command) => (
            <button key={command} type="button" className="ghost-btn" onClick={() => run(command)}>
              {command}
            </button>
          ))}
        </p>
        <pre className="term-log" aria-live="polite">
          {history.map((line, index) => (
            <span key={`${line.kind}-${index}`} className={line.kind}>
              {line.text}
              {"\n"}
            </span>
          ))}
        </pre>
        <form onSubmit={onSubmit} className="term-form">
          <label htmlFor="term-input">
            <span aria-hidden="true">&gt;</span>
          </label>
          <input
            id="term-input"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal command"
          />
        </form>
      </main>
      <SiteFooter />
    </SiteShell>
  );
};

export default Term;
