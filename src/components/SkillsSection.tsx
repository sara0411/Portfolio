import { PORTFOLIO_DATA } from "@/data/portfolioData";
import SectionHeading from "./SectionHeading";

export default function SkillsSection() {
  return (
    <section id="skills" tabIndex={-1} className="portfolio-section page-width">
      <SectionHeading
        label="Skills"
        title="Languages, platforms, and tools."
      />
      <dl className="skills-list">
        {PORTFOLIO_DATA.skills.map((category) => (
          <div
            className="skill-row"
            data-motion-content="split"
            key={category.title}
          >
            <dt>{category.title}</dt>
            <dd>{category.skills.join(" / ")}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
