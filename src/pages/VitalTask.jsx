import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import { fetchAllTasks } from "../api/tasks";
import LoaderComponent from "../components/LoaderComponent";

export default function VitalTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tasks.length === 0) loadVitalTasks();
  }, []);

  async function loadVitalTasks() {
    try {
      setLoading(true);

      const allTasks = await fetchAllTasks();
      const now = Date.now();
      const oneDayLater = now + 24 * 60 * 60 * 1000;

      const vitalTasks = allTasks.filter((task) => {
        if (task.completed) return false;

        const isExtreme = task.priority === "extreme";
        const dueTime = task.due_date
          ? new Date(task.due_date).getTime()
          : null;
        const isDueSoon = dueTime && dueTime >= now && dueTime <= oneDayLater;

        return isExtreme || isDueSoon;
      });

      setTasks(vitalTasks.reverse());
    } catch (err) {
      console.error(err);
      setToast({ message: "Error loading vital tasks", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="vital-tasks-section">
      <div className="heading">
        <h1 className="vital-tasks-title">Vital Task</h1>
      </div>

      <div className="task-list">
        {loading && <LoaderComponent />}

        {!loading && tasks.length === 0 && (
          <p
            style={{ fontSize: "3rem", textAlign: "center", marginTop: "20%" }}
          >
            No vital tasks at the moment.
          </p>
        )}

        {!loading &&
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} showActions={false} />
          ))}
      </div>
    </section>
  );
}
