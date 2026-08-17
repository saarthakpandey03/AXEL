import { useEffect, useRef, useState } from "react";

import {
  Plus,
  Mic,
  ArrowUp,
  FileText,
  Image as ImageIcon,
  X,
  ChevronDown,
  Sparkles,
} from "lucide-react";

import { sendMessage } from "../../services/chatApi";
import api from "../../services/api";
import { generateImage } from "../../services/imageApi";
import { useSettings } from "../../context/SettingsContext";


const ChatInput = ({
  setMessages,
  isTyping,
  setIsTyping,
  recentChats,
  setRecentChats,
  typingAnimation,
}) => {
  // =====================================================
  // MESSAGE STATE
  // =====================================================
  const {
    enterToSend,
    notify,
} = useSettings();

  const [message, setMessage] = useState("");

  const [showUploadMenu, setShowUploadMenu] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const [uploading, setUploading] = useState(false);

  const [previewUrl, setPreviewUrl] = useState(null);

  // =====================================================
  // AI MODEL STATE
  // =====================================================

  const [selectedProvider, setSelectedProvider] = useState(() => {
    return localStorage.getItem("axel_provider") || "gemini";
  });

  const [selectedModel, setSelectedModel] = useState(() => {
    return localStorage.getItem("axel_model") || "gemini-3.5-flash";
  });

    const [imageMode, setImageMode] = useState(false);

    const [imageAspectRatio, setImageAspectRatio] =
        useState("1:1");

    const [imageSize, setImageSize] =
        useState("1K");

    const [generatingImage, setGeneratingImage] =
        useState(false);

  // =====================================================
  // MODEL OPTIONS
  // =====================================================

  const models = {
    gemini: [
      {
        label: "Gemini Flash",
        value: "gemini-3.5-flash",
      },
    ],

    groq: [
      {
        label: "Llama 3.3 70B",
        value: "llama-3.3-70b-versatile",
      },
    ],
  };

  // =====================================================
  // REFS
  // =====================================================

  const fileInputRef = useRef(null);

  const sendingRef = useRef(false);

  // =====================================================
  // SAVE SELECTED MODEL
  // =====================================================

  useEffect(() => {
    localStorage.setItem("axel_provider", selectedProvider);

    localStorage.setItem("axel_model", selectedModel);
  }, [selectedProvider, selectedModel]);

  // =====================================================
  // IMAGE PREVIEW
  // =====================================================

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

    // Preview URL cleanup
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [selectedFile]);

  // =====================================================
  // PROVIDER CHANGE
  // =====================================================

  const handleProviderChange = (provider) => {
    setSelectedProvider(provider);

    const firstModel = models[provider]?.[0];

    if (firstModel) {
      setSelectedModel(firstModel.value);
    }
  };

  // =====================================================
  // FILE UPLOAD
  // =====================================================

  const handleFileUpload = (file) => {
    if (!file) return;

    // Selection only. The backend is NOT called here.
    setSelectedFile(file);
    setUploading(false);
    setShowUploadMenu(false);
  };

  // =====================================================
  // REMOVE FILE
  // =====================================================

  const removeFile = () => {
    if (uploading) return;

    setSelectedFile(null);

    setPreviewUrl(null);
  };

  // =====================================================
  // FILE PICKER
  // =====================================================

  const openFilePicker = (type) => {
    if (!fileInputRef.current) {
      return;
    }

    if (type === "files") {
      fileInputRef.current.accept = ".pdf,.docx,.pptx,.xlsx,.xls,.csv,.txt,.md";
    } else {
      fileInputRef.current.accept =
        "image/png,image/jpeg,image/jpg,image/webp,image/gif";
    }

    fileInputRef.current.click();

    setShowUploadMenu(false);
  };

  // =====================================================
  // UPDATE RECENT CHAT HISTORY
  // =====================================================

    const updateRecentChat = (
        sessionId,
        userMessage,
        aiMessage = null
    ) => {
        if (!sessionId) return;

        setRecentChats((prev) => {

            // Fix old chats which were saved without an id
            const normalizedChats = prev.map((chat) => ({
                ...chat,
                id:
                    chat.id ||
                    chat.sessionId ||
                    crypto.randomUUID(),
            }));

            const existingChat = normalizedChats.find(
                (chat) => chat.sessionId === sessionId
            );

            const updatedChat = existingChat
                ? {
                      ...existingChat,

                      messages: [
                          ...(existingChat.messages || []),
                          userMessage,
                          ...(aiMessage
                              ? [aiMessage]
                              : []),
                      ],

                      title:
                          existingChat.title ||
                          userMessage.content?.slice(
                              0,
                              40
                          ) ||
                          userMessage.attachment?.name ||
                          "New Chat",

                      updatedAt: Date.now(),
                  }
                : {
                      id: crypto.randomUUID(),

                      sessionId,

                      title:
                          userMessage.content?.slice(
                              0,
                              40
                          ) ||
                          userMessage.attachment?.name ||
                          "New Chat",

                      messages: [
                          userMessage,
                          ...(aiMessage
                              ? [aiMessage]
                              : []),
                      ],

                      updatedAt: Date.now(),

                      pinned: false,
                  };


            const updatedChats = [
                updatedChat,

                ...normalizedChats.filter(
                    (chat) =>
                        chat.sessionId !== sessionId
                ),
            ];


            localStorage.setItem(
                "axel_recent_chats",
                JSON.stringify(updatedChats)
            );


            return updatedChats;
        });
    };

    const handleGenerateImage = async () => {
        const prompt = message.trim();

        if (!prompt) return;

        if (
            sendingRef.current ||
            generatingImage
        ) {
            return;
        }

        sendingRef.current = true;
        setGeneratingImage(true);

        const userMessage = {
            id: crypto.randomUUID(),
            role: "user",
            content: prompt,
        };

        setMessages((prev) => [
            ...prev,
            userMessage,
        ]);

        setMessage("");

        try {
            const data = await generateImage({
                prompt,
                aspectRatio: imageAspectRatio,
                imageSize,
            });

            if (data.status !== "success") {
                throw new Error(
                    data.message ||
                    "Image generation failed."
                );
            }

            const aiMessage = {
                id: crypto.randomUUID(),
                role: "assistant",
                type: "image",
                content: prompt,
                imageUrl: data.image_url,
            };

            setMessages((prev) => [
                ...prev,
                aiMessage,
            ]);

            // Save to recent chat if your
            // existing updateRecentChat exists.
            const sessionId =
                localStorage.getItem(
                    "session_id"
                ) || "";

            if (typeof updateRecentChat === "function") {
                updateRecentChat(
                    sessionId,
                    userMessage,
                    aiMessage
                );
            }

        } catch (error) {
            console.error(
                "Image Generation Error:",
                error.response?.data ||
                error.message ||
                error
            );

            setMessages((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content:
                        "Sorry, I couldn't generate the image. Please try again.",
                },
            ]);

        } finally {
            setGeneratingImage(false);
            sendingRef.current = false;
            setImageMode(false);
        }
    };

  // =====================================================
  // SEND MESSAGE
  // =====================================================

  const handleSend = async () => {

    const text = message.trim();
    const fileToSend = selectedFile;

    // =================================================
    // IMAGE GENERATION
    // =================================================

    if (imageMode) {
      await handleGenerateImage();
      return;
    }

    // =================================================
    // EMPTY MESSAGE
    // =================================================

    if (!text && !fileToSend) {
      return;
    }

    // Prevent duplicate requests
    if (sendingRef.current || isTyping) {
      return;
    }

    sendingRef.current = true;

    // =================================================
    // TYPING ANIMATION
    // Only show when setting is enabled
    // =================================================

    setIsTyping(typingAnimation);

    let userMessageAdded = false;
    let userMessage = null;

    try {

      // =================================================
      // SESSION
      // =================================================

      let sessionId =
        localStorage.getItem("session_id") || "";

      let attachment = null;


      // =================================================
      // UPLOAD FILE
      // =================================================

      if (fileToSend) {

        setUploading(true);

        const formData = new FormData();

        formData.append(
          "file",
          fileToSend,
          fileToSend.name
        );

        formData.append(
          "provider",
          selectedProvider
        );

        formData.append(
          "model",
          selectedModel
        );


        const uploadResponse = await api.post(
          "/upload",
          formData,
          {
            headers: {
              "X-Session-Id": sessionId,
            },
          }
        );


        const uploadData =
          uploadResponse.data;

        console.log(
          "UPLOAD RESPONSE:",
          uploadData
        );


        // Backend generated session
        if (uploadData.session_id) {

          sessionId =
            uploadData.session_id;

          localStorage.setItem(
            "session_id",
            sessionId
          );
        }


        if (
          uploadData.status !== "success"
        ) {

          throw new Error(
            uploadData.message ||
            "File upload failed."
          );
        }


        const isImage =
          fileToSend.type?.startsWith(
            "image/"
          ) || false;


        const isPdf =
          fileToSend.type ===
            "application/pdf" ||
          fileToSend.name
            .toLowerCase()
            .endsWith(".pdf");


        attachment = {

          name: fileToSend.name,

          type:
            fileToSend.type ||
            "application/octet-stream",

          isImage,

          isPdf,

          url:
            URL.createObjectURL(
              fileToSend
            ),
        };


        setUploading(false);
      }


      // =================================================
      // USER MESSAGE
      // =================================================

      userMessage = {

        id: crypto.randomUUID(),

        role: "user",

        content: text,

        attachment,
      };


      setMessages((prev) => [
        ...prev,
        userMessage,
      ]);


      userMessageAdded = true;


      // =================================================
      // CLEAR COMPOSER
      // =================================================

      setMessage("");

      setSelectedFile(null);

      setPreviewUrl(null);

      setShowUploadMenu(false);


      // =================================================
      // FILE ONLY
      // =================================================

      if (!text) {

        updateRecentChat(
          sessionId,
          userMessage
        );

        return;
      }


      // =================================================
      // NORMAL CHAT / FILE + QUESTION
      // =================================================

      const data = await sendMessage(
        text,
        selectedProvider,
        selectedModel
      );


      // =================================================
      // UPDATE SESSION
      // =================================================

      if (data?.session_id) {

        sessionId =
          data.session_id;

        localStorage.setItem(
          "session_id",
          sessionId
        );
      }


      // =================================================
      // AI MESSAGE
      // =================================================

      const aiMessage = {

        id: crypto.randomUUID(),

        role: "assistant",

        content:
          data?.answer ||
          "Sorry, I couldn't generate a response.",
      };


      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);


      // =================================================
      // RECENT CHAT
      // =================================================

      updateRecentChat(
        sessionId,
        userMessage,
        aiMessage
      );


      // =================================================
      // NOTIFICATION
      // =================================================

      notify(
        "AXEL",
        "Your response is ready."
      );


    } catch (error) {

      console.error(
        "Send / Upload Error:",
        error.response?.data ||
        error.message ||
        error
      );


      // =================================================
      // ERROR MESSAGE
      // =================================================

      if (userMessageAdded) {

        const errorMessage = {

          id: crypto.randomUUID(),

          role: "assistant",

          content:
            "Sorry, something went wrong. Please try again.",
        };


        setMessages((prev) => [
          ...prev,
          errorMessage,
        ]);


        const sessionId =
          localStorage.getItem(
            "session_id"
          ) || "";


        if (userMessage) {

          updateRecentChat(
            sessionId,
            userMessage,
            errorMessage
          );
        }
      }


    } finally {

      setUploading(false);

      setIsTyping(false);

      sendingRef.current = false;
    }
  };



  // =====================================================
  // ENTER KEY
  // =====================================================

  const handleKeyDown = (e) => {
      if (
          e.key === "Enter" &&
          !e.shiftKey &&
          enterToSend
      ) {
          e.preventDefault();

          if (
              (message.trim() || selectedFile) &&
              !uploading &&
              !isTyping &&
              !sendingRef.current
          ) {
              handleSend();
          }
      }
  };

  // =====================================================
  // SEND BUTTON
  // =====================================================

  const canSend =
    Boolean(message.trim() || selectedFile) &&
    !uploading &&
    !isTyping &&
    !sendingRef.current;

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
  <style>{`
      /* =========================================
        AXEL INPUT SHELL
      ========================================= */

      .axel-input-shell {
          background: #ffffff;
      }

      html.dark .axel-input-shell {
          background: #171717;
      }


      /* =========================================
        INPUT CONTAINER
      ========================================= */

      .axel-input-container {
          background: #f8fafc;
          border-color: #e2e8f0;
      }

      html.dark .axel-input-container {
          background: #2b2b2b;
          border-color: #334155;
      }


      /* =========================================
        ATTACHMENT PREVIEW
      ========================================= */

      .axel-attachment-preview {
          background: #f1f5f9;
          border-color: #cbd5e1;
      }

      html.dark .axel-attachment-preview {
          background: #333333;
          border-color: #475569;
      }


      /* =========================================
        FILE ICON
      ========================================= */

      .axel-file-icon {
          background: #e2e8f0;
          color: #475569;
      }

      html.dark .axel-file-icon {
          background: #475569;
          color: #e2e8f0;
      }


      /* =========================================
        REMOVE BUTTON
      ========================================= */

      .axel-remove-button {
          color: #64748b;
      }

      .axel-remove-button:hover {
          background: #e2e8f0;
          color: #0f172a;
      }

      html.dark .axel-remove-button {
          color: #94a3b8;
      }

      html.dark .axel-remove-button:hover {
          background: #475569;
          color: #ffffff;
      }


      /* =========================================
        CONTROL BUTTON
      ========================================= */

      .axel-control-button {
          color: #64748b;
      }

      .axel-control-button:hover {
          background: #e2e8f0;
          color: #0f172a;
      }

      html.dark .axel-control-button {
          color: #94a3b8;
      }

      html.dark .axel-control-button:hover {
          background: #475569;
          color: #ffffff;
      }


      /* =========================================
        UPLOAD MENU
      ========================================= */

      .axel-upload-menu {
          background: #ffffff;
          border-color: #e2e8f0;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);
      }

      html.dark .axel-upload-menu {
          background: #242424;
          border-color: #475569;
          box-shadow: none;
      }


      /* =========================================
        UPLOAD ITEM
      ========================================= */

      .axel-upload-item {
          color: #334155;
      }

      .axel-upload-item:hover {
          background: #f1f5f9;
      }

      html.dark .axel-upload-item {
          color: #e2e8f0;
      }

      html.dark .axel-upload-item:hover {
          background: #333333;
      }


      /* =========================================
        MODEL PROVIDER
      ========================================= */

      .axel-model-provider {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #334155;
          box-shadow: none;
      }

      html.dark .axel-model-provider {
          background: #333333;
          border-color: #475569;
          color: #e2e8f0;
          box-shadow: none;
      }


      /* =========================================
        MODEL SELECT
      ========================================= */

      .axel-model-select {
          color: #334155;
          background: transparent;
      }

      html.dark .axel-model-select {
          color: #e2e8f0;
          background: transparent;
      }


      /* =========================================
        MODEL NAME
      ========================================= */

      .axel-model-name {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #334155;
          box-shadow: none;
      }

      html.dark .axel-model-name {
          background: #333333;
          border-color: #475569;
          color: #e2e8f0;
          box-shadow: none;
      }


      /* =========================================
        MODEL OPTIONS
      ========================================= */

      .axel-model-option,
      .axel-model-select option {
          background: #ffffff;
          color: #334155;
      }

      html.dark .axel-model-option,
      html.dark .axel-model-select option {
          background: #242424;
          color: #e2e8f0;
      }
  `}</style>

      <div className="axel-input-shell w-full px-3 pb-3 pt-2 sm:px-6 sm:pb-5">
        <div className="mx-auto w-full max-w-3xl">
          {/* =================================================
                        INPUT CONTAINER
                    ================================================= */}

          <div className="axel-input-container rounded-[28px] border shadow-2xl transition-colors duration-300 focus-within:border-blue-500">

            {/* =================================================
                    IMAGE GENERATOR MODE
                ================================================= */}

            {imageMode && (

                <div className="px-4 pt-3">

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            rounded-2xl
                            border
                            border-purple-900/60
                            bg-purple-950/30
                            px-4
                            py-3
                        "
                    >

                        <div className="flex items-center gap-3">

                            <div
                                className="
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-purple-900/50
                                    text-lg
                                "
                            >
                                🎨
                            </div>


                            <div>

                                <p
                                    className="
                                        text-sm
                                        font-semibold
                                        text-purple-200
                                    "
                                >
                                    Image Generator
                                </p>

                                <p
                                    className="
                                        text-xs
                                        text-purple-400
                                    "
                                >
                                    Describe the image you want to create
                                </p>

                            </div>

                        </div>


                        {/* CLOSE MODE */}

                        <button
                            type="button"
                            onClick={() => {
                                setImageMode(false);
                            }}
                            className="
                                rounded-lg
                                p-1.5
                                text-purple-500
                                transition
                                hover:bg-purple-900/50
                                hover:text-purple-300
                            "
                            title="Exit image generator"
                        >
                            <X size={17} />
                        </button>

                    </div>

                </div>

            )}
            {/* =================================================
                            ATTACHMENT PREVIEW
                        ================================================= */}

            {selectedFile && (
              <div className="px-4 pt-3">
                <div className="axel-attachment-preview flex items-center gap-3 rounded-2xl border p-3">
                  {/* Preview */}

                  {selectedFile.type.startsWith("image/") && previewUrl ? (
                    <img
                      src={previewUrl}
                      alt={selectedFile.name}
                      className="h-12 w-12 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="axel-file-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                      <FileText
                        size={22}
                        className="text-slate-300"
                      />
                    </div>
                  )}

                  {/* Info */}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-black dark:text-white ">
                      {selectedFile.name}
                    </p>

                    <p className="text-xs text-slate-400">
                      {uploading
                        ? "Uploading & processing..."
                        : "Ready to send"}
                    </p>
                  </div>

                  {/* Loader */}

                  {uploading && (
                    <div className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-slate-500 border-t-white" />
                  )}

                  {/* Ready */}

                  {/* Remove */}

                  {!uploading && (
                    <button
                      type="button"
                      onClick={removeFile}
                      className="axel-remove-button rounded-lg p-1.5"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* =================================================
                            TEXTAREA
                        ================================================= */}

            <textarea
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message AXEL..."
              className="min-h-[48px] max-h-32 w-full resize-none bg-transparent px-5 py-3 text-[16px] text-white outline-none placeholder:text-slate-400"
            />

            {/* =================================================
                            CONTROLS
                        ================================================= */}

            <div className="flex flex-wrap items-center justify-between gap-2 px-4 pb-3">
              {/* =================================================
                                LEFT CONTROLS
                            ================================================= */}

              <div className="flex items-center gap-2">
                {/* PLUS */}

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowUploadMenu((prev) => !prev)}
                    disabled={uploading || isTyping}
                    className="axel-control-button rounded-xl p-2.5 transition disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Plus size={20} />
                  </button>

                  {/* UPLOAD MENU */}
               
                    {showUploadMenu && (
                        <div className="axel-upload-menu absolute bottom-14 left-0 z-50 w-56 rounded-2xl border p-2 shadow-2xl">

                            {/* FILE */}

                            <button
                                type="button"
                                onClick={() => openFilePicker("files")}
                                className="axel-upload-item flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition"
                            >
                                <FileText size={18} />

                                <div className="text-left">
                                    <p className="font-medium">
                                        Files
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        PDF, DOCX, CSV...
                                    </p>
                                </div>
                            </button>


                            {/* IMAGE UPLOAD */}

                            <button
                                type="button"
                                onClick={() => openFilePicker("images")}
                                className="axel-upload-item flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition"
                            >
                                <ImageIcon size={18} />

                                <div className="text-left">
                                    <p className="font-medium">
                                        Images
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        PNG, JPG, WEBP...
                                    </p>
                                </div>
                            </button>


                            {/* GENERATE IMAGE */}

                            <button
                                type="button"
                                onClick={() => {
                                    setImageMode(true);
                                    setShowUploadMenu(false);
                                }}
                                className="axel-upload-item flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition"
                            >
                                <span className="flex h-[18px] w-[18px] items-center justify-center text-base">
                                    🎨
                                </span>

                                <div className="text-left">
                                    <p className="font-medium">
                                        Generate Image
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        Create an image with AI
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
                    const file = e.target.files?.[0];

                    handleFileUpload(file);
                  }}
                />

                {/* MIC */}

                <button
                  type="button"
                  className="axel-control-button rounded-xl p-2.5 transition"
                >
                  <Mic size={20} />
                </button>
              </div>

              {/* =================================================
                                AI MODEL SELECTOR
                            ================================================= */}

              <div className="flex items-center gap-2">
                {/* PROVIDER */}

                <div className="relative">
                  <div className="axel-model-provider flex items-center gap-1 rounded-xl border px-2">
                    <Sparkles size={14} className="text-blue-400" />

                    <select
                      value={selectedProvider}
                      onChange={(e) => handleProviderChange(e.target.value)}
                      disabled={isTyping || uploading}
                      className="axel-model-select cursor-pointer appearance-none bg-transparent px-2 py-2 text-xs font-medium outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="gemini" className="axel-model-option">
                        Gemini
                      </option>

                      <option value="groq" className="axel-model-option">
                        Groq
                      </option>
                    </select>

                    <ChevronDown
                      size={14}
                      className="pointer-events-none text-slate-500"
                    />
                  </div>
                </div>

                {/* MODEL */}

                <div className="relative hidden sm:block">
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    disabled={isTyping || uploading}
                    className="axel-model-select axel-model-name cursor-pointer appearance-none rounded-xl border px-3 py-2 text-xs outline-none transition hover:border-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {models[selectedProvider]?.map((item) => (
                      <option
                        key={item.value}
                        value={item.value}
                        className="axel-model-option"
                      >
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* SEND */}

                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!canSend}
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                    canSend
                      ? "bg-blue-600 text-white hover:scale-105 hover:bg-blue-700"
                      : "cursor-not-allowed bg-slate-400 text-slate-200"
                  }`}
                >
                  <ArrowUp size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* =================================================
                        DISCLAIMER
                    ================================================= */}

          <p className="mt-3 text-center text-xs text-slate-500">
            AI can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatInput;
