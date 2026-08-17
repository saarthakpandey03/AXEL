import { useState } from "react";
import {
    MessageSquare,
    MoreHorizontal,
    Pin,
    PinOff,
    Pencil,
    Trash2,
    Check,
    X,
} from "lucide-react";

const SidebarHistory = ({
    collapsed,
    recentChats,
    setRecentChats,
    onSelectChat,
}) => {

    const [openMenu, setOpenMenu] = useState(null);
    const [editingChat, setEditingChat] = useState(null);
    const [editTitle, setEditTitle] = useState("");


    // =========================
    // Pin / Unpin
    // =========================

    const handlePin = (chatId) => {

        setRecentChats((prev) => {

            const updated = prev.map((chat) =>
                chat.id === chatId
                    ? {
                        ...chat,
                        pinned: !chat.pinned,
                    }
                    : chat
            );

            return updated.sort((a, b) => {

                if (a.pinned === b.pinned) {
                    return 0;
                }

                return a.pinned ? -1 : 1;
            });

        });

        setOpenMenu(null);
    };


    // =========================
    // Rename
    // =========================

    const startRename = (chat) => {

        setEditingChat(chat.id);
        setEditTitle(chat.title);
        setOpenMenu(null);
    };


    const saveRename = (chatId) => {

        const title = editTitle.trim();

        if (!title) {
            setEditingChat(null);
            return;
        }

        setRecentChats((prev) =>
            prev.map((chat) =>
                chat.id === chatId
                    ? {
                        ...chat,
                        title,
                    }
                    : chat
            )
        );

        setEditingChat(null);
        setEditTitle("");
    };


    // =========================
    // Delete
    // =========================

    const handleDelete = (chatId) => {

        setRecentChats((prev) =>
            prev.filter(
                (chat) => chat.id !== chatId
            )
        );

        setOpenMenu(null);
    };


    // =========================
    // Sort
    // =========================

    const sortedChats = [...recentChats].sort(
        (a, b) => {

            if (a.pinned === b.pinned) {
                return 0;
            }

            return a.pinned ? -1 : 1;
        }
    );


    const pinnedChats = sortedChats.filter(
        (chat) => chat.pinned
    );

    const normalChats = sortedChats.filter(
        (chat) => !chat.pinned
    );


    // =========================
    // Chat Item
    // =========================

    const renderChat = (chat) => {

        const isEditing =
            editingChat === chat.id;

        return (

            <div
                key={chat.id}
                className="group relative"
            >

                <button
                    type="button"
                    onClick={() => {

                        if (!isEditing) {
                            onSelectChat?.(chat);
                        }

                    }}
                    title={
                        collapsed
                            ? chat.title
                            : undefined
                    }
                    className={`
                        flex
                        w-full
                        items-center
                        rounded-xl
                        text-left
                        text-slate-700
                        transition
                        hover:bg-slate-100
                        hover:text-slate-900
                        dark:text-slate-300
                        dark:hover:bg-slate-800
                        dark:hover:text-white
                        ${
                            collapsed
                                ? "justify-center p-3"
                                : "gap-3 px-3 py-3 pr-10"
                        }
                    `}
                >

                    <MessageSquare
                        size={17}
                        className="shrink-0 text-slate-500 dark:text-slate-400"
                    />


                    {!collapsed && (

                        <>

                            {isEditing ? (

                                <input
                                    autoFocus
                                    value={editTitle}
                                    onChange={(e) =>
                                        setEditTitle(
                                            e.target.value
                                        )
                                    }
                                    onClick={(e) =>
                                        e.stopPropagation()
                                    }
                                    onKeyDown={(e) => {

                                        if (e.key === "Enter") {
                                            saveRename(chat.id);
                                        }

                                        if (e.key === "Escape") {
                                            setEditingChat(null);
                                        }

                                    }}
                                    className="
                                        min-w-0
                                        flex-1
                                        rounded-md
                                        bg-slate-100
                                        px-2
                                        py-1
                                        text-sm
                                        text-slate-900
                                        outline-none
                                        dark:bg-[#333]
                                        dark:text-white
                                    "
                                />

                            ) : (

                                <span className="truncate text-sm">
                                    {chat.title}
                                </span>

                            )}

                        </>

                    )}

                </button>


                {/* Three Dots */}

                {!collapsed && !isEditing && (

                    <button
                        type="button"
                        onClick={(e) => {

                            e.stopPropagation();

                            setOpenMenu(
                                openMenu === chat.id
                                    ? null
                                    : chat.id
                            );

                        }}
                        className="
                            absolute
                            right-2
                            top-1/2
                            -translate-y-1/2
                            rounded-lg
                            p-1.5
                            text-slate-400
                            opacity-0
                            transition
                            group-hover:opacity-100
                            hover:bg-slate-200
                            hover:text-slate-900
                            dark:text-slate-500
                            dark:hover:bg-slate-700
                            dark:hover:text-white
                        "
                    >
                        <MoreHorizontal size={18} />
                    </button>

                )}


                {/* Menu */}

                {openMenu === chat.id && (

                    <div
                        className="
                            absolute
                            right-2
                            top-12
                            z-50
                            w-40
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            p-1.5
                            shadow-xl
                            dark:border-slate-700
                            dark:bg-[#242424]
                            dark:shadow-2xl
                        "
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        {/* Pin */}

                        <button
                            type="button"
                            onClick={() =>
                                handlePin(chat.id)
                            }
                            className="
                                flex
                                w-full
                                items-center
                                gap-3
                                rounded-lg
                                px-3
                                py-2.5
                                text-sm
                                text-slate-700
                                hover:bg-slate-100
                                hover:text-slate-900
                                dark:text-slate-300
                                dark:hover:bg-slate-700
                                dark:hover:text-white
                            "
                        >

                            {chat.pinned
                                ? <PinOff size={16} />
                                : <Pin size={16} />
                            }

                            {chat.pinned
                                ? "Unpin Chat"
                                : "Pin Chat"
                            }

                        </button>


                        {/* Rename */}

                        <button
                            type="button"
                            onClick={() =>
                                startRename(chat)
                            }
                            className="
                                flex
                                w-full
                                items-center
                                gap-3
                                rounded-lg
                                px-3
                                py-2.5
                                text-sm
                                text-slate-700
                                hover:bg-slate-100
                                hover:text-slate-900
                                dark:text-slate-300
                                dark:hover:bg-slate-700
                                dark:hover:text-white
                            "
                        >

                            <Pencil size={16} />

                            Rename

                        </button>


                        {/* Delete */}

                        <button
                            type="button"
                            onClick={() =>
                                handleDelete(chat.id)
                            }
                            className="
                                flex
                                w-full
                                items-center
                                gap-3
                                rounded-lg
                                px-3
                                py-2.5
                                text-sm
                                text-red-500
                                hover:bg-red-50
                                dark:text-red-400
                                dark:hover:bg-red-500/10
                            "
                        >

                            <Trash2 size={16} />

                            Delete

                        </button>

                    </div>

                )}

            </div>

        );
    };


    return (

        <div
            className="
                flex-1
                overflow-y-auto
                p-3
            "
            onClick={() => setOpenMenu(null)}
        >

            {!collapsed && (

                <>

                    {/* Pinned */}

                    {pinnedChats.length > 0 && (

                        <div className="mb-5">

                            <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                                Pinned
                            </p>

                            <div className="space-y-1">
                                {pinnedChats.map(renderChat)}
                            </div>

                        </div>

                    )}


                    {/* Recent */}

                    <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                        Recent
                    </p>

                </>

            )}


            <div className="space-y-1">

                {normalChats.length === 0 &&
                pinnedChats.length === 0 ? (

                    !collapsed && (

                        <p className="px-2 py-4 text-sm text-slate-500">
                            No conversations yet
                        </p>

                    )

                ) : (

                    normalChats.map(renderChat)

                )}

            </div>

        </div>
    );
};

export default SidebarHistory;