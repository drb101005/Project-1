import "./AttendanceTracker.css";

import { useState, useEffect } from "react";

function AssignmentTracker() {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignments, setAssignments] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedAssignments = JSON.parse(localStorage.getItem("assignments")) || [];
    setAssignments(savedAssignments);
  }, []);

  // Save on change
  useEffect(() => {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }, [assignments]);

  const addAssignment = () => {
    if (title.trim() && dueDate) {
      const newAssignment = {
        id: Date.now(),
        title,
        dueDate,
      };
      setAssignments([...assignments, newAssignment]);
      setTitle("");
      setDueDate("");
    }
  };

  const deleteAssignment = (id) => {
    setAssignments(assignments.filter((a) => a.id !== id));
  };

  return (
    <div>
      <h2>📌 Assignments To Complete</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Assignment title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "8px", flex: 1 }}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{ padding: "8px" }}
        />
        <button onClick={addAssignment} style={{ padding: "8px 12px", cursor: "pointer" }}>
          ➕ Add
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {assignments.map((a) => (
          <li
            key={a.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px",
              background: "#e2e8f0",
              marginBottom: "6px",
              borderRadius: "4px",
              alignItems: "center",
            }}
          >
            <span>
              <strong>{a.title}</strong> — Due: {a.dueDate}
            </span>
            <button onClick={() => deleteAssignment(a.id)} style={{ cursor: "pointer", color: "red" }}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AssignmentTracker;
