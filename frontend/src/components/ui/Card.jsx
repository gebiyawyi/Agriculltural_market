export default function Card({
  children,
  title,
  subtitle,
  actions,
  padding = "md",
  className = "",
}) {
  return (
    <section className={`card card--pad-${padding} ${className}`}>
      {(title || actions) && (
        <header className="card__header">
          <div>
            {title && <h3 className="card__title">{title}</h3>}
            {subtitle && <p className="card__subtitle">{subtitle}</p>}
          </div>
          {actions && <div className="card__actions">{actions}</div>}
        </header>
      )}
      <div className="card__body">{children}</div>
    </section>
  );
}
