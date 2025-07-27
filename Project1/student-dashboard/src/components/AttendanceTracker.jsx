import React, { useState } from "react";
import "./AttendanceTracker.css";


const AttendanceTracker = () => {
  const [events, setEvents] = useState({});

  const daysInMonth = new Date().getDate();
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  const handleAddEvent = (day) => {
    const title = prompt("Enter event title:");
    if (title) {
      setEvents((prev) => ({
        ...prev,
        [day]: [...(prev[day] || []), { title, completed: false }],
      }));
    }
  };

  const handleToggleComplete = (day, index) => {
    setEvents((prev) => {
      const updated = [...prev[day]];
      updated[index].completed = !updated[index].completed;
      return { ...prev, [day]: updated };
    });
  };

  const handleDelete = (day, index) => {
    setEvents((prev) => {
      const updated = [...prev[day]];
      updated.splice(index, 1);
      return { ...prev, [day]: updated };
    });
  };

  return (
    <div className="attendance-container">
      <h2>
        {currentMonth} {currentYear}
      </h2>
      <div className="calendar-grid">
        {[...Array(31)].map((_, i) => {
          const day = i + 1;
          const hasEvents = events[day]?.length > 0;
          return (
            <div
              key={day}
              className={`calendar-day ${hasEvents ? "has-event" : ""}`}
              onClick={() => handleAddEvent(day)}
            >
              <span className="day-number">{day}</span>
              {hasEvents && (
                <div className="event-list">
                  {events[day].map((event, index) => (
                    <div
                      key={index}
                      className={`event-item ${
                        event.completed ? "completed" : ""
                      }`}
                    >
                      {event.title}
                      <div className="event-buttons">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleComplete(day, index);
                          }}
                        >
                          ✅
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(day, index);
                          }}
                        >
                          ❌
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceTracker;
