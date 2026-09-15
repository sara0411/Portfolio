export default function ChapterTransition({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="chapter-transition" aria-hidden="true">
      <div className="chapter-transition-inner page-width">
        <span className="chapter-transition-number">{number}</span>
        <p>{label}</p>
      </div>
    </div>
  );
}
