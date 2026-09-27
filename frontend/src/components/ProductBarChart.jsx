import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
export default function ProductBarChart({ data }) {
  if (!data || data.length === 0) return <p>No product data available.</p>;
  return (
    <ResponsiveContainer width="100%" height={380}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="product_name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="avg_close" fill="#4c72b0" name="Average Close" />
        <Bar dataKey="min_close" fill="#55a868" name="Minimum Close" />
        <Bar dataKey="max_close" fill="#c44e52" name="Maximum Close" />
      </BarChart>
    </ResponsiveContainer>
  );
}
