import { useEffect, useMemo, useRef, useState } from "react";
import {
    Search,
    X,
    MessageSquare,
    Clock3,
} from "lucide-react";

const SearchModal = ({
    open,
    onClose,
    recentChats = [],
    onSelectChat,
}) => {

    const [query, setQuery] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {

        if (open) {
            setQuery("");

            setTimeout(() => {
                inputRef.current?.focus();
            }, 50);
        }

    }, [open]);


    useEffect(() => {

        const handleKeyDown = (e) => {

            if (e.key === "Escape") {
                onClose();
            }

        };

        if (open) {
            document.addEventListener(
                "keydown",
                handleKeyDown
            );
        }

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };

    }, [open, onClose]);


    const results = useMemo(() => {

        const search = query.trim().toLowerCase();

        if (!search) {
            return recentChats;
        }

        return recentChats.filter((chat) => {

            const title = String(
                chat.title ||
                chat.name ||
                chat.chatName ||
                ""
            ).toLowerCase();

            const content = Array.isArray(chat.messages)
                ? chat.messages
                    .map((message) =>
                        String(
                            message.content ||
                            message.text ||
                            ""
                        )
                    )
                    .join(" ")
                    .toLowerCase()
                : String(
                    chat.content ||
                    chat.lastMessage ||
                    ""
                ).toLowerCase();

            return (
                title.includes(search) ||
                content.includes(search)
            );

        });

    }, [query, recentChats]);


    const handleSelect = (chat) => {

        onSelectChat?.(chat);

        onClose();

    };


    if (!open) {
        return null;
    }


    return (

        <div
            className="
                fixed
                inset-0
                z-[9999]
                flex
                items-start
                justify-center
                bg-black/50
                px-4
                pt-[10vh]
                backdrop-blur-sm
            "
            onMouseDown={(e) => {

                if (e.target === e.currentTarget) {
                    onClose();
                }

            }}
        >

            <div
                className="
                    flex
                    w-full
                    max-w-2xl
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    shadow-2xl
                    dark:border-slate-700
                    dark:bg-[#202020]
                "
            >

                {/* ================= HEADER ================= */}

                <div
                    className="
                        flex
                        items-center
                        gap-3
                        border-b
                        border-slate-200
                        px-5
                        py-4
                        dark:border-slate-700
                    "
                >

                    <Search
                        size={21}
                        className="
                            shrink-0
                            text-slate-500
                            dark:text-slate-400
                        "
                    />

                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) =>
                            setQuery(e.target.value)
                        }
                        placeholder="Search chats and messages..."
                        className="
                            min-w-0
                            flex-1
                            bg-transparent
                            text-base
                            text-slate-900
                            outline-none
                            placeholder:text-slate-400
                            dark:text-white
                            dark:placeholder:text-slate-500
                        "
                    />

                    <button
                        type="button"
                        onClick={onClose}
                        className="
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
                        <X size={19} />
                    </button>

                </div>


                {/* ================= RESULTS ================= */}

                <div className="max-h-[60vh] overflow-y-auto p-2">

                    {results.length === 0 ? (

                        <div
                            className="
                                flex
                                flex-col
                                items-center
                                justify-center
                                px-6
                                py-16
                                text-center
                            "
                        >

                            <Search
                                size={30}
                                className="
                                    mb-4
                                    text-slate-300
                                    dark:text-slate-600
                                "
                            />

                            <p
                                className="
                                    text-sm
                                    font-medium
                                    text-slate-700
                                    dark:text-slate-200
                                "
                            >
                                No conversations found
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-slate-400
                                "
                            >
                                Try searching for a chat name
                                or message.
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-1">

                            {results.map((chat, index) => {

                                const title =
                                    chat.title ||
                                    chat.name ||
                                    chat.chatName ||
                                    "Untitled conversation";

                                const lastMessage =
                                    Array.isArray(chat.messages)
                                        ? chat.messages
                                            .at(-1)?.content
                                        : chat.lastMessage ||
                                          chat.content ||
                                          "";

                                return (

                                    <button
                                        key={
                                            chat.id ||
                                            chat._id ||
                                            `search-${index}`
                                        }
                                        type="button"
                                        onClick={() =>
                                            handleSelect(chat)
                                        }
                                        className="
                                            flex
                                            w-full
                                            items-start
                                            gap-4
                                            rounded-xl
                                            px-4
                                            py-4
                                            text-left
                                            transition
                                            hover:bg-slate-100
                                            dark:hover:bg-[#2b2b2b]
                                        "
                                    >

                                        {/* Icon */}

                                        <div
                                            className="
                                                mt-0.5
                                                flex
                                                h-9
                                                w-9
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-lg
                                                bg-slate-100
                                                text-slate-600
                                                dark:bg-slate-800
                                                dark:text-slate-300
                                            "
                                        >
                                            <MessageSquare
                                                size={17}
                                            />
                                        </div>


                                        {/* Content */}

                                        <div className="min-w-0 flex-1">

                                            <p
                                                className="
                                                    truncate
                                                    text-sm
                                                    font-semibold
                                                    text-slate-900
                                                    dark:text-white
                                                "
                                            >
                                                {title}
                                            </p>

                                            {lastMessage && (

                                                <p
                                                    className="
                                                        mt-1
                                                        line-clamp-2
                                                        text-xs
                                                        leading-5
                                                        text-slate-500
                                                        dark:text-slate-400
                                                    "
                                                >
                                                    {lastMessage}
                                                </p>

                                            )}

                                        </div>


                                        {/* Date */}

                                        <div
                                            className="
                                                flex
                                                shrink-0
                                                items-center
                                                gap-1
                                                text-xs
                                                text-slate-400
                                            "
                                        >
                                            <Clock3 size={13} />

                                            <span>
                                                {chat.date ||
                                                 chat.updatedAt ||
                                                 ""}
                                            </span>

                                        </div>

                                    </button>

                                );

                            })}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
};

export default SearchModal;