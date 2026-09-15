import { PORTFOLIO_DATA } from "@/data/portfolioData";
import SectionHeading from "./SectionHeading";

export default function AboutSection() {
  const { about, education, certifications, leadership } = PORTFOLIO_DATA;

  return (
    <section id="about" tabIndex={-1} className="portfolio-section page-width">
      <div className="about-layout">
        <SectionHeading
          label="About"
          title="Software engineering with enterprise context."
        />
        <div className="about-copy">
          {about.paragraphs.map((paragraph) => (
            <p data-motion-content="unfold" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="credentials-layout">
        <div>
          <p className="subsection-label">Education</p>
          {education.map((item) => (
            <article
              className="credential-row"
              data-motion-content="unfold"
              key={item.degree}
            >
              <h3>{item.degree}</h3>
              <p>{item.institution}</p>
              {item.period ? <p>{item.period}</p> : null}
            </article>
          ))}
        </div>
        <div>
          <p className="subsection-label">Certifications</p>
          {certifications.map((item) => (
            <article
              className="credential-row"
              data-motion-content="unfold"
              key={item.name}
            >
              <h3>{item.name}</h3>
              <p>{item.issuer}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="community-block">
        <p className="subsection-label">Community</p>
        <div className="community-list">
          {leadership.map((item) => (
            <article
              className="community-row"
              data-motion-content="split"
              key={item.organization}
            >
              <h3>{item.organization}</h3>
              <div>
                <p className="community-role">{item.role}</p>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
