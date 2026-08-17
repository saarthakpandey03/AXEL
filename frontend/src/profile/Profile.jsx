import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Pencil,
  Check,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = ({onBack}) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedUser =
      localStorage.getItem("user") ||
      localStorage.getItem("current_user");

    if (!savedUser) return;

    try {
      const parsedUser = JSON.parse(savedUser);

      setUser(parsedUser);

      setName(
        parsedUser.name ||
          parsedUser.full_name ||
          parsedUser.username ||
          ""
      );
    } catch (error) {
      console.error("Failed to load user:", error);
    }
  }, []);

  const getInitial = () => {
    const value =
      name ||
      user?.name ||
      user?.full_name ||
      user?.username ||
      user?.email ||
      "U";

    return value.trim().charAt(0).toUpperCase();
  };

  const handleSave = () => {
    if (!name.trim() || !user) return;

    const updatedUser = {
      ...user,
      name: name.trim(),
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    localStorage.setItem(
      "current_user",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
    setName(updatedUser.name);
    setEditing(false);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const handleCancel = () => {
    setName(
      user?.name ||
        user?.full_name ||
        user?.username ||
        ""
    );

    setEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("current_user");
    localStorage.removeItem("session_id");

    setUser(null);

    navigate("/");
  };

  return (
    <div
      className="
        min-h-screen
        bg-[#f7f8fa]
        px-5
        py-8
        text-slate-900
        transition-colors
        duration-300

        dark:bg-[#171717]
        dark:text-white

        sm:px-8
        lg:px-12
      "
    >
      <div className="mx-auto max-w-3xl">

        {/* Back */}

        <button
          type="button"
          onClick={onBack}
          className="
            mb-8
            flex
            items-center
            gap-2
            rounded-xl
            px-3
            py-2
            text-sm
            text-slate-600
            transition
            hover:bg-slate-200

            dark:text-slate-300
            dark:hover:bg-[#2a2a2a]
          "
        >
          <ArrowLeft size={18} />
          Back to Workspace
        </button>


        {/* Header */}

        <div className="mb-8">

          <h1
            className="
              text-3xl
              font-black
              text-slate-900

              dark:text-white

              sm:text-4xl
            "
          >
            Profile
          </h1>

          <p
            className="
              mt-2
              text-slate-500

              dark:text-slate-400
            "
          >
            Manage your AXEL account information.
          </p>

        </div>


        {/* Profile Card */}

        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-sm

            dark:border-slate-800
            dark:bg-[#202020]
          "
        >

          {/* Profile Header */}

          <div
            className="
              flex
              flex-col
              items-center
              gap-5
              border-b
              border-slate-200
              p-8

              dark:border-slate-800

              sm:flex-row
            "
          >

            <div
              className="
                flex
                h-24
                w-24
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-blue-600
                to-cyan-400
                text-3xl
                font-bold
                text-white
                shadow-lg
              "
            >
              {getInitial()}
            </div>

            <div className="text-center sm:text-left">

              <h2
                className="
                  text-xl
                  font-bold
                  text-slate-900

                  dark:text-white
                "
              >
                {name || "User"}
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500

                  dark:text-slate-400
                "
              >
                AXEL AI Workspace
              </p>

            </div>

          </div>


          {/* Form */}

          <div className="p-6 sm:p-8">

            {/* Name */}

            <div className="mb-6">

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-slate-700

                  dark:text-slate-300
                "
              >
                Full Name
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="text"
                  value={name}
                  disabled={!editing}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className={`
                    w-full
                    rounded-xl
                    border
                    py-3
                    pl-11
                    pr-4
                    text-slate-900
                    outline-none
                    transition

                    dark:text-white

                    ${
                      editing
                        ? `
                          border-blue-400
                          bg-white
                          focus:ring-2
                          focus:ring-blue-500/20

                          dark:border-blue-500
                          dark:bg-[#292929]
                        `
                        : `
                          border-slate-200
                          bg-slate-50

                          dark:border-slate-700
                          dark:bg-[#292929]
                        `
                    }
                  `}
                />

              </div>

            </div>


            {/* Email */}

            <div className="mb-8">

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-slate-700

                  dark:text-slate-300
                "
              >
                Email
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    py-3
                    pl-11
                    pr-4
                    text-slate-500
                    outline-none

                    dark:border-slate-700
                    dark:bg-[#292929]
                    dark:text-slate-400
                  "
                />

              </div>

            </div>


            {/* Buttons */}

            <div className="flex flex-wrap gap-3">

              {!editing ? (

                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-blue-700
                  "
                >
                  <Pencil size={17} />
                  Edit Name
                </button>

              ) : (

                <>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-blue-600
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      transition
                      hover:bg-blue-700
                    "
                  >
                    <Check size={17} />
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="
                      rounded-xl
                      border
                      border-slate-300
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      text-slate-700
                      transition
                      hover:bg-slate-100

                      dark:border-slate-700
                      dark:text-slate-300
                      dark:hover:bg-[#2a2a2a]
                    "
                  >
                    Cancel
                  </button>
                </>

              )}

            </div>


            {/* Success */}

            {saved && (
              <p
                className="
                  mt-4
                  text-sm
                  font-medium
                  text-green-600

                  dark:text-green-400
                "
              >
                ✓ Profile updated successfully
              </p>
            )}

          </div>


          {/* Logout */}

          <div
            className="
              border-t
              border-slate-200
              p-6

              dark:border-slate-800
            "
          >

            <button
              type="button"
              onClick={handleLogout}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                px-4
                py-3
                text-sm
                font-semibold
                text-red-600
                transition
                hover:bg-red-50

                dark:text-red-400
                dark:hover:bg-red-500/10
              "
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;