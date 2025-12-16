import React from "react";

function Signup() {
  return (
    <>
      <div className="signup-container">
        <h2>Create Your Account</h2>

        <form id="signup-form" noValidate>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-wrapper">
              <ion-icon name="person-outline" />
              <input
                type="text"
                id="name"
                className="signup-name"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="error-message" id="name-error"></div>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <ion-icon name="mail-outline" />
              <input
                type="email"
                id="email"
                className="signup-email"
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
                className="signup-password"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="error-message" id="password-error"></div>
          </div>

          <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="input-wrapper">
              <ion-icon name="lock-closed-outline" />
              <input
                type="password"
                id="confirm-password"
                placeholder="Re-enter your password"
                required
              />
            </div>
            <div className="error-message" id="confirm-password-error"></div>
          </div>

          <button type="submit" className="btn-login">
            Sign Up
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?
          <a href="login.html">Login</a>
        </p>
      </div>

      <div id="successModal" className="success-modal">
        <div className="modal-box">
          <ion-icon name="checkmark-circle" />
          <p id="modalMessage"></p>
        </div>
      </div>
    </>
  );
}

export default Signup;
