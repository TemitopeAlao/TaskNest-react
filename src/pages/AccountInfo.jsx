import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/accountDashboard.css";
export default function AccountInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    position: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Account information saved!");
  };

  const handleCancel = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      position: "",
    });
  };

  return (
    <section id="account-container">
      <div id="accountInfo">
        <div className="form-title">
          <h2>Account Information</h2>
          <button type="button" onClick={() => navigate("/dashboard")}>
            &lArr; Go Back
          </button>
        </div>

        <div className="another-box">
          <form onSubmit={handleSubmit}>
            <label>
              First Name
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Last Name
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email Address
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Contact Number
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
              />
            </label>

            <label>
              Position
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
              />
            </label>

            <div className="account__actionBtn">
              <button type="submit">Save Changes</button>
              <button type="button" className="cancel" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
