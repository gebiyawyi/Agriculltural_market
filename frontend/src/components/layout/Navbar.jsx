import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

const LINKS = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/records", label: "Price Records" },
  { to: "/analytics", label: "Analytics" },
  { to: "/add", label: "Add Record" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink
          to="/"
          className="navbar__brand"
          onClick={() => setOpen(false)}
        >
          <span className="navbar__logo" aria-hidden="true"></span>
          <span className="navbar__brand-text">
            <strong>Smart Agricultural Market Analysis</strong>
            <small>Ethiopian Food Prices</small>
          </span>
        </NavLink>

        <button
          className={`navbar__toggle ${open ? "is-open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          className={`navbar__links ${open ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `navbar__link ${isActive ? "is-active" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
