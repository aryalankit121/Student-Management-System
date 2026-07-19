import StatCard from "../components/dashboard/StatCard";

export default function Dashboard() {
    const stats = [
        { title: "Total Students", value: 124 },
        { title: "Average GPA", value: 3.44 },
        { title: "Highest GPA", value: 4.0 },
        { title: "Majors", value: 8 }
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">
                Dashboard Overview
            </h1>

            <div className="flex gap-7">
                {stats.map((stat) => (
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