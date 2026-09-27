import { useEffect, useState } from "react";
import { getSummary, getTrend } from "../services/api";
import SummaryCard from "../components/SummaryCard";
import PriceChart from "../components/PriceChart";
import Loader from "../components/Loader";
import { formatNumber } from "../utils/format";
export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [trend, setTrend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let cancelled = false;
    Promise.all([getSummary(), getTrend()])
      .then(([s, t]) => {
        if (cancelled) return;
        setSummary(s);
        setTrend(t);
      })
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);
  if (loading) return <Loader label="Loading dashboard..." />;
  if (error) return <p className="error">Error: {error}</p>;
  if (!summary) return <p className="error">No data.</p>;
  return (
    <div className="page">
      <h1>Dashboard</h1>

      <div className="summary-grid">
        <SummaryCard title="Total Records" value={summary.total_records} />
        <SummaryCard title="Products" value={summary.total_products} />
        <SummaryCard
          title="Average Close Price"
          value={`ETB ${formatNumber(summary.avg_close_price)}`}
        />
        <SummaryCard
          title="Date Range"
          value={`${summary.earliest_date} → ${summary.latest_date}`}
        />
      </div>
      <h2>Price Trend Over Time</h2>
      <PriceChart data={trend} />
    </div>
  );
}
