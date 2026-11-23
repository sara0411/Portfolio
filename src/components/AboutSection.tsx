import Image from "next/image";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import Chapter from "./Chapter";

export default function AboutSection() {
  const { personal, education, certifications, leadership } = PORTFOLIO_DATA;

  return (
    <section id="about" tabIndex={-1} className="portfolio-section">
      <Chapter title="About" />
      <div className="about-layout page-width">
        <figure className="portrait" data-reveal>
          <div className="portrait-frame">
            <Image
              src={personal.portrait}
              alt="Sara Ferraa at her graduation, holding a bouquet"
              fill
              sizes="(max-width: 800px) 70vw, 380px"
            />
          </div>
          <figcaption>Graduation day, EMSI Casablanca.</figcaption>
        </figure>

        <dl className="plain-list">
          {education.map((item) => (
            <div id="education" data-reveal key={item.degree}>
              <dt>Education</dt>
              <dd>
                {item.degree}. {item.institution}, {item.period}.{" "}
                {item.focus}
              </dd>
            </div>
          ))}
          <div id="community" data-reveal>
            <dt>Community</dt>
            <dd>
              <ul className="community-list">
                {leadership.map((item) => (
                  <li key={item.organization}>
                    <strong>{item.organization}</strong>, {item.role}
                    {item.highlights.length ? (
                      <ul>
                        {item.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div data-reveal>
            <dt>Certifications</dt>
            <dd>
              <ul>
                {certifications.map((item) => (
                  <li key={item.name}>{item.name}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div data-reveal>
            <dt>Languages</dt>
            <dd>Arabic, French and English.</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
