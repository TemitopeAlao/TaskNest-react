import { useState, useEffect } from "react";
import "../css/dashboard.css";
import "../css/toast.css";

export default function ModalForm({ onSubmit, onClose, initialData }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("low");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      if (initialData.due_date) {
        const due = new Date(initialData.due_date);
        setDate(due.toISOString().slice(0, 10));
        setTime(due.toTimeString().slice(0, 5));
      } else {
        setDate("");
        setTime("");
      }
      setPriority(initialData.priority?.toLowerCase() || "low");
      setDescription(initialData.description || "");
    } else {
      setTitle("");
      setDate("");
      setTime("");
      setPriority("low");
      setDescription("");
    }
  }, [initialData]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !date || !time || !priority) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    const due_date = new Date(`${date}T${time}`).toISOString();

    onSubmit({
      title,
      description,
      due_date,
      priority,
    });

    if (!initialData) {
      setTitle("");
      setDate("");
      setTime("");
      setPriority("low");
      setDescription("");
    }

    onClose();
  }

  return (
    <div id="addTaskForm" className="add__Task">
      <div className="modal-form">
        <div className="form-title">
          <h2>{initialData ? "Edit Task" : "Create New Task"}</h2>
          <button type="button" onClick={onClose}>
            ← Go Back
          </button>
        </div>

        <form className="task-form" onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Due date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label>Due time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />

          <label>Priority</label>
          <div className="check-priority">
            <label className="priority">
              <p className="status-name">
                <span className="small-dot red"></span> Extreme
              </p>
              <input
                type="radio"
                name="priority"
                value="extreme"
                checked={priority === "extreme"}
                onChange={(e) => setPriority(e.target.value)}
                required
              />
            </label>

            <label className="priority">
              <p className="status-name">
                <span className="small-dot green"></span> Moderate
              </p>
              <input
                type="radio"
                name="priority"
                value="moderate"
                checked={priority === "moderate"}
                onChange={(e) => setPriority(e.target.value)}
              />
            </label>

            <label className="priority">
              <p className="status-name">
                <span className="small-dot yellow"></span> Low
              </p>
              <input
                type="radio"
                name="priority"
                value="low"
                checked={priority === "low"}
                onChange={(e) => setPriority(e.target.value)}
              />
            </label>
          </div>

          <label>Description</label>
          <textarea
            placeholder="Start writing here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit" className="done-btn">
            {initialData ? "Update" : "Done"}
          </button>
        </form>
      </div>
    </div>
  );
}
