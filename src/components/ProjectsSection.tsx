import { PORTFOLIO_DATA } from "@/data/portfolioData";
import Chapter from "./Chapter";
import IsoScene from "./IsoScene";
import type { SceneId } from "./isoScenes";

const SCENE_FOR: Record<string, { scene: SceneId; caption: string; label: string }> = {
  "automai-guided-authoring": {
    scene: "automai",
    caption: "A workflow is taught on screen, saved, turned into scripts and run. When a run fails, the trace goes back to the stage that caused it.",
    label: "A cursor teaches controls in a desktop window; the steps travel to a saved profile, then generated scripts, then the C++ runtime. On a failing run, a dashed trace goes back to the saved profile.",
  },
  "sam-itam-elearning": {
    scene: "sam",
    caption: "A question is answered from the team's own documents, locally; along the front, someone works through a course.",
    label: "A question card goes into a ChromaDB block, matching pages lift from a pile of documents, and an answer comes back from a local Ollama model. A dot hops along Course, Quiz, Manager validation and Progress.",
  },
  "ai-log-analyzer": {
    scene: "logs",
    caption: "Log lines go in, two bidirectional layers read each one both ways, and a label comes out.",
    label: "Log lines move into two BiLSTM layers and drop into trays labelled Normal, SQL injection, XSS, Server error and Unauthorized access.",
  },
  pagemate: {
    scene: "pagemate",
    caption: "A book opens through a signed link, a line is highlighted, and a friend's phone catches up in realtime.",
    label: "Two phones show the same book; a key travels from private storage to the first phone, a line is highlighted, and progress syncs to the second phone.",
  },
  pingpay: {
    scene: "pingpay",
    caption: "Four ways to pay in one app, and a sign-in that proves who you are without handing over credentials.",
    label: "A phone cycles through card, bank, ACH and crypto; a coin goes to Supabase and is marked paid. In front, a person passes through a proof ring and is verified.",
  },
  "recruitment-cv-platform": {
    scene: "forum",
    caption: "A CV goes from the candidate to the company's stand at the forum, then to the recruiter who rates it.",
    label: "A CV travels from a candidate's table to a company stand, then to a recruiter's table where four of five marks light up. An admin board stands behind.",
  },
};

export default function ProjectsSection() {
  return (
    <section id="projects" tabIndex={-1} className="portfolio-section">
      <Chapter title="Work" />
      <div className="page-width">
        {PORTFOLIO_DATA.projects.map((project) => {
          const scene = SCENE_FOR[project.id];
          return (
          <article className="project-row" id={project.id} key={project.id}>
            <header className="project-head" data-reveal>
              <h3>{project.title}</h3>
              <p className="project-where">{project.where}</p>
              <p className="project-meta">{project.technologies.join(", ")}</p>
              {project.githubUrl ? (
                <p className="project-meta">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source on GitHub
                  </a>
                </p>
              ) : null}
            </header>

            <div className="project-body">
              {project.paragraphs.map((paragraph, index) => (
                <p
                  className={index === 0 ? "project-lede" : undefined}
                  data-reveal
                  key={paragraph}
                >
                  {paragraph}
                </p>
              ))}

              {scene ? <IsoScene {...scene} /> : null}


              {project.features ? (
                <dl className="feature-list">
                  {project.features.map((feature) => (
                    <div data-reveal key={feature.title}>
                      <dt>{feature.title}</dt>
                      <dd>{feature.text}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}

            </div>
          </article>
          );
        })}

        <p className="more-work" data-reveal>
          There is more on{" "}
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          , mostly coursework and experiments.
        </p>
      </div>
    </section>
  );
}
