import { useState, useEffect } from "react";

function TodoList() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, id: Date.now() }]);
      setTask("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div>
      <h2>📝 To-Do List</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />
        <button onClick={addTask} style={{ padding: "8px 12px", cursor: "pointer" }}>
          ➕ Add
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((t) => (
          <li
            key={t.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px",
              background: "#f1f1f1",
              marginBottom: "6px",
              borderRadius: "4px",
            }}
          >
            {t.text}
            <button onClick={() => deleteTask(t.id)} style={{ cursor: "pointer", color: "red" }}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
