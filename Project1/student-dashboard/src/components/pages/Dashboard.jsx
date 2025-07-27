import AssignmentTracker from "../AssignmentTracker";
import TodoList from "../TodoList";
import GradesOverview from "../GradesOverview";
import UpcomingTests from "../UpcomingTests";
import ProfileCard from "../ProfileCard";
import CalendarView from "../CalendarView";

function Dashboard() {
  return (
    <div
      className="dashboard-grid"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        paddingBottom: "40px",
      }}
    >
      {/* 🔝 Row 1: Assignments + Calendar */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <section style={{ flex: 1 }}>
          <AssignmentTracker />
        </section>
        <section style={{ flex: 1 }}>
          <CalendarView />
        </section>
      </div>

      {/* 📅 Row 2: To-Do List + Upcoming Tests */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <section style={{ flex: 1 }}>
          <TodoList />
        </section>
        <section style={{ flex: 1 }}>
          <UpcomingTests />
        </section>
      </div>

      {/* 📊 Row 3: Grades Overview */}
      <section>
        <GradesOverview />
      </section>

      {/* 👤 Bottom: Profile Full Width */}
      <section>
        <ProfileCard />
      </section>
    </div>
  );
}

export default Dashboard;
