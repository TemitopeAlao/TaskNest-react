import { Link } from "react-router-dom";
import heroImage from "../assets/images/hero-image.png";

function Hero() {
  return (
    <section id="hero">
      <div className="hero__content">
        <h1>
          TaskNest Helps You <span>Get More Done,</span> Effortlessly
        </h1>
        <p>
          Organize your tasks, manage your time, and never miss a deadline.
          TaskNest keeps you productive and stress-free.
        </p>
        <Link to="/signup" className="hero__cta">
          Get Started
        </Link>
      </div>
      <div className="hero__image">
        <img src={heroImage} alt="Task management illustration" />
      </div>
    </section>
  );
}

export default Hero;
