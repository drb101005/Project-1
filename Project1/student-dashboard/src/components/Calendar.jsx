import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarEvents.css"; // Only if you're using custom styles

function CalendarSection() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("calendarEvents")) || {};
    setEvents(storedEvents);

    const syncEvents = () => {
      const updated = JSON.parse(localStorage.getItem("calendarEvents")) || {};
      setEvents(updated);
    };

    window.addEventListener("storage", syncEvents);
    return () => window.removeEventListener("storage", syncEvents);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formattedDate = selectedDate.toDateString();
  const eventsForDate = events[formattedDate] || [];

  return (
    <div>
      <h2>📅 Calendar & Events</h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={({ date }) =>
          events[date.toDateString()] ? "highlight" : null
        }
      />
      <h3>📅 Events on {formattedDate}:</h3>
      {eventsForDate.length === 0 ? (
        <p>No events</p>
      ) : (
        <ul>
          {eventsForDate.map((event, idx) => (
            <li key={idx}>🔹 {event}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CalendarSection;
