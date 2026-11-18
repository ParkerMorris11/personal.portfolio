import { nav, profile } from "@/content/site";

type SiteHeaderProps = {
  scanlines: boolean;
  onToggleScanlines: () => void;
};

const SiteHeader = ({ scanlines, onToggleScanlines }: SiteHeaderProps) => (
  <header className="site-header">
    <div className="site-header-inner">
      <a href="#top" className="brand">
        {profile.name}
      </a>
      <nav aria-label="Primary">
        {nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
        <a href="/term">Term</a>
      </nav>
      <div className="header-tools">
        <button type="button" className="ghost-btn" onClick={onToggleScanlines} aria-pressed={scanlines}>
          {scanlines ? "Scan on" : "Scan"}
        </button>
        <span className="kbd-hint">Ctrl+K</span>
      </div>
    </div>
  </header>
);

export default SiteHeader;
