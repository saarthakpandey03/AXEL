import { FileText } from "lucide-react";

const MessageBubble = ({ message }) => {

    const isUser = message.role === "user";

    return (
        <div
            className={`mb-8 flex ${
                isUser
                    ? "justify-end"
                    : "justify-start"
            }`}
        >

            {!isUser && (
                <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                    A
                </div>
            )}

            <div
                className={`max-w-[75%] ${
                    isUser
                        ? "rounded-3xl bg-[#2f2f2f] px-6 py-4 text-white"
                        : "text-slate-100"
                }`}
            >

                {/* File / Image */}

                {message.attachment && (

                    <div className="mb-3">

                        {message.attachment.isImage ? (

                            <img
                                src={message.attachment.url}
                                alt={message.attachment.name}
                                className="max-h-72 max-w-sm rounded-2xl object-cover"
                            />

                        ) : (

                            <div className="flex items-center gap-3 rounded-2xl border border-slate-600 bg-[#303030] px-4 py-3">

                                <FileText
                                    size={22}
                                    className="text-slate-300"
                                />

                                <div className="min-w-0">

                                    <p className="truncate text-sm font-medium text-white">
                                        {message.attachment.name}
                                    </p>

                                    <p className="text-xs text-slate-400">
                                        {message.attachment.type || "File"}
                                    </p>

                                </div>

                            </div>

                        )}

                    </div>

                )}

                {/* Normal message text */}

                {message.content && (
                    <div className="whitespace-pre-wrap leading-7">
                        {message.content}
                    </div>
                )}

            </div>

        </div>
    );
};

export default MessageBubble;