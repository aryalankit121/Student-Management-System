import { useState } from "react";
import axios from "axios";

export default function AddStudent() {
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

    function handleChange(e) {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        axios
            .post("http://localhost:5000/students", student)
            .then((response) => {
                alert(response.data.message);
                setStudent(initialStudent);
            });
    }

    return (
        <div className="min-h-screen bg-gray-200 p-8">
            <h1 className="mb-5 text-3xl font-bold">Add Student</h1>

            <div className="max-w-3xl rounded-xl bg-white p-8 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Student ID */}
                        <div>
                            <label className="mb-1 block text-sm font-semibold text-gray-700">
                                Student ID
                            </label>
                            <input
                                type="number"
                                name="student_id"
                                value={student.student_id}
                                onChange={handleChange}
                                placeholder="e.g. 1001"
                                className="w-full rounded-md border-2 border-slate-300 p-2.5 outline-none transition-all duration-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-1 block text-sm font-semibold text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={student.email}
                                onChange={handleChange}
                                placeholder="student@university.edu"
                                className="w-full rounded-md border-2 border-slate-300 p-2.5 outline-none transition-all duration-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                                required
                            />
                        </div>

                        {/* First Name */}
                        <div>
                            <label className="mb-1 block text-sm font-semibold text-gray-700">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="first_name"
                                value={student.first_name}
                                onChange={handleChange}
                                placeholder="First Name"
                                className="w-full rounded-md border-2 border-slate-300 p-2.5 outline-none transition-all duration-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                                required
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="mb-1 block text-sm font-semibold text-gray-700">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="last_name"
                                value={student.last_name}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="w-full rounded-md border-2 border-slate-300 p-2.5 outline-none transition-all duration-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                                required
                            />
                        </div>

                        {/* Major */}
                        <div>
                            <label className="mb-1 block text-sm font-semibold text-gray-700">
                                Major
                            </label>
                            <input
                                type="text"
                                name="major"
                                value={student.major}
                                onChange={handleChange}
                                placeholder="e.g. Computer Science"
                                className="w-full rounded-md border-2 border-slate-300 p-2.5 outline-none transition-all duration-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                                required
                            />
                        </div>

                        {/* Graduation Year */}
                        <div>
                            <label className="mb-1 block text-sm font-semibold text-gray-700">
                                Graduation Year
                            </label>
                            <input
                                type="number"
                                name="year"
                                value={student.year}
                                onChange={handleChange}
                                placeholder="e.g. 2026"
                                className="w-full rounded-md border-2 border-slate-300 p-2.5 outline-none transition-all duration-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                                required
                            />
                        </div>

                        {/* GPA */}
                        <div>
                            <label className="mb-1 block text-sm font-semibold text-gray-700">
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
                                className="w-full rounded-md border-2 border-slate-300 p-2.5 outline-none transition-all duration-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-end justify-end">
                            <button
                                type="submit"
                                className="w-full md:w-auto flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700"
                            >
                                Submit Student Data
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}