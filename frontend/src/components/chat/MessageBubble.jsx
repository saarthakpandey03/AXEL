import {
    FileText,
    Copy,
    Pencil,
    Check,
    Download,
    ExternalLink,
} from "lucide-react";

import { useState } from "react";
import { sendMessage } from "../../services/chatApi";

const MessageBubble = ({
    setMessages,
    message,
    messages,
    setIsTyping,
}) => {

    const isUser = message.role === "user";

    const [copied, setCopied] = useState(false);
    const [editing, setEditing] = useState(false);

    const [editText, setEditText] = useState(
        message.content || ""
    );

    const attachment = message.attachment;


    // =================================================
    // COPY
    // =================================================

    const handleCopy = async () => {

        if (!message.content) return;

        try {

            await navigator.clipboard.writeText(
                message.content
            );

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 1500);

        } catch (error) {

            console.error(
                "Copy failed:",
                error
            );

        }
    };


    // =================================================
    // EDIT / UPDATE
    // =================================================

    const handleUpdate = async () => {

        const updatedText =
            editText.trim();

        if (!updatedText) return;


        const messageIndex =
            messages.findIndex(
                (item) =>
                    item.id === message.id
            );


        if (messageIndex === -1) return;


        const updatedMessages =
            messages
                .slice(0, messageIndex)
                .concat({
                    ...message,
                    content: updatedText,
                });


        // Show updated user message
        setMessages(updatedMessages);

        setEditing(false);

        // Show typing indicator
        setIsTyping(true);


        try {

            const data =
                await sendMessage(
                    updatedText
                );


            const aiMessage = {

                id: crypto.randomUUID(),

                role: "assistant",

                content:
                    data?.answer ||
                    data?.message ||
                    "No response received.",
            };


            setMessages((prev) => [
                ...prev,
                aiMessage,
            ]);


        } catch (error) {

            console.error(
                "AI Update Error:",
                error
            );

        } finally {

            setIsTyping(false);

        }
    };


    // =================================================
    // FILE TYPE
    // =================================================

    const isImage =
        attachment?.isImage ||
        attachment?.type?.startsWith(
            "image/"
        );


    const isPdf =
        attachment?.isPdf ||
        attachment?.type ===
            "application/pdf" ||
        attachment?.name
            ?.toLowerCase()
            .endsWith(".pdf");


    const hasUrl =
        Boolean(attachment?.url);


    // =================================================
    // DOWNLOAD
    // =================================================

    const handleDownload = () => {

        if (!attachment?.url) return;


        const link =
            document.createElement("a");


        link.href =
            attachment.url;


        link.download =
            attachment.name ||
            "download";


        document.body.appendChild(
            link
        );

        link.click();

        document.body.removeChild(
            link
        );
    };


    // =================================================
    // OPEN
    // =================================================

    const handleOpen = () => {

        if (!attachment?.url) return;


        window.open(
            attachment.url,
            "_blank",
            "noopener,noreferrer"
        );
    };


    // =================================================
    // RENDER
    // =================================================

    return (

        <div
            className={`group mb-8 flex ${
                isUser
                    ? "justify-end"
                    : "justify-start"
            }`}
        >

            {/* =================================================
                AI AVATAR
            ================================================= */}

            {!isUser && (

                <div
                    className="
                        mr-3
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-blue-600
                        font-semibold
                        text-white
                    "
                >
                    A
                </div>

            )}


            <div
                className="
                    flex
                    max-w-[80%]
                    flex-col
                "
            >

                {/* =================================================
                    MESSAGE BOX
                ================================================= */}

                <div
                    className={`leading-7 transition-colors duration-300 ${
                        isUser
                            ? "axel-user-message rounded-3xl px-6 py-4"
                            : "axel-ai-message px-0 py-1"
                    }`}
                >

                    {/* =================================================
                        ATTACHMENT
                    ================================================= */}

                    {attachment && (

                        <div className="mb-3">

                            {/* =================================================
                                IMAGE
                            ================================================= */}

                            {isImage ? (

                                hasUrl ? (

                                    <div className="space-y-2">

                                        <div
                                            className="
                                                overflow-hidden
                                                rounded-2xl
                                                border
                                                border-slate-700
                                                bg-[#202020]
                                            "
                                        >

                                            <img
                                                src={
                                                    attachment.url
                                                }
                                                alt={
                                                    attachment.name ||
                                                    "Uploaded image"
                                                }
                                                className="
                                                    block
                                                    max-h-[420px]
                                                    max-w-full
                                                    rounded-2xl
                                                    object-contain
                                                "
                                            />

                                        </div>


                                        {/* IMAGE ACTIONS */}

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-2
                                            "
                                        >

                                            <button
                                                type="button"
                                                onClick={
                                                    handleOpen
                                                }
                                                className="
                                                    flex
                                                    items-center
                                                    gap-1.5
                                                    rounded-lg
                                                    bg-black/20
                                                    px-3
                                                    py-1.5
                                                    text-xs
                                                    text-slate-300
                                                    transition
                                                    hover:bg-black/30
                                                    hover:text-white
                                                "
                                            >

                                                <ExternalLink
                                                    size={13}
                                                />

                                                Open

                                            </button>


                                            <button
                                                type="button"
                                                onClick={
                                                    handleDownload
                                                }
                                                className="
                                                    flex
                                                    items-center
                                                    gap-1.5
                                                    rounded-lg
                                                    bg-black/20
                                                    px-3
                                                    py-1.5
                                                    text-xs
                                                    text-slate-300
                                                    transition
                                                    hover:bg-black/30
                                                    hover:text-white
                                                "
                                            >

                                                <Download
                                                    size={13}
                                                />

                                                Download

                                            </button>

                                        </div>

                                    </div>

                                ) : (

                                    <FileCard
                                        attachment={
                                            attachment
                                        }
                                    />

                                )

                            ) : isPdf ? (

                                /* =================================================
                                    PDF
                                ================================================= */

                                hasUrl ? (

                                    <div className="space-y-2">

                                        <div
                                            className="
                                                overflow-hidden
                                                rounded-2xl
                                                border
                                                border-slate-700
                                                bg-[#202020]
                                            "
                                        >

                                            <iframe
                                                src={
                                                    attachment.url
                                                }
                                                title={
                                                    attachment.name ||
                                                    "PDF preview"
                                                }
                                                className="
                                                    h-[420px]
                                                    w-[min(620px,70vw)]
                                                    max-w-full
                                                    border-0
                                                    bg-[#202020]
                                                    text-white
                                                "
                                            />

                                        </div>


                                        {/* PDF ACTIONS */}

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-2
                                            "
                                        >

                                            <button
                                                type="button"
                                                onClick={
                                                    handleOpen
                                                }
                                                className="
                                                    flex
                                                    items-center
                                                    gap-1.5
                                                    rounded-lg
                                                    bg-black/20
                                                    px-3
                                                    py-1.5
                                                    text-xs
                                                    text-slate-300
                                                    transition
                                                    hover:bg-black/30
                                                    hover:text-white
                                                "
                                            >

                                                <ExternalLink
                                                    size={13}
                                                />

                                                Open PDF

                                            </button>


                                            <button
                                                type="button"
                                                onClick={
                                                    handleDownload
                                                }
                                                className="
                                                    flex
                                                    items-center
                                                    gap-1.5
                                                    rounded-lg
                                                    bg-black/20
                                                    px-3
                                                    py-1.5
                                                    text-xs
                                                    text-slate-300
                                                    transition
                                                    hover:bg-black/30
                                                    hover:text-white
                                                "
                                            >

                                                <Download
                                                    size={13}
                                                />

                                                Download

                                            </button>

                                        </div>

                                    </div>

                                ) : (

                                    <FileCard
                                        attachment={
                                            attachment
                                        }
                                    />

                                )

                            ) : (

                                /* =================================================
                                    OTHER FILES
                                ================================================= */

                                <FileCard
                                    attachment={
                                        attachment
                                    }
                                    onOpen={
                                        hasUrl
                                            ? handleOpen
                                            : null
                                    }
                                    onDownload={
                                        hasUrl
                                            ? handleDownload
                                            : null
                                    }
                                />

                            )}

                        </div>

                    )}


                    {/* =================================================
                        EDIT MODE
                    ================================================= */}

                    {editing ? (

                        <div
                            className="
                                space-y-3
                            "
                        >

                            <textarea
                                value={
                                    editText
                                }
                                onChange={(
                                    e
                                ) =>
                                    setEditText(
                                        e.target
                                            .value
                                    )
                                }
                                autoFocus
                                rows={3}
                                className="
                                    w-full
                                    resize-none
                                    rounded-xl
                                    border
                                    border-slate-600
                                    bg-black/20
                                    px-3
                                    py-2
                                    text-white
                                    outline-none
                                    placeholder:text-slate-500
                                    focus:border-blue-500
                                "
                            />


                            {/* EDIT ACTIONS */}

                            <div
                                className="
                                    flex
                                    justify-end
                                    gap-2
                                "
                            >

                                <button
                                    type="button"
                                    onClick={() =>
                                        setEditing(
                                            false
                                        )
                                    }
                                    className="
                                        rounded-lg
                                        px-3
                                        py-2
                                        text-sm
                                        text-slate-400
                                        transition
                                        hover:bg-black/10
                                    "
                                >
                                    Cancel
                                </button>


                                <button
                                    type="button"
                                    onClick={
                                        handleUpdate
                                    }
                                    className="
                                        rounded-lg
                                        bg-blue-600
                                        px-4
                                        py-2
                                        text-sm
                                        font-medium
                                        text-white
                                        transition
                                        hover:bg-blue-700
                                    "
                                >
                                    Update
                                </button>

                            </div>

                        </div>

                    ) : (

                        /* =================================================
                           NORMAL TEXT
                        ================================================= */

                        message.content && (

                            <div
                                className="
                                    whitespace-pre-wrap
                                "
                            >
                                {
                                    message.content
                                }
                            </div>

                        )

                    )}

                </div>


                {/* =================================================
                    MESSAGE ACTIONS
                ================================================= */}

                {!editing &&
                    message.content && (

                        <div
                            className={`mt-1 flex gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${
                                isUser
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >

                            {/* COPY */}

                            <button
                                type="button"
                                onClick={
                                    handleCopy
                                }
                                title={
                                    copied
                                        ? "Copied"
                                        : "Copy"
                                }
                                className="
                                    rounded-lg
                                    p-2
                                    text-slate-400
                                    transition
                                    hover:bg-slate-700
                                    hover:text-white
                                "
                            >

                                {copied ? (

                                    <Check
                                        size={15}
                                    />

                                ) : (

                                    <Copy
                                        size={15}
                                    />

                                )}

                            </button>


                            {/* EDIT */}

                            {isUser && (

                                <button
                                    type="button"
                                    onClick={() =>
                                        setEditing(
                                            true
                                        )
                                    }
                                    title="Edit"
                                    className="
                                        rounded-lg
                                        p-2
                                        text-slate-400
                                        transition
                                        hover:bg-slate-700
                                        hover:text-white
                                    "
                                >

                                    <Pencil
                                        size={15}
                                    />

                                </button>

                            )}

                        </div>

                    )}

            </div>

        </div>
    );
};


// =================================================
// FILE CARD
// =================================================

const FileCard = ({
    attachment,
    onOpen,
    onDownload,
}) => {

    return (

        <div
            className="
                flex
                min-w-[260px]
                max-w-md
                items-center
                gap-3
                rounded-2xl
                border
                border-slate-600
                bg-[#303030]
                px-4
                py-3
            "
        >

            {/* FILE ICON */}

            <div
                className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-slate-700
                "
            >

                <FileText
                    size={22}
                    className="
                        text-slate-300
                    "
                />

            </div>


            {/* FILE INFO */}

            <div
                className="
                    min-w-0
                    flex-1
                "
            >

                <p
                    className="
                        truncate
                        text-sm
                        font-medium
                        text-white
                    "
                >
                    {
                        attachment?.name ||
                        "Uploaded file"
                    }
                </p>


                <p
                    className="
                        mt-1
                        text-xs
                        text-slate-400
                    "
                >
                    {
                        attachment?.type ||
                        "File"
                    }
                </p>


                {/* FILE ACTIONS */}

                {(onOpen ||
                    onDownload) && (

                    <div
                        className="
                            mt-2
                            flex
                            gap-2
                        "
                    >

                        {onOpen && (

                            <button
                                type="button"
                                onClick={
                                    onOpen
                                }
                                className="
                                    text-xs
                                    text-blue-400
                                    hover:text-blue-300
                                "
                            >
                                Open
                            </button>

                        )}


                        {onDownload && (

                            <button
                                type="button"
                                onClick={
                                    onDownload
                                }
                                className="
                                    text-xs
                                    text-blue-400
                                    hover:text-blue-300
                                "
                            >
                                Download
                            </button>

                        )}

                    </div>

                )}

            </div>

        </div>
    );
};


export default MessageBubble;
