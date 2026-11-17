import { useEffect, useState } from "react";

const items = [
  { href: "#work", label: "Work" },
  { href: "#brainstorm", label: "BrainStorm" },
  { href: "#toasted", label: "Toasted" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

const SectionIndex = () => {
  const [current, setCurrent] = useState("#work");

  useEffect(() => {
    const ids = items.map((item) => item.href.slice(1));
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setCurrent(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.15, 0.4, 0.7] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="section-index" aria-label="On this page">
      <ol>
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href} aria-current={current === item.href ? "true" : undefined}>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default SectionIndex;
