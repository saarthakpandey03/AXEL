import {
    MessageCircleDashed,
} from "lucide-react";

const WorkspaceHeader = () => {

    return (
        <header
            className="
                flex
                h-16
                shrink-0
                items-center
                justify-between
                border-b
                border-[#2a2a2a]
                bg-white
                dark:bg-black
                text-black
                dark:text-white
                px-4
                sm:h-20
                
                sm:px-6
                lg:px-8
            "
        >

            {/* =================================================
                LEFT
            ================================================= */}

            <div className="min-w-0">

                <h1
                    className="
                        text-lg
                        font-black
                        tracking-tight
                        text-white
                        sm:text-2xl
                    "
                >
                    AXEL
                </h1>

                <p
                    className="
                        hidden
                        text-sm
                        text-slate-400
                        sm:block
                    "
                >
                    AI Multi-Source Workspace
                </p>

            </div>


            {/* =================================================
                RIGHT
            ================================================= */}

            <button
                type="button"
                className="
                    flex
                    shrink-0
                    items-center
                    gap-2
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    font-semibold
                    text-slate-300
                    transition
                    hover:bg-slate-800
                    hover:text-white
                    sm:px-5
                    sm:py-3
                "
            >
                <MessageCircleDashed size={18} />
            </button>

        </header>
    );
};

export default WorkspaceHeader;
