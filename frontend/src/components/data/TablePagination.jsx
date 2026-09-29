import "./TablePagination.css";

export default function TablePagination({
  page,
  pageSize,
  totalRows,
  onPageChange,
  onPageSizeChange,
  pageSizes = [10, 25, 50, 100],
}) {
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  const start = totalRows === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalRows);

  const go = (p) => onPageChange(Math.min(Math.max(1, p), totalPages));

  return (
    <div className="pagination">
      <div className="pagination__info">
        Showing <strong>{start}</strong>–<strong>{end}</strong> of{" "}
        <strong>{totalRows}</strong>
      </div>

      <div className="pagination__size">
        <label htmlFor="page-size">Rows per page</label>
        <select
          id="page-size"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {pageSizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="pagination__controls">
        <button
          type="button"
          onClick={() => go(1)}
          disabled={page === 1}
          aria-label="First page"
        >
          «
        </button>
        <button
          type="button"
          onClick={() => go(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          ‹
        </button>
        <span className="pagination__page">
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          onClick={() => go(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          ›
        </button>
        <button
          type="button"
          onClick={() => go(totalPages)}
          disabled={page === totalPages}
          aria-label="Last page"
        >
          »
        </button>
      </div>
    </div>
  );
}
