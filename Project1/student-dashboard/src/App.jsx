import { useState, useEffect } from "react";
import Dashboard from "./components/pages/Dashboard";
import "./styles/global.css";
import { EventProvider } from "./context/EventContext";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    <EventProvider>
      <div className="container">
        <header className="app-header">
          <h1>Welcome to Your Dashboard, Dhruv Sir!</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="theme-toggle-btn"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </header>
        <hr className="divider" />
        <Dashboard />
      </div>
    </EventProvider>
  );
}

export default App;
