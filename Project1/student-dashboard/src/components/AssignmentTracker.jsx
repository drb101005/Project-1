import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function AssignmentTracker() {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({ title: "", dueDate: "" });

  // ✅ Load from Firestore on mount
  useEffect(() => {
    const fetchAssignments = async () => {
      const querySnapshot = await getDocs(collection(db, "assignments"));
      const data = querySnapshot.docs.map(doc => doc.data());
      setAssignments(data);
    };
    fetchAssignments();
  }, []);

  // ✅ Add to Firestore
  const handleAdd = async () => {
    if (!newAssignment.title || !newAssignment.dueDate) return;

    const newItem = {
      ...newAssignment,
      dueDate: new Date(newAssignment.dueDate).toISOString()
    };

    await addDoc(collection(db, "assignments"), newItem);
    setAssignments([...assignments, newItem]);
    setNewAssignment({ title: "", dueDate: "" });

    // Optional: trigger calendar update
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div>
      <h2>📄 Assignment Tracker</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Assignment title"
          value={newAssignment.title}
          onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
        />
        <input
          type="date"
          value={newAssignment.dueDate}
          onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
        />
        <button onClick={handleAdd}>➕ Add</button>
      </div>

      <ul>
        {assignments.map((a, idx) => (
          <li key={idx}>📝 {a.title} - 📅 {new Date(a.dueDate).toDateString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default AssignmentTracker;
