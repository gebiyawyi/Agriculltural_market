export default function Filters({
  products,
  selectedProduct,
  onProductChange,
  fromDate,
  toDate,
  onFromChange,
  onToChange,
  onReset,
}) {
  return (
    <div className="filters">
      <div className="filter">
        <label>Product</label>
        <select
          value={selectedProduct}
          onChange={(e) => onProductChange(e.target.value)}
        >
          <option value="">All products</option>
          {products.map((p) => (
            <option key={p.product_id} value={p.product_name}>
              {p.product_name}
            </option>
          ))}
        </select>
      </div>
      <div className="filter">
        <label>From</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => onFromChange(e.target.value)}
        />
      </div>
      <div className="filter">
        <label>To</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => onToChange(e.target.value)}
        />
      </div>
      <button className="btn-reset" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}
