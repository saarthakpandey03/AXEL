import { useEffect, useState } from "react";

import WorkspaceLayout from "../layouts/WorkspaceLayout";
import { useSettings } from "../context/SettingsContext";

// =================================================
// Remove duplicate messages
// =================================================

const removeDuplicateMessages = (messages) => {
    if (!Array.isArray(messages)) {
        return [];
    }

    const seen = new Set();

    return messages.filter((message) => {

        if (!message) {
            return false;
        }

        const attachmentName =
            message.attachment?.name || "";

        const attachmentType =
            message.attachment?.type || "";

        const key =
            `${message.role}::${message.content || ""}::${attachmentName}::${attachmentType}`;

        if (seen.has(key)) {
            return false;
        }

        seen.add(key);

        return true;
    });
};


// =================================================
// Normalize Recent Chats
// =================================================

const normalizeRecentChats = (chats) => {

    if (!Array.isArray(chats)) {
        return [];
    }

    const usedIds = new Set();

    return chats.map((chat, index) => {

        let id = chat?.id;

        if (!id || usedIds.has(id)) {

            id =
                `chat_${Date.now()}_${index}_${Math.random()
                    .toString(36)
                    .slice(2, 8)}`;

        }

        usedIds.add(id);

        return {

            ...chat,

            id,

            title:
                chat?.title ||
                "New Chat",

            messages:
                Array.isArray(chat?.messages)
                    ? chat.messages
                    : [],

            pinned:
                Boolean(chat?.pinned),

        };

    });
};


// =================================================
// Workspace
// =================================================

const Workspace = () => {

    // =================================================
    // Settings
    // =================================================

    const {
        typingAnimation,
        saveHistory,
    } = useSettings();


    // =================================================
    // Current Chat Messages
    // =================================================

    const [messages, setMessages] = useState(() => {

        try {

            const savedMessages =
                localStorage.getItem(
                    "axel_messages"
                );

            if (!savedMessages) {
                return [];
            }

            const parsedMessages =
                JSON.parse(savedMessages);

            return removeDuplicateMessages(
                parsedMessages
            );

        } catch (error) {

            console.error(
                "Failed to load messages:",
                error
            );

            return [];

        }

    });


    // =================================================
    // Typing State
    // =================================================

    const [isTyping, setIsTyping] =
        useState(false);


    // =================================================
    // Recent Chats
    // =================================================

    const [recentChats, setRecentChats] =
        useState(() => {

            try {

                const saved =
                    localStorage.getItem(
                        "axel_recent_chats"
                    );

                if (!saved) {
                    return [];
                }

                const parsed =
                    JSON.parse(saved);

                const normalized =
                    normalizeRecentChats(
                        parsed
                    );

                localStorage.setItem(
                    "axel_recent_chats",
                    JSON.stringify(normalized)
                );

                return normalized;

            } catch (error) {

                console.error(
                    "Failed to load recent chats:",
                    error
                );

                return [];

            }

        });


    // =================================================
    // Save Messages
    // =================================================

    useEffect(() => {

        if (!saveHistory) {
            return;
        }

        const cleanedMessages =
            removeDuplicateMessages(
                messages
            );

        localStorage.setItem(
            "axel_messages",
            JSON.stringify(
                cleanedMessages
            )
        );

    }, [
        messages,
        saveHistory
    ]);


    // =================================================
    // Save Recent Chats
    // =================================================

    useEffect(() => {

        localStorage.setItem(
            "axel_recent_chats",
            JSON.stringify(
                recentChats
            )
        );

    }, [
        recentChats
    ]);


    // =================================================
    // NEW CHAT
    // =================================================

    const handleNewChat = () => {

        setMessages([]);

        setIsTyping(false);

        localStorage.removeItem(
            "session_id"
        );

        localStorage.removeItem(
            "axel_messages"
        );

    };


    // =================================================
    // RENDER
    // =================================================

    return (

        <WorkspaceLayout

            messages={messages}

            setMessages={setMessages}

            isTyping={isTyping}

            setIsTyping={setIsTyping}

            typingAnimation={typingAnimation}

            recentChats={recentChats}

            setRecentChats={setRecentChats}

            onNewChat={handleNewChat}

        />

    );

};

export default Workspace;