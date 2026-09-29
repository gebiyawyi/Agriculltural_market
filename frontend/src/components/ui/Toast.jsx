import { useEffect } from "react";

export default function Toast({
  message,
  type = "info",
  duration = 3500,
  onClose,
}) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className={`toast toast--${type}`} role="status">
      <span className="toast__message">{message}</span>
      <button
        className="toast__close"
        onClick={onClose}
        aria-label="Close notification"
        type="button"
      >
        ×
      </button>
    </div>
  );
}
