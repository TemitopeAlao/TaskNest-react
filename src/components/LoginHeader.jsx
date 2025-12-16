import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/nav.css";

function LoginHeader() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    document.body.classList.toggle("dark-mode", savedMode);
  }, []);

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      document.body.classList.toggle("dark-mode", newMode);
      return newMode;
    });
  };

  return (
    <header>
      <nav>
        <Link to="/" className="logo__text">
          TaskNest
        </Link>

        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/login">Login</Link>
          </li>

          <li className="nav__item">
            <Link to="/signup" className="signup">
              Sign Up
            </Link>
          </li>

          <li className="nav__item">
            <label className="switch">
              <input
                type="checkbox"
                className="switch-bulb"
                checked={darkMode}
                onChange={handleToggleDarkMode}
              />
              <span className="slider"></span>
            </label>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default LoginHeader;
