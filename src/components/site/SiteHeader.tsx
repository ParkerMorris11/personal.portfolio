import { nav, profile } from "@/content/site";

const SiteHeader = () => (
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
      </nav>
    </div>
  </header>
);

export default SiteHeader;
