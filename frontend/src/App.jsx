import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />

          {/* Fallback route */}
          <Route
            path="*"
            element={
              <div className="text-center py-20 text-gray-500">
                Page not found
              </div>
            }
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}