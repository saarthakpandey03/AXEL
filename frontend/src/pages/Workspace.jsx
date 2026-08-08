import { useEffect, useState } from "react";

import WorkspaceLayout from "../layouts/WorkspaceLayout";

const Workspace = () => {

    // =========================
    // Current Chat Messages
    // =========================

    const [messages, setMessages] = useState(() => {

        try {

            const savedMessages =
                localStorage.getItem("axel_messages");

            return savedMessages
                ? JSON.parse(savedMessages)
                : [];

        } catch (error) {

            console.error(
                "Failed to load messages:",
                error
            );

            return [];
        }
    });




    // Save current chat
    useEffect(() => {

        localStorage.setItem(
            "axel_messages",
            JSON.stringify(messages)
        );

    }, [messages]);


    // =========================
    // Typing State
    // =========================

    const [isTyping, setIsTyping] = useState(false);


    // =========================
    // Recent Chats
    // =========================

    const [recentChats, setRecentChats] = useState(() => {

        try {

            const saved =
                localStorage.getItem("axel_recent_chats");

            return saved
                ? JSON.parse(saved)
                : [];

        } catch (error) {

            console.error(
                "Failed to load recent chats:",
                error
            );

            return [];
        }
    });


    // Save recent chats
    useEffect(() => {

        localStorage.setItem(
            "axel_recent_chats",
            JSON.stringify(recentChats)
        );

    }, [recentChats]);


    return (

        <WorkspaceLayout
            messages={messages}
            setMessages={setMessages}

            isTyping={isTyping}
            setIsTyping={setIsTyping}

            recentChats={recentChats}
            setRecentChats={setRecentChats}
        />

    );
};

export default Workspace;