import { useEffect, useState } from "react";
import axios from "axios";

export default function Students() {
    const [students, setStudents] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/students")
            .then((response) => {
                setStudents(response.data)
            });
    }, []);

    return(
        <div className="min-h-screen bg-gray-200 p-8">
            <h1 className="mb-8 text-3xl font-bold">Students</h1>
            <div className="overflow-hidden rounded-xl bg-white shadow-md">
                <table>
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Name</th>
                            <th>Major</th>
                            <th>Graduation Year</th>
                            <th>GPA</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.student_id}>
                                <td>{student.student_id}</td>
                                <td>{student.first_name + " " + student.last_name}</td>
                                <td>{student.major}</td>
                                <td>{student.year}</td>
                                <td>{student.gpa}</td>
                                <td>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );


}