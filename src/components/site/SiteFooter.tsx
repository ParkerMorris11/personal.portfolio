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
        <a href="https://commons.wikimedia.org/wiki/File:Mount_Timpanogos_-_01-07-08.jpg">
          Mount Timpanogos from Provo
        </a>{" "}
        by a4gpa,{" "}
        <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA 2.0</a>
        . Adapted as ASCII.
      </p>
    </div>
  </footer>
);

export default SiteFooter;
