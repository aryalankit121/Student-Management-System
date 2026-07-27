import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../components/dashboard/StatCard";
import { useNavigate } from "react-router-dom";
import API_URL from "../api";

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${API_URL}/students/statistics`)
            .then((response) => {
                setStats(response.data.statistics);
            })
            .catch((error) => {
                setError(
                    error.response?.data?.error ||
                    "Failed to load dashboard statistics."
                );
            });
    }, []);

    const dashboardStats = [
        { title: "👥 Total Students", value: stats?.total_students ?? "—" },
        { title: "🎓 Average GPA", value: stats?.avg_gpa ?? "—" },
        { title: "🏆 Highest GPA", value: stats?.max_gpa ?? "—" },
        { title: "📉 Lowest GPA", value: stats?.min_gpa ?? "—" },
        { title: "📚 Majors", value: stats?.total_majors ?? "—" },
    ];

    function showStudents() {
        navigate(`/students`);
    }

    function addStudent() {
        navigate(`/students/add`);
    }

    function handleExportCSV() {
        setError("");

        axios
            .get(`${API_URL}/students/export`, {
                responseType: "blob",
            })
            .then((response) => {
                const url = window.URL.createObjectURL(response.data);

                const link = document.createElement("a");
                link.href = url;
                link.download = "students.csv";

                document.body.appendChild(link);
                link.click();

                link.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch(async (error) => {
                if (error.response?.data) {
                    try {
                        const text = await error.response.data.text();
                        const json = JSON.parse(text);
                        setError(json.error);
                    } catch {
                        setError("Failed to download CSV file.");
                    }
                } else {
                    setError("Failed to download CSV file.");
                }
            });
    }

    return (
        <div className="min-h-screen bg-slate-100 p-6 md:p-10">
            <div className="mx-auto mb-10 max-w-2xl text-center">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 md:text-4xl">
                    📊 Student Management Dashboard
                </h1>
                <p className="mt-2 text-base text-slate-600">
                    Manage students, monitor statistics, and export records.
                </p>
            </div>

            {error && (
                <div className="mx-auto mb-8 flex max-w-3xl items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 shadow-sm">
                    <span className="font-semibold">⚠️ Error:</span> {error}
                </div>
            )}

            <section className="mb-10">
                <h2 className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Overview Statistics
                </h2>
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {dashboardStats.map((stat) => (
                        <StatCard
                            key={stat.title}
                            title={stat.title}
                            value={stat.value}
                        />
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <h2 className="text-xl font-bold text-slate-800">
                    ⚡ Quick Actions
                </h2>
                <p className="mt-1 mb-6 text-sm text-slate-500">
                    Perform common management tasks directly from your dashboard.
                </p>

                <div className="flex flex-col items-center justify-center gap-4">
                    <button
                        type="button"
                        onClick={addStudent}
                        className="inline-flex w-full max-w-md items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <span>➕</span> Add Student
                    </button>

                    <button
                        type="button"
                        onClick={showStudents}
                        className="inline-flex w-full max-w-md items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-5 text-base font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                    >
                        <span>👥</span> View Students
                    </button>

                    <button
                        type="button"
                        onClick={handleExportCSV}
                        className="inline-flex w-full max-w-md items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    >
                        <span>⬇️</span> Export CSV
                    </button>
                </div>
            </section>
        </div>
    );
}