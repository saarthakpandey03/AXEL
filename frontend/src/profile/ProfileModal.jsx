import { useState } from "react";

import {
    X,
    User,
    Settings,
    CircleHelp,
} from "lucide-react";

import AgentSection from "./AgentSection";
import BillingSection from "./BillingSection";
import LogoutButton from "./LogoutButton";
import MenuItem from "./MenuItem";
import SettingsPanel from "./SettingsPanel";
import PlanModal from "./PlanModal";
import Profile from "./Profile";
import Help from "./Help";

const ProfileModal = ({ onClose, onLogout }) => {

    const [activeView, setActiveView] = useState("profile");
    const [showPlans, setShowPlans] = useState(false);

    return (
        <>
            {/* ================= MAIN PROFILE MODAL ================= */}

            <div
                className="
                    fixed inset-0 z-[9999]
                    flex items-center justify-center
                    bg-black/40 p-4
                    backdrop-blur-sm
                    dark:bg-black/70
                "
                onClick={onClose}
            >

                <div
                    className="
                        relative flex
                        max-h-[calc(100dvh-32px)]
                        w-full max-w-md
                        flex-col
                        overflow-hidden
                        rounded-3xl
                        border
                        border-slate-200
                        bg-white
                        text-slate-900
                        shadow-[0_30px_100px_rgba(0,0,0,0.18)]
                        dark:border-slate-700
                        dark:bg-[#202020]
                        dark:text-white
                    "
                    onClick={(e) => e.stopPropagation()}
                >

                    {/* ================= PROFILE DETAILS ================= */}

                    {activeView === "profileDetails" && (
                        <Profile
                            onBack={() =>
                                setActiveView("profile")
                            }
                        />
                    )}


                    {/* ================= SETTINGS ================= */}

                    {activeView === "settings" && (
                        <SettingsPanel
                            onBack={() =>
                                setActiveView("profile")
                            }
                        />
                    )}


                    {/* ================= HELP ================= */}

                    {activeView === "help" && (
                        <Help
                            onBack={() =>
                                setActiveView("profile")
                            }
                        />
                    )}


                    {/* ================= MAIN MENU ================= */}

                    {activeView === "profile" && (
                        <>

                            {/* Header */}

                            <div
                                className="
                                    flex shrink-0
                                    items-center justify-between
                                    border-b
                                    border-slate-200
                                    bg-white
                                    px-5 py-4
                                    dark:border-slate-700
                                    dark:bg-[#202020]
                                "
                            >

                                <AgentSection />

                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="
                                        rounded-xl p-2
                                        text-slate-500
                                        hover:bg-slate-100
                                        hover:text-slate-900
                                        dark:text-slate-400
                                        dark:hover:bg-[#303030]
                                        dark:hover:text-white
                                    "
                                >
                                    <X size={20} />
                                </button>

                            </div>


                            {/* Content */}

                            <div
                                className="
                                    min-h-0 flex-1
                                    overflow-y-auto
                                    bg-white p-3
                                    dark:bg-[#202020]
                                "
                            >

                                {/* Billing */}

                                <BillingSection
                                    onUpgrade={() =>
                                        setShowPlans(true)
                                    }
                                />


                                {/* Profile */}

                                <MenuItem
                                    icon={User}
                                    title="Profile"
                                    description="Manage your profile"
                                    onClick={() =>
                                        setActiveView("profileDetails")
                                    }
                                />


                                {/* Settings */}

                                <MenuItem
                                    icon={Settings}
                                    title="Settings"
                                    description="Customize your workspace"
                                    onClick={() =>
                                        setActiveView("settings")
                                    }
                                />


                                {/* Help */}

                                <MenuItem
                                    icon={CircleHelp}
                                    title="Help"
                                    description="Get help with AXEL"
                                    onClick={() =>
                                        setActiveView("help")
                                    }
                                />


                                {/* Divider */}

                                <div
                                    className="
                                        my-2
                                        border-t
                                        border-slate-200
                                        dark:border-slate-700
                                    "
                                />


                                {/* Logout */}

                                <LogoutButton
                                    onLogout={onLogout}
                                />

                            </div>

                        </>
                    )}

                </div>

            </div>


            {/* ================= PLAN MODAL ================= */}

            {showPlans && (
                <PlanModal
                    onClose={() =>
                        setShowPlans(false)
                    }
                />
            )}

        </>
    );
};

export default ProfileModal;