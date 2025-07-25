function UpcomingTests() {
  const cardStyle = {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    minHeight: "120px"
  };

  return (
    <div style={cardStyle}>
      <h2>📘 Upcoming Tests</h2>
      <ul>
        <li>🧪 Math - July 28</li>
        <li>🧬 Biology - July 30</li>
        <li>📖 History - August 2</li>
      </ul>
    </div>
  );
}

export default UpcomingTests;
