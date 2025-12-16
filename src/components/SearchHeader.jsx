import { useState } from "react";
import { Link } from "react-router-dom";

import "../css/nav.css";
import "../css/dashboard.css";
function SearchHeader() {
  const [darkMode, setDarkMode] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const toggleDatePicker = () => {
    setDatePickerOpen((prev) => !prev);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setDatePickerOpen(false);
  };

  return (
    <header className="dashboard-header">
      <button id="navToggle" className="nav-toggle">
        <ion-icon name="menu-outline" />
      </button>

      <Link to="/" className="logo__text">
        TaskNest
      </Link>

      <form className="header__search" role="search">
        <input
          type="search"
          placeholder="Search tasks by title or description..."
          id="search"
        />
        <div className="search__icon">
          <ion-icon name="search-outline" />
        </div>
      </form>

      <div className="header__list">
        <ul className="header__icons">
          <li>
            <ion-icon name="alarm-outline" />
          </li>
          <li onClick={toggleDatePicker}>
            <ion-icon name="calendar-outline" />
          </li>
        </ul>

        {datePickerOpen && (
          <input
            type="date"
            id="headerDatePicker"
            value={selectedDate}
            onChange={handleDateChange}
          />
        )}

        <div className="header__date">
          <p className="day">
            {new Date().toLocaleString("en-US", { weekday: "short" })}
          </p>
          <p className="date">
            {selectedDate || new Date().toLocaleDateString()}
          </p>
        </div>

        <input
          className="switch-bulb"
          type="checkbox"
          checked={darkMode}
          onChange={toggleDarkMode}
        />
      </div>
    </header>
  );
}

export default SearchHeader;
