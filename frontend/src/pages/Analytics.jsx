import { useEffect, useState } from "react";
import { getAnalyticsByProduct } from "../services/api";
import ProductBarChart from "../components/ProductBarChart";
import Loader from "../components/Loader";
export default function Analytics() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAnalyticsByProduct()
      .then(setRows)
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <Loader label="Loading analytics..." />;
  return (
    <div className="page">
      <h1>Analytics</h1>
      <h2>Price Comparison by Product</h2>
      <ProductBarChart data={rows} />

      <h2>Detailed Averages</h2>
      <table className="price-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Average Close</th>
            <th>Minimum Close</th>
            <th>Maximum Close</th>
            <th>Records</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.product_name}>
              <td>{r.product_name}</td>
              <td>{r.avg_close?.toFixed(2)}</td>
              <td>{r.min_close?.toFixed(2)}</td>
              <td>{r.max_close?.toFixed(2)}</td>
              <td>{r.record_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
