const PROJECT_EVIDENCE = [
  { value: "1 GB", label: "of system logs prepared and modeled" },
  { value: "91.3%", label: "reported evaluation accuracy" },
  { value: "40+", label: "backend API endpoints" },
  { value: "60+", label: "consultants supported by the learning platform" },
];

export default function ProjectEvidenceBand() {
  return (
    <aside
      className="project-evidence-band"
      data-motion-signature
      aria-labelledby="project-evidence-title"
    >
      <div className="project-evidence-marquee" aria-hidden="true">
        <span>Evidence from the work</span>
        <span>Evidence from the work</span>
      </div>

      <div className="project-evidence-ledger page-width">
        <p className="project-evidence-kicker">A brief ledger</p>
        <h2 id="project-evidence-title">
          The scale behind the selected work.
        </h2>
        <dl>
          {PROJECT_EVIDENCE.map((item) => (
            <div key={item.value}>
              <dt>{item.value}</dt>
              <dd>{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </aside>
  );
}
