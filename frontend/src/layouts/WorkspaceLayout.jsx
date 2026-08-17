import { useEffect, useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";
import SearchModal from "../components/workspace/SearchModal";
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
  typingAnimation,
  recentChats,
  setRecentChats,
  onNewChat,
}) => {
  // =================================================
  // SIDEBAR STATE
  // =================================================

  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem("axel_sidebar_collapsed") === "true";
  });

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("axel_sidebar_collapsed", String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  const [searchOpen, setSearchOpen] = useState(false);

  // =================================================
  // CHAT STATE
  // =================================================

  const hasMessages = messages.length > 0;

  // =================================================
  // OPEN RECENT CHAT
  // =================================================

  const handleSelectChat = (chat) => {
    const chatMessages = chat.messages || [];

    setMessages(chatMessages);

    if (chat.sessionId) {
      localStorage.setItem("session_id", chat.sessionId);
    }

    localStorage.setItem("axel_messages", JSON.stringify(chatMessages));

    setMobileSidebarOpen(false);
  };

  // =================================================
  // LOGOUT
  // =================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("session_id");
    localStorage.removeItem("axel_messages");

    window.location.href = "/signin";
  };

//   const onSelectChat = (chat) => {

//     setActiveChatId(chat.id);

//     setMessages(
//         Array.isArray(chat.messages)
//             ? chat.messages
//             : []
//     );

// };

  // =================================================
  // RENDER
  // =================================================

  return (
    <div
      className="
            flex h-dvh w-full overflow-hidden
            bg-[#171717] text-white
        "
    >
      {/* =================================================
                DESKTOP SIDEBAR
            ================================================= */}

      <div className="hidden h-full lg:flex">
        <Sidebar
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
            onNewChat={onNewChat}
            onSearch={() => setSearchOpen(true)}
            recentChats={recentChats}
            onSelectChat={handleSelectChat}
            setRecentChats={setRecentChats}
            onLogout={handleLogout}
        />
      </div>

      {/* =================================================
                MOBILE SIDEBAR
            ================================================= */}

      {mobileSidebarOpen && (
        <>
          {/* Overlay */}

          <div
            className="
                            fixed
                            inset-0
                            z-[60]
                            bg-black/30
                            lg:hidden
                            dark:bg-black/60
                        "
            onClick={() => setMobileSidebarOpen(false)}
          />

          {/* Drawer */}

          <div
            className="
                            fixed
                            inset-y-0
                            left-0
                            z-[70]
                            w-[290px]
                            bg-[#171717]
                            shadow-2xl
                            lg:hidden
                        "
          >
            <div className="flex h-full flex-col">
              {/* Drawer Header */}

              <div
                className="
                                    flex
                                    items-center
                                    justify-between
                                    border-b
                                    border-slate-800
                                    p-4
                                "
              >
                <span
                  className="
                                        flex
                                        items-center
                                        gap-2
                                        text-lg
                                        font-bold
                                        text-white
                                    "
                >
                  <Sparkles size={18} className="text-blue-400" />
                  AXEL
                </span>

                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="
                                        rounded-lg
                                        p-2
                                        text-slate-300
                                        transition
                                        hover:bg-slate-800
                                        hover:text-white
                                    "
                >
                  <X size={20} />
                </button>
              </div>

              {/* Sidebar */}

              <div className="min-h-0 flex-1">
                <Sidebar
                    collapsed={false}
                    setCollapsed={() => {}}
                    onNewChat={onNewChat}
                    onSearch={() => setSearchOpen(true)}
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

      {/* =================================================
                MAIN AREA
            ================================================= */}

      <div
        className="
                    flex
                    min-w-0
                    flex-1
                    flex-col
                    bg-[#171717]
                "
      >
        {/* =================================================
                    MOBILE HEADER
                ================================================= */}

        <div
          className="
                        flex
                        h-14
                        shrink-0
                        items-center
                        border-b
                        border-[#2a2a2a]
                        bg-black
                        px-3
                        lg:hidden
                    "
        >
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            className="
                            rounded-lg
                            p-2
                            text-slate-300
                            transition
                            hover:bg-[#2a2a2a]
                            hover:text-white
                        "
          >
            <Menu size={22} />
          </button>

          <span
            className="
                            ml-2
                            flex
                            items-center
                            gap-2
                            text-lg
                            font-bold
                            text-white
                        "
          >
            <Sparkles size={18} className="text-blue-400" />
            AXEL
          </span>
        </div>

        {/* =================================================
                    DESKTOP HEADER
                ================================================= */}

        <div className="hidden lg:block">
          <WorkspaceHeader />
        </div>

        {/* =================================================
                    CHAT AREA
                ================================================= */}

        <main
          className="
                        relative
                        flex
                        min-h-0
                        flex-1
                        flex-col
                        bg-[#171717]
                    "
        >
          {/* =================================================
                        WELCOME SCREEN
                    ================================================= */}

            {!hasMessages && (
                <div className="absolute inset-0 overflow-y-auto">

                    <div className="flex min-h-full w-full items-center justify-center px-4 pb-32">

                        <div className="w-full">
                            <WelcomeScreen />
                        </div>

                    </div>

                </div>
            )}

          {/* =================================================
                        CHAT WINDOW
                    ================================================= */}

          {hasMessages && (
            <ChatWindow
              messages={messages}
              isTyping={isTyping}
              setMessages={setMessages}
              setIsTyping={setIsTyping}
            />
          )}

          {/* =================================================
                        CHAT INPUT
                    ================================================= */}

          <div
            className={`
                            w-full
                            shrink-0
                            ${
                              !hasMessages
                                ? "absolute inset-x-0 bottom-1/2 translate-y-1/2"
                                : ""
                            }
                        `}
          >
            <ChatInput
              setMessages={setMessages}
              isTyping={isTyping}
              setIsTyping={setIsTyping}
              recentChats={recentChats}
              setRecentChats={setRecentChats}
              typingAnimation={typingAnimation}
            />
          </div>
        </main>
      </div>
       <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        recentChats={recentChats}
        onSelectChat={handleSelectChat}
      />
    </div>
  );
};

export default WorkspaceLayout;
