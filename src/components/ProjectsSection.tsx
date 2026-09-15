import { PORTFOLIO_DATA } from "@/data/portfolioData";
import SectionHeading from "./SectionHeading";

const portfolioRepository = "https://github.com/sara0411/portfolio";

export default function ProjectsSection() {
  return (
    <section id="projects" tabIndex={-1} className="portfolio-section page-width">
      <SectionHeading
        label="Selected work"
        title="Selected systems, with the work made visible."
        intro="A closer look at the problem, my contribution, and the evidence available for each project."
      />

      <div className="project-list">
        {PORTFOLIO_DATA.projects.map((project, index) => {
          const hasPublicSource =
            project.githubUrl.replace(/\/$/, "").toLowerCase() !==
            portfolioRepository;

          return (
            <article
              className="project-row"
              data-motion-content="split"
              key={project.id}
            >
              <div className="project-index">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="project-body">
                <div className="project-heading">
                  <div>
                    <p className="project-category">{project.category}</p>
                    <h3>{project.title}</h3>
                  </div>
                  <p className="project-status">{project.status}</p>
                </div>
                <p className="project-tagline">{project.tagline}</p>
                <div className="project-evidence" aria-label="Project evidence">
                  <span>Evidence</span>
                  <strong>{project.evidence}</strong>
                </div>
                <div className="project-notes">
                  <div>
                    <h4>Context</h4>
                    <p>{project.problem}</p>
                  </div>
                  <div>
                    <h4>My contribution</h4>
                    <p>{project.contribution}</p>
                  </div>
                </div>
                <div className="project-implementation">
                  <h4>Implementation</h4>
                  <p>{project.solution}</p>
                </div>
                <div className="project-footer">
                  <ul className="technology-list" aria-label="Technologies">
                    {project.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                  {hasPublicSource ? (
                    <a
                      className="text-link"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View source
                    </a>
                  ) : (
                    <span className="project-visibility">Private work</span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className="more-work">
        More experiments and coursework are available on{" "}
        <a
          className="text-link"
          href={PORTFOLIO_DATA.personal.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </p>
    </section>
  );
}
