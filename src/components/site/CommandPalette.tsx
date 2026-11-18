import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const commands = [
  { id: "work", label: "Work", hint: "Selected work", href: "/#work" },
  { id: "brainstorm", label: "BrainStorm", hint: "Policy learning workflow", href: "/#brainstorm" },
  { id: "toasted", label: "Toasted Tanz", hint: "Customer workflow systems", href: "/#toasted" },
  { id: "digest", label: "AI digest", hint: "Newsletter briefing", href: "/#elsewhere" },
  { id: "about", label: "About", hint: "Experience and school", href: "/#about" },
  { id: "contact", label: "Contact", hint: "Email, GitHub, LinkedIn", href: "/#contact" },
  { id: "term", label: "Terminal", hint: "/term", href: "/term" },
  { id: "home", label: "Home", hint: "Top of page", href: "/#top" },
] as const;

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return commands;
    return commands.filter(
      (item) =>
        item.label.toLowerCase().includes(needle) || item.hint.toLowerCase().includes(needle),
    );
  }, [query]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if ((event.key === "k" || event.key === "K") && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
        return;
      }
      if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        setOpen(true);
        return;
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActive(0);
      return;
    }
    const id = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  if (!open) return null;

  const run = (href: string) => {
    setOpen(false);
    if (href.startsWith("/#")) {
      navigate("/");
      window.setTimeout(() => {
        const id = href.slice(2);
        document.getElementById(id)?.scrollIntoView();
      }, 0);
      return;
    }
    navigate(href);
  };

  return (
    <div className="palette-scrim" role="presentation" onClick={() => setOpen(false)}>
      <div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Jump to section"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="panel-rule" aria-hidden="true">
          ── command ──
        </p>
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setActive((index) => Math.min(matches.length - 1, index + 1));
            }
            if (event.key === "ArrowUp") {
              event.preventDefault();
              setActive((index) => Math.max(0, index - 1));
            }
            if (event.key === "Enter" && matches[active]) {
              event.preventDefault();
              run(matches[active].href);
            }
          }}
          placeholder="jump to…"
          aria-label="Filter sections"
        />
        <ul>
          {matches.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                className={index === active ? "is-active" : undefined}
                onMouseEnter={() => setActive(index)}
                onClick={() => run(item.href)}
              >
                <span>{item.label}</span>
                <span>{item.hint}</span>
              </button>
            </li>
          ))}
          {matches.length === 0 ? <li className="palette-empty">no matches</li> : null}
        </ul>
      </div>
    </div>
  );
};

export default CommandPalette;
