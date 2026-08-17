import {
    ArrowLeft,
    Monitor,
    Moon,
    Sun,
} from "lucide-react";

import SettingRow from "./SettingRow";

import { useSettings } from "../context/SettingsContext";


const Toggle = ({ enabled, onChange }) => {

    return (
        <button
            onClick={() => onChange(!enabled)}
            className={`
                relative h-6 w-11
                shrink-0 rounded-full
                transition
                ${enabled
                    ? "bg-blue-600"
                    : "bg-slate-300 dark:bg-slate-700"
                }
            `}
        >

            <span
                className={`
                    absolute top-1
                    h-4 w-4 rounded-full
                    bg-white shadow
                    transition
                    ${enabled
                        ? "left-6"
                        : "left-1"
                    }
                `}
            />

        </button>
    );
};


const SettingsPanel = ({ onBack }) => {

    const {
        theme,
        setTheme,

        enterToSend,
        setEnterToSend,

        typingAnimation,
        setTypingAnimation,

        autoScroll,
        setAutoScroll,

        desktopNotifications,
        setDesktopNotifications,

        sound,
        setSound,

        saveHistory,
        setSaveHistory,

        requestNotifications,
        clearHistory,
    } = useSettings();




    const handleDesktopNotifications = async () => {

        if (!desktopNotifications) {

            const granted =
                await requestNotifications();

            if (!granted) {
                return;
            }
        }

        setDesktopNotifications(
            !desktopNotifications
        );
    };


    const handleClearHistory = () => {

        const confirmed =
            window.confirm(
                "Clear all saved conversations?"
            );

        if (!confirmed) return;

        clearHistory();

        window.location.reload();
    };


    return (

<div className="flex min-h-0 flex-1 flex-col  bg-white dark:bg-black dark:border-slate-700">
            {/* Header */}

            <div className="
                flex shrink-0 items-center gap-3
                border-b border-slate-200
                px-5 py-4

                dark:border-slate-700
            ">

                <button
                    onClick={onBack}
                    className="
                        rounded-xl p-2
                        text-slate-600
                       
                        hover:bg-slate-100
                        dark:text-slate-300
                        dark:hover:bg-[#303030]
                    "
                >
                    <ArrowLeft size={20} />
                </button>

                <div>

                    <h2 className="font-semibold text-slate-900 dark:text-white">
                        Settings
                    </h2>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Customize your AXEL workspace
                    </p>

                </div>

            </div>


            {/* Content */}

            <div className="
                min-h-0 flex-1
                overflow-y-auto
                p-3 sm:p-5
            ">

                {/* ================= THEME ================= */}

                <section>

                    <h3 className="
                        mb-2 px-2
                        text-xs font-semibold
                        uppercase tracking-wider
                        text-slate-500
                        dark:text-slate-400
                    ">
                        Theme
                    </h3>


                    <div className="
                        grid grid-cols-3 gap-2
                        rounded-2xl
                        bg-slate-100 p-2
                        dark:bg-slate-800
                    ">

                        <button
                            onClick={() => setTheme("light")}
                            className={`
                                flex flex-col
                                items-center gap-2
                                rounded-xl p-3
                                transition
                                ${
                                    theme === "light"
                                        ? "bg-white text-blue-600 shadow dark:bg-slate-700"
                                        : "text-slate-500 hover:bg-white/60 dark:text-slate-400 dark:hover:bg-slate-700/50"
                                }
                            `}
                        >
                            <Sun size={19} />
                            <span className="text-xs font-medium">
                                Light
                            </span>
                        </button>


                        <button
                            onClick={() => setTheme("dark")}
                            className={`
                                flex flex-col
                                items-center gap-2
                                rounded-xl p-3
                                transition
                                ${
                                    theme === "dark"
                                        ? "bg-white text-blue-600 shadow dark:bg-slate-700"
                                        : "text-slate-500 hover:bg-white/60 dark:text-slate-400 dark:hover:bg-slate-700/50"
                                }
                            `}
                        >
                            <Moon size={19} />
                            <span className="text-xs font-medium">
                                Dark
                            </span>
                        </button>


                        <button
                            onClick={() => setTheme("system")}
                            className={`
                                flex flex-col
                                items-center gap-2
                                rounded-xl p-3
                                transition
                                ${
                                    theme === "system"
                                        ? "bg-white text-blue-600 shadow dark:bg-slate-700"
                                        : "text-slate-500 hover:bg-white/60 dark:text-slate-400 dark:hover:bg-slate-700/50"
                                }
                            `}
                        >
                            <Monitor size={19} />
                            <span className="text-xs font-medium">
                                System
                            </span>
                        </button>

                    </div>

                </section>


                {/* ================= CHAT ================= */}

                <section className="mt-6">

                    <h3 className="
                        mb-2 px-2
                        text-xs font-semibold
                        uppercase tracking-wider
                        text-slate-500
                        dark:text-slate-400
                    ">
                        Chat
                    </h3>


                    <SettingRow
                        title="Enter to send"
                        description="Press Enter to send messages"
                    >
                        <Toggle
                            enabled={enterToSend}
                            onChange={setEnterToSend}
                        />
                    </SettingRow>


                    <SettingRow
                        title="Typing animation"
                        description="Show AXEL thinking animation"
                    >
                        <Toggle
                            enabled={typingAnimation}
                            onChange={setTypingAnimation}
                        />
                    </SettingRow>


                    <SettingRow
                        title="Auto scroll"
                        description="Automatically scroll to new messages"
                    >
                        <Toggle
                            enabled={autoScroll}
                            onChange={setAutoScroll}
                        />
                    </SettingRow>

                </section>


                {/* ================= NOTIFICATIONS ================= */}

                <section className="mt-6">

                    <h3 className="
                        mb-2 px-2
                        text-xs font-semibold
                        uppercase tracking-wider
                        text-slate-500
                        dark:text-slate-400
                    ">
                        Notifications
                    </h3>


                    <SettingRow
                        title="Desktop notifications"
                        description="Notify when AXEL finishes a response"
                    >
                        <Toggle
                            enabled={desktopNotifications}
                            onChange={handleDesktopNotifications}
                        />
                    </SettingRow>


                    <SettingRow
                        title="Notification sound"
                        description="Play a sound when AXEL responds"
                    >
                        <Toggle
                            enabled={sound}
                            onChange={setSound}
                        />
                    </SettingRow>

                </section>


                {/* ================= PRIVACY ================= */}

                <section className="mt-6">

                    <h3 className="
                        mb-2 px-2
                        text-xs font-semibold
                        uppercase tracking-wider
                        text-slate-500
                        dark:text-slate-400
                    ">
                        Privacy & Data
                    </h3>


                    <SettingRow
                        title="Save chat history"
                        description="Keep conversations after refresh"
                    >
                        <Toggle
                            enabled={saveHistory}
                            onChange={setSaveHistory}
                        />
                    </SettingRow>


                    <button
                        onClick={handleClearHistory}
                        className="
                            mt-2 flex w-full
                            items-center justify-between
                            rounded-2xl px-4 py-4
                            text-left
                            transition
                            hover:bg-red-500/10
                        "
                    >

                        <div>

                            <p className="font-medium text-red-500">
                                Clear conversations
                            </p>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Delete locally saved chat history
                            </p>

                        </div>

                    </button>

                </section>

            </div>

        </div>
    );
};

export default SettingsPanel;