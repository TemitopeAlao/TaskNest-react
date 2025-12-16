import "../css/global.css";
import "../css/nav.css";
import "../css/login.css";
import "../css/toggle.css";
import "../css/toast.css";

import { useState } from "react";
import { authSignup } from "../utils/auth";
import LoginHeader from "../components/LoginHeader";
import Toast from "../components/Toast";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setToastMessage("");

    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{5,}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (!emailPattern.test(email)) {
      setError("Enter a valid email.");
      return;
    }

    if (!passwordPattern.test(password)) {
      setError(
        "Password must include uppercase, number, special character and be 5+ characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const result = await authSignup({ name, email, password });

    setLoading(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    setToastType("success");
    setToastMessage("Account created successfully! Redirecting to login...");

    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  };

  return (
    <main className="signup-div">
      <LoginHeader />
      <div className="signup-container">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <ion-icon name="person-outline"></ion-icon>
              <input
                type="text"
                className="signup-name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Email</label>
            <div className="input-wrapper">
              <ion-icon name="mail-outline"></ion-icon>
              <input
                type="email"
                className="signup-email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input
                type="password"
                className="signup-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <div className="input-wrapper">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <a href="/login">Login</a>
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

export default Signup;
