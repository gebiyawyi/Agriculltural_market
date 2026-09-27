import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function PriceChart({ data }) {
  if (!data || data.length === 0) return <p>No trend data available.</p>;

  const grouped = {};
  data.forEach((row) => {
    if (!grouped[row.product_name]) grouped[row.product_name] = [];
    grouped[row.product_name].push({
      date: row.date,
      close_price: row.close_price,
    });
  });

  const products = Object.keys(grouped);
  const dates = [...new Set(data.map((r) => r.date))].sort();

  const merged = dates.map((d) => {
    const entry = { date: d };
    products.forEach((p) => {
      const match = grouped[p].find((r) => r.date === d);
      if (match) entry[p] = match.close_price;
    });
    return entry;
  });

  const colors = [
    "#4c72b0",
    "#dd8452",
    "#55a868",
    "#c44e52",
    "#8172b3",
    "#937860",
    "#da8bc3",
  ];

  return (
    <ResponsiveContainer width="100%" height={380}>
      <LineChart data={merged}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" minTickGap={40} />
        <YAxis />
        <Tooltip />
        <Legend />
        {products.map((p, i) => (
          <Line
            key={p}
            type="monotone"
            dataKey={p}
            stroke={colors[i % colors.length]}
            dot={false}
            strokeWidth={1.5}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
