import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Students() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const [sort, setSort] = useState("");
    const query = search.trim();
    const navigate = useNavigate();

    useEffect(() => {
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
                setStudents((previousStudents) =>
                    previousStudents.filter(
                        (student) => student.student_id !== student_id
                    )
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

    function handleExportCSV() {
        setError("");

        axios
            .get("http://localhost:5000/students/export", {
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

    function handleClear() {
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
    }

    return (
        <div className="min-h-screen bg-slate-100 p-6 md:p-10">
            <div className="mx-auto mb-8 max-w-6xl text-center">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 md:text-4xl">
                    🎓 Student Directory
                </h1>
                <p className="mt-2 text-base text-slate-600">
                    Manage, search, filter, and export student records.
                </p>
            </div>

            <div className="mx-auto mb-6 max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <form
                    onSubmit={handleSearch}
                    className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
                >
                    <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                className="w-full rounded-xl border border-slate-300 bg-slate-50/50 py-2.5 pl-4 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                                placeholder="Search by Student ID or Name..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setError("");
                                }}
                            />
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                🔍 Search
                            </button>
                            <button
                                type="button"
                                onClick={handleClear}
                                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                            >
                                Clear
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <select
                            value={sort}
                            onChange={handleSortChange}
                            className="cursor-pointer rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-700 outline-none transition-all duration-200 hover:bg-slate-100 focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                        >
                            <option value="">Sort by GPA</option>
                            <option value="desc">GPA: Highest to Lowest</option>
                            <option value="asc">GPA: Lowest to Highest</option>
                        </select>

                        <button
                            type="button"
                            onClick={handleExportCSV}
                            className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                        >
                            📥 Export CSV
                        </button>
                    </div>
                </form>

                {error && (
                    <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 shadow-sm">
                        <span className="font-semibold">⚠️ Error:</span> {error}
                    </div>
                )}
            </div>

            <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                <th className="px-6 py-4">Student ID</th>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Major</th>
                                <th className="px-6 py-4">Graduation Year</th>
                                <th className="px-6 py-4">GPA</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                            {students.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="py-12 text-center text-slate-400">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <span className="text-3xl">🔍</span>
                                            <p className="text-base font-medium text-slate-600">
                                                No students found
                                            </p>
                                            <p className="text-xs text-slate-400">
                                                Try adjusting your search query or clearing filters.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                students.map((student) => (
                                    <tr
                                        key={student.student_id}
                                        className="transition-colors duration-150 hover:bg-slate-50/80"
                                    >
                                        <td className="whitespace-nowrap px-6 py-4 font-mono font-bold text-slate-800">
                                            #{student.student_id}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-900">
                                            {student.first_name} {student.last_name}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                                            {student.major}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                                            {student.year}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span
                                                className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold ${
                                                    Number(student.gpa) >= 3.5
                                                        ? "bg-emerald-100 text-emerald-800"
                                                        : Number(student.gpa) >= 3.0
                                                        ? "bg-indigo-100 text-indigo-800"
                                                        : "bg-slate-100 text-slate-700"
                                                }`}
                                            >
                                                {student.gpa}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(student.student_id)}
                                                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-all duration-150 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(student.student_id)}
                                                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 shadow-sm transition-all duration-150 hover:border-red-200 hover:bg-red-50"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}