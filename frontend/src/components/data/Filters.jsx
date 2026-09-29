import "./Filters.css";

export default function Filters({
  products = [],
  selectedProduct,
  onProductChange,
  fromDate,
  toDate,
  onFromChange,
  onToChange,
  onReset,
}) {
  const hasActive = selectedProduct || fromDate || toDate;

  return (
    <div className="filters">
      <div className="filters__item">
        <label htmlFor="filter-product">Product</label>
        <select
          id="filter-product"
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

      <div className="filters__item">
        <label htmlFor="filter-from">From</label>
        <input
          id="filter-from"
          type="date"
          value={fromDate}
          onChange={(e) => onFromChange(e.target.value)}
        />
      </div>

      <div className="filters__item">
        <label htmlFor="filter-to">To</label>
        <input
          id="filter-to"
          type="date"
          value={toDate}
          onChange={(e) => onToChange(e.target.value)}
        />
      </div>

      {hasActive && (
        <button type="button" className="filters__reset" onClick={onReset}>
          Reset filters
        </button>
      )}
    </div>
  );
}
