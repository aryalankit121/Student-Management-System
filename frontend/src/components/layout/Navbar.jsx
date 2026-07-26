import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
    const getNavLinkClass = ({ isActive }) =>
        `inline-flex items-center px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            isActive
                ? "bg-indigo-600/20 text-indigo-400 font-semibold shadow-inner"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`;

    return (
        <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/95 backdrop-blur-md shadow-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
                
                <Link
                    to="/"
                    className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-90"
                >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm shadow-sm">
                        🎓
                    </span>
                    <span className="hidden sm:inline">Student Management System</span>
                    <span className="sm:hidden">SMS</span>
                </Link>

                <ul className="flex items-center gap-1.5 sm:gap-2">
                    <li>
                        <NavLink to="/" end className={getNavLinkClass}>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/students" end className={getNavLinkClass}>
                            Students
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/students/add"
                            className={({ isActive }) =>
                                getNavLinkClass({
                                    isActive: isActive || window.location.pathname === "/add-student" 
                                })
                            }
                        >
                            Add Student
                        </NavLink>
                    </li>
                </ul>

            </div>
        </nav>
    );
}