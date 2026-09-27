export default function SummaryCard({ title, value, subtitle }) {
  return (
    <div className="summary-card">
      <h4>{title}</h4>
      <p className="value">{value}</p>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </div>
  );
}
