import { useState } from "react";
import { ChevronUp } from "lucide-react";

import ProfileModal from "../../profile/ProfileModal";

const ProfileMenu = ({
    collapsed,
    onLogout,
}) => {

    const [open, setOpen] = useState(false);

    return (
        <>
            {/* ================= PROFILE BUTTON ================= */}

            <div
                className="
                    border-t
                    border-slate-200
                    p-4
                    dark:border-slate-800
                "
            >

                <button
                    onClick={() => setOpen(true)}
                    className={`
                        flex
                        w-full
                        items-center
                        rounded-xl
                        transition-colors
                        duration-200

                        bg-slate-100
                        text-slate-900
                        hover:bg-slate-200

                        dark:bg-slate-900
                        dark:text-white
                        dark:hover:bg-slate-800

                        ${
                            collapsed
                                ? "justify-center p-2"
                                : "justify-between p-3"
                        }
                    `}
                >

                    {/* Profile */}

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-gradient-to-r
                                from-blue-500
                                to-cyan-400
                                font-semibold
                                text-white
                                shadow-lg
                            "
                        >
                            S
                        </div>


                        {!collapsed && (
                            <div className="text-left">

                                <p
                                    className="
                                        text-sm
                                        font-semibold
                                        text-slate-900
                                        dark:text-white
                                    "
                                >
                                    Saarthak
                                </p>

                                <p
                                    className="
                                        text-xs
                                        text-slate-500
                                        dark:text-slate-400
                                    "
                                >
                                    Free Plan
                                </p>

                            </div>
                        )}

                    </div>


                    {/* Arrow */}

                    {!collapsed && (
                        <ChevronUp
                            size={18}
                            className="
                                text-slate-500
                                dark:text-slate-300
                            "
                        />
                    )}

                </button>

            </div>


            {/* ================= PROFILE MODAL ================= */}

            {open && (
                <ProfileModal
                    onClose={() => setOpen(false)}
                    onLogout={onLogout}
                />
            )}

        </>
    );
};

export default ProfileMenu;