import featuresImage from "../assets/images/features-image.png";

function Features() {
  return (
    <section id="features">
      <h2 className="features__title">Features That Keep You Organized</h2>

      <div className="features__grid">
        <div className="two-features">
          <div className="features__item">
            <ion-icon name="calendar"></ion-icon>
            <h3 className="features__name">Smart Scheduling</h3>
            <p className="features__desc">
              Plan and prioritize tasks with an easy calendar and drag-and-drop
              tasks.
            </p>
          </div>
          <div className="features__item">
            <ion-icon name="alarm"></ion-icon>
            <h3 className="features__name">Smart Reminders</h3>
            <p className="features__desc">
              Get alerts before deadlines so nothing slips through.
            </p>
          </div>
          <div className="features__item">
            <ion-icon name="pie-chart"></ion-icon>
            <h3 className="features__name">Dashboard View</h3>
            <p className="features__desc">
              See all tasks, progress, and stats at a glance.
            </p>
          </div>
          <div className="features__item">
            <ion-icon name="contrast"></ion-icon>
            <h3 className="features__name">Dark Mode Support</h3>
            <p className="features__desc">
              Switch between light and dark themes for comfort and better focus.
            </p>
          </div>
        </div>
        <div className="features__image-box">
          <img
            src={featuresImage}
            alt="Features illustration"
            className="features__image"
          />
        </div>
      </div>
    </section>
  );
}

export default Features;
