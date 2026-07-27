import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import API_URL from "../api";

export default function UpdateStudent() {
    const initialStudent = {
        student_id: "",
        first_name: "",
        last_name: "",
        major: "",
        year: "",
        gpa: "",
        email: ""
    };
    const [student, setStudent] = useState(initialStudent);
    const [error, setError] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${API_URL}/students/${id}`)
            .then((response) => {
                setStudent(response.data);
            });
    }, [id]);

    function handleChange(e) {
        setError("");

        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        setError("");

        const { student_id, ...updatedStudent } = student;

        axios
            .put(`${API_URL}/students/${id}`, updatedStudent)
            .then((response) => {
                setError("");
                navigate("/students");
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
            {/* Centered Page Header */}
            <div className="mx-auto mb-10 max-w-2xl text-center">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 md:text-4xl">
                    ✏️ Update Student Record
                </h1>
                <p className="mt-2 text-base text-slate-600">
                    Modify the information below to update the student record.
                </p>
            </div>

            {/* Main Form Card */}
            <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                {/* Error Alert Box */}
                {error && (
                    <div className="mb-6 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 shadow-sm">
                        <span className="font-semibold">⚠️ Error:</span> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Student ID (Read Only) */}
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                Student ID
                            </label>
                            <input
                                type="number"
                                name="student_id"
                                value={student.student_id}
                                onChange={handleChange}
                                placeholder="e.g. 1001"
                                className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 p-3 text-sm text-slate-500 outline-none"
                                readOnly
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={student.email}
                                onChange={handleChange}
                                placeholder="student@university.edu"
                                className="w-full rounded-xl border border-slate-300 bg-slate-50/50 p-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                                required
                            />
                        </div>

                        {/* First Name */}
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="first_name"
                                value={student.first_name}
                                onChange={handleChange}
                                placeholder="First Name"
                                className="w-full rounded-xl border border-slate-300 bg-slate-50/50 p-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                                required
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="last_name"
                                value={student.last_name}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="w-full rounded-xl border border-slate-300 bg-slate-50/50 p-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                                required
                            />
                        </div>

                        {/* Major */}
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                Major
                            </label>
                            <input
                                type="text"
                                name="major"
                                value={student.major}
                                onChange={handleChange}
                                placeholder="e.g. Computer Science"
                                className="w-full rounded-xl border border-slate-300 bg-slate-50/50 p-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                                required
                            />
                        </div>

                        {/* Graduation Year */}
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                Graduation Year
                            </label>
                            <input
                                type="number"
                                name="year"
                                value={student.year}
                                onChange={handleChange}
                                placeholder="e.g. 2026"
                                className="w-full rounded-xl border border-slate-300 bg-slate-50/50 p-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                                required
                                min="2000"
                                max="2100"
                            />
                        </div>

                        {/* GPA */}
                        <div className="sm:col-span-2">
                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                GPA
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="4"
                                step="0.01"
                                name="gpa"
                                value={student.gpa}
                                onChange={handleChange}
                                placeholder="e.g. 3.85"
                                className="w-full rounded-xl border border-slate-300 bg-slate-50/50 p-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                                required
                            />
                        </div>
                    </div>

                    {/* Action Bar / Submit Button */}
                    <div className="mt-8 flex flex-col-reverse items-center justify-end gap-3 border-t border-slate-100 pt-4 sm:flex-row">
                        <button
                            type="submit"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        >
                            <span>💾</span> Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}