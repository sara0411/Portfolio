import { PORTFOLIO_DATA } from "@/data/portfolioData";
import Chapter from "./Chapter";

export default function SkillsSection() {
  return (
    <section id="skills" tabIndex={-1} className="portfolio-section">
      <Chapter title="Skills" />
      <dl className="plain-list page-width">
        {PORTFOLIO_DATA.skills.map((category) => (
          <div data-reveal key={category.title}>
            <dt>{category.title}</dt>
            <dd>{category.skills.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
