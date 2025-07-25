import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

function CalendarView() {
  const [value, setValue] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState("");

  // Load events and assignments
  useEffect(() => {
    const assignments = JSON.parse(localStorage.getItem("assignments")) || [];
    const assignmentEvents = assignments.map(a => ({
      date: new Date(a.dueDate),
      title: "Due: " + a.title,
      completed: false
    }));
    setEvents((prev) => [...assignmentEvents, ...prev]);
  }, []);

  const handleAddEvent = () => {
    if (!eventTitle.trim()) return;
    setEvents([...events, { date: value, title: eventTitle, completed: false }]);
    setEventTitle("");
  };

  const handleDelete = (index) => {
    const updated = [...events];
    updated.splice(index, 1);
    setEvents(updated);
  };

  const handleToggleComplete = (index) => {
    const updated = [...events];
    updated[index].completed = !updated[index].completed;
    setEvents(updated);
  };

  const getEventsForDate = (date) =>
    events.filter((event) => new Date(event.date).toDateString() === date.toDateString());

  return (
    <div>
      <h2>🗓️ Calendar & Events</h2>
      <div style={{ marginBottom: "1rem" }}>
        <Calendar
          onChange={setValue}
          value={value}
          tileClassName={({ date, view }) => {
            if (view === 'month') {
              const hasEvent = events.some(
                (event) => new Date(event.date).toDateString() === date.toDateString()
              );
              return hasEvent ? 'event-day' : null;
            }
          }}
        />
        <div style={{ marginTop: "1rem" }}>
          <input
            type="text"
            placeholder="Add event for selected date"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            style={{ padding: "8px", marginRight: "10px" }}
          />
          <button onClick={handleAddEvent} style={{ padding: "8px" }}>
            ➕ Add Event
          </button>
        </div>
      </div>

      <h4>📅 Events on {value.toDateString()}:</h4>
      <ul>
        {getEventsForDate(value).map((event, idx) => (
          <li key={idx} style={{ marginBottom: "8px" }}>
            <span style={{
              textDecoration: event.completed ? "line-through" : "none",
              marginRight: "10px"
            }}>
              🔔 {event.title}
            </span>
            <button onClick={() => handleToggleComplete(idx)} style={{ marginRight: "5px" }}>
              {event.completed ? "Undo ✅" : "Complete ✅"}
            </button>
            <button onClick={() => handleDelete(idx)}>Delete 🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CalendarView;
