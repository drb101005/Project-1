function ProfileCard() {
  const cardStyle = {
    padding: "20px",
    backgroundColor: "#f1f5f9",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    minHeight: "120px"
  };

  return (
    <div style={cardStyle}>
      <h2>👤 Profile</h2>
      <p><strong>Name:</strong> Dhruv R Bandikatte</p>
      <p><strong>Major:</strong> Information Technology</p>
      <p><strong>Year:</strong> 2rd Year</p>
    </div>
  );
}

export default ProfileCard;
