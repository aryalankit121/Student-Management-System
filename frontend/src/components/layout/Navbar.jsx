import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-slate-900 text-white shadow-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                <h1 className="text-2xl font-bold">
                    Student Management System
                </h1>

                <ul className="flex gap-8">
                    <li>
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-400 font-semibold"
                                    : "hover:text-blue-400"
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/students"
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-400 font-semibold"
                                    : "hover:text-blue-400"
                            }
                        >
                            Students
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/students/add"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-400 font-semibold"
                                    : "hover:text-blue-400"
                            }
                        >
                            Add Student
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/statistics"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-400 font-semibold"
                                    : "hover:text-blue-400"
                            }
                        >
                            Statistics
                        </NavLink>
                    </li>
                </ul>

            </div>
        </nav>
    );
}

export default Navbar;