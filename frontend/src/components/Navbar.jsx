import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `pb-1 border-b-2 ${
      pathname === path
        ? "border-blue-600 text-blue-600"
        : "border-transparent text-gray-600 hover:text-blue-600"
    }`;

  return (
    <div className="bg-white shadow-sm px-8 py-4 flex justify-between">
      <h1 className="text-xl font-bold">HRMS Lite</h1>
      <div className="flex gap-8">
        <Link to="/" className={linkClass("/")}>Dashboard</Link>
        <Link to="/employees" className={linkClass("/employees")}>Employees</Link>
        <Link to="/attendance" className={linkClass("/attendance")}>Attendance</Link>
      </div>
    </div>
  );
}