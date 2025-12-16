function SideNav() {
  return (
    <nav class="side__nav">
      <div class="side__nav-profile">
        <div class="side__nav-img">
          <img
            src="https://avatar.iran.liara.run/public"
            alt="avatar image"
            class="avatar-img"
            id="avatar"
          />
        </div>

        <label class="upload-btn" for="file">
          ⬆ Upload Image
        </label>
        <input id="file" type="file" accept="image/*" hidden />

        <div class="profile-info">
          <p class="user_name"></p>
          <p class="user_email"></p>
        </div>
      </div>
      <div class="nav-list-box">
        <ul class="side__nav-lists">
          <li id="dashboard-link" class="clicked-nav">
            <ion-icon name="pie-chart"></ion-icon>
            <span>Dashboard</span>
          </li>
          <li id="tasks-link">
            <ion-icon name="wallet-outline"></ion-icon>
            <span>My Task</span>
          </li>
          <li class="vital-nav">
            <ion-icon name="alert"></ion-icon>
            <span>Vital Tasks</span>
          </li>

          <li id="account-link">
            <ion-icon name="list-outline"></ion-icon>
            <span>Account Information</span>
          </li>
        </ul>
        <div class="logout">
          <ion-icon name="log-out-outline"></ion-icon>
          <span>Logout</span>
        </div>
      </div>
    </nav>
  );
}

export default SideNav;
