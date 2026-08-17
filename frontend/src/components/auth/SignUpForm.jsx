import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
} from "lucide-react";

import SocialLogin from "./SocialLogin";
import AuthFooter from "./AuthFooter";

import { signup } from "../../services/authApi";


const SignUpForm = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
    });

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);


    // =========================
    // Handle Change
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

        // Clear related error
        if (errors[name]) {

            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));

        }

        // Clear server error
        if (errors.server) {

            setErrors((prev) => ({
                ...prev,
                server: "",
            }));

        }
    };


    // =========================
    // Validation
    // =========================

    const validate = () => {

        const validationErrors = {};


        // Name

        if (!formData.name.trim()) {

            validationErrors.name =
                "Full name is required";

        } else if (
            formData.name.trim().length < 2
        ) {

            validationErrors.name =
                "Enter a valid name";

        }


        // Email

        if (!formData.email.trim()) {

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

        if (!formData.password) {

            validationErrors.password =
                "Password is required";

        } else if (
            formData.password.length < 8
        ) {

            validationErrors.password =
                "Password must be at least 8 characters";

        }


        // Confirm Password

        if (!formData.confirmPassword) {

            validationErrors.confirmPassword =
                "Please confirm your password";

        } else if (
            formData.password !==
            formData.confirmPassword
        ) {

            validationErrors.confirmPassword =
                "Passwords do not match";

        }


        // Terms

        if (!formData.terms) {

            validationErrors.terms =
                "You must agree to the Terms of Service";

        }


        setErrors(validationErrors);

        return (
            Object.keys(validationErrors).length === 0
        );
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

            const data = await signup({
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password,
            });


            console.log(
                "SIGNUP SUCCESS:",
                data
            );


            // If backend returns token,
            // save it directly.

            if (data?.access_token) {

                localStorage.setItem(
                    "token",
                    data.access_token
                );

            }

            if (data?.user) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

            }


            // Go to signin after successful signup

            navigate("/signin");

        } catch (error) {

    console.error("SIGNUP ERROR:", error);

    const status = error?.response?.status;
    const detail = error?.response?.data?.detail;

    let message = "Unable to create account.";

    if (typeof detail === "string") {
        message = detail;
    }

    if (Array.isArray(detail)) {
        message = detail
            .map((item) => item?.msg)
            .filter(Boolean)
            .join(", ");
    }

    if (!error?.response) {
        message = "Backend server is not reachable.";
    }

    console.log("STATUS:", status);
    console.log("DETAIL:", detail);

    setErrors({
        server: message,
    });

            } finally {

                setLoading(false);

            }
    };


    return (

        <div className="relative z-20 w-full max-w-lg rounded-[36px] border border-white/40 bg-white/80 p-8 shadow-[0_40px_120px_rgba(15,23,42,.16)] backdrop-blur-3xl lg:p-10">


            {/* =========================
                Header
            ========================= */}

            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Create Account
            </h2>


            <p className="mt-3 text-lg leading-7 text-slate-500">
                Join AXEL and start chatting with your documents, repositories and AI workspace.
            </p>


            <form
                onSubmit={handleSubmit}
                className="mt-10 space-y-6"
            >


                {/* =========================
                    Full Name
                ========================= */}

                <div>

                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                        Full Name
                    </label>


                    <div className="group flex h-14 items-center rounded-2xl border border-slate-200 bg-white/80 px-5 transition-all duration-300 hover:border-blue-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

                        <User
                            size={18}
                            className="shrink-0 text-slate-400 transition group-focus-within:text-blue-600"
                        />


                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            className="ml-3 w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
                        />

                    </div>


                    {errors.name && (

                        <p className="mt-2 text-sm text-red-500">
                            {errors.name}
                        </p>

                    )}

                </div>


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


                    <div className="group flex h-14 items-center rounded-2xl border border-slate-200 bg-white/80 px-5 transition-all duration-300 hover:border-blue-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

                        <Mail
                            size={18}
                            className="shrink-0 text-slate-400 transition group-focus-within:text-blue-600"
                        />


                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="ml-3 w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
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


                    <div className="group flex h-14 items-center rounded-2xl border border-slate-200 bg-white/80 px-5 transition-all duration-300 hover:border-blue-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

                        <Lock
                            size={18}
                            className="shrink-0 text-slate-400 transition group-focus-within:text-blue-600"
                        />


                        <input
                            id="password"
                            name="password"
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            className="ml-3 w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
                        />


                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(
                                    (prev) => !prev
                                )
                            }
                            className="ml-2 shrink-0 text-slate-400 transition hover:text-slate-700"
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
                    Confirm Password
                ========================= */}

                <div>

                    <label
                        htmlFor="confirmPassword"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                        Confirm Password
                    </label>


                    <div className="group flex h-14 items-center rounded-2xl border border-slate-200 bg-white/80 px-5 transition-all duration-300 hover:border-blue-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

                        <Lock
                            size={18}
                            className="shrink-0 text-slate-400 transition group-focus-within:text-blue-600"
                        />


                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Confirm your password"
                            value={
                                formData.confirmPassword
                            }
                            onChange={handleChange}
                            className="ml-3 w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
                        />


                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(
                                    (prev) => !prev
                                )
                            }
                            className="ml-2 shrink-0 text-slate-400 transition hover:text-slate-700"
                        >

                            {showConfirmPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}

                        </button>

                    </div>


                    {errors.confirmPassword && (

                        <p className="mt-2 text-sm text-red-500">
                            {errors.confirmPassword}
                        </p>

                    )}

                </div>


                {/* =========================
                    Terms
                ========================= */}

                <div>

                    <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">

                        <input
                            type="checkbox"
                            name="terms"
                            checked={formData.terms}
                            onChange={handleChange}
                            className="mt-1 h-4 w-4 rounded accent-blue-600"
                        />


                        <span>

                            I agree to the{" "}

                            <span className="cursor-pointer font-semibold text-blue-600 hover:text-blue-700">
                                Terms of Service
                            </span>{" "}

                            and{" "}

                            <span className="cursor-pointer font-semibold text-blue-600 hover:text-blue-700">
                                Privacy Policy
                            </span>

                        </span>

                    </label>


                    {errors.terms && (

                        <p className="mt-2 text-sm text-red-500">
                            {errors.terms}
                        </p>

                    )}

                </div>


                {/* =========================
                    Server Error
                ========================= */}

                {errors.server && (

                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">

                        {errors.server}

                    </div>

                )}


                {/* =========================
                    Create Account
                ========================= */}

                <button
                    type="submit"
                    disabled={loading}
                    className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:from-blue-600 hover:to-blue-500 hover:shadow-[0_20px_40px_rgba(37,99,235,.35)] disabled:cursor-not-allowed disabled:opacity-60"
                >

                    {loading
                        ? "Creating Account..."
                        : "Create Account"}


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
                    OR SIGN UP WITH
                </span>

                <div className="h-px flex-1 bg-slate-200" />

            </div>


            <SocialLogin />


            {/* =========================
                Sign In
            ========================= */}

            <p className="mt-8 text-center text-slate-500">

                Already have an account?{" "}

                <Link
                    to="/signin"
                    className="font-semibold text-blue-600 transition hover:text-blue-700"
                >
                    Sign In
                </Link>

            </p>


            <AuthFooter />

        </div>
    );
};

export default SignUpForm;