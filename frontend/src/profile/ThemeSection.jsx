import { useEffect, useState } from "react";
import {
    Moon,
    Sun,
    Monitor,
} from "lucide-react";

const ThemeSection = () => {

    const [darkMode, setDarkMode] =
        useState(
            () =>
                localStorage.getItem(
                    "axel_theme"
                ) !== "light"
        );


    // =====================================================
    // APPLY THEME
    // =====================================================

    const applyTheme = (isDark) => {
        document.documentElement.classList.toggle(
            "dark",
            isDark
        );

        document.documentElement.classList.toggle(
            "light",
            !isDark
        );

        document.documentElement.style.colorScheme =
            isDark ? "dark" : "light";
    };

    // =====================================================
    // INITIAL THEME
    // =====================================================

    useEffect(() => {

        const savedTheme =
            localStorage.getItem(
                "axel_theme"
            ) || "dark";

        const isDark =
            savedTheme === "dark";

        setDarkMode(isDark);

        applyTheme(isDark);

    }, []);


    // =====================================================
    // CHANGE THEME
    // =====================================================

    const handleThemeChange = () => {

        const nextDarkMode =
            !darkMode;

        const nextTheme =
            nextDarkMode
                ? "dark"
                : "light";

        setDarkMode(
            nextDarkMode
        );

        localStorage.setItem(
            "axel_theme",
            nextTheme
        );

        applyTheme(
            nextDarkMode
        );
    };


    return (
        <div className="space-y-3 p-5 sm:p-6">

            {/* =================================================
                THEME
            ================================================= */}

            <div
                className="
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    p-4
                    dark:border-slate-800
                    dark:bg-slate-900/40
                "
            >

                <div className="flex items-center gap-3">

                    <div
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            bg-slate-100
                            dark:bg-slate-800
                        "
                    >
                        {darkMode ? (
                            <Moon
                                size={18}
                                className="text-blue-400"
                            />
                        ) : (
                            <Sun
                                size={18}
                                className="text-yellow-500"
                            />
                        )}
                    </div>


                    <div>

                        <p
                            className="
                                text-sm
                                font-medium
                                text-slate-900
                                dark:text-white
                            "
                        >
                            Theme
                        </p>

                        <p className="text-xs text-slate-500">
                            {darkMode
                                ? "Dark mode"
                                : "Light mode"}
                        </p>

                    </div>

                </div>


                {/* TOGGLE */}

                <button
                    type="button"
                    onClick={
                        handleThemeChange
                    }
                    className={`
                        relative
                        h-8
                        w-14
                        rounded-full
                        p-1
                        transition-colors
                        ${
                            darkMode
                                ? "bg-blue-600"
                                : "bg-slate-300"
                        }
                    `}
                >

                    <span
                        className={`
                            flex
                            h-6
                            w-6
                            items-center
                            justify-center
                            rounded-full
                            bg-white
                            shadow
                            transition-transform
                            ${
                                darkMode
                                    ? "translate-x-6"
                                    : "translate-x-0"
                            }
                        `}
                    >
                        {darkMode ? (
                            <Moon
                                size={13}
                                className="text-blue-600"
                            />
                        ) : (
                            <Sun
                                size={13}
                                className="text-yellow-500"
                            />
                        )}
                    </span>

                </button>

            </div>


            {/* =================================================
                INTERFACE
            ================================================= */}

            <div
                className="
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    p-4
                    dark:border-slate-800
                    dark:bg-slate-900/40
                "
            >

                <div
                    className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        bg-slate-100
                        dark:bg-slate-800
                    "
                >
                    <Monitor
                        size={18}
                        className="text-slate-400"
                    />
                </div>


                <div>

                    <p
                        className="
                            text-sm
                            font-medium
                            text-slate-900
                            dark:text-white
                        "
                    >
                        Interface
                    </p>

                    <p className="text-xs text-slate-500">
                        Customize workspace layout
                    </p>

                </div>

            </div>

        </div>
    );
};

export default ThemeSection;