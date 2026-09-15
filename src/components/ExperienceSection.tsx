import { PORTFOLIO_DATA } from "@/data/portfolioData";
import SectionHeading from "./SectionHeading";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      tabIndex={-1}
      className="portfolio-section page-width"
    >
      <SectionHeading
        label="Experience"
        title="Software work across products and enterprise systems."
      />

      <div className="experience-list">
        {PORTFOLIO_DATA.experience.map((item) => (
          <article
            className="experience-row"
            data-motion-content="split"
            key={`${item.organization}-${item.role}`}
          >
            <div className="experience-meta">
              <p>{item.period}</p>
              <p>{item.type}</p>
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
                <p className="experience-skills">{item.skills.join(" / ")}</p>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
