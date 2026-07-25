import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from"react-router-dom";

export default function Students() {
    const [students, setStudents] = useState([])
    const [search, setSearch] = useState("")
    const [error, setError] = useState("")
    const [sort, setSort] = useState("");
    const query = search.trim();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:5000/students")
            .then((response) => {
                setStudents(response.data)
                setError("");
            })
            .catch((error) => {
                setError(
                    error.response?.data?.error ||
                    "Something went wrong."
                );
            });
    }, []);

    function handleSearch(e) {
        if (e) e.preventDefault();
        setError("");
        setSort("");
        
        if (query === "") {
            axios
                .get("http://localhost:5000/students")
                .then((response) => {
                    setStudents(response.data);
                    setError("");
                })
                .catch((error) => {
                    setError(
                        error.response?.data?.error ||
                        "Something went wrong."
                    );
                });

            return;
        }

        if (isNaN(query)) {
            axios
                .get(`http://localhost:5000/students/search?name=${query}`)
                .then((response) => {
                    setStudents(response.data);
                    setError("");
                })
                .catch((error) => {
                    setError(
                        error.response?.data?.error ||
                        "Something went wrong."
                    );
                });
        } else {
            axios
                .get(`http://localhost:5000/students/${query}`)
                .then((response) => {
                    setStudents([response.data]);
                    setError("");
                })
                .catch((error) => {
                    setError(
                        error.response?.data?.error ||
                        "Something went wrong."
                    );
                });
        }
    }

    function handleEdit(student_id) {
        navigate(`/students/edit/${student_id}`);
    }

    function handleDelete(student_id) {
        if (!window.confirm("Are you sure you want to delete this student?")) {
                    return;
                }

        axios
            .delete(`http://localhost:5000/students/${student_id}`)
            .then(() => {
                setError("");
                setStudents(previousStudents =>
                    previousStudents.filter(student => student.student_id !== student_id)
                );
            })
            .catch((error) => {
                setError(
                    error.response?.data?.error ||
                    "Something went wrong."
                );
            });
    }

    function handleSortChange(e) {
        const selectedSort = e.target.value;
        setSort(selectedSort);

        if (!selectedSort) {
            axios.get("http://localhost:5000/students")
                .then((response) => {
                    setStudents(response.data);
                })
                .catch((error) => {
                    setError(
                        error.response?.data?.error ||
                        "Something went wrong."
                    );
                });
                
            return;
        }

        axios
            .get(`http://localhost:5000/students/sorted?order=${selectedSort}`)
            .then((response) => {
                setStudents(response.data);
                setError("");
            })
            .catch((error) => {
                setError(
                    error.response?.data?.error ||
                    "Something went wrong while sorting."
                );
            });
    }

    return(
        <div className="min-h-screen bg-gray-200 p-8">
            <h1 className="mb-5 text-3xl font-bold">Students</h1>
            <div className="mb-8 max-w-4xl rounded-xl bg-white p-4 shadow-lg">
                <form onSubmit={handleSearch} className="flex gap-10">
                    <input
                        className="w-full max-w-md p-2 border-2 border-slate-300 rounded-md outline-none transition-all duration-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                        placeholder="Search by Student ID or Name..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setError("");
                        }}
                    />
                    <button
                        type="submit"
                        className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        🔍 Search
                    </button>
                    <button
                        type="button"
                        className="flex items-center gap-2 rounded-md bg-gray-400 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        onClick={() => {
                            setSearch("");
                            setSort("");
                            setError("");

                            axios
                                .get("http://localhost:5000/students")
                                .then((response) => {
                                    setStudents(response.data);
                                })
                                .catch((error) => {
                                    setError(
                                        error.response?.data?.error ||
                                        "Something went wrong."
                                    );
                                });
                        }}
                    >
                        Clear
                    </button>
                    <select
                        value={sort}
                        onChange={handleSortChange}
                        className="cursor-pointer rounded-md border-2 border-slate-300 bg-white p-2 text-sm font-medium text-gray-700 outline-none transition-all duration-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    >
                        <option value="">Default Order</option>
                        <option value="desc">GPA: Highest to Lowest</option>
                        <option value="asc">GPA: Lowest to Highest</option>
                    </select>
                </form>
                
                {error && (
                    <div className="mt-6 rounded-md border border-red-300 bg-red-100 p-3 text-red-700">
                        <span className="font-semibold">⚠️ Error:</span> {error}
                    </div>
                )}
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
                        {students.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="py-8 text-center text-gray-500">
                                    No students found.
                                </td>
                            </tr>
                        ) : (
                        students.map((student) => (
                            <tr className="border-b hover:bg-blue-50" key={student.student_id}>
                                <td className="border-r border-gray-300 px-6 py-4 font-mono font-semibold">{student.student_id}</td>
                                <td className="px-6 py-4 font-semibold">{student.first_name} {student.last_name}</td>
                                <td className="px-6 py-4">{student.major}</td>
                                <td className="px-6 py-4">{student.year}</td>
                                <td className="px-6 py-4 font-semibold text-blue-500">{student.gpa}</td>
                                <td className="border-l border-gray-300 px-6 py-4">
                                    <button onClick={() => handleEdit(student.student_id)}
                                            className="mr-2 rounded-md bg-blue-500 px-3 py-1 text-white hover:bg-blue-600">
                                            Edit
                                            </button>
                                    <button onClick={() => handleDelete(student.student_id)}
                                            className="rounded-md bg-red-500 px-3 py-1 text-white hover:bg-red-600">
                                            Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
