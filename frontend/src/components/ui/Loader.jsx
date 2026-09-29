export default function Loader({ label = "Loading...", size = "md" }) {
  return (
    <div className={`loader loader--${size}`} role="status" aria-live="polite">
      <div className="loader__spinner" />
      <p className="loader__label">{label}</p>
    </div>
  );
}
