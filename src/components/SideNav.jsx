import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserRecord } from "../utils/auth";
import "../css/nav.css";
import "../css/dashboard.css";

function SideNav() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchUser() {
      const storedUser = localStorage.getItem("userData");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        const userData = await getUserRecord();
        if (userData) setUser(userData);
      }
    }
    fetchUser();
  }, []);

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userData");
    navigate("/login");
  }

  return (
    <nav className="side__nav">
      <div className="side__nav-profile">
        <div className="side__nav-img">
          <img
            src="https://avatar.iran.liara.run/public"
            alt="avatar"
            className="avatar-img"
          />
        </div>

        <label className="upload-btn" htmlFor="file">
          ⬆ Upload Image
        </label>
        <input id="file" type="file" accept="image/*" hidden />

        <div className="profile-info">
          <p className="user_name">{user ? user.name : "Loading..."}</p>

          <p className="user_email">{user ? user.email : ""}</p>
        </div>
      </div>

      <div className="nav-list-box">
        <ul className="side__nav-lists">
          <li>
            <NavLink
              to="/dashboard/dashboard"
              className={({ isActive }) => (isActive ? "clicked-nav" : "")}
            >
              <ion-icon name="pie-chart" />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/tasks"
              className={({ isActive }) => (isActive ? "clicked-nav" : "")}
            >
              <ion-icon name="wallet-outline" />
              <span>My Task</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/vitalTask"
              className={({ isActive }) => (isActive ? "clicked-nav" : "")}
            >
              <ion-icon name="alert" />
              <span>Vital Tasks</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/accountInfo"
              className={({ isActive }) => (isActive ? "clicked-nav" : "")}
            >
              <ion-icon name="list-outline" />
              <span>Account Information</span>
            </NavLink>
          </li>
        </ul>

        <div className="logout" onClick={handleLogout}>
          <ion-icon name="log-out-outline" />
          <span>Logout</span>
        </div>
      </div>
    </nav>
  );
}

export default SideNav;
