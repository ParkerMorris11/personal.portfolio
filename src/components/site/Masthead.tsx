import VideoPlayer from "@/components/VideoPlayer";
import { profile } from "@/content/site";

const Masthead = () => (
  <section id="top" className="masthead-band" aria-labelledby="identity-name">
    <div aria-hidden="true" className="hero-wave">
      <VideoPlayer />
    </div>
    <div aria-hidden="true" className="hero-shade" />
    <div className="masthead">
      <div className="masthead-copy">
        <h1 id="identity-name">{profile.name}</h1>
        <p className="masthead-statement">{profile.statement}</p>
        <p className="masthead-actions">
          <a className="text-link text-link-primary" href="#work">
            Read the work
          </a>
          <a className="text-link" href="#contact">
            Email Parker
          </a>
        </p>
      </div>
      <dl className="title-block" aria-label="Current details">
        <div>
          <dt>Now</dt>
          <dd>
            AI Product Lead
            <span>Toasted Tanz</span>
          </dd>
        </div>
        <div>
          <dt>School</dt>
          <dd>
            {profile.degree}
            <span>
              {profile.school} · expected {profile.expected}
            </span>
          </dd>
        </div>
        <div>
          <dt>Place</dt>
          <dd>
            {profile.location}
            <span>Marriott School of Business</span>
          </dd>
        </div>
      </dl>
    </div>
  </section>
);

export default Masthead;
