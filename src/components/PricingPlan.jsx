import { Link } from "react-router-dom";

function PricingPlan() {
  return (
    <section className="section-plans" id="pricing">
      <h2 className="plans-title">Our Pricing Plans</h2>

      <div className="plans">
        <div className="card">
          <div className="card__side card__side--front card__side--front-1">
            <div className="card__picture" />
            <h4 className="card__heading">
              <span className="card__heading-span">Basic Plan</span>
            </h4>
            <div className="card__details">
              <ul>
                <li>Up to 5 task lists</li>
                <li>Basic reminders</li>
                <li>Sync across devices</li>
              </ul>
            </div>
          </div>

          <div className="card__side card__side--back card__side--back-1">
            <div className="card__cta">
              <p className="card__price-only">Only</p>
              <p className="card__price-value">$2</p>
              <Link to="/signup" className="btn">
                Get Started
              </Link>
            </div>
          </div>
        </div>

        <div className="card premium">
          <span className="ribbon">Premium</span>

          <div className="card__side card__side--front card__side--front-2">
            <div className="card__picture--2" />
            <h4 className="card__heading">
              <span className="card__heading-span">Pro Plan</span>
            </h4>
            <div className="card__details">
              <ul>
                <li>Unlimited task lists</li>
                <li>Smart scheduling</li>
                <li>Priority reminders</li>
              </ul>
            </div>
          </div>

          <div className="card__side card__side--back card__side--back-2">
            <div className="card__cta">
              <p className="card__price-only">Only</p>
              <p className="card__price-value">$9</p>
              <Link to="/login" className="btn">
                Upgrade Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingPlan;
