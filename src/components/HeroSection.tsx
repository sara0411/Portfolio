import Image from "next/image";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function HeroSection() {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section id="hero" className="hero page-width" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="current-role">Currently at Automai</p>
        <h1 id="hero-title">{personal.name}</h1>
        <p className="hero-statement">
          Backend systems, product interfaces, mobile software, and applied AI.
        </p>
        <p className="hero-description">{personal.bioShort}</p>
        <div className="hero-actions">
          <a className="primary-action" href="#projects">
            View selected work
          </a>
          <a
            className="secondary-action"
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read my resume
          </a>
        </div>
        <p className="hero-location">Based in {personal.location}</p>
      </div>

      <figure className="hero-portrait">
        <div className="portrait-frame">
          <Image
            src={personal.portrait}
            alt="Portrait of Sara Ferraa"
            fill
            priority
            sizes="(max-width: 780px) 88vw, 420px"
          />
        </div>
        <figcaption>
          Backend, full stack, mobile, applied AI, and enterprise automation.
        </figcaption>
      </figure>
    </section>
  );
}
