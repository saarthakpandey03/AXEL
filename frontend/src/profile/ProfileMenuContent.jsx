import {
    User,
    Crown,
    Settings,
    Bell,
    Palette,
    Keyboard,
    CircleHelp,
} from "lucide-react";

import MenuItem from "./MenuItem";
import LogoutButton from "./LogoutButton";


const ProfileMenuContent = ({
    collapsed = false,
    onOpen,
    onOpenSection,
    insideModal = false,
}) => {

    // =====================================================
    // USER DATA
    // =====================================================

    const getUser = () => {
        try {
            const saved =
                localStorage.getItem("user");

            return saved
                ? JSON.parse(saved)
                : {};
        } catch {
            return {};
        }
    };

    const user = getUser();

    const userName =
        localStorage.getItem(
            "axel_user_name"
        ) ||
        user?.name ||
        user?.username;

    const currentPlan =
        localStorage.getItem(
            "axel_plan"
        ) || "Free";


    const avatarLetter =
        userName
            ?.trim()
            ?.charAt(0)
            ?.toUpperCase() || "S";


    // =====================================================
    // SIDEBAR PROFILE TRIGGER
    // =====================================================

    if (!insideModal) {

        return (
            <div
                className="
                    border-t
                    border-slate-200
                    p-4
                    dark:border-slate-800
                "
            >

                <button
                    type="button"
                    onClick={onOpen}
                    className={`
                        flex
                        w-full
                        items-center
                        rounded-xl
                        bg-slate-100
                        p-3
                        transition
                        hover:bg-slate-200
                        dark:bg-slate-900
                        dark:hover:bg-slate-800
                        ${
                            collapsed
                                ? "justify-center"
                                : "justify-between"
                        }
                    `}
                >

                    <div className="flex items-center gap-3">

                        {/* AVATAR */}

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
                                from-blue-500
                                to-cyan-400
                                font-bold
                                text-white
                            "
                        >
                            {avatarLetter}
                        </div>


                        {/* USER INFO */}

                        {!collapsed && (
                            <div className="min-w-0 text-left">

                                <p
                                    className="
                                        truncate
                                        text-sm
                                        font-semibold
                                        text-slate-900
                                        dark:text-white
                                    "
                                >
                                    {userName}
                                </p>

                                <p
                                    className="
                                        truncate
                                        text-xs
                                        text-slate-500
                                        dark:text-slate-400
                                    "
                                >
                                    {currentPlan} Plan
                                </p>

                            </div>
                        )}

                    </div>

                </button>

            </div>
        );
    }


    // =====================================================
    // MODAL MENU
    // =====================================================

    return (
        <>

            {/* =================================================
                ACCOUNT
            ================================================= */}

            <div className="p-3 sm:p-4">

                <p
                    className="
                        px-3
                        pb-2
                        pt-1
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-widest
                        text-slate-500
                    "
                >
                    Account
                </p>


                <MenuItem
                    icon={User}
                    title="Profile"
                    subtitle="Personal information"
                    onClick={() =>
                        onOpenSection(
                            "profile"
                        )
                    }
                />


                <MenuItem
                    icon={Crown}
                    iconClass="text-yellow-400"
                    title="Plan & Billing"
                    subtitle="Upgrade your workspace"
                    badge="UPGRADE"
                    onClick={() =>
                        onOpenSection(
                            "plan"
                        )
                    }
                />

            </div>


            {/* =================================================
                PREFERENCES
            ================================================= */}

            <div
                className="
                    border-t
                    border-slate-200
                    p-3
                    dark:border-slate-800
                    sm:p-4
                "
            >

                <p
                    className="
                        px-3
                        pb-2
                        pt-1
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-widest
                        text-slate-500
                    "
                >
                    Preferences
                </p>


                <MenuItem
                    icon={Settings}
                    title="Settings"
                    subtitle="Workspace preferences"
                    onClick={() =>
                        onOpenSection(
                            "settings"
                        )
                    }
                />


                <MenuItem
                    icon={Bell}
                    title="Notifications"
                    subtitle="Manage notifications"
                    onClick={() =>
                        onOpenSection(
                            "notifications"
                        )
                    }
                />

            </div>


            {/* =================================================
                CUSTOMIZATION
            ================================================= */}

            <div
                className="
                    border-t
                    border-slate-200
                    p-3
                    dark:border-slate-800
                    sm:p-4
                "
            >

                <p
                    className="
                        px-3
                        pb-2
                        pt-1
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-widest
                        text-slate-500
                    "
                >
                    Customization
                </p>


                <MenuItem
                    icon={Palette}
                    title="Personalization"
                    subtitle="Customize AXEL"
                    onClick={() =>
                        onOpenSection(
                            "personalization"
                        )
                    }
                />


                <MenuItem
                    icon={Keyboard}
                    title="Keyboard Shortcuts"
                    subtitle="Work faster with shortcuts"
                    onClick={() =>
                        onOpenSection(
                            "keyboard"
                        )
                    }
                />

            </div>


            {/* =================================================
                SUPPORT
            ================================================= */}

            <div
                className="
                    border-t
                    border-slate-200
                    p-3
                    dark:border-slate-800
                    sm:p-4
                "
            >

                <p
                    className="
                        px-3
                        pb-2
                        pt-1
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-widest
                        text-slate-500
                    "
                >
                    Support
                </p>


                <MenuItem
                    icon={CircleHelp}
                    title="Help & Support"
                    subtitle="Get help with AXEL"
                    onClick={() =>
                        onOpenSection(
                            "help"
                        )
                    }
                />

            </div>


            {/* =================================================
                LOGOUT
            ================================================= */}

            <LogoutButton />

        </>
    );
};

export default ProfileMenuContent;