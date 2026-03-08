import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">

        {/* Top Header */}
        <header className="bg-white/70 backdrop-blur-xl border-b border-gray-200 px-10 py-5 flex justify-between items-center shadow-sm sticky top-0 z-10">

          {/* Left Section */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
              HRMS Admin Panel
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Employee & Attendance Management
            </p>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">

            <div className="text-sm text-gray-600 hidden sm:block">
              Welcome,{" "}
              <span className="font-medium text-gray-800">
                Admin
              </span>
            </div>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-semibold shadow-md hover:scale-105 transition duration-200">
              A
            </div>

          </div>

        </header>

        {/* Page Content Wrapper */}
        <main className="flex-1 px-6 md:px-10 py-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}