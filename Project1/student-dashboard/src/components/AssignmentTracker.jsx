import { useState } from "react";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useEvents } from "../context/EventContext";
import { format, isBefore, isToday, isThisWeek, parseISO } from "date-fns";
import "./AssignmentTracker.css";

function AssignmentTracker() {
  const { events, setEvents } = useEvents();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const assignments = events.filter((e) => e.source === "assignment");

  const addAssignment = async () => {
    if (!title || !date) return;
    const newAssignment = { title, date, source: "assignment" };
    const docRef = await addDoc(collection(db, "calendarEvents"), newAssignment);
    setEvents([...events, { ...newAssignment, id: docRef.id }]);
    setTitle("");
    setDate("");
  };

  const deleteAssignment = async (id) => {
    await deleteDoc(doc(db, "calendarEvents", id));
    setEvents(events.filter((e) => e.id !== id));
  };

  const getUrgencyColor = (dateStr) => {
    const date = parseISO(dateStr);
    const now = new Date();
    if (isBefore(date, now)) return "past-due";
    if (isToday(date)) return "due-today";
    if (isThisWeek(date)) return "due-week";
    return "future-task";
  };

  return (
    <div className="assignment-card">
      <h3 className="assignment-title" style={{ color: "#ffe600" }}>
        📄 Assignments to Complete
      </h3>

      <div className="assignment-inputs">
        <input
          type="text"
          placeholder="Assignment title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="date-label">
          <span role="img" aria-label="calendar" className="calendar-icon">📆</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <button onClick={addAssignment}>➕ Add</button>
      </div>

      <ul className="assignment-list">
        {assignments.map((item) => (
          <li key={item.id} className={`assignment-item ${getUrgencyColor(item.date)}`}>
            <span>{item.title} — {format(parseISO(item.date), "MMM dd, yyyy")}</span>
            <button onClick={() => deleteAssignment(item.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AssignmentTracker;
