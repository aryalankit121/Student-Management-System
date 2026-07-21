import { useEffect, useState } from "react";
import axios from "axios";

export default function Students() {
    const [students, setStudents] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        axios
            .get("http://localhost:5000/students")
            .then((response) => {
                setStudents(response.data)
            });
    }, []);

    function handleSearch() {
        if (isNaN(search)) {
            axios
                .get(`http://localhost:5000/students/search?name=${search}`)
                .then((response) => {
                    setStudents(response.data)
                });
        }
        else {
            axios
                .get(`http://localhost:5000/students/${search}`)
                .then((response) => {
                    setStudents([response.data])
                });
        }
    }

    return(
        <div className="min-h-screen bg-gray-200 p-8">
            <h1 className="mb-5 text-3xl font-bold">Students</h1>
            <div className="mb-8 max-w-4xl rounded-xl bg-white p-4 shadow-lg">
                <div className="flex gap-10">
                    <input className="w-full max-w-md p-2 border-2 border-slate-300 rounded-md outline-none transition-all duration-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                            placeholder="Search by Student ID or Name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                    />
                    <button onClick={handleSearch}
                            type="submit"
                            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            🔍 Search
                    </button>
                </div>
            </div>
            <div className="overflow-hidden rounded-xl bg-white shadow-lg">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr className="border-b">
                            <th className="border-r border-gray-300 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Student ID</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Major</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Graduation Year</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">GPA</th>
                            <th className="border-l border-gray-300 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr className="border-b hover:bg-blue-50" key={student.student_id}>
                                <td className="border-r border-gray-300 px-6 py-4 font-mono font-semibold">{student.student_id}</td>
                                <td className="px-6 py-4 font-semibold">{student.first_name + " " + student.last_name}</td>
                                <td className="px-6 py-4">{student.major}</td>
                                <td className="px-6 py-4">{student.year}</td>
                                <td className="px-6 py-4 font-semibold text-blue-500">{student.gpa}</td>
                                <td className="border-l border-gray-300 px-6 py-4">
                                    <button className="mr-2 rounded-md bg-blue-500 px-3 py-1 text-white hover:bg-blue-600">Edit</button>
                                    <button className="rounded-md bg-red-500 px-3 py-1 text-white hover:bg-red-600">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );


}