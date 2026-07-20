import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../components/dashboard/StatCard";

export default function Dashboard() {
    const [stats, setStats] = useState(null)

    useEffect(() => {
        axios
            .get("http://localhost:5000/students/statistics")
            .then((response) => {
                setStats(response.data.statistics)
            });
    }, []);

    const dashboardStats = [
        { title: "Total Students", value: stats?.total_students },
        { title: "Average GPA", value: stats?.avg_gpa },
        { title: "Highest GPA", value: stats?.max_gpa },
        {title: "Lowest GPA", value: stats?.min_gpa},
        { title: "Majors", value: stats?.total_majors }
    ];

    return (
        <div className="min-h-screen bg-gray-200 p-8">
            <h1 className="text-3xl font-bold mb-8">
                Dashboard Overview
            </h1>
            <div className="flex gap-7">
                {dashboardStats.map((stat) => (
                    <StatCard
                        key={stat.title}
                        title={stat.title}
                        value={stat.value}
                    />
                ))}
            </div>
        </div>
    );
}