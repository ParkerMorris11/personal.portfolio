import { profile, roles } from "@/content/site";

const AboutSection = () => (
  <section id="about" className="about-section" aria-labelledby="about-heading">
    <div className="section-head">
      <h2 id="about-heading">About</h2>
      <p>
        {profile.year.charAt(0).toUpperCase() + profile.year.slice(1)} in Information
        Systems at {profile.school}. I like work where the workflow is messy, the
        users are real, and the software has to keep running after the demo.
      </p>
    </div>

    <div className="about-layout">
      <div>
        <h3>Experience</h3>
        <ol className="role-list">
          {roles.map((role) => (
            <li key={`${role.title}-${role.organization}`}>
              <div className="role-top">
                <strong>{role.title}</strong>
                <time>{role.dates}</time>
              </div>
              <p className="role-org">
                {role.organization} · {role.location}
              </p>
              <p>{role.detail}</p>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h3>Education</h3>
        <p className="education">
          <strong>{profile.school}</strong>
          <span>
            {profile.college} · {profile.degree} · expected {profile.expected}
          </span>
        </p>
        <h3>Tools</h3>
        <ul className="tool-list">
          {[
            "TypeScript",
            "React",
            "Next.js",
            "Claude API",
            "Python",
            "Supabase",
            "PostgreSQL",
            "Twilio",
            "Resend",
          ].map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default AboutSection;
