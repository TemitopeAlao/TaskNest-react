import { Link } from "react-router-dom";
import "../css/nav.css";

function Header() {
  return (
    <header>
      <nav>
        <a href="#" className="logo__text">
          TaskNest
        </a>

        <ul className="nav__list">
          <li className="nav__item">
            <a href="#hero">Home</a>
          </li>
          <li className="nav__item">
            <a href="#about">About Us</a>
          </li>
          <li className="nav__item">
            <a href="#features">Features</a>
          </li>
          <li className="nav__item">
            <a href="#pricing">Pricing</a>
          </li>
          <li className="nav__item">
            <a href="#how-it-works">How it Works</a>
          </li>
          <li className="nav__item mobile-only">
            <Link to="/login">Login</Link>
          </li>
          <li className="nav__item mobile-only">
            <Link to="/signup" className="signup">
              Sign Up
            </Link>
          </li>
          <li className="nav__item mobile-only">
            <input className="switch-bulb" type="checkbox" />
          </li>
        </ul>

        <div className="nav__actions">
          <Link to="/login" className="login">
            Login
          </Link>
          <Link to="/signup" className="signup">
            Sign Up
          </Link>
          <input className="switch-bulb" type="checkbox" />
        </div>
      </nav>

      <button className="btn__mobile-nav">
        <ion-icon className="icon__mobile-nav" name="menu-outline" />
        <ion-icon className="icon__mobile-nav close" name="close-outline" />
      </button>
    </header>
  );
}

export default Header;
