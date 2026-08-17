import { useEffect, useState } from "react";
import {
  ArrowRight,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  // =====================================================
  // LOAD LOGGED-IN USER
  // =====================================================

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      return;
    }

    const savedUser =
      localStorage.getItem("user") ||
      localStorage.getItem("current_user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse user:", error);
        setUser(null);
      }
    }
  }, []);

  // =====================================================
  // GET USER INITIAL
  // =====================================================

  const getInitial = () => {
    if (!user) return "?";

    const name =
      user.name ||
      user.full_name ||
      user.username ||
      user.email ||
      "";

    return (
      name.trim().charAt(0).toUpperCase() || "?"
    );
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("current_user");
    localStorage.removeItem("session_id");

    // Optional: current chat/history clear nahi kar rahe
    // taaki logout ke baad data accidentally delete na ho.

    setUser(null);
    setProfileOpen(false);
    setMenuOpen(false);

    navigate("/");
  };

  // =====================================================
  // AVATAR CLICK
  // =====================================================

  const handleAvatarClick = () => {
    setProfileOpen((prev) => !prev);
  };

  // =====================================================
  // CLOSE MOBILE MENU
  // =====================================================

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header
      className="
        fixed
        left-0
        top-0
        z-50
        w-full
        border-b
        border-slate-200
        bg-white
        shadow-sm
        transition-colors
        duration-300

        dark:border-slate-800
        dark:bg-[#171717]
      "
    >

      <div
        className="
          mx-auto
          max-w-7xl
          px-5

          sm:px-8
          lg:px-12
        "
      >

        {/* =================================================
            NAVBAR
        ================================================= */}

        <nav
          className="
            flex
            h-20
            items-center
            justify-between
          "
        >

          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            to="/"
            onClick={() => {
              setMenuOpen(false);
              setProfileOpen(false);
            }}
            className="leading-tight"
          >

            <h1
              className="
                text-3xl
                font-black
                tracking-tight
                text-slate-900

                dark:text-white

                sm:text-4xl
              "
            >
              AXEL
            </h1>

            <p
              className="
                text-xs
                text-gray-500

                dark:text-slate-400

                sm:text-sm
              "
            >
              AI Workspace
            </p>

          </Link>


          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <div
            className="
              hidden
              items-center
              gap-10

              md:flex
              lg:gap-12
            "
          >

            <a
              href="#features"
              className="
                text-slate-700
                transition
                hover:text-blue-600

                dark:text-slate-300
                dark:hover:text-blue-400
              "
            >
              Features
            </a>

            <a
              href="#workflow"
              className="
                text-slate-700
                transition
                hover:text-blue-600

                dark:text-slate-300
                dark:hover:text-blue-400
              "
            >
              Docs
            </a>

            <a
              href="#contact"
              className="
                text-slate-700
                transition
                hover:text-blue-600

                dark:text-slate-300
                dark:hover:text-blue-400
              "
            >
              Contact
            </a>

            <a
              href="#about"
              className="
                text-slate-700
                transition
                hover:text-blue-600

                dark:text-slate-300
                dark:hover:text-blue-400
              "
            >
              About
            </a>

          </div>


          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            {/* =================================================
                LOGGED IN → AVATAR
            ================================================= */}

            {user ? (

              <div className="relative">

                {/* Avatar */}

                <button
                  type="button"
                  onClick={handleAvatarClick}
                  title={
                    user.name ||
                    user.full_name ||
                    user.username ||
                    user.email ||
                    "Profile"
                  }
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-blue-600
                    to-cyan-400
                    text-base
                    font-bold
                    text-white
                    shadow-md
                    transition-all
                    duration-200
                    hover:scale-105
                    hover:shadow-lg
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    focus:ring-offset-2

                    dark:focus:ring-offset-[#171717]
                  "
                >
                  {getInitial()}
                </button>


                {/* =================================================
                    PROFILE DROPDOWN
                ================================================= */}

                {profileOpen && (

                  <div
                    className="
                      absolute
                      right-0
                      top-14
                      z-[100]
                      w-64
                      overflow-hidden
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      p-2
                      shadow-2xl
                      animate-in
                      fade-in
                      slide-in-from-top-2
                      duration-200

                      dark:border-slate-700
                      dark:bg-[#242424]
                    "
                  >

                    {/* USER INFO */}

                    <div
                      className="
                        border-b
                        border-slate-100
                        px-3
                        py-3

                        dark:border-slate-700
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >

                        {/* Small Avatar */}

                        <div
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-gradient-to-br
                            from-blue-600
                            to-cyan-400
                            text-sm
                            font-bold
                            text-white
                          "
                        >
                          {getInitial()}
                        </div>


                        {/* Name + Email */}

                        <div className="min-w-0">

                          <p
                            className="
                              truncate
                              text-sm
                              font-semibold
                              text-slate-900

                              dark:text-white
                            "
                          >
                            {user.name ||
                              user.full_name ||
                              user.username ||
                              "User"}
                          </p>

                          <p
                            className="
                              mt-1
                              truncate
                              text-xs
                              text-slate-500

                              dark:text-slate-400
                            "
                          >
                            {user.email || ""}
                          </p>

                        </div>

                      </div>

                    </div>


                    {/* LOGOUT BUTTON */}

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="
                        mt-1
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-3
                        text-sm
                        font-medium
                        text-red-600
                        transition-colors
                        duration-200
                        hover:bg-red-50

                        dark:text-red-400
                        dark:hover:bg-red-500/10
                      "
                    >

                      <LogOut size={18} />

                      <span>
                        Logout
                      </span>

                    </button>

                  </div>

                )}

              </div>

            ) : (

              /* =================================================
                  NOT LOGGED IN → LOGIN BUTTON
              ================================================= */

              <Link
                to="/SignIn"
                className="
                  hidden
                  sm:block
                "
              >

                <button
                  type="button"
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    bg-black
                    px-5
                    py-3
                    text-sm
                    font-medium
                    text-white
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:bg-blue-600

                    dark:bg-white
                    dark:text-black
                    dark:hover:bg-blue-500
                    dark:hover:text-white
                  "
                >

                  Log-in / SignUp

                  <ArrowRight size={18} />

                </button>

              </Link>

            )}


            {/* =================================================
                MOBILE HAMBURGER
            ================================================= */}

            <button
              type="button"
              onClick={() => {
                setMenuOpen((prev) => !prev);
                setProfileOpen(false);
              }}
              className="
                rounded-xl
                p-2
                text-slate-700
                transition
                hover:bg-slate-100

                dark:text-slate-200
                dark:hover:bg-slate-800

                md:hidden
              "
            >

              {menuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}

            </button>

          </div>

        </nav>


        {/* =================================================
            MOBILE MENU
        ================================================= */}

        {menuOpen && (

          <div
            className="
              border-t
              border-slate-200
              py-5

              dark:border-slate-800

              md:hidden
            "
          >

            <div
              className="
                flex
                flex-col
                gap-1
              "
            >

              {/* Features */}

              <a
                href="#features"
                onClick={closeMobileMenu}
                className="
                  rounded-xl
                  px-4
                  py-3
                  text-slate-700
                  transition
                  hover:bg-slate-100

                  dark:text-slate-300
                  dark:hover:bg-slate-800
                "
              >
                Features
              </a>


              {/* Docs */}

              <a
                href="#workflow"
                onClick={closeMobileMenu}
                className="
                  rounded-xl
                  px-4
                  py-3
                  text-slate-700
                  transition
                  hover:bg-slate-100

                  dark:text-slate-300
                  dark:hover:bg-slate-800
                "
              >
                Docs
              </a>


              {/* Contact */}

              <a
                href="#contact"
                onClick={closeMobileMenu}
                className="
                  rounded-xl
                  px-4
                  py-3
                  text-slate-700
                  transition
                  hover:bg-slate-100

                  dark:text-slate-300
                  dark:hover:bg-slate-800
                "
              >
                Contact
              </a>


              {/* About */}

              <a
                href="#about"
                onClick={closeMobileMenu}
                className="
                  rounded-xl
                  px-4
                  py-3
                  text-slate-700
                  transition
                  hover:bg-slate-100

                  dark:text-slate-300
                  dark:hover:bg-slate-800
                "
              >
                About
              </a>


              {/* =================================================
                  MOBILE LOGIN
              ================================================= */}

              {!user && (

                <Link
                  to="/SignIn"
                  onClick={closeMobileMenu}
                  className="
                    mt-3
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-black
                    px-4
                    py-3
                    font-semibold
                    text-white

                    dark:bg-white
                    dark:text-black
                  "
                >

                  Log-in / SignUp

                  <ArrowRight size={18} />

                </Link>

              )}


              {/* =================================================
                  MOBILE LOGOUT
              ================================================= */}

              {user && (

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    mt-3
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-red-50
                    px-4
                    py-3
                    font-semibold
                    text-red-600

                    dark:bg-red-500/10
                    dark:text-red-400
                  "
                >

                  <LogOut size={18} />

                  Logout

                </button>

              )}

            </div>

          </div>

        )}

      </div>

    </header>
  );
};

export default Navbar;