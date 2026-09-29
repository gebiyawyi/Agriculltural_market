import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__col">
          <p className="footer__title">
            Smart Agricultural Market Price Analysis
          </p>
          <p className="footer__text">
            A full-stack price analysis system for Ethiopian agricultural
            markets.
          </p>
        </div>

        <div className="footer__col">
          <p className="footer__title">Data Source</p>
          <p className="footer__text">
            World Bank — Ethiopia Monthly Food Price Estimates
          </p>
        </div>

        <div className="footer__col">
          <p className="footer__title">Stack</p>
          <p className="footer__text">Python · SQLite · Express · React</p>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© {year} Smart Agri Market</span>
        <span>Built for educational use</span>
      </div>
    </footer>
  );
}
