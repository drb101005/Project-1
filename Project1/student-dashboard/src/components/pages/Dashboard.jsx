import AttendanceTracker from "../AttendanceTracker";
import AssignmentTracker from "../AssignmentTracker";
import CalendarEvents from "../CalendarEvents";
import GradesOverview from "../GradesOverview";
import UpcomingTests from "../UpcomingTests";
import ProfileCard from "../ProfileCard";

function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <section className="p-4 bg-white rounded shadow"><AssignmentTracker /></section>
      <section className="p-4 bg-white rounded shadow"><AttendanceTracker /></section>
      <section className="p-4 bg-white rounded shadow"><CalendarEvents /></section>
      <section className="p-4 bg-white rounded shadow"><GradesOverview /></section>
      <section className="p-4 bg-white rounded shadow"><UpcomingTests /></section>
      <section className="p-4 bg-white rounded shadow"><ProfileCard /></section>
    </div>
  );
}

export default Dashboard;
