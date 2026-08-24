import { useState } from "react";

const getUser = () => {
    try {
        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
            return null;
        }

        return JSON.parse(savedUser);
    } catch (error) {
        console.error("Failed to load user:", error);
        return null;
    }
};

const ProfileSection = () => {
    const [user, setUser] = useState(() => getUser());

    const getUserName = (currentUser) => {
        return (
            localStorage.getItem("axel_user_name") ||
            currentUser?.name ||
            currentUser?.full_name ||
            currentUser?.username ||
            "User"
        );
    };

    const [editingName, setEditingName] = useState(false);

    const [nameInput, setNameInput] = useState(() =>
        getUserName(getUser())
    );

    const userName = getUserName(user);

    const userEmail =
        user?.email ||
        user?.user_email ||
        "";

    const currentPlan =
        localStorage.getItem("axel_plan") ||
        user?.plan ||
        "Free";

    const saveName = () => {
        const name = nameInput.trim();

        if (!name) {
            return;
        }

        const updatedUser = {
            ...(user || {}),
            name,
        };

        localStorage.setItem(
            "axel_user_name",
            name
        );

        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );

        setUser(updatedUser);
        setEditingName(false);
    };

    const avatarLetter =
        userName
            .trim()
            .charAt(0)
            .toUpperCase() || "U";

    return (
        <div className="space-y-4 p-5 sm:p-6">

            {/* PROFILE */}

            <div className="flex items-center gap-4">
                <div
                    className="
                        flex
                        h-16
                        w-16
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        from-blue-500
                        to-cyan-400
                        text-xl
                        font-bold
                        text-white
                    "
                >
                    {avatarLetter}
                </div>

                <div className="min-w-0">
                    <h3
                        className="
                            truncate
                            text-lg
                            font-semibold
                            text-slate-900
                            dark:text-white
                        "
                    >
                        {userName}
                    </h3>

                    {userEmail && (
                        <p
                            className="
                                truncate
                                text-sm
                                text-slate-500
                            "
                        >
                            {userEmail}
                        </p>
                    )}
                </div>
            </div>


            {/* NAME */}

            <div
                className="
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    p-4
                    dark:border-slate-800
                    dark:bg-slate-900/50
                "
            >
                <div className="flex items-center justify-between gap-3">

                    <div className="min-w-0 flex-1">

                        <p className="text-xs text-slate-500">
                            Full Name
                        </p>

                        {editingName ? (
                            <input
                                autoFocus
                                value={nameInput}
                                onChange={(e) =>
                                    setNameInput(
                                        e.target.value
                                    )
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        saveName();
                                    }

                                    if (e.key === "Escape") {
                                        setEditingName(false);
                                        setNameInput(userName);
                                    }
                                }}
                                className="
                                    mt-1
                                    w-full
                                    rounded-lg
                                    border
                                    border-slate-200
                                    bg-white
                                    px-3
                                    py-2
                                    text-sm
                                    text-slate-900
                                    outline-none
                                    focus:border-blue-500
                                    dark:border-slate-700
                                    dark:bg-slate-800
                                    dark:text-white
                                "
                            />
                        ) : (
                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-slate-900
                                    dark:text-white
                                "
                            >
                                {userName}
                            </p>
                        )}

                    </div>

                    {editingName ? (
                        <button
                            type="button"
                            onClick={saveName}
                            className="
                                rounded-lg
                                bg-blue-600
                                px-3
                                py-2
                                text-xs
                                font-semibold
                                text-white
                                hover:bg-blue-700
                            "
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => {
                                setNameInput(userName);
                                setEditingName(true);
                            }}
                            className="
                                rounded-lg
                                px-3
                                py-2
                                text-xs
                                font-medium
                                text-blue-500
                                hover:bg-blue-500/10
                            "
                        >
                            Edit
                        </button>
                    )}

                </div>
            </div>


            {/* EMAIL */}

            <div
                className="
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    p-4
                    dark:border-slate-800
                    dark:bg-slate-900/50
                "
            >
                <p className="text-xs text-slate-500">
                    Email
                </p>

                <p
                    className="
                        mt-1
                        text-sm
                        text-slate-900
                        dark:text-white
                    "
                >
                    {userEmail || "No email available"}
                </p>
            </div>


            {/* PLAN */}

            <div
                className="
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    p-4
                    dark:border-slate-800
                    dark:bg-slate-900/50
                "
            >
                <p className="text-xs text-slate-500">
                    Account Type
                </p>

                <p
                    className="
                        mt-1
                        text-sm
                        text-slate-900
                        dark:text-white
                    "
                >
                    {currentPlan}
                </p>
            </div>

        </div>
    );
};

export default ProfileSection;