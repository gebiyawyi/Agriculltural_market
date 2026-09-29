import "./SearchInput.css";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <div className="search-input">
      <span className="search-input__icon" aria-hidden="true">
        🔍
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      {value && (
        <button
          type="button"
          className="search-input__clear"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}
