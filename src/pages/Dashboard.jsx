import React, { useEffect, useState } from "react";
import {
  fetchAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api/tasks";
import { getUserRecord } from "../utils/auth";
import TaskCard from "../components/TaskCard";
import ModalForm from "../components/ModalForm";
import Toast from "../components/Toast";
import { NavLink } from "react-router-dom";
import AddTaskBtn from "../components/AddTaskBtn";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [circleData, setCircleData] = useState({
    completed: 0,
    inProgress: 0,
    overdue: 0,
  });
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [notifiedOverdueTasks, setNotifiedOverdueTasks] = useState(new Set());
  const hasTasks = tasks.length > 0;

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 2000);
  };

  const loadTasks = async () => {
    const allTasks = await fetchAllTasks();
    setTasks(allTasks.sort((a, b) => b.created_at - a.created_at));
  };

  useEffect(() => {
    const init = async () => {
      const userRecord = await getUserRecord();
      if (!userRecord) return (window.location.href = "/login");
      setUser(userRecord);
      await loadTasks();
    };
    init();
  }, []);

  useEffect(() => {
    const total = tasks.length || 1;
    const completed = tasks.filter((t) => t.status === "Completed").length;
    const inProgress = tasks.filter((t) => t.status === "In Progress").length;
    const overdue = tasks.filter((t) => t.status === "Overdue").length;

    setCircleData({
      completed: (completed / total) * 100,
      inProgress: (inProgress / total) * 100,
      overdue: (overdue / total) * 100,
    });
  }, [tasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newlyOverdue = [];

      setTasks((prev) =>
        prev.map((task) => {
          if (task.completed || notifiedOverdueTasks.has(task.id)) return task;

          const due = task.due_date ? new Date(task.due_date) : null;

          if (due && due < now && task.status !== "Overdue") {
            newlyOverdue.push(task.id);
            return { ...task, status: "Overdue" };
          }

          return task;
        })
      );

      if (newlyOverdue.length > 0) {
        showToast(
          `${newlyOverdue.length} task${
            newlyOverdue.length > 1 ? "s are" : " is"
          } overdue`,
          "error"
        );

        setNotifiedOverdueTasks((prev) => new Set([...prev, ...newlyOverdue]));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [notifiedOverdueTasks]);

  const handleSearch = (e) =>
    setSearchQuery(e.target.value.toLowerCase().trim());

  const handleAddTask = async (taskData) => {
    if (editingTask) {
      const updated = await updateTask(editingTask.id, taskData);
      if (!updated) return showToast("Failed to update task", "error");

      const now = new Date();
      const fullDueDate = updated.due_date ? new Date(updated.due_date) : null;
      const status = updated.completed
        ? "Completed"
        : fullDueDate && fullDueDate < now
        ? "Overdue"
        : "In Progress";

      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...updated, status } : t))
      );

      showToast("Task updated successfully");
    } else {
      const created = await createTask(taskData);
      if (!created) return showToast("Failed to add task", "error");

      const now = new Date();
      const fullDueDate = created.due_date ? new Date(created.due_date) : null;
      const status =
        fullDueDate && fullDueDate < now ? "Overdue" : "In Progress";
      const taskWithStatus = { ...created, status };

      setTasks([taskWithStatus, ...tasks]);
      if (status !== "Overdue") showToast("Task added successfully", "success");
    }

    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleUpdateTask = async (id, updates) => {
    const updated = await updateTask(id, updates);
    if (!updated) return showToast("Failed to update task", "error");

    const now = new Date();
    const fullDueDate = updated.due_date ? new Date(updated.due_date) : null;
    const status = updated.completed
      ? "Completed"
      : fullDueDate && fullDueDate < now
      ? "Overdue"
      : "In Progress";

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...updated, status } : t))
    );
  };

  const handleDeleteTask = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmed) return;

    const success = await deleteTask(id);
    if (!success) return showToast("Failed to delete task", "error");

    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast("Task deleted", "success");
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const filteredTasks = searchQuery
    ? tasks.filter(
        (t) =>
          String(t.title).toLowerCase().includes(searchQuery) ||
          String(t.description).toLowerCase().includes(searchQuery)
      )
    : [];

  const toDoTasks = tasks
    .filter((t) => t.status === "In Progress" || t.status === "Overdue")
    .slice(0, 3);

  const topCompleted = tasks
    .filter((t) => t.status === "Completed")
    .sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0))
    .slice(0, 2);

  return (
    <main id="dashboard-container">
      <h1 className="welcome">
        Welcome back,{" "}
        <span className="user-name">{user?.name?.split(" ")[0] || "User"}</span>{" "}
        👋
      </h1>

      <div id="dashboard-overview">
        <div className="to-do">
          <div className="task-group-header">
            <ion-icon name="receipt-outline"></ion-icon>
            <h3>To-Do</h3>
            <AddTaskBtn
              id="addTaskBtn"
              onClick={() => {
                setEditingTask(null);
                setIsModalOpen(true);
              }}
            >
              Add Task
            </AddTaskBtn>
          </div>

          <div id="todoList" className="task-list">
            {!hasTasks && (
              <>
                <button
                  id="addNewTaskBtn"
                  className="task-add-btn"
                  onClick={() => {
                    setEditingTask(null);
                    setIsModalOpen(true);
                  }}
                >
                  <ion-icon name="add-circle-outline"></ion-icon>
                </button>

                <p className="task-placeholder">Create your first task...</p>
              </>
            )}

            {hasTasks &&
              (searchQuery ? filteredTasks : toDoTasks).map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                  onEditTask={handleEditTask}
                  showToast={showToast}
                />
              ))}
          </div>

          <NavLink to="tasks" id="seeAllTasksBtn" className="see-all-tasks-btn">
            ↠ See All Tasks
          </NavLink>
        </div>

        <div className="dashboard">
          <div className="task-status">
            <div className="task-group-header">
              <ion-icon name="podium-outline"></ion-icon>
              <h3>Task Status</h3>
            </div>

            <div className="progress-chart">
              {["completed", "inProgress", "overdue"].map((status, idx) => (
                <div key={idx} className="circular-chart">
                  <div
                    className="circle"
                    style={{
                      background: `conic-gradient(${
                        status === "completed"
                          ? "#05A301"
                          : status === "inProgress"
                          ? "#0225FF"
                          : "gray"
                      } 0deg ${circleData[status] * 3.6}deg, #eee ${
                        circleData[status] * 3.6
                      }deg 360deg)`,
                    }}
                  >
                    <span className="percent">
                      {Math.round(circleData[status])}%
                    </span>
                  </div>
                  <p className="status-name">
                    <span
                      className={`small-dot ${
                        status === "completed"
                          ? "green"
                          : status === "inProgress"
                          ? "blue"
                          : "red"
                      }`}
                    ></span>
                    {status === "completed"
                      ? "Completed"
                      : status === "inProgress"
                      ? "In Progress"
                      : "Overdue"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="completed-task">
            <div className="task-group-header">
              <ion-icon name="bag-check-outline"></ion-icon>
              <h3>Completed Task</h3>
            </div>
            <div id="completedList" className="task-list">
              {!searchQuery &&
                topCompleted.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onUpdateTask={handleUpdateTask}
                    onDeleteTask={handleDeleteTask}
                    onEditTask={handleEditTask}
                    showToast={showToast}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ModalForm
          initialData={editingTask}
          onSubmit={handleAddTask}
          onClose={() => {
            setEditingTask(null);
            setIsModalOpen(false);
          }}
        />
      )}

      <Toast message={toast.message} type={toast.type} />
    </main>
  );
};

export default Dashboard;
