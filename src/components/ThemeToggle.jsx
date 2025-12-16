import { useState, useEffect } from "react";
import "../css/global.css";
import "../css/nav.css";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

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

  const handleToggleNav = () => {
    setNavOpen((prev) => !prev);
    document.body.classList.toggle("nav-open", !navOpen);
  };

  const handleCloseNav = () => {
    setNavOpen(false);
    document.body.classList.remove("nav-open");
  };

  return (
    <>
      <div className="theme-switch">
        <label className="switch">
          <input
            type="checkbox"
            className="switch-bulb"
            checked={darkMode}
            onChange={handleToggleDarkMode}
          />
          <span className="slider"></span>
        </label>
      </div>

      <button className="btn__mobile-nav" onClick={handleToggleNav}>
        Menu
      </button>

      {navOpen && <div className="overlay" onClick={handleCloseNav}></div>}
    </>
  );
}

export default ThemeToggle;
