import { PORTFOLIO_DATA } from "@/data/portfolioData";
import HeroWorld from "./HeroWorld";

export default function HeroSection() {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section id="hero" className="hero page-width" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-kicker">Software engineer, {personal.location}</p>
        <h1 id="hero-title" aria-label={personal.name}>
          <span className="line" aria-hidden="true">
            <span>Sara</span>
          </span>
          <span className="line" aria-hidden="true">
            <span>Ferraa</span>
          </span>
        </h1>
        {personal.intro.map((paragraph) => (
          <p className="hero-lede" key={paragraph}>
            {paragraph}
          </p>
        ))}
        <p className="hero-links">
          <a href={`mailto:${personal.email}`}>{personal.email}</a>
          <a href={personal.cv} download>
            Download CV
          </a>
          <a href={personal.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </p>
      </div>
      <HeroWorld />
    </section>
  );
}
