import { Link } from "react-router-dom";
import { getRole, logout } from "../utils/auth";

export default function Sidebar() {
    const role = getRole();

    return (
        <div className="w-64 h-screen bg-gray-900 text-white p-5">
            <h2 className="text-xl font-bold mb-6">Hospital</h2>

            <Link to="/dashboard" className="block mb-3">Dashboard</Link>

            {role === "admin" && (
                <>
                    <Link to="/admit" className="block mb-3">Admit Patient</Link>
                </>
            )}
            <Link to="/discharge" className="block mb-3">Discharge Patient</Link>

            <button onClick={logout} className="mt-6 bg-red-500 px-3 py-1 rounded">
                Logout
            </button>
        </div>
    );
}