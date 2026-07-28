import { Link } from "react-router-dom";
import { User, Mail, Lock, Eye, ArrowRight } from "lucide-react";

import SocialLogin from "./SocialLogin";
import AuthFooter from "./AuthFooter";

const SignUpForm = () => {
  return (
    <div className="relative flex items-center justify-center">

      <div className="relative z-20 w-full max-w-lg rounded-[36px] border border-white/40 bg-white/80 p-8 shadow-[0_40px_120px_rgba(15,23,42,.16)] backdrop-blur-3xl lg:p-10">

        <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Create Account
        </h2>

        <p className="mt-3 text-lg leading-7 text-slate-500">
          Join AXEL and start chatting with your documents, repositories and AI workspace.
        </p>

        <form className="mt-10 space-y-6">

          {/* Full Name */}

          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name
            </label>

            <div className="group flex h-14 items-center rounded-2xl border border-slate-200 bg-white/80 px-5 transition-all duration-300 hover:border-blue-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
              <User size={18} className="text-slate-400 transition group-focus-within:text-blue-600" />

              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className="ml-3 w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>

          </div>

          {/* Email */}

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
              Email Address
            </label>

            <div className="group flex h-14 items-center rounded-2xl border border-slate-200 bg-white/80 px-5 transition-all duration-300 hover:border-blue-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
              <Mail size={18} className="text-slate-400 transition group-focus-within:text-blue-600" />

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="ml-3 w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>

          </div>

          {/* Password */}

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>

            <div className="group flex h-14 items-center rounded-2xl border border-slate-200 bg-white/80 px-5 transition-all duration-300 hover:border-blue-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
              <Lock size={18} className="text-slate-400 transition group-focus-within:text-blue-600" />

              <input
                id="password"
                type="password"
                placeholder="Create a password"
                className="ml-3 w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
              />

              <button type="button" className="text-slate-400 transition hover:text-slate-700">
                <Eye size={18} />
              </button>

            </div>

          </div>

          {/* Confirm Password */}

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-slate-700">
              Confirm Password
            </label>

            <div className="group flex h-14 items-center rounded-2xl border border-slate-200 bg-white/80 px-5 transition-all duration-300 hover:border-blue-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
              <Lock size={18} className="text-slate-400 transition group-focus-within:text-blue-600" />

              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="ml-3 w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>

          </div>

          {/* Terms */}

          <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
            <input type="checkbox" className="mt-1 h-4 w-4 rounded accent-blue-600" />

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

          {/* Create Button */}

          <button
            type="submit"
            className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:from-blue-600 hover:to-blue-500 hover:shadow-[0_20px_40px_rgba(37,99,235,.35)]"
          >
            Create Account

            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />

          </button>

        </form>

        {/* Divider */}

        <div className="my-8 flex items-center">
          <div className="h-px flex-1 bg-slate-200" />

          <span className="mx-5 text-xs font-semibold tracking-[3px] text-slate-400">
            OR SIGN UP WITH
          </span>

          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <SocialLogin />

        <p className="mt-8 text-center text-slate-500">
          Already have an account?{" "}
          <Link to="/signin" className="font-semibold text-blue-600 transition hover:text-blue-700">
            Sign In
          </Link>
        </p>

        <AuthFooter />

      </div>

    </div>
  );
};

export default SignUpForm;