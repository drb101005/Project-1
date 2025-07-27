// src/components/CalendarView.jsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEvents } from "../context/EventContext";
import "./calendarView.css";
import { format } from "date-fns";
function CalendarView() {
  const { events } = useEvents();
  const [value, setValue] = useState(new Date());

  const groupedEvents = {};
  events.forEach((event) => {
    const dateStr = event.date?.split("T")[0];
    if (!groupedEvents[dateStr]) groupedEvents[dateStr] = [];
    groupedEvents[dateStr].push(event.title);
  });

  
// ...
const selectedDate = format(value, "yyyy-MM-dd");


  return (
    <div className="calendar-container">
      <h3 className="assignment-title">📅 Calendar & Events</h3>

      <Calendar
        onChange={setValue}
        value={value}
        tileClassName={({ date }) => {
          const dateStr = format(date, "yyyy-MM-dd");
          if (groupedEvents[dateStr]?.length) return "event-day";
          return null;
        }}
        prevLabel="«"
        nextLabel="»"
        prev2Label={null}
        next2Label={null}
      />

      <div className="event-list">
        Events on <strong>{selectedDate}</strong>:
        <ul>
          {groupedEvents[selectedDate]?.length ? (
            groupedEvents[selectedDate].map((event, index) => (
              <li key={index}>{event}</li>
            ))
          ) : (
            <li>No events for this date.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default CalendarView;
