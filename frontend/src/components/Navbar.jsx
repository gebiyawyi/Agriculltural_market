import { useState } from "react";
import { NavLink } from "react-router-dom";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand" onClick={close}>
           Smart Agricultural Market Analysis
        </NavLink>
        <button
          className={`navbar-toggle ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
        <div className={`links ${open ? "open" : ""}`}>
          <NavLink to="/" end onClick={close}>
            Dashboard
          </NavLink>
          <NavLink to="/records" onClick={close}>
            Price Records
          </NavLink>
          <NavLink to="/analytics" onClick={close}>
            Analytics
          </NavLink>
          <NavLink to="/add" onClick={close}>
            Add Record
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
