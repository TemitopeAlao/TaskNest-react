import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserRecord } from "../utils/auth";
import "../css/nav.css";
import "../css/dashboard.css";

function SideNav() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const userData = await getUserRecord();
      if (!userData) {
        navigate("/login");
        return;
      }
      setUser(userData);
    }

    fetchUser();
  }, [navigate]);

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
          <p className="user_name">{user?.name || "Loading..."}</p>
          <p className="user_email">{user?.email || ""}</p>
        </div>
      </div>

      <div className="nav-list-box">
        <ul className="side__nav-lists">
          <li>
            <NavLink
              to=""
              end
              className={({ isActive }) => (isActive ? "clicked-nav" : "")}
            >
              <ion-icon name="pie-chart" />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="tasks"
              className={({ isActive }) => (isActive ? "clicked-nav" : "")}
            >
              <ion-icon name="wallet-outline" />
              <span>My Task</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="vitaltask"
              className={({ isActive }) => (isActive ? "clicked-nav" : "")}
            >
              <ion-icon name="alert" />
              <span>Vital Tasks</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="accountinfo"
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
