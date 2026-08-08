import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import Sidebar from "../components/workspace/Sidebar";
import WorkspaceHeader from "../components/workspace/WorkspaceHeader";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";
import WelcomeScreen from "../components/chat/WelcomeScreen";

const WorkspaceLayout = ({
    messages,
    setMessages,
    isTyping,
    setIsTyping,
    recentChats,
    setRecentChats,
}) => {

    // =========================
    // Sidebar State
    // =========================

    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
        return (
            localStorage.getItem("axel_sidebar_collapsed") === "true"
        );
    });

    useEffect(() => {
        localStorage.setItem(
            "axel_sidebar_collapsed",
            String(sidebarCollapsed)
        );
    }, [sidebarCollapsed]);


    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const hasMessages = messages.length > 0;


    // =========================
    // New Chat
    // =========================
    // IMPORTANT:
    // New Chat recent history create nahi karega.
    // Current chat already first message ke time
    // Recent me save/update ho jayegi.

    const handleNewChat = () => {

        setMessages([]);

        setIsTyping(false);

        localStorage.removeItem("axel_messages");
        localStorage.removeItem("session_id");

        setMobileSidebarOpen(false);
    };


    // =========================
    // Open Recent Chat
    // =========================

    const handleSelectChat = (chat) => {

        const chatMessages = chat.messages || [];

        setMessages(chatMessages);

        if (chat.sessionId) {
            localStorage.setItem(
                "session_id",
                chat.sessionId
            );
        }

        localStorage.setItem(
            "axel_messages",
            JSON.stringify(chatMessages)
        );

        setMobileSidebarOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("session_id");
        localStorage.removeItem("axel_messages");
        localStorage.removeItem("axel_recent_chats");

        window.location.href = "/signin";
    };


    return (

        <div className="flex h-dvh w-full overflow-hidden bg-[#171717] text-white">


            {/* =========================
                DESKTOP SIDEBAR
            ========================= */}

            <div className="hidden h-full lg:flex">

                <Sidebar
                    collapsed={sidebarCollapsed}
                    setCollapsed={setSidebarCollapsed}
                    onNewChat={handleNewChat}
                    recentChats={recentChats}
                    onSelectChat={handleSelectChat}
                    setRecentChats={setRecentChats}
                    onLogout={handleLogout}
                />

            </div>


            {/* =========================
                MOBILE SIDEBAR
            ========================= */}

            {mobileSidebarOpen && (

                <>

                    {/* Overlay */}

                    <div
                        className="fixed inset-0 z-[60] bg-black/60 lg:hidden"
                        onClick={() => setMobileSidebarOpen(false)}
                    />


                    {/* Drawer */}

                    <div className="fixed inset-y-0 left-0 z-[70] w-[290px] bg-[#171717] shadow-2xl lg:hidden">

                        <div className="flex h-full flex-col">


                            {/* Close */}

                            <div className="flex items-center justify-between border-b border-slate-800 p-4">

                                <span className="text-lg font-bold text-white">
                                    AXEL
                                </span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setMobileSidebarOpen(false)
                                    }
                                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                                >
                                    <X size={20} />
                                </button>

                            </div>


                            {/* Sidebar */}

                            <div className="min-h-0 flex-1">

                                <Sidebar
                                    collapsed={false}
                                    setCollapsed={() => {}}
                                    onNewChat={handleNewChat}
                                    recentChats={recentChats}
                                    onSelectChat={handleSelectChat}
                                    setRecentChats={setRecentChats}
                                    onLogout={handleLogout}
                                    mobile
                                />

                            </div>

                        </div>

                    </div>

                </>

            )}


            {/* =========================
                MAIN AREA
            ========================= */}

            <div className="flex min-w-0 flex-1 flex-col">


                {/* =========================
                    MOBILE HEADER
                ========================= */}

                <div className="flex h-14 shrink-0 items-center border-b border-[#2a2a2a] bg-black px-3 lg:hidden">

                    <button
                        type="button"
                        onClick={() =>
                            setMobileSidebarOpen(true)
                        }
                        className="rounded-lg p-2 text-slate-300 transition hover:bg-[#2a2a2a] hover:text-white"
                    >
                        <Menu size={22} />
                    </button>

                    <span className="ml-2 text-lg font-bold">
                        AXEL
                    </span>

                </div>


                {/* =========================
                    DESKTOP HEADER
                ========================= */}

                <div className="hidden lg:block">
                    <WorkspaceHeader />
                </div>


                {/* =========================
                    CHAT AREA
                ========================= */}

                <main className="relative flex min-h-0 flex-1 flex-col">


                    {/* =========================
                        EMPTY CHAT
                    ========================= */}

                    {!hasMessages ? (

                        <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-3 py-5 sm:px-6">

                            <div className="w-full max-w-3xl">

                                <WelcomeScreen />

                            </div>


                            <div className="mt-6 w-full max-w-3xl">

                                <ChatInput
                                    setMessages={setMessages}
                                    setIsTyping={setIsTyping}
                                    recentChats={recentChats}
                                    setRecentChats={setRecentChats}
                                />

                            </div>

                        </div>


                    ) : (


                        /* =========================
                           ACTIVE CHAT
                        ========================= */

                        <div className="flex min-h-0 flex-1 flex-col">


                            <ChatWindow
                                messages={messages}
                                isTyping={isTyping}
                            />


                            <div className="w-full shrink-0">

                                <ChatInput
                                    setMessages={setMessages}
                                    setIsTyping={setIsTyping}
                                    recentChats={recentChats}
                                    setRecentChats={setRecentChats}
                                />

                            </div>

                        </div>

                    )}

                </main>

            </div>

        </div>
    );
};

export default WorkspaceLayout;