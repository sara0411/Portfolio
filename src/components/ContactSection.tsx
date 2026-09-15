import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function ContactSection() {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section id="contact" tabIndex={-1} className="contact-section page-width">
      <p className="section-label">Contact</p>
      <h2>Get in touch.</h2>
      <p>
        For backend and enterprise software engineering opportunities in
        Morocco or internationally, email me directly.
      </p>
      <a
        className="contact-email"
        data-motion-content="contact"
        href={`mailto:${personal.email}`}
      >
        {personal.email}
      </a>
      <nav
        className="contact-links"
        data-motion-content="unfold"
        aria-label="Profile links"
      >
        <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href={personal.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </nav>
    </section>
  );
}
