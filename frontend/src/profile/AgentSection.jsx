const getUser = () => {
    try {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            return null;
        }

        return JSON.parse(storedUser);

    } catch (error) {
        console.error("Failed to load user:", error);
        return null;
    }
};


const AgentSection = () => {

    const user = getUser();

    const name =
        user?.name?.trim() ||
        user?.full_name?.trim() ||
        user?.username?.trim() ||
        "Saarthak";

    const email =
        user?.email?.trim() || "";


    const initial =
        name.charAt(0).toUpperCase();


    return (
        <div className="flex min-w-0 items-center gap-3">

            {/* Avatar */}

            <div
                className="
                    flex
                    h-11
                    w-11
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
                {initial}
            </div>


            {/* User Information */}

            <div className="min-w-0">

                <h2
                    className="
                        truncate
                        text-base
                        font-semibold
                        text-white
                    "
                >
                    {name}
                </h2>


                <p
                    className="
                        truncate
                        text-xs
                        text-slate-400
                    "
                >
                    {email || "Free Plan"}
                </p>

            </div>

        </div>
    );
};


export default AgentSection;
