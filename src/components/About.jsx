import { Link } from "react-router-dom";
import aboutImage from "../assets/images/about-image.png";

function About() {
  return (
    <section id="about">
      <h1 className="about__title">About TaskNest</h1>
      <h2>We’re building a smarter way to stay on top of your day.</h2>

      <div className="about__content">
        <div className="about-image">
          <img src={aboutImage} alt="About TaskNest illustration" />
        </div>

        <div className="about__text">
          <p>
            TaskNest is built for individuals who want a seamless task
            management experience.
          </p>

          <p>
            Whether you are a student, professional, or entrepreneur, our app
            helps you track your tasks efficiently.
          </p>

          <p>
            With a clean interface, smart notifications, and real-time updates,
            staying organized has never been easier.
          </p>

          <Link to="/signup" className="hero__cta">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}

export default About;
