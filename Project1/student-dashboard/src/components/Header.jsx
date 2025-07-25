import { useState } from 'react';

function Header() {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Welcome, Dhruv Sir 👋</h1>
      <button
        onClick={toggleTheme}
        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Toggle {dark ? 'Light' : 'Dark'} Mode
      </button>
    </header>
  );
}

export default Header;
