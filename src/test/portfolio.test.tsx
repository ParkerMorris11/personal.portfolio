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

  it("leads with BrainStorm and Toasted case studies and keeps the intern stats in BrainStorm", () => {
    renderHome();

    const work = document.getElementById("work");
    const brainstorm = document.getElementById("brainstorm");
    const toasted = document.getElementById("toasted");
    const intro = work?.querySelector(".section-head")?.textContent ?? "";
    expect(work).not.toBeNull();
    expect(intro).toMatch(/BrainStorm/);
    expect(intro).toMatch(/Toasted Tanz/);
    expect(intro).not.toMatch(/claimed|unverified|independent achievements|public code/i);

    const brainstormText = brainstorm?.textContent ?? "";
    const toastedText = toasted?.textContent ?? "";
    expect(brainstormText.indexOf("Policy learning workflow")).toBeGreaterThan(-1);
    expect(work?.textContent?.indexOf("Policy learning workflow") ?? -1).toBeLessThan(
      work?.textContent?.indexOf("Customer workflow systems") ?? -1,
    );
    expect(brainstormText).toMatch(/about two hours to about 15 minutes/);
    expect(brainstormText).toMatch(/80\+ employees/);
    expect(brainstormText).toMatch(/Town of Brookhaven/);
    expect(toastedText).not.toMatch(/88%|80\+/);
    expect(toastedText).toMatch(/auditable agreement record/);
    expect(work?.textContent).not.toMatch(/not just/i);
    expect(work?.textContent).not.toMatch(/independently verified|as previously stated|this repository/i);
  });

  it("does not publish internal review notes", () => {
    const { container } = renderHome();
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/what this site already claimed/i);
    expect(text).not.toMatch(/not independently verified/i);
    expect(text).not.toMatch(/no public product screenshot/i);
    expect(text).not.toMatch(/I do not claim/i);
    expect(text).not.toMatch(/not a C-level title/i);
  });

  it("exposes contact and public code links", () => {
    renderHome();

    expect(screen.getByRole("link", { name: profile.email })).toHaveAttribute("href", links.email);
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", links.github);
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", links.linkedin);
    expect(screen.getByRole("link", { name: "AUP toolkit on GitHub" })).toHaveAttribute(
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
