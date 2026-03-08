import { useEffect, useState } from "react";
import API from "../api/api";
import Card from "../components/Card";
import Loader from "../components/Loader";
import ErrorAlert from "../components/ErrorAlert";
import { Users, CheckCircle, XCircle } from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/attendance/dashboard/")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          err?.response?.data?.detail ||
            err?.message ||
            "Failed to load dashboard"
        );
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );
  }

  const stats = [
    {
      label: "Total Employees",
      value: data?.total_employees ?? "--",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Present Today",
      value: data?.present_today ?? "--",
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      label: "Absent Today",
      value: data?.absent_today ?? "--",
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-100",
    },
  ];

  /* Chart data */
  const chartData = [
    {
      name: "Employees",
      value: data?.total_employees || 0,
    },
    {
      name: "Present",
      value: data?.present_today || 0,
    },
    {
      name: "Absent",
      value: data?.absent_today || 0,
    },
  ];

  return (
    <>
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-2">
          Monitor employee and attendance insights in real time.
        </p>
      </div>

      <ErrorAlert message={error} />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <Card
              key={index}
              className="flex items-center justify-between hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <p className="text-gray-500 text-sm">
                  {stat.label}
                </p>

                <h2
                  className={`text-4xl font-bold mt-3 ${stat.color}`}
                >
                  {stat.value}
                </h2>
              </div>

              <div className={`p-4 rounded-xl ${stat.bg}`}>
                <Icon size={30} className={stat.color} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Chart Section */}
      <div className="mt-12">
        <Card
          title="Attendance Overview"
          subtitle="Quick visual summary of workforce status"
        >
          <div className="mt-6" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Summary */}
      <div className="mt-12">
        <Card
          title="System Summary"
          subtitle="Overview of HRMS Lite operations"
        >
          <p className="text-gray-600 leading-relaxed text-sm">
            HRMS Lite enables administrators to efficiently manage
            employee records and monitor daily attendance in a
            centralized system. The dashboard provides real-time
            insights to maintain workforce transparency and
            operational accuracy.
          </p>
        </Card>
      </div>
    </>
  );
}