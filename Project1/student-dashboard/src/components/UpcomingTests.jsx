import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { formatDistanceToNowStrict, isBefore } from "date-fns";
import { db } from "../firebase";

function UpcomingTests() {
  const [tests, setTests] = useState([]);
  const [testName, setTestName] = useState("");
  const [testDate, setTestDate] = useState("");

  const testsCollection = collection(db, "upcomingTests");

  useEffect(() => {
    const fetchTests = async () => {
      const snapshot = await getDocs(testsCollection);
      const testData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTests(testData);
    };

    fetchTests();
  }, []);

  const addTest = async () => {
    if (!testName.trim() || !testDate) return;

    const newTest = {
      name: testName,
      date: testDate
    };

    const docRef = await addDoc(testsCollection, newTest);
    setTests([...tests, { id: docRef.id, ...newTest }]);
    setTestName("");
    setTestDate("");
  };

  const deleteTest = async (id) => {
    await deleteDoc(doc(db, "upcomingTests", id));
    setTests(tests.filter(test => test.id !== id));
  };

  const cardStyle = {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    minHeight: "120px",
  };

  return (
    <div style={cardStyle}>
      <h2>📘 Upcoming Tests</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter test name"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          style={{ flex: 2, padding: "8px" }}
        />
        <input
          type="date"
          value={testDate}
          onChange={(e) => setTestDate(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />
        <button onClick={addTest} style={{ padding: "8px 12px", cursor: "pointer" }}>
          ➕ Add
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tests.map((test) => {
          const testDateObj = new Date(test.date);
          const today = new Date();
          const isPast = isBefore(testDateObj, today);
          const daysRemaining = isPast
            ? "📅 Past"
            : `${formatDistanceToNowStrict(testDateObj)} left`;

          return (
            <li
              key={test.id}
              style={{
                background: "#f9f9f9",
                padding: "10px",
                marginBottom: "8px",
                borderRadius: "6px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <strong>{test.name}</strong> - {test.date} ({daysRemaining})
              </div>
              <button
                onClick={() => deleteTest(test.id)}
                style={{ cursor: "pointer", color: "red" }}
              >
                ❌
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UpcomingTests;
