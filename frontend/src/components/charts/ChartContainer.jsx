import Card from "../ui/Card";
import Loader from "../ui/Loader";
import EmptyState from "../ui/EmptyState";
import "./ChartContainer.css";

export default function ChartContainer({
  title,
  subtitle,
  loading,
  isEmpty,
  emptyMessage = "No data to display.",
  height = 380,
  children,
}) {
  return (
    <Card title={title} subtitle={subtitle} padding="md" className="chart-card">
      {loading ? (
        <Loader label="Loading chart..." />
      ) : isEmpty ? (
        <EmptyState title="No chart data" message={emptyMessage} />
      ) : (
        <div className="chart-card__body" style={{ height }}>
          {children}
        </div>
      )}
    </Card>
  );
}
