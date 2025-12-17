import { useState } from "react";
import "../css/task.css";

const TaskCard = ({
  task,
  onUpdateTask,
  onDeleteTask,
  onEditTask,
  showToast,
  showActions = true,
}) => {
  const [expanded, setExpanded] = useState(false);
  const fullDueDate = task.due_date ? new Date(task.due_date) : null;
  const now = new Date();

  const isCompleted = task.status === "Completed";
  const isOverdue = task.status === "Overdue";

  const truncatedDesc =
    task.description?.length > 50
      ? task.description.slice(0, 50)
      : task.description;

  const priority = task.priority || "Low";
  const priorityClass = priority.toLowerCase();

  const handleComplete = () => {
    onUpdateTask(task.id, { completed: true, status: "Completed" });
    showToast?.(`Task "${task.title}" completed!`, "success");
  };

  const handleUndo = () => {
    const status = fullDueDate && fullDueDate < now ? "Overdue" : "In Progress";
    onUpdateTask(task.id, { completed: false, status });
    showToast?.(`Task "${task.title}" moved back to ${status}`, "info");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete?")) {
      onDeleteTask(task.id);
      showToast?.(`Task "${task.title}" deleted`, "error");
    }
  };

  const handleEdit = () => {
    onEditTask?.(task);
  };

  const toggleDesc = () => setExpanded((prev) => !prev);

  return (
    <div className={`task-card ${isOverdue ? "overdue" : ""}`}>
      <div className="task-top">
        <span
          className={`status-circle ${
            isCompleted ? "completed" : isOverdue ? "overdue" : "in-progress"
          }`}
        ></span>
        <h2 className={`task-title ${isCompleted ? "completed-text" : ""}`}>
          {task.title}
        </h2>
        <span className="task-date">
          {fullDueDate?.toLocaleString() || "No due date"}
        </span>
      </div>

      <h4 className={`task-desc ${isCompleted ? "completed-text" : ""}`}>
        <span className="desc-short">{expanded ? "" : truncatedDesc}</span>
        <span style={{ display: expanded ? "inline" : "none" }}>
          {task.description}
        </span>
        {task.description?.length > 50 && (
          <span className="show-more" onClick={toggleDesc}>
            {expanded ? "...show less" : "...more"}
          </span>
        )}
      </h4>

      <div className="task-bottom">
        <span className="priority">
          Priority: <span className={priorityClass}>{priority}</span>
        </span>

        <span
          className={`status ${
            isCompleted ? "completed" : isOverdue ? "overdue" : "in-progress"
          }`}
        >
          {task.status}
        </span>

        {showActions && (
          <div className="actionBtn">
            {isCompleted && (
              <button onClick={handleUndo} className="undo-btn icon-btn">
                <ion-icon name="arrow-undo-outline"></ion-icon>
              </button>
            )}
            {!isCompleted && !isOverdue && (
              <>
                <button
                  onClick={handleComplete}
                  className="complete-btn icon-btn"
                >
                  <ion-icon name="checkmark-done-outline"></ion-icon>
                </button>
                <button onClick={handleEdit} className="edit-btn icon-btn">
                  <ion-icon name="create-outline"></ion-icon>
                </button>
                <button onClick={handleDelete} className="delete-btn icon-btn">
                  <ion-icon name="trash-outline"></ion-icon>
                </button>
              </>
            )}
            {isOverdue && (
              <button onClick={handleDelete} className="delete-btn icon-btn">
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
