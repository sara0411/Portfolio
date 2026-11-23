import { PORTFOLIO_DATA } from "@/data/portfolioData";
import Chapter from "./Chapter";

export default function ContactSection() {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section id="contact" tabIndex={-1} className="portfolio-section">
      <Chapter title="Contact" />
      <div className="contact page-width">
        <p data-reveal>
          {"I'm open to remote work and relocation, for backend and enterprise software engineering roles. Email is the best way to reach me."}
        </p>
        <a className="contact-email" data-reveal href={`mailto:${personal.email}`}>
          {personal.email}
        </a>
        <p className="contact-links" data-reveal>
          <a href={personal.cv} download>
            Download CV (PDF)
          </a>
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={personal.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </div>
    </section>
  );
}
