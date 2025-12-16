function showModal(message) {
  const modal = document.getElementById("successModal");
  const modalMsg = document.getElementById("modalMessage");

  modalMsg.textContent = message;
  modal.style.display = "flex";

  setTimeout(() => {
    modal.style.display = "none";
  }, 1500);
}

export const authSignup = async ({ name, email, password }) => {
  try {
    const res = await fetch(
      "https://x8ki-letl-twmt.n7.xano.io/api:o02AIwfn/auth/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data.message || "Signup failed",
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Network error. Try again.",
    };
  }
};

export const authLogin = async ({ email, password }) => {
  try {
    const res = await fetch(
      "https://x8ki-letl-twmt.n7.xano.io/api:o02AIwfn/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: "Incorrect email or password",
      };
    }

    localStorage.setItem("userToken", data.authToken);
    localStorage.setItem("userId", data.user_id);

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Network error. Try again.",
    };
  }
};

export const getUserRecord = async () => {
  const token = localStorage.getItem("userToken");
  if (!token) return null;

  try {
    const res = await fetch(
      "https://x8ki-letl-twmt.n7.xano.io/api:o02AIwfn/auth/me",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    localStorage.setItem("userData", JSON.stringify(data));
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
