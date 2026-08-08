import { useState } from "react";
import SocialLogin from "./SocialLogin";
import AuthFooter from "./AuthFooter";
import { Link } from "react-router-dom";

import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

const SignInForm = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useAuth();


    // =========================
    // Input Change
    // =========================

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked,
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));

        // Remove server error when user starts typing again
        if (errors.server) {
            setErrors((prev) => ({
                ...prev,
                server: "",
            }));
        }
    };


    // =========================
    // Submit
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) {
            return;
        }

        setLoading(true);

        try {

            await login(formData);

            setFormData({
                email: "",
                password: "",
                remember: false,
            });

        } catch (error) {

            console.log(
                "LOGIN ERROR:",
                error.response?.data
            );

            setErrors({
                server:
                    error.response?.data?.detail ||
                    "Login Failed",
            });

        } finally {

            setLoading(false);

        }
    };


    // =========================
    // Validation
    // =========================

    const validate = () => {

        const validationErrors = {};


        // Email

        if (formData.email.trim() === "") {

            validationErrors.email =
                "Email is required";

        } else if (
            !/\S+@\S+\.\S+/.test(
                formData.email.trim()
            )
        ) {

            validationErrors.email =
                "Enter a valid email";

        }


        // Password

        if (
            formData.password.trim() === ""
        ) {

            validationErrors.password =
                "Password is required";

        } else if (
            formData.password.length < 8
        ) {

            validationErrors.password =
                "Password must be at least 8 characters";

        }


        setErrors(validationErrors);

        return (
            Object.keys(validationErrors)
                .length === 0
        );
    };


    return (

        <div className="relative flex items-center justify-center lg:p-6">

            {/* =========================
                Glass Card
            ========================= */}

            <div className="relative z-20 w-full max-w-lg rounded-[36px] border border-white/40 bg-white/75 p-10 shadow-[0_30px_80px_rgba(15,23,42,.12)] backdrop-blur-2xl">


                <h2 className="text-4xl font-black tracking-tight text-slate-900">
                    Welcome Back
                </h2>


                <p className="mt-3 text-lg leading-7 text-slate-500">
                    Sign in to continue your AI workspace and access all your conversations.
                </p>


                <form
                    onSubmit={handleSubmit}
                    className="mt-10 space-y-6"
                >


                    {/* =========================
                        Email
                    ========================= */}

                    <div>

                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Email Address
                        </label>


                        <div className="group flex h-14 items-center rounded-2xl border border-slate-200 bg-white/80 px-5 transition-all duration-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 hover:border-blue-300">

                            <Mail
                                size={18}
                                className="shrink-0 text-slate-400 transition group-focus-within:text-blue-600"
                            />


                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="ml-3 w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
                                value={formData.email}
                                name="email"
                                onChange={handleChange}
                            />

                        </div>


                        {errors.email && (

                            <p className="mt-2 text-sm text-red-500">
                                {errors.email}
                            </p>

                        )}

                    </div>


                    {/* =========================
                        Password
                    ========================= */}

                    <div>

                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Password
                        </label>


                        <div className="group flex h-14 items-center rounded-2xl border border-slate-200 bg-white/80 px-5 transition-all duration-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 hover:border-blue-300">

                            <Lock
                                size={18}
                                className="shrink-0 text-slate-400 transition group-focus-within:text-blue-600"
                            />


                            <input
                                id="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter your password"
                                className="ml-3 w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
                                value={formData.password}
                                name="password"
                                onChange={handleChange}
                            />


                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        (prev) =>
                                            !prev
                                    )
                                }
                                className="ml-2 shrink-0 text-slate-400 hover:text-slate-700"
                            >

                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}

                            </button>

                        </div>


                        {errors.password && (

                            <p className="mt-2 text-sm text-red-500">
                                {errors.password}
                            </p>

                        )}

                    </div>


                    {/* =========================
                        Remember + Forgot
                    ========================= */}

                    <div className="flex items-center justify-between">

                        <label className="flex items-center gap-3 text-sm text-slate-600">

                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded accent-blue-600"
                                checked={
                                    formData.remember
                                }
                                name="remember"
                                onChange={handleChange}
                            />

                            Remember me

                        </label>


                        <Link
                            to="/forgot-password"
                            className="font-medium text-blue-600 transition hover:text-blue-700"
                        >
                            Forgot Password?
                        </Link>

                    </div>


                    {/* =========================
                        SERVER ERROR
                    ========================= */}

                    {errors.server && (

                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">

                            {errors.server}

                        </div>

                    )}


                    {/* =========================
                        Continue
                    ========================= */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:shadow-[0_20px_40px_rgba(37,99,235,.35)] disabled:cursor-not-allowed disabled:opacity-60"
                    >

                        {loading
                            ? "Signing In..."
                            : "Continue"}


                        {!loading && (

                            <ArrowRight
                                size={18}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />

                        )}

                    </button>

                </form>


                {/* =========================
                    Divider
                ========================= */}

                <div className="my-8 flex items-center">

                    <div className="h-px flex-1 bg-slate-200" />

                    <span className="mx-5 text-xs font-semibold tracking-[3px] text-slate-400">
                        OR CONTINUE WITH
                    </span>

                    <div className="h-px flex-1 bg-slate-200" />

                </div>


                {/* Social Login */}

                <SocialLogin />


                {/* Sign Up */}

                <p className="mt-8 text-center text-slate-500">

                    Don't have an account?{" "}

                    <Link
                        to="/signup"
                        className="font-semibold text-blue-600 transition hover:text-blue-700"
                    >
                        Create Account
                    </Link>

                </p>


                {/* Footer */}

                <AuthFooter />

            </div>

        </div>
    );
};

export default SignInForm;