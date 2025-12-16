import "../css/nav.css";
import "../css/toggle.css";
import "../css/login.css";
import "../css/toast.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginHeader from "../components/LoginHeader";
import Toast from "../components/Toast";
import { authLogin } from "../utils/auth";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setToastMessage("");
    setLoading(true);

    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{5,}$/;

    if (!email || !password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    if (!passwordPattern.test(password)) {
      setError(
        "Password must include uppercase, number, special character and be 5+ characters."
      );
      setLoading(false);
      return;
    }

    try {
      const result = await authLogin({ email, password });
      setLoading(false);

      if (!result.success) {
        setToastType("error");
        setToastMessage(result.error || "Login failed");
        return;
      }
      localStorage.setItem("token", result.token);
      setToastType("success");
      setToastMessage("Login successful! Redirecting...");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setLoading(false);
      setToastType("error");
      setToastMessage("Network error. Try again.");
    }
  };

  return (
    <main className="login-div">
      <LoginHeader />

      <div className="login-container">
        <h2>Login to TaskNest</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <ion-icon name="mail-outline"></ion-icon>
              <input
                type="email"
                id="email"
                className="login-email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input
                type="password"
                id="password"
                className="login-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>

      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage("")}
      />
    </main>
  );
}

export default Login;
