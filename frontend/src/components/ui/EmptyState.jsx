export default function EmptyState({
  title = "Nothing here yet",
  message = "No data matches your criteria.",
  action,
}) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon" aria-hidden="true">
        📭
      </div>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__message">{message}</p>
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
}
