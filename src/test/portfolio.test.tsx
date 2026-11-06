import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Index from "@/pages/Index";
import { links, profile } from "@/content/site";

const renderHome = () => render(<Index />);

describe("portfolio home", () => {
  it("states who Parker is without a typewriter or ledger, on the black wave hero", () => {
    const { container } = renderHome();

    expect(screen.getByRole("heading", { level: 1, name: profile.name })).toBeInTheDocument();
    expect(screen.getByText(profile.statement)).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/Operating ledger/i);
    expect(container.textContent).not.toMatch(/I turn complex workflows into/i);
    expect(container.querySelector("video")).not.toBeNull();
    expect(container.querySelector(".hero-wave")).not.toBeNull();
  });

  it("leads with BrainStorm and Toasted case studies and keeps the intern stats together", () => {
    renderHome();

    const work = document.getElementById("work");
    expect(work).not.toBeNull();
    const text = work?.textContent ?? "";
    expect(text.indexOf("Policy learning workflow")).toBeLessThan(text.indexOf("Customer workflow systems"));
    expect(text).toMatch(/about two hours to about 15 minutes/);
    expect(text).toMatch(/80\+ employees/);
    expect(text).toMatch(/Town of Brookhaven/);
    expect(text).toMatch(/same project/);
    expect(text).toMatch(/auditable agreement record/);
    expect(text).not.toMatch(/not just/i);
  });

  it("exposes contact and public code links", () => {
    renderHome();

    expect(screen.getByRole("link", { name: profile.email })).toHaveAttribute("href", links.email);
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", links.github);
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", links.linkedin);
    expect(screen.getByRole("link", { name: "Public AUP toolkit on GitHub" })).toHaveAttribute(
      "href",
      links.aupToolkit,
    );
    expect(screen.getByRole("link", { name: "AI news digest agent" })).toHaveAttribute("href", links.aiDigest);
  });

  it("keeps navigation, skip link, and heading hierarchy usable without animation", () => {
    renderHome();

    expect(screen.getByRole("link", { name: "Skip to main content" })).toHaveAttribute("href", "#main");
    expect(document.getElementById("main")).not.toBeNull();
    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(within(nav).getByRole("link", { name: "Work" })).toHaveAttribute("href", "#work");
    expect(within(nav).getByRole("link", { name: "About" })).toHaveAttribute("href", "#about");
    expect(within(nav).getByRole("link", { name: "Contact" })).toHaveAttribute("href", "#contact");

    expect(screen.getByRole("heading", { level: 2, name: "Selected work" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Contact" })).toBeInTheDocument();
  });
});
