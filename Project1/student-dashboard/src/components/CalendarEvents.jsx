function CalendarEvents() {
  return (
    <div style={cardStyle}>
      <h3>📅 Upcoming Calendar Events</h3>
      <ul>
        <li>🗓️ Hackathon - Aug 2</li>
        <li>🗓️ Java Assignment Due - Aug 5</li>
        <li>🗓️ Midterm Review - Aug 8</li>
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
