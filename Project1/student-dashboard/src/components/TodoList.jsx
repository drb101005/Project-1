import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async () => {
    try {
      const snapshot = await getDocs(collection(db, "todos"));
      const data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    const docRef = await addDoc(collection(db, "todos"), {
      text: newTodo,
      completed: false,
    });
    setTodos([...todos, { id: docRef.id, text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const toggleComplete = async (id, currentState) => {
    await updateDoc(doc(db, "todos", id), {
      completed: !currentState,
    });
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !currentState } : todo
      )
    );
  };

  const editTodo = async (id, newText) => {
    await updateDoc(doc(db, "todos", id), { text: newText });
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div style={cardStyle}>
      <h3>📝 To-Do List</h3>

      {/* Add new task */}
      <div style={inputContainer}>
        <input
          type="text"
          placeholder="Enter new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={inputStyle}
        />
        <button onClick={addTodo} style={addBtn}>
          ➕ Add
        </button>
      </div>

      {/* Task List */}
      <ul style={{ padding: 0, marginTop: "15px" }}>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo.id} style={todoItem}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id, todo.completed)}
              />
              <input
                type="text"
                value={todo.text}
                onChange={(e) => editTodo(todo.id, e.target.value)}
                style={{
                  ...textInput,
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "#888" : "#000",
                }}
              />
              <button onClick={() => deleteTodo(todo.id)} style={deleteBtn}>
                ❌
              </button>
            </li>
          ))
        ) : (
          <li style={{ textAlign: "left", marginTop: "8px" }}>
            No tasks yet.
          </li>
        )}
      </ul>
    </div>
  );
}

// ---------- 🧩 Styles ----------
const cardStyle = {
  backgroundColor: "#f0f0f0",
  padding: "16px",
  borderRadius: "10px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
};

const inputContainer = {
  display: "flex",
  gap: "10px",
};

const inputStyle = {
  flex: 1,
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const addBtn = {
  padding: "8px 12px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const todoItem = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "8px",
};

const deleteBtn = {
  background: "transparent",
  border: "none",
  color: "red",
  fontSize: "18px",
  cursor: "pointer",
};

const textInput = {
  flex: 1,
  border: "none",
  background: "transparent",
  outline: "none",
  fontSize: "14px",
};

// --------------------------------

export default TodoList;
