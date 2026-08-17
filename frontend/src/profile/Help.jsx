import {
    ArrowLeft,
    ChevronDown,
    CircleHelp,
} from "lucide-react";

import { useState } from "react";

const Help = ({ onBack }) => {

    const [openQuestion, setOpenQuestion] = useState(null);

    const faqs = [
        {
            question: "What is AXEL?",
            answer:
                "AXEL is an AI workspace that lets you interact with PDFs, websites, GitHub repositories, YouTube videos, images and other sources using one intelligent conversation.",
        },
        {
            question: "Can AXEL understand PDF files?",
            answer:
                "Yes. Upload a PDF and ask questions about its content. AXEL can extract relevant information and provide context-aware answers.",
        },
        {
            question: "Can I analyze a website?",
            answer:
                "Yes. AXEL can analyze supported websites and documentation and help you understand their content.",
        },
        {
            question: "Can AXEL analyze GitHub repositories?",
            answer:
                "Yes. AXEL can process repository files and help explain code, project structure and implementation details.",
        },
        {
            question: "Can I chat with YouTube videos?",
            answer:
                "Yes. AXEL can use available video transcripts to answer questions and summarize YouTube content.",
        },
        {
            question: "Does AXEL remember my conversations?",
            answer:
                "AXEL can maintain conversation context and, when history is enabled, preserve your chat history locally.",
        },
        {
            question: "Can AXEL make mistakes?",
            answer:
                "Yes. AI-generated answers may sometimes be incorrect. Always verify important information.",
        },
    ];

    const toggleQuestion = (index) => {
        setOpenQuestion(
            openQuestion === index ? null : index
        );
    };

    return (
        <div
            className="
                flex
                max-h-[calc(100dvh-32px)]
                flex-col
                bg-white
                text-slate-900
                dark:bg-[#202020]
                dark:text-white
            "
        >

            {/* Header */}

            <div
                className="
                    shrink-0
                    border-b
                    border-slate-200
                    px-5
                    py-4
                    dark:border-slate-700
                "
            >

                <button
                    type="button"
                    onClick={onBack}
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        px-3
                        py-2
                        text-sm
                        text-slate-600
                        transition
                        hover:bg-slate-100
                        hover:text-slate-900
                        dark:text-slate-300
                        dark:hover:bg-[#2b2b2b]
                        dark:hover:text-white
                    "
                >
                    <ArrowLeft size={18} />
                    Back
                </button>

                <div className="mt-4">

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-xl
                                bg-blue-100
                                text-blue-600
                                dark:bg-blue-500/10
                                dark:text-blue-400
                            "
                        >
                            <CircleHelp size={22} />
                        </div>

                        <div>

                            <h2 className="text-xl font-bold">
                                Help & Support
                            </h2>

                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Learn more about AXEL
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* FAQ */}

            <div
                className="
                    min-h-0
                    overflow-y-auto
                    p-4
                    sm:p-5
                "
            >

                <div className="space-y-3">

                    {faqs.map((faq, index) => {

                        const isOpen =
                            openQuestion === index;

                        return (
                            <div
                                key={faq.question}
                                className="
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    dark:border-slate-700
                                "
                            >

                                <button
                                    type="button"
                                    onClick={() =>
                                        toggleQuestion(index)
                                    }
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        justify-between
                                        gap-4
                                        px-4
                                        py-4
                                        text-left
                                        transition
                                        hover:bg-slate-50
                                        dark:hover:bg-[#2b2b2b]
                                    "
                                >

                                    <span className="text-sm font-semibold">
                                        {faq.question}
                                    </span>

                                    <ChevronDown
                                        size={18}
                                        className={`
                                            shrink-0
                                            text-slate-400
                                            transition-transform
                                            duration-200
                                            ${
                                                isOpen
                                                    ? "rotate-180"
                                                    : ""
                                            }
                                        `}
                                    />

                                </button>


                                {isOpen && (
                                    <div
                                        className="
                                            border-t
                                            border-slate-200
                                            px-4
                                            py-4
                                            text-sm
                                            leading-6
                                            text-slate-500
                                            dark:border-slate-700
                                            dark:text-slate-400
                                        "
                                    >
                                        {faq.answer}
                                    </div>
                                )}

                            </div>
                        );

                    })}

                </div>

            </div>

        </div>
    );
};

export default Help;