export default function Chapter({ title }: { title: string }) {
  return (
    <div className="chapter">
      <h2 data-slide>{title}</h2>
    </div>
  );
}
