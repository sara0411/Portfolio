import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      tabIndex={-1}
      className="portfolio-section experience-section"
      data-experience-section
    >
      <div className="experience-shell page-width">
        <header className="experience-intro">
          <p className="section-label">Experience</p>
          <h2>Software work across products and enterprise systems.</h2>
          <p>
            Desktop automation, enterprise platforms, fintech products, and
            recruitment systems.
          </p>
          <div className="experience-progress" aria-hidden="true">
            <span />
          </div>
        </header>

        <div className="experience-list">
          {PORTFOLIO_DATA.experience.map((item, index) => (
            <article
              className="experience-row"
              data-motion-content="split"
              key={`${item.organization}-${item.role}`}
            >
              <div className="experience-meta">
                <span className="experience-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p>{item.period}</p>
                  <p>{item.type}</p>
                </div>
              </div>
              <div className="experience-body">
                <p className="organization">{item.organization}</p>
                <h3>{item.role}</h3>
                {item.highlights.length ? (
                  <ul className="experience-highlights">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="experience-note">
                    Current role. Public project details will be added once
                    confirmed.
                  </p>
                )}
                {item.skills.length ? (
                  <p className="experience-skills">
                    {item.skills.join(" / ")}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
