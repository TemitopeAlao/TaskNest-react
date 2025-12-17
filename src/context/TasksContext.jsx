import { createContext, useContext, useState, useEffect } from "react";
import {
  fetchAllTasks,
  createTask as apiCreateTask,
  updateTaskCompleted as apiUpdateCompleted,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
} from "../api/tasks.js";

const TasksContext = createContext();

export const useTasks = () => useContext(TasksContext);

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({ message: "", type: "info" });

  const triggerToast = (message, type = "info") => {
    setToast({ message, type });
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  const refreshTasks = async () => {
    setLoading(true);
    const data = await fetchAllTasks();
    setTasks(data.sort((a, b) => b.created_at - a.created_at));
    setLoading(false);
  };

  const createTask = async (taskData) => {
    setLoading(true);
    const newTask = await apiCreateTask(taskData);
    if (newTask) {
      setTasks((prev) => [newTask, ...prev]);
      triggerToast("Task created successfully", "success");
    } else {
      triggerToast("Failed to create task", "error");
    }
    setLoading(false);
    return newTask;
  };

  const updateTaskCompleted = async (id, completed) => {
    setLoading(true);
    const updated = await apiUpdateCompleted(id, completed);
    if (updated) {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
      );
      triggerToast(
        completed ? "Task completed" : "Task moved back to in-progress",
        "success"
      );
    } else {
      triggerToast("Failed to update task", "error");
    }
    setLoading(false);
  };

  const updateTask = async (id, updatedData) => {
    setLoading(true);
    const updated = await apiUpdateTask(id, updatedData);
    if (updated) {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
      );
      triggerToast("Task updated successfully", "success");
    } else {
      triggerToast("Failed to update task", "error");
    }
    setLoading(false);
  };

  const deleteTask = async (id) => {
    setLoading(true);
    const ok = await apiDeleteTask(id);
    if (ok) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
      triggerToast("Task deleted", "success");
    } else {
      triggerToast("Failed to delete task", "error");
    }
    setLoading(false);
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        refreshTasks,
        createTask,
        updateTaskCompleted,
        updateTask,
        deleteTask,
        toast,
        triggerToast,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
