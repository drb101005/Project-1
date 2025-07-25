function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4 hidden md:block">
      <h2 className="text-xl font-bold mb-6">Student Panel</h2>
      <ul className="space-y-4">
        <li>📅 Timetable</li>
        <li>✅ To-Do List</li>
        <li>📄 Assignments</li>
        <li>📊 Marks</li>
        <li>📈 Attendance</li>
        <li>🗓️ Calendar</li>
      </ul>
    </aside>
  );
}

export default Sidebar;
