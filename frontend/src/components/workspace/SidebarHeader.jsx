import {
    PanelLeft,
    Plus,
    Search,
    Sparkles,
} from "lucide-react";

const SidebarHeader = ({
    collapsed,
    setCollapsed,
    onSearch,
    onNewChat,
    mobile,
}) => {

    // Mobile drawer already has its own AXEL + close button
    // header in WorkspaceLayout, so don't render this header there.
    // if (mobile) {
    //     return null;
    // }

    return (

        <div className="
            border-b
            border-slate-200
            p-4
            dark:border-slate-800
        ">

            {/* Logo + Hamburger */}

            <div
                className={`group relative mb-5 flex items-center ${
                    collapsed
                        ? "justify-center"
                        : "justify-between"
                }`}
            >

                {/* Logo */}

                <div
                    className={`
                        flex
                        items-center
                        gap-3
                        transition-all
                        duration-200
                        sm:hidden
                        lg:flex

                        ${
                            collapsed
                                ? "group-hover:opacity-0"
                                : "opacity-100"
                        }
                    `}
                >

                    <div className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-gradient-to-br
                        from-blue-600
                        to-cyan-400
                        text-white
                        shadow-sm
                    ">
                        <Sparkles size={20} />
                    </div>

                    {!collapsed && (
                        <div>
                            <h1 className="
                                text-lg
                                font-bold
                                text-slate-900
                                dark:text-white
                            ">
                                AXEL
                            </h1>

                            <p className="
                                text-xs
                                text-slate-500
                                dark:text-slate-400

                            ">
                                AI Workspace
                            </p>
                        </div>
                    )}

                </div>


                {/* Hamburger */}

                <button
                    type="button"
                    onClick={() =>
                        setCollapsed(!collapsed)
                    }
                    className={`
                        rounded-lg
                        p-2
                        text-slate-600
                        transition-all
                        duration-200
                        hover:bg-slate-100
                        hover:text-slate-900

                        dark:text-slate-300
                        dark:hover:bg-[#2b2b2b]
                        dark:hover:text-white

                        ${
                            collapsed
                                ? "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                                : "sm:hidden lg:block"
                        }
                    `}
                >
                    <PanelLeft size={20} />
                </button>

            </div>


            {/* New Chat */}

            <button
                type="button"
                onClick={onNewChat}
                className={`
                    mb-2
                    flex
                    w-full
                    items-center
                    rounded-xl
                    transition-all
                    duration-200

                    bg-blue-50
                    text-blue-700
                    hover:bg-blue-100
                    hover:text-blue-800

                    dark:bg-blue-600
                    dark:text-white
                    dark:hover:bg-blue-500

                    ${
                        collapsed
                            ? "justify-center p-3"
                            : "gap-3 px-4 py-3"
                    }
                `}
            >

                <Plus size={19} />

                {!collapsed && (
                    <span className="text-sm font-semibold">
                        New Chat
                    </span>
                )}

            </button>


            {/* Search */}

            <button
                type="button"
                onClick={onSearch}
                className={`
                    flex
                    w-full
                    items-center
                    rounded-xl
                    transition-colors
                    duration-200

                    text-slate-700
                    hover:bg-slate-100
                    hover:text-slate-900

                    dark:text-slate-200
                    dark:hover:bg-[#2b2b2b]
                    dark:hover:text-white

                    ${
                        collapsed
                            ? "justify-center p-3"
                            : "gap-3 px-4 py-3"
                    }
                `}
            >

                <Search size={19} />

                {!collapsed && (
                    <span className="text-sm font-medium">
                        Search Chats
                    </span>
                )}

            </button>

        </div>
    );
};

export default SidebarHeader;