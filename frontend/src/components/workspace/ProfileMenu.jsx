import { useState } from "react";
import {
    User,
    Crown,
    Settings,
    CircleHelp,
    LogOut,
    ChevronUp,
    Sun,
    Moon,
    ChevronRight,
    ArrowLeft,
} from "lucide-react";

const ProfileMenu = ({
    collapsed,
    onLogout,
}) => {

    const [open, setOpen] = useState(false);
    const [activePanel, setActivePanel] = useState(null);

    const [theme, setTheme] = useState(
        () => localStorage.getItem("axel_theme") || "dark"
    );


    // =========================
    // Theme
    // =========================

    const handleTheme = (newTheme) => {

        setTheme(newTheme);

        localStorage.setItem(
            "axel_theme",
            newTheme
        );

        document.documentElement.classList.toggle(
            "light",
            newTheme === "light"
        );
    };


    // =========================
    // Logout
    // =========================

    const handleLogout = () => {

        // Clear AXEL local session
        localStorage.removeItem("session_id");
        localStorage.removeItem("axel_messages");

        // Keep recent chats if you want them after login.
        // Remove this line if you want them preserved.
        localStorage.removeItem("axel_recent_chats");

        setOpen(false);

        if (onLogout) {
            onLogout();
        } else {
            window.location.href = "/signin";
        }
    };


    // =========================
    // Panel
    // =========================

    if (activePanel && !collapsed) {

        return (

            <div className="border-t border-slate-800 p-4">

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">

                    <button
                        type="button"
                        onClick={() =>
                            setActivePanel(null)
                        }
                        className="mb-5 flex items-center gap-2 text-sm text-slate-400 hover:text-white"
                    >
                        <ArrowLeft size={16} />
                        Back
                    </button>


                    {/* PROFILE */}

                    {activePanel === "profile" && (

                        <div>

                            <h2 className="mb-4 text-lg font-semibold text-white">
                                Profile
                            </h2>

                            <div className="mb-4 flex items-center gap-3">

                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                                    S
                                </div>

                                <div>

                                    <p className="font-semibold text-white">
                                        Saarthak
                                    </p>

                                    <p className="text-xs text-slate-400">
                                        Free Plan
                                    </p>

                                </div>

                            </div>

                            <div className="rounded-xl bg-slate-800 p-3">

                                <p className="text-xs text-slate-400">
                                    Account
                                </p>

                                <p className="mt-1 text-sm text-white">
                                    AXEL Workspace
                                </p>

                            </div>

                        </div>

                    )}


                    {/* PLAN */}

                    {activePanel === "plan" && (

                        <div>

                            <h2 className="mb-4 text-lg font-semibold text-white">
                                Your Plan
                            </h2>

                            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4">

                                <div className="mb-3 flex items-center gap-3">

                                    <Crown
                                        size={22}
                                        className="text-yellow-400"
                                    />

                                    <div>

                                        <p className="font-semibold text-white">
                                            Free Plan
                                        </p>

                                        <p className="text-xs text-slate-400">
                                            Current plan
                                        </p>

                                    </div>

                                </div>

                                <button
                                    type="button"
                                    className="mt-3 w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                                >
                                    Upgrade Plan
                                </button>

                            </div>

                        </div>

                    )}


                    {/* SETTINGS */}

                    {activePanel === "settings" && (

                        <div>

                            <h2 className="mb-4 text-lg font-semibold text-white">
                                Settings
                            </h2>


                            <div className="rounded-xl bg-slate-800 p-3">

                                <div className="mb-3">

                                    <p className="text-sm font-medium text-white">
                                        Appearance
                                    </p>

                                    <p className="text-xs text-slate-400">
                                        Choose how AXEL looks
                                    </p>

                                </div>


                                <div className="grid grid-cols-2 gap-2">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleTheme("dark")
                                        }
                                        className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm transition ${
                                            theme === "dark"
                                                ? "bg-blue-600 text-white"
                                                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                                        }`}
                                    >
                                        <Moon size={16} />
                                        Dark
                                    </button>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleTheme("light")
                                        }
                                        className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm transition ${
                                            theme === "light"
                                                ? "bg-blue-600 text-white"
                                                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                                        }`}
                                    >
                                        <Sun size={16} />
                                        Light
                                    </button>

                                </div>

                            </div>

                        </div>

                    )}


                    {/* HELP */}

                    {activePanel === "help" && (

                        <div>

                            <h2 className="mb-4 text-lg font-semibold text-white">
                                Help
                            </h2>

                            <div className="space-y-2">

                                <button
                                    type="button"
                                    className="w-full rounded-xl bg-slate-800 px-3 py-3 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white"
                                >
                                    How to use AXEL
                                </button>

                                <button
                                    type="button"
                                    className="w-full rounded-xl bg-slate-800 px-3 py-3 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white"
                                >
                                    Supported files
                                </button>

                                <button
                                    type="button"
                                    className="w-full rounded-xl bg-slate-800 px-3 py-3 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white"
                                >
                                    Contact Support
                                </button>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        );
    }


    return (

        <div className="border-t border-slate-800 p-4">

            {open && !collapsed && (

                <div className="mb-3 rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-xl">


                    {/* PROFILE */}

                    <button
                        type="button"
                        onClick={() =>
                            setActivePanel("profile")
                        }
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                        <User size={18} />
                        Profile
                        <ChevronRight
                            size={16}
                            className="ml-auto"
                        />
                    </button>


                    {/* PLAN */}

                    <button
                        type="button"
                        onClick={() =>
                            setActivePanel("plan")
                        }
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                        <Crown size={18} />
                        Plan
                        <ChevronRight
                            size={16}
                            className="ml-auto"
                        />
                    </button>


                    {/* SETTINGS */}

                    <button
                        type="button"
                        onClick={() =>
                            setActivePanel("settings")
                        }
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                        <Settings size={18} />
                        Settings
                        <ChevronRight
                            size={16}
                            className="ml-auto"
                        />
                    </button>


                    {/* HELP */}

                    <button
                        type="button"
                        onClick={() =>
                            setActivePanel("help")
                        }
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                        <CircleHelp size={18} />
                        Help
                        <ChevronRight
                            size={16}
                            className="ml-auto"
                        />
                    </button>


                    <div className="my-2 border-t border-slate-800" />


                    {/* LOGOUT */}

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-red-400 hover:bg-red-500/10"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>

                </div>

            )}


            {/* USER BUTTON */}

            <button
                type="button"
                onClick={() =>
                    setOpen((prev) => !prev)
                }
                className={`flex w-full rounded-xl bg-slate-900 transition hover:bg-slate-800 ${
                    collapsed
                        ? "justify-center p-3"
                        : "items-center justify-between p-3"
                }`}
            >

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                        S
                    </div>


                    {!collapsed && (

                        <div className="text-left">

                            <p className="text-sm font-semibold text-white">
                                Saarthak
                            </p>

                            <p className="text-xs text-slate-400">
                                Free Plan
                            </p>

                        </div>

                    )}

                </div>


                {!collapsed && (

                    <ChevronUp
                        size={18}
                        className={`transition-transform ${
                            open
                                ? "rotate-180"
                                : ""
                        }`}
                    />

                )}

            </button>

        </div>
    );
};

export default ProfileMenu;