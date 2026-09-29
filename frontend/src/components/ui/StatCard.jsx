export default function StatCard({ label, value, helper, accent = "primary" }) {
  return (
    <div className={`stat-card stat-card--${accent}`}>
      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value">{value}</p>
      {helper && <p className="stat-card__helper">{helper}</p>}
    </div>
  );
}
