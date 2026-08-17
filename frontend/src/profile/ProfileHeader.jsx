import {
    ArrowLeft,
    X,
} from "lucide-react";

const ProfileHeader = ({
    activeSection,
    onBack,
    onClose,
}) => {

    const sections = {
        profile: {
            title: "Profile",
            subtitle:
                "Manage your personal information",
        },

        plan: {
            title: "Plan & Billing",
            subtitle:
                "Manage your AXEL subscription",
        },

        settings: {
            title: "Settings",
            subtitle:
                "Manage workspace preferences",
        },

        notifications: {
            title: "Notifications",
            subtitle:
                "Control how AXEL notifies you",
        },

        personalization: {
            title: "Personalization",
            subtitle:
                "Customize your AXEL experience",
        },

        keyboard: {
            title: "Keyboard Shortcuts",
            subtitle:
                "Work faster with AXEL",
        },

        help: {
            title: "Help & Support",
            subtitle:
                "Get help with AXEL",
        },
    };

    const section = activeSection
        ? sections[activeSection]
        : null;


    return (
        <div
            className="
                flex
                shrink-0
                items-center
                justify-between
                border-b
                border-slate-200
                px-4
                py-4
                dark:border-slate-800
                sm:px-6
            "
        >

            {/* LEFT */}

            <div className="flex min-w-0 items-center gap-3">

                {activeSection && (
                    <button
                        type="button"
                        onClick={onBack}
                        className="
                            shrink-0
                            rounded-lg
                            p-2
                            text-slate-500
                            transition
                            hover:bg-slate-100
                            hover:text-slate-900
                            dark:text-slate-400
                            dark:hover:bg-slate-800
                            dark:hover:text-white
                        "
                    >
                        <ArrowLeft size={19} />
                    </button>
                )}

                <div className="min-w-0">

                    <h2
                        className="
                            truncate
                            text-lg
                            font-bold
                            text-slate-900
                            dark:text-white
                            sm:text-xl
                        "
                    >
                        {section?.title ||
                            "Account"}
                    </h2>

                    <p
                        className="
                            truncate
                            text-xs
                            text-slate-500
                            dark:text-slate-400
                            sm:text-sm
                        "
                    >
                        {section?.subtitle ||
                            "Manage your AXEL workspace"}
                    </p>

                </div>
            </div>


            {/* CLOSE */}

            <button
                type="button"
                onClick={onClose}
                className="
                    shrink-0
                    rounded-xl
                    p-2
                    text-slate-500
                    transition
                    hover:bg-slate-100
                    hover:text-slate-900
                    dark:text-slate-400
                    dark:hover:bg-slate-800
                    dark:hover:text-white
                "
            >
                <X size={20} />
            </button>

        </div>
    );
};

export default ProfileHeader;