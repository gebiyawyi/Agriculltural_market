import Button from "./Button";

export default function ErrorState({
  title = "Something went wrong",
  message = "Unable to load data.",
  onRetry,
}) {
  return (
    <div className="error-state" role="alert">
      <div className="error-state__icon" aria-hidden="true">
        ⚠️
      </div>
      <h3 className="error-state__title">{title}</h3>
      <p className="error-state__message">{message}</p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
