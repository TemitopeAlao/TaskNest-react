import howItWorksImg from "../assets/images/how-it-works.png";
import checkTaskImg from "../assets/images/check-task.png";

function HowItWorks() {
  return (
    <section id="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2 className="plans-title">How TaskNest Works</h2>
        </div>

        <div className="how-grid">
          <div className="how-item">
            <div className="how-image-1">
              <img src={howItWorksImg} alt="Task Management illustration" />
            </div>

            <div className="how-text">
              <h3>What is TaskNest?</h3>
              <p>
                TaskNest helps individuals and teams manage tasks efficiently
                using scheduling, reminders, and real-time tracking.
              </p>
            </div>
          </div>

          <div className="how__content">
            <div className="how__content-text">
              <h3>Plan Your Tasks</h3>
              <p>Create projects, assign deadlines, and prioritize clearly.</p>

              <h3>Track Your Progress</h3>
              <p>
                Move tasks from pending to completed using a visual dashboard.
              </p>

              <h3>Stay Organized</h3>
              <p>Use reminders, filters, and analytics to stay on schedule.</p>
            </div>

            <div className="how__image">
              <img src={checkTaskImg} alt="TaskNest Dashboard Preview" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
