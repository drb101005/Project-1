import { useEffect, useState } from "react";
import { db } from "../firebase"; // adjust if path differs
import { collection, getDocs } from "firebase/firestore";

function CalendarEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsSnapshot = await getDocs(collection(db, "calendarEvents"));
        const eventsList = eventsSnapshot.docs.map((doc) => doc.data());
        setEvents(eventsList);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div style={cardStyle}>
      <h3>📅 Upcoming Calendar Events</h3>
      <ul>
        {events.length > 0 ? (
          events.map((event, index) => (
            <li key={index}>🗓️ {event.title} - {event.date}</li>
          ))
        ) : (
          <li>No upcoming events.</li>
        )}
      </ul>
    </div>
  );
}

const cardStyle = {
  backgroundColor: "#f0f0f0",
  padding: "12px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

export default CalendarEvents;
