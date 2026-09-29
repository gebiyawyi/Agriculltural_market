import PageHeader from "../components/layout/PageHeader";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import "./About.css";

export default function About() {
  return (
    <div className="about">
      <PageHeader
        title="About This Project"
        subtitle="Background, data source, and technology stack"
      />

      <Card title="Overview" padding="lg">
        <p>
          The <strong>Smart Agricultural Market Price Analysis System</strong>{" "}
          is a full-stack application for exploring historical food prices in
          Ethiopia. It combines a Python data pipeline, a SQLite database, a
          Node.js + Express API, and a React dashboard to make two decades of
          price data accessible and understandable.
        </p>
        <p>
          The project was built to demonstrate an end-to-end data workflow:
          cleaning real-world data, persisting it in a database, exposing it
          through a REST API, and presenting it through an interactive web
          interface.
        </p>
      </Card>

      <Card title="Data Source" padding="lg">
        <p>
          Data comes from the{" "}
          <strong>World Bank Ethiopia Monthly Food Price Estimates</strong>{" "}
          dataset. It contains monthly price estimates for Maize, Wheat,
          Sorghum, Teff, Pasta, Livestock Goat, Livestock Sheep, and a composite
          Food Price Index.
        </p>
        <ul className="about__list">
          <li>
            <strong>Coverage:</strong> 2007 – 2026
          </li>
          <li>
            <strong>Records:</strong> approximately 1,888 price observations
          </li>
          <li>
            <strong>Currency:</strong> Ethiopian Birr (ETB)
          </li>
          <li>
            <strong>Market label:</strong> "Market Average" (aggregate only)
          </li>
          <li>
            <strong>Source:</strong> World Bank Open Data
          </li>
        </ul>
      </Card>

      <Card title="Technology Stack" padding="lg">
        <p>Each layer of the system uses a purpose-built tool:</p>
        <div className="about__badges">
          <Badge variant="primary">Python</Badge>
          <Badge variant="primary">Pandas</Badge>
          <Badge variant="primary">NumPy</Badge>
          <Badge variant="primary">Matplotlib</Badge>
          <Badge variant="primary">Seaborn</Badge>
          <Badge variant="neutral">SQLite</Badge>
          <Badge variant="success">Node.js</Badge>
          <Badge variant="success">Express</Badge>
          <Badge variant="success">better-sqlite3</Badge>
          <Badge variant="warning">React</Badge>
          <Badge variant="warning">Vite</Badge>
          <Badge variant="warning">Recharts</Badge>
          <Badge variant="warning">React Router</Badge>
          <Badge variant="warning">Axios</Badge>
        </div>
      </Card>

      <Card title="System Architecture" padding="lg">
        <p>The application is composed of four layers:</p>
        <ul className="about__list">
          <li>
            <strong>Data pipeline (Python)</strong> — cleans the raw CSV,
            generates charts, and seeds the SQLite database.
          </li>
          <li>
            <strong>Database (SQLite)</strong> — stores products, price
            observations, and precomputed summaries.
          </li>
          <li>
            <strong>API (Express)</strong> — exposes REST endpoints for
            products, prices, CRUD operations, and analytics.
          </li>
          <li>
            <strong>Frontend (React)</strong> — displays the data through a
            dashboard, filterable table, comparison charts, and data entry form.
          </li>
        </ul>
      </Card>

      <Card title="Limitations" padding="lg">
        <p>
          This project is honest about what the dataset can and cannot support:
        </p>
        <ul className="about__list">
          <li>
            The dataset contains <strong>prices only</strong>, not sales
            quantities. It cannot be used to analyze demand or volume.
          </li>
          <li>
            Only a single aggregate market label ("Market Average") is
            available. Individual markets such as Motta are not represented.
          </li>
          <li>
            Cross-category comparisons (grains vs livestock vs price index) use
            different scales and should be interpreted carefully.
          </li>
          <li>
            Future versions could add real market observations, sales volumes,
            and machine learning forecasts.
          </li>
        </ul>
      </Card>

      <Card title="Future Work" padding="lg">
        <ul className="about__list">
          <li>Machine learning price forecasting per product</li>
          <li>Support for multiple individual markets</li>
          <li>User authentication for data entry</li>
          <li>Export filtered records to CSV or PDF</li>
          <li>Alerting when prices change beyond a threshold</li>
        </ul>
      </Card>
    </div>
  );
}
