import { ArrowRight } from "lucide-react";

const Navbar = () => {
  return (
    <header className="w-full pt-4 pb-0 fixed top-0 left-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">

        <nav className="flex items-center justify-between">

          {/* Logo */}

          <div className="leading-tight">

            <h1 className="text-4xl font-black tracking-tight">
              AXEL
            </h1>

            <p className="text-sm text-gray-500">
              AI Workspace
            </p>

          </div>

          {/* Navigation */}
          {/* hidden → mobile par hide md:flex → 768px ke baad show */}

          <div className="hidden md:flex items-center gap-12">

            <a className="transition hover:text-blue-600" href="#">
              Features
            </a>

            <a className="transition hover:text-blue-600" href="#">
              Docs
            </a>

            <a className="transition hover:text-blue-600" href="#">
              Contact
            </a>

            <a className="transition hover:text-blue-600" href="#">
              About
            </a>

          </div>

          {/* Login */}

          <button
            className="flex items-center gap-2 rounded-full bg-black px-6
              py-3 text-white transition-all duration-300 hover:bg-blue-600
              hover:scale-105" >
            Login

            <ArrowRight size={18} />

          </button>

        </nav>

      </div>
    </header>
  );
};

export default Navbar;