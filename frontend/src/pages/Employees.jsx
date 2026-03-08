import { useEffect, useState } from "react";
import API from "../api/api";
import Card from "../components/Card";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";
import { Trash2 } from "lucide-react";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchEmployees = () => {
    setLoading(true);

    API.get("/employees/")
      .then((res) => {
        setEmployees(res.data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          err?.response?.data?.detail ||
          err?.message ||
          "Failed to load employees"
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    API.post("/employees/", form)
      .then(() => {
        setSuccess("Employee added successfully.");

        setForm({
          employee_id: "",
          full_name: "",
          email: "",
          department: "",
        });

        fetchEmployees();
      })
      .catch((err) => {
        const errorData = err?.response?.data;

        if (errorData) {
          const message = Object.values(errorData).flat().join(" ");
          setError(message);
        } else {
          setError("Failed to add employee");
        }
      });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    API.delete(`/employees/${id}/`)
      .then(() => {
        setSuccess("Employee deleted successfully.");
        fetchEmployees();
      })
      .catch((err) =>
        setError(
          err?.response?.data?.detail ||
          err?.message ||
          "Failed to delete employee"
        )
      );
  };

  /* Search Filter */
  const filteredEmployees = employees.filter((emp) =>
    `${emp.full_name} ${emp.email} ${emp.employee_id}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">
          Employee Management
        </h1>
        <p className="text-gray-500 mt-2">
          Add, view and manage company employees.
        </p>
      </div>

      {/* Add Employee */}
      <Card title="Add Employee" subtitle="Create a new employee record">
        <ErrorAlert message={error} />
        <SuccessAlert message={success} />

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6 mt-6"
        >
          {Object.keys(form).map((field) => (
            <div key={field} className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-2 capitalize">
                {field.replace("_", " ")}
              </label>

              <input
                type={field === "email" ? "email" : "text"}
                value={form[field]}
                onChange={(e) =>
                  setForm({ ...form, [field]: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-4 py-2.5 bg-white shadow-sm
                focus:ring-2 focus:ring-blue-500
                focus:border-blue-500 focus:outline-none
                transition-all duration-200"
                required
              />
            </div>
          ))}

          <div className="md:col-span-2 pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg
              shadow-sm hover:bg-blue-700 hover:shadow-md
              transition-all duration-300 font-medium"
            >
              Add Employee
            </button>
          </div>
        </form>
      </Card>

      {/* Employee Table */}
      <div className="mt-12">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        ) : employees.length === 0 ? (
          <EmptyState message="No employees found." />
        ) : (
          <Card title="Employee List" subtitle="All registered employees">

            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search employee..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5
                focus:ring-2 focus:ring-blue-500
                focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b text-xs uppercase tracking-wide">
                    <th className="py-3 px-4 text-left">Employee ID</th>
                    <th className="px-4 text-left">Full Name</th>
                    <th className="px-4 text-left">Email</th>
                    <th className="px-4 text-left">Department</th>
                    <th className="px-4 text-right">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredEmployees.map((emp) => (
                    <tr
                      key={emp.id}
                      className="border-b hover:bg-gray-50 transition-all"
                    >
                      <td className="py-4 px-4 font-medium">
                        {emp.employee_id}
                      </td>

                      <td className="px-4">{emp.full_name}</td>

                      <td className="px-4 text-gray-600">
                        {emp.email}
                      </td>

                      <td className="px-4">{emp.department}</td>

                      <td className="px-4 text-right">
                        <button
                          onClick={() => handleDelete(emp.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md
                          text-red-600 hover:bg-red-50
                          transition-all font-medium"
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>
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