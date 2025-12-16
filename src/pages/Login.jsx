import "../css/nav.css";
import "../css/login.css";
import Header from "../components/Header";
function Login() {
  return (
    <>
      <Header />
      <div className="login-container">
        <h2>Login to TaskNest</h2>
        <form id="login-form" noValidate>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <ion-icon name="mail-outline" />
              <input
                type="email"
                id="email"
                className="login-email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="error-message" id="email-error"></div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <ion-icon name="lock-closed-outline" />
              <input
                type="password"
                id="password"
                className="login-password"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="error-message" id="login-error"></div>
          </div>

          <button type="submit" className="btn-login">
            Login
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <a href="signup.html">Sign up</a>
        </p>
      </div>

      <div id="toast" className="toast"></div>
    </>
  );
}

export default Login;
