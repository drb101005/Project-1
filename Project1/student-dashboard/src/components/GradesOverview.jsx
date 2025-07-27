import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

function GradesOverview() {
  const [expanded, setExpanded] = useState(false);
  const [marks, setMarks] = useState({ UT1: [], UT2: [], SEM: [] });
  const [inputs, setInputs] = useState({ UT1: "", UT2: "", SEM: "" });

  // 🔽 Toggle open/close
  const toggleExpand = () => setExpanded(!expanded);

  // 🔄 Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      const types = ["UT1", "UT2", "SEM"];
      const newMarks = {};
      for (let type of types) {
        const snapshot = await getDocs(collection(db, `grades-${type}`));
        newMarks[type] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).sort((a, b) => b.marks - a.marks); // Sort high to low
      }
      setMarks(newMarks);
    };
    fetchData();
  }, []);

  // ➕ Add new entry
  const handleAdd = async (type) => {
    const value = inputs[type].trim();
    const [subject, marksStr] = value.split(" - ");
    const marksFloat = parseFloat(marksStr);

    if (!subject || isNaN(marksFloat)) {
      alert("Format must be: Subject - Marks");
      return;
    }

    const docRef = await addDoc(collection(db, `grades-${type}`), {
      subject: subject.slice(0, 50),
      marks: marksFloat,
    });

    const newEntry = { id: docRef.id, subject: subject.slice(0, 50), marks: marksFloat };
    setMarks((prev) => ({
      ...prev,
      [type]: [newEntry, ...prev[type]].sort((a, b) => b.marks - a.marks),
    }));
    setInputs((prev) => ({ ...prev, [type]: "" }));
  };

  // ❌ Delete entry
  const handleDelete = async (type, id) => {
    await deleteDoc(doc(db, `grades-${type}`, id));
    setMarks((prev) => ({
      ...prev,
      [type]: prev[type].filter((m) => m.id !== id),
    }));
  };

  return (
    <div style={cardWrapperStyle}>
      <div
        onClick={toggleExpand}
        style={{
          display: "flex",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        <h3>📊 Grades Overview</h3>
        <span>{expanded ? "▲" : "▼"}</span>
      </div>

      {expanded && (
        <div style={gradeSectionContainer}>
          {["UT1", "UT2", "SEM"].map((type) => (
            <div key={type} style={gradeCard}>
              <h4>{type}</h4>
              <div style={{ display: "flex", marginBottom: "8px" }}>
                <input
                  type="text"
                  placeholder="Subject - Marks"
                  value={inputs[type]}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, [type]: e.target.value }))
                  }
                  style={{ flex: 1, padding: "6px" }}
                />
                <button onClick={() => handleAdd(type)} style={addBtnStyle}>
                  ➕
                </button>
              </div>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {marks[type]?.map((m) => (
                  <li
                    key={m.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      background: "#eee",
                      marginBottom: "4px",
                      padding: "6px",
                      borderRadius: "4px",
                    }}
                  >
                    <span>{m.subject} - {m.marks}</span>
                    <button
                      onClick={() => handleDelete(type, m.id)}
                      style={{ color: "red", cursor: "pointer", border: "none", background: "none" }}
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 💠 Styles
const cardWrapperStyle = {
  backgroundColor: "#f9f9f9",
  padding: "16px",
  borderRadius: "10px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  marginBottom: "20px",
};

const gradeSectionContainer = {
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
  marginTop: "12px",
  flexWrap: "wrap",
};

const gradeCard = {
  flex: "1 1 30%",
  backgroundColor: "#fff",
  padding: "12px",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
};

const addBtnStyle = {
  padding: "6px 10px",
  marginLeft: "6px",
  cursor: "pointer",
};

export default GradesOverview;
