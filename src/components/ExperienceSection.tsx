import { PORTFOLIO_DATA } from "@/data/portfolioData";
import Chapter from "./Chapter";

export default function ExperienceSection() {
  return (
    <section id="experience" tabIndex={-1} className="portfolio-section">
      <Chapter title="Experience" />
      <div className="page-width">
        {PORTFOLIO_DATA.experience.map((item) => (
          <article
            className="experience-row"
            data-reveal
            key={`${item.organization}-${item.role}`}
          >
            <header>
              <h3>{item.organization}</h3>
              <p className="project-where">
                {item.role}
                {item.period !== "Previous" ? `, ${item.period}` : ""}
              </p>
            </header>
            <ul>
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
