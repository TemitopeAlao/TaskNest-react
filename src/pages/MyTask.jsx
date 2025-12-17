import { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import {
  deleteTask,
  fetchAllTasks,
  createTask,
  updateTaskCompleted,
  updateTaskBackend,
} from "../api/tasks";
import LoaderComponent from "../components/LoaderComponent";
import AddTaskBtn from "../components/AddTaskBtn";
import ModalForm from "../components/ModalForm";

export default function MyTask() {
  const [tasks, setTasks] = useState([]);
  const [sortByDue, setSortByDue] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "" });

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    setLoading(true);
    try {
      const all = await fetchAllTasks();
      const now = new Date();
      const tasksWithStatus = all.map((task) => {
        const fullDueDate = task.due_date ? new Date(task.due_date) : null;
        const status = task.completed
          ? "Completed"
          : fullDueDate && fullDueDate < now
          ? "Overdue"
          : "In Progress";
        return { ...task, status };
      });
      setTasks(tasksWithStatus);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    } finally {
      setLoading(false);
    }
  }

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 2000);
  };

  const handleAddTask = async (taskData) => {
    try {
      if (editingTask) {
        const updatedTask = await updateTaskBackend(editingTask.id, taskData);

        const now = new Date();
        const fullDueDate = updatedTask.due_date
          ? new Date(updatedTask.due_date)
          : null;
        const status = updatedTask.completed
          ? "Completed"
          : fullDueDate && fullDueDate < now
          ? "Overdue"
          : "In Progress";

        setTasks((prev) =>
          prev.map((t) => (t.id === editingTask.id ? updatedTask : t))
        );

        showToast("Task updated successfully", "success");
      } else {
        const created = await createTask(taskData);
        if (!created) return showToast("Failed to add task", "error");

        const now = new Date();
        const fullDueDate = created.due_date
          ? new Date(created.due_date)
          : null;
        const status =
          fullDueDate && fullDueDate < now ? "Overdue" : "In Progress";
        const taskWithStatus = { ...created, status };

        setTasks((prev) => [taskWithStatus, ...prev]);
        showToast("Task added successfully", "success");
      }

      setIsModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      console.error(err);
      showToast(
        editingTask ? "Failed to update task" : "Failed to add task",
        "error"
      );
    }
  };

  const handleComplete = async (id, completed) => {
    try {
      await updateTaskCompleted(id, completed);
      await loadTasks();
    } catch (err) {
      console.error(err);
      showToast("Failed to update task", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      showToast("Task deleted", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete task", "error");
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const displayedTasks = [...tasks].sort((a, b) => {
    if (sortByDue) {
      return (a.due_date || 0) - (b.due_date || 0);
    } else {
      return b.created_at - a.created_at;
    }
  });

  return (
    <section id="tasks-section">
      <div className="heading">
        <h1 className="all-task-title">All Tasks</h1>
        <label>
          <input
            type="checkbox"
            checked={sortByDue}
            onChange={() => setSortByDue((prev) => !prev)}
          />
          Sort by Due Date
        </label>
        <AddTaskBtn
          id="myTaskBtn"
          onClick={() => setIsModalOpen(true)}
          className="myTaskBtn"
        >
          Add a New Task
        </AddTaskBtn>
      </div>

      <div id="allTasksList">
        {loading ? (
          <LoaderComponent />
        ) : displayedTasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          displayedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              showActions={true}
              onUpdateTask={(id, updates) =>
                handleComplete(id, updates.completed)
              }
              onDeleteTask={handleDelete}
              onEditTask={handleEditTask}
              showToast={showToast}
            />
          ))
        )}
      </div>

      {isModalOpen && (
        <ModalForm
          onSubmit={handleAddTask}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
          initialData={editingTask}
        />
      )}

      {toast.message && (
        <div className={`toast ${toast.type}`}>{toast.message}</div>
      )}
    </section>
  );
}
