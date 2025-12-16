import featuresImage from "../assets/images/features-image.png";

function Features() {
  return (
    <section id="features">
      <h2 className="features__title">Features That Keep You Organized</h2>

      <div class="features__grid">
        <div class="two-features">
          <div class="features__item">
            <ion-icon name="calendar"></ion-icon>
            <h3 class="features__name">Smart Scheduling</h3>
            <p class="features__desc">
              Plan and prioritize tasks with an easy calendar and drag-and-drop
              tasks.
            </p>
          </div>
          <div class="features__item">
            <ion-icon name="alarm"></ion-icon>
            <h3 class="features__name">Smart Reminders</h3>
            <p class="features__desc">
              Get alerts before deadlines so nothing slips through.
            </p>
          </div>
          <div class="features__item">
            <ion-icon name="pie-chart"></ion-icon>
            <h3 class="features__name">Dashboard View</h3>
            <p class="features__desc">
              See all tasks, progress, and stats at a glance.
            </p>
          </div>
          <div class="features__item">
            <ion-icon name="contrast"></ion-icon>
            <h3 class="features__name">Dark Mode Support</h3>
            <p class="features__desc">
              Switch between light and dark themes for comfort and better focus.
            </p>
          </div>
        </div>
        <div class="features__image-box">
          <img
            src={featuresImage}
            alt="Features illustration"
            class="features__image"
          />
        </div>
      </div>
    </section>
  );
}

export default Features;
