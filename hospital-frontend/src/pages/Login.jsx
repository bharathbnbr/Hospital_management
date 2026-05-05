import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
    HiOutlineMail,
    HiOutlineLockClosed,
    HiOutlineLogin,
} from "react-icons/hi";

import API from "../api/api";
import { setAuth } from "../utils/auth";

const Login = () => {
    const [email, setEmail] = useState("bharath@gmail.com");
    const [password, setPassword] = useState("123456");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // ✅ API CALL
            const res = await API.post("/auth/login", {
                email,
                password,
            });

            // ✅ Save token + role
            setAuth(res.data.token, res.data.role ?? 'admin');

            toast.success("Login successful!");

            // ✅ Role-based redirect
            if (res.data.role === "admin") {
                navigate("/dashboard");
            } else {
                navigate("/dashboard"); // doctor route later if needed
            }
        } catch (err) {
            toast.error(
                err.response?.data?.msg || "Invalid credentials"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">

                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                        <HiOutlineLogin size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800">
                        Hospital Portal
                    </h1>
                    <p className="text-slate-500 mt-2">
                        Please enter your details to sign in
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                <HiOutlineMail size={20} />
                            </span>
                            <input
                                type="email"
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="doctor@hospital.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                <HiOutlineLockClosed size={20} />
                            </span>
                            <input
                                type="password"
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg"
                    >
                        {isLoading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center border-t pt-6">
                    <p className="text-slate-600">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 font-bold hover:underline"
                        >
                            Register Now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;