import { useEffect, useRef, useState } from "react";
import {
    Plus,
    Mic,
    ArrowUp,
    FileText,
    Image as ImageIcon,
    X,
} from "lucide-react";

import { sendMessage } from "../../services/chatApi";
import api from "../../services/api";

const ChatInput = ({
    setMessages,
    setIsTyping,
    recentChats,
    setRecentChats,
}) => {

    const [message, setMessage] = useState("");
    const [showUploadMenu, setShowUploadMenu] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadReady, setUploadReady] = useState(false);

    const [previewUrl, setPreviewUrl] = useState(null);

    const fileInputRef = useRef(null);


    // =========================
    // Image Preview
    // =========================

    useEffect(() => {

        if (!selectedFile) {
            setPreviewUrl(null);
            return;
        }

        if (!selectedFile.type.startsWith("image/")) {
            setPreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(selectedFile);

        setPreviewUrl(url);

        return () => {
            URL.revokeObjectURL(url);
        };

    }, [selectedFile]);


    // =========================
    // File Upload / Embedding
    // =========================

    const handleFileUpload = async (file) => {

        if (!file) return;

        setSelectedFile(file);
        setUploadReady(false);
        setUploading(true);
        setShowUploadMenu(false);

        try {

            const formData = new FormData();

            formData.append("file", file);

            const sessionId =
                localStorage.getItem("session_id") || "";

            const response = await api.post(
                "/upload",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                        "X-Session-Id": sessionId,
                    },
                }
            );

            const data = response.data;


            // Save session
            if (data.session_id) {

                localStorage.setItem(
                    "session_id",
                    data.session_id
                );

            }


            // Backend / embedding finished
            if (
                data.status === "success"
            ) {

                setUploadReady(true);

            } else {

                throw new Error(
                    data.message ||
                    "File processing failed."
                );

            }

        } catch (error) {

            console.error(
                "Upload Error:",
                error.response?.data ||
                error.message
            );

            setSelectedFile(null);
            setUploadReady(false);

        } finally {

            setUploading(false);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

        }
    };


    // =========================
    // Remove Selected File
    // =========================

    const removeFile = () => {

        if (uploading) return;

        setSelectedFile(null);
        setUploadReady(false);
        setPreviewUrl(null);

    };


    // =========================
    // Open File Picker
    // =========================

    const openFilePicker = (type) => {

        if (!fileInputRef.current) return;

        if (type === "files") {

            fileInputRef.current.accept =
                ".pdf,.docx,.pptx,.xlsx,.xls,.csv,.txt,.md";

        } else {

            fileInputRef.current.accept =
                "image/png,image/jpeg,image/jpg,image/webp,image/gif";

        }

        fileInputRef.current.click();

        setShowUploadMenu(false);
    };


    // =========================
    // Send Message
    // =========================

    const handleSend = async () => {

        if (!message.trim()) return;

        if (uploading) return;

        if (
            selectedFile &&
            !uploadReady
        ) {
            return;
        }

        const text = message.trim();


        // =========================
        // User Message
        // =========================

        const userMessage = {

            id: Date.now(),

            role: "user",

            content: text,

            ...(selectedFile && {
                attachment: {
                    name: selectedFile.name,
                    type: selectedFile.type,
                    isImage:
                        selectedFile.type.startsWith(
                            "image/"
                        ),
                    preview:
                        previewUrl,
                },
            }),

        };


        // Show user message
        setMessages((prev) => [
            ...prev,
            userMessage,
        ]);


        setMessage("");

        setSelectedFile(null);
        setUploadReady(false);
        setPreviewUrl(null);

        setIsTyping(true);


        try {

            const data =
                await sendMessage(text);


            setIsTyping(false);


            const aiMessage = {

                id: Date.now() + 1,

                role: "assistant",

                content:
                    data.answer ||
                    data.message ||
                    "AXEL could not generate a response.",

            };


            setMessages((prev) => [
                ...prev,
                aiMessage,
            ]);


            // =========================
            // RECENT CHAT
            // =========================

            const sessionId =
                data.session_id;


            if (sessionId) {

                setRecentChats((prev) => {

                    const existingIndex =
                        prev.findIndex(
                            (chat) =>
                                chat.sessionId ===
                                sessionId
                        );


                    // First message
                    if (
                        existingIndex === -1
                    ) {

                        const newChat = {

                            id: Date.now(),

                            sessionId,

                            title:
                                text.slice(
                                    0,
                                    35
                                ),

                            messages: [
                                userMessage,
                                aiMessage,
                            ],

                        };

                        return [
                            newChat,
                            ...prev,
                        ];

                    }


                    // Existing chat
                    return prev.map(
                        (chat, index) => {

                            if (
                                index !==
                                existingIndex
                            ) {
                                return chat;
                            }

                            return {

                                ...chat,

                                messages: [
                                    ...chat.messages,
                                    userMessage,
                                    aiMessage,
                                ],

                            };

                        }
                    );

                });

            }


        } catch (error) {

            console.error(
                "Chat API Error:",
                error.response?.data ||
                error.message
            );

            setIsTyping(false);


            const errorMessage = {

                id: Date.now() + 1,

                role: "assistant",

                content:
                    error.response?.data
                        ?.detail ||
                    error.response?.data
                        ?.message ||
                    "Unable to connect to AXEL.",

            };


            setMessages((prev) => [
                ...prev,
                errorMessage,
            ]);

        }

    };


    // =========================
    // Enter
    // =========================

    const handleKeyDown = (e) => {

        if (
            e.key === "Enter" &&
            !e.shiftKey
        ) {

            e.preventDefault();

            handleSend();

        }

    };


    // =========================
    // Send Button State
    // =========================

    const canSend =
        message.trim() &&
        !uploading &&
        (!selectedFile || uploadReady);


    return (

        <div className="w-full bg-[#171717] px-3 pb-3 pt-2 sm:px-6 sm:pb-5">

            <div className="mx-auto w-full max-w-3xl">

                <div className="rounded-[28px] border border-slate-700 bg-[#2b2b2b] shadow-2xl">


                    {/* =========================
                        ATTACHMENT
                    ========================= */}

                    {selectedFile && (

                        <div className="px-4 pt-3">

                            <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-[#333] p-3">


                                {/* Preview */}

                                {selectedFile.type.startsWith(
                                    "image/"
                                ) && previewUrl ? (

                                    <img
                                        src={previewUrl}
                                        alt={selectedFile.name}
                                        className="h-12 w-12 rounded-xl object-cover"
                                    />

                                ) : (

                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-700">

                                        <FileText
                                            size={22}
                                            className="text-slate-300"
                                        />

                                    </div>

                                )}


                                {/* Info */}

                                <div className="min-w-0 flex-1">

                                    <p className="truncate text-sm font-medium text-white">
                                        {selectedFile.name}
                                    </p>

                                    <p className="text-xs text-slate-400">

                                        {uploading
                                            ? "Processing & creating embeddings..."
                                            : uploadReady
                                                ? "Ready"
                                                : "Preparing..."}

                                    </p>

                                </div>


                                {/* Loader */}

                                {uploading && (

                                    <div className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-slate-500 border-t-white" />

                                )}


                                {/* Ready */}

                                {!uploading &&
                                    uploadReady && (

                                        <span className="text-xs text-green-400">
                                            Ready
                                        </span>

                                    )}


                                {/* Remove */}

                                {!uploading && (

                                    <button
                                        type="button"
                                        onClick={removeFile}
                                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-700 hover:text-white"
                                    >

                                        <X size={16} />

                                    </button>

                                )}

                            </div>

                        </div>

                    )}


                    {/* =========================
                        TEXTAREA
                    ========================= */}

                    <textarea
                        rows={1}
                        value={message}
                        onChange={(e) =>
                            setMessage(e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                        placeholder="Message AXEL..."
                        className="min-h-[48px] max-h-32 w-full resize-none bg-transparent px-5 py-3 text-[16px] text-white outline-none placeholder:text-slate-500"
                    />


                    {/* =========================
                        CONTROLS
                    ========================= */}

                    <div className="flex items-center justify-between px-4 pb-3">


                        {/* LEFT */}

                        <div className="flex items-center gap-2">


                            {/* PLUS */}

                            <div className="relative">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowUploadMenu(
                                            (prev) =>
                                                !prev
                                        )
                                    }
                                    className="rounded-xl p-2.5 text-slate-400 transition hover:bg-slate-700 hover:text-white"
                                >

                                    <Plus size={20} />

                                </button>


                                {/* MENU */}

                                {showUploadMenu && (

                                    <div className="absolute bottom-14 left-0 z-50 w-48 rounded-2xl border border-slate-700 bg-[#242424] p-2 shadow-2xl">


                                        <button
                                            type="button"
                                            onClick={() =>
                                                openFilePicker(
                                                    "files"
                                                )
                                            }
                                            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-200 transition hover:bg-[#333]"
                                        >

                                            <FileText
                                                size={18}
                                            />

                                            <div className="text-left">

                                                <p className="font-medium">
                                                    Files
                                                </p>

                                                <p className="text-xs text-slate-500">
                                                    PDF, DOCX, CSV...
                                                </p>

                                            </div>

                                        </button>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                openFilePicker(
                                                    "images"
                                                )
                                            }
                                            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-200 transition hover:bg-[#333]"
                                        >

                                            <ImageIcon
                                                size={18}
                                            />

                                            <div className="text-left">

                                                <p className="font-medium">
                                                    Images
                                                </p>

                                                <p className="text-xs text-slate-500">
                                                    PNG, JPG, WEBP...
                                                </p>

                                            </div>

                                        </button>

                                    </div>

                                )}

                            </div>


                            {/* FILE INPUT */}

                            <input
                                ref={fileInputRef}
                                type="file"
                                className="hidden"
                                onChange={(e) => {

                                    const file =
                                        e.target.files?.[0];

                                    handleFileUpload(
                                        file
                                    );

                                }}
                            />


                            {/* MIC */}

                            <button
                                type="button"
                                className="rounded-xl p-2.5 text-slate-400 transition hover:bg-slate-700 hover:text-white"
                            >

                                <Mic size={20} />

                            </button>

                        </div>


                        {/* SEND */}

                        <button
                            type="button"
                            onClick={handleSend}
                            disabled={!canSend}
                            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                                canSend
                                    ? "bg-white text-black hover:scale-105"
                                    : "cursor-not-allowed bg-slate-700 text-slate-500"
                            }`}
                        >

                            <ArrowUp size={18} />

                        </button>

                    </div>

                </div>


                <p className="mt-3 text-center text-xs text-slate-500">
                    AI can make mistakes. Verify important information.
                </p>

            </div>

        </div>
    );
};

export default ChatInput;