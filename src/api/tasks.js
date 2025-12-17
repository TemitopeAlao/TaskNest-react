const API_BASE = "https://x8ki-letl-twmt.n7.xano.io/api:IzI935XO";

function getAuth() {
  const token = localStorage.getItem("userToken");
  const userId = Number(localStorage.getItem("userId"));

  if (!token || !userId) return null;

  return { token, userId };
}

export async function fetchAllTasks() {
  const auth = getAuth();
  if (!auth) return [];

  try {
    const res = await fetch(`${API_BASE}/todo`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch tasks");

    const data = await res.json();

    return data
      .filter((t) => t.user_id === auth.userId)
      .map((t) => ({
        ...t,
        status: t.completed ? "Completed" : "In Progress",
      }));
  } catch (err) {
    console.error("fetchAllTasks error", err);
    return [];
  }
}

export async function createTask(taskData) {
  const auth = getAuth();
  if (!auth) return null;

  try {
    const payload = { ...taskData, user_id: auth.userId };

    const res = await fetch(`${API_BASE}/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (err) {
    console.error("createTask error", err);
    return null;
  }
}

export async function updateTaskCompleted(id, completed) {
  const auth = getAuth();
  if (!auth) return null;

  try {
    const current = await fetch(`${API_BASE}/todo/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    }).then((r) => r.json());

    const payload = {
      ...current,
      completed,
      updated_at: Date.now(),
    };

    const res = await fetch(`${API_BASE}/todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (err) {
    console.error("updateTaskCompleted error", err);
    return null;
  }
}
export const updateTaskBackend = async (id, updatedData) => {
  const token = localStorage.getItem("userToken");
  const userId = Number(localStorage.getItem("userId"));

  if (!token || !userId) return null;

  try {
    const current = await fetch(`${API_BASE}/todo/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    const payload = {
      ...current,
      ...updatedData,
      updated_at: Date.now(),
    };

    const res = await fetch(`${API_BASE}/todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to update task");

    return await res.json();
  } catch (err) {
    console.error("updateTaskBackend error:", err);
    return null;
  }
};

export async function updateTask(id, updatedData) {
  const auth = getAuth();
  if (!auth) return null;

  try {
    const current = await fetch(`${API_BASE}/todo/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    }).then((r) => r.json());

    const payload = {
      ...current,
      ...updatedData,
      updated_at: Date.now(),
    };

    const res = await fetch(`${API_BASE}/todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (err) {
    console.error("updateTask error", err);
    return null;
  }
}

export async function deleteTask(id) {
  const auth = getAuth();
  if (!auth) return false;

  try {
    const res = await fetch(`${API_BASE}/todo/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });

    return res.ok;
  } catch (err) {
    console.error("deleteTask error", err);
    return false;
  }
}
