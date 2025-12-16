import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/nav.css";

function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    document.body.classList.toggle("dark-mode", savedMode);
  }, []);

  function toggleDarkMode() {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      document.body.classList.toggle("dark-mode", newMode);
      return newMode;
    });
  }

  function toggleNav() {
    setNavOpen((prev) => {
      document.body.classList.toggle("nav-open", !prev);
      return !prev;
    });
  }

  function closeNav() {
    setNavOpen(false);
    document.body.classList.remove("nav-open");
  }

  return (
    <header>
      <nav>
        <Link to="/" className="logo__text" onClick={closeNav}>
          TaskNest
        </Link>

        <ul className="nav__list">
          <li className="nav__item">
            <a href="#hero" onClick={closeNav}>
              Home
            </a>
          </li>

          <li className="nav__item">
            <a href="#about" onClick={closeNav}>
              About Us
            </a>
          </li>

          <li className="nav__item">
            <a href="#features" onClick={closeNav}>
              Features
            </a>
          </li>

          <li className="nav__item">
            <a href="#pricing" onClick={closeNav}>
              Pricing
            </a>
          </li>

          <li className="nav__item">
            <a href="#how-it-works" onClick={closeNav}>
              How it Works
            </a>
          </li>

          {/* MOBILE ONLY */}
          <li className="nav__item mobile-only">
            <Link to="/login" onClick={closeNav}>
              Login
            </Link>
          </li>

          <li className="nav__item mobile-only">
            <Link to="/signup" className="signup" onClick={closeNav}>
              Sign Up
            </Link>
          </li>

          <li className="nav__item mobile-only">
            <input
              className="switch-bulb"
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
          </li>
        </ul>

        <div className="nav__actions">
          <Link to="/login">Login</Link>
          <Link to="/signup" className="signup">
            Sign Up
          </Link>
          <input
            className="switch-bulb"
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
        </div>
      </nav>

      <button className="btn__mobile-nav" onClick={toggleNav}>
        {navOpen ? (
          <ion-icon name="close-outline" />
        ) : (
          <ion-icon name="menu-outline" />
        )}
      </button>

      {navOpen && <div className="overlay" onClick={closeNav}></div>}
    </header>
  );
}

export default Header;
