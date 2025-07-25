import { useState, useEffect } from "react";
import Dashboard from "./components/pages/Dashboard";
import './styles/global.css'; // Ensure Tailwind is included in this

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    <div className={`min-h-screen px-6 py-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Welcome to Your Dashboard, Dhruv Sir! 🚀</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <hr className="mb-6 border-gray-400 dark:border-gray-600" />

      <Dashboard />
    </div>
  );
}

export default App;
