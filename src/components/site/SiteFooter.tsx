import { links, profile } from "@/content/site";

const SiteFooter = () => (
  <footer id="contact" className="site-footer">
    <div className="footer-inner">
      <h2>Contact</h2>
      <p>
        Recruiting, internships, or a project with a real workflow — email is the
        fastest way.
      </p>
      <ul className="contact-links">
        <li>
          <a href={links.email}>{profile.email}</a>
        </li>
        <li>
          <a href={links.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </li>
      </ul>
      <p className="footer-meta">
        <span>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </span>
        <a href="#top">Back to top</a>
      </p>
      <p className="footer-credit">
        Hero photo:{" "}
        <a href="https://commons.wikimedia.org/wiki/File:Parthenon_east_side_Acropolis_Athens,_Greece.jpg">
          Parthenon, east side
        </a>{" "}
        by Jebulon,{" "}
        <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0 1.0</a>
        . Adapted as ASCII.
      </p>
    </div>
  </footer>
);

export default SiteFooter;
