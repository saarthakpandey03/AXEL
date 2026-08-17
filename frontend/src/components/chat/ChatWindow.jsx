import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

const ChatWindow = ({
    messages,
    isTyping,
    setMessages,
    setIsTyping,
}) => {

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, isTyping]);

    return (
        <div
            className="
                axel-chat-window
                min-h-0
                flex-1
                overflow-y-auto
                bg-[#171717]
                text-white
            "
        >

            <div
                className="
                    mx-auto
                    w-full
                    max-w-3xl
                    px-3
                    py-6
                    sm:px-6
                    sm:py-8
                    lg:px-8
                "
            >

                {messages.map((message) => (
                    <MessageBubble
                        key={message.id}
                        message={message}
                        messages={messages}
                        setMessages={setMessages}
                        setIsTyping={setIsTyping}
                    />
                ))}

                {isTyping && <TypingIndicator />}

                <div ref={bottomRef} />

            </div>

        </div>
    );
};

export default ChatWindow;
