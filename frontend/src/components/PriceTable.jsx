import { formatDate, formatCurrency } from "../utils/format";
export default function PriceTable({ rows }) {
  if (!rows || rows.length === 0) return <p>No records found.</p>;
  return (
    <div className="table-wrapper">
      <table className="price-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Currency</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.record_id}>
              <td>{formatDate(r.date)}</td>
              <td>{r.product_name}</td>
           <td>{formatCurrency(r.open_price)}</td>
            <td>{formatCurrency(r.high_price)}</td>
          <td>{formatCurrency(r.low_price)}</td>
           <td>{formatCurrency(r.close_price)}</td>            <td>{r.currency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
