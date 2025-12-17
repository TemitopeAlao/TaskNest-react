export function getFullDueDate(task) {
  if (!task.due_date || !task.due_time) return null;
  const date = new Date(Number(task.due_date));
  const [h, m] = task.due_time.split(":").map(Number);
  date.setHours(h, m, 0, 0);
  return date;
}
