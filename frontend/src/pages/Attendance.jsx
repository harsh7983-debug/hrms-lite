import { useEffect, useState } from "react";
import API from "../api/api";
import Card from "../components/Card";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [selected, setSelected] = useState("");
  const [status, setStatus] = useState("Present");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    API.get("/employees/")
      .then((res) => setEmployees(res.data.results || []))
      .catch((err) =>
        setError(
          err?.response?.data?.detail ||
            err?.message ||
            "Failed to load employees"
        )
      );
  }, []);

  const fetchAttendance = (employee_id) => {
    setLoading(true);

    API.get(`/attendance/list/?employee_id=${employee_id}`)
      .then((res) => {
        setAttendance(res.data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          err?.response?.data?.detail ||
            err?.message ||
            "Failed to load attendance"
        );
        setLoading(false);
      });
  };

  const markAttendance = () => {
    if (!selected) {
      setError("Please select an employee.");
      return;
    }

    setError("");
    setSuccess("");

    API.post("/attendance/", {
      employee: selected,
      date,
      status,
    })
      .then(() => {
        setSuccess("Attendance marked successfully.");

        const emp = employees.find(
          (e) => e.id === parseInt(selected)
        );

        if (emp) fetchAttendance(emp.employee_id);
      })
      .catch((err) =>
        setError(
          err?.response?.data?.detail ||
            err?.message ||
            "Failed to mark attendance"
        )
      );
  };

  return (
    <>
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">
          Attendance Management
        </h1>
        <p className="text-gray-500 mt-2">
          Track and manage daily employee attendance.
        </p>
      </div>

      {/* Attendance Form */}
      <Card
        title="Mark Attendance"
        subtitle="Record employee attendance for a specific date"
      >
        <ErrorAlert message={error} />
        <SuccessAlert message={success} />

        <div className="grid md:grid-cols-4 gap-6 mt-6">
          {/* Employee */}
          <div className="flex flex-col">
            <label
              htmlFor="employee"
              className="text-sm font-medium text-gray-600 mb-2"
            >
              Employee
            </label>

            <select
              id="employee"
              name="employee"
              value={selected}
              onChange={(e) => {
                const value = e.target.value;
                setSelected(value);

                const emp = employees.find(
                  (x) => x.id === parseInt(value)
                );

                if (emp) fetchAttendance(emp.employee_id);
              }}
              className="border border-gray-300 rounded-lg px-4 py-2.5 bg-white shadow-sm
                         focus:ring-2 focus:ring-blue-500
                         focus:border-blue-500 focus:outline-none
                         transition-all duration-200"
              required
            >
              <option value="">Select Employee</option>

              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.full_name}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <label
              htmlFor="date"
              className="text-sm font-medium text-gray-600 mb-2"
            >
              Date
            </label>

            <input
              id="date"
              name="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2.5 bg-white shadow-sm
                         focus:ring-2 focus:ring-blue-500
                         focus:border-blue-500 focus:outline-none
                         transition-all duration-200"
              required
            />
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label
              htmlFor="status"
              className="text-sm font-medium text-gray-600 mb-2"
            >
              Status
            </label>

            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2.5 bg-white shadow-sm
                         focus:ring-2 focus:ring-blue-500
                         focus:border-blue-500 focus:outline-none
                         transition-all duration-200"
              required
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>

          {/* Submit */}
          <div className="flex items-end">
            <button
              onClick={markAttendance}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg
                         shadow-sm hover:bg-blue-700 hover:shadow-md
                         transition-all duration-300 font-medium"
            >
              Submit
            </button>
          </div>
        </div>
      </Card>

      {/* Attendance Table */}
      <div className="mt-12">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        ) : attendance.length === 0 ? (
          <EmptyState message="No attendance records found." />
        ) : (
          <Card
            title="Attendance Records"
            subtitle="View attendance history for selected employee"
          >
            <div className="overflow-x-auto mt-6 rounded-xl border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b text-xs uppercase tracking-wide">
                    <th className="py-3 px-4 font-semibold text-gray-600 text-left">
                      Date
                    </th>

                    <th className="px-4 font-semibold text-gray-600 text-left">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {attendance.map((a) => (
                    <tr
                      key={a.id}
                      className="border-b hover:bg-gray-50 transition-all duration-200"
                    >
                      <td className="py-4 px-4 text-gray-800">
                        {a.date}
                      </td>

                      <td className="px-4">
                        <span
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
                            a.status === "Present"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </>
  );
}