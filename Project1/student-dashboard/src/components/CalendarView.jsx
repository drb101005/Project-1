import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendarView.css";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function CalendarView() {
  const [value, setValue] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState("");

  const loadEvents = async () => {
    const querySnapshot = await getDocs(collection(db, "assignments"));
    const assignmentEvents = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        date: new Date(data.dueDate),
        title: "Due: " + data.title,
        completed: false
      };
    });
    setEvents(assignmentEvents);
  };

  useEffect(() => {
    loadEvents();
    window.addEventListener("storage", loadEvents);
    return () => window.removeEventListener("storage", loadEvents);
  }, []);

  const getEventsForDate = (date) =>
    events.filter((event) => new Date(event.date).toDateString() === date.toDateString());

  const handleAddEvent = () => {
    if (!eventTitle.trim()) return;
    const newEvent = { date: value, title: eventTitle, completed: false };
    setEvents([...events, newEvent]);
    setEventTitle("");
  };

  return (
    <div>
      <h2>🗓️ Calendar & Events</h2>
      <Calendar
        onChange={setValue}
        value={value}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const isToday = date.toDateString() === new Date().toDateString();
            const hasEvent = events.some(
              (event) => new Date(event.date).toDateString() === date.toDateString()
            );
            if (isToday) return "today-highlight";
            if (hasEvent) return "event-day";
          }
          return null;
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

      <h4>📅 Events on {value.toDateString()}:</h4>
      <ul>
        {getEventsForDate(value).map((event, idx) => (
          <li key={idx}>{event.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default CalendarView;
