function GradesOverview() {
  return (
    <div style={cardStyle}>
      <h3>📊 Grades Overview</h3>
      <ul>
        <li>DSA: 92%</li>
        <li>Web Dev: 88%</li>
        <li>DBMS: 95%</li>
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

export default GradesOverview;
