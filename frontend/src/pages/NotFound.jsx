import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__code">404</div>
      <h1 className="not-found__title">Page not found</h1>
      <p className="not-found__message">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="not-found__link">
        <Button variant="primary" size="lg">
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
}
