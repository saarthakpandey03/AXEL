import ParticleBlob from "./ParticleBlob";
import { useNavigate } from "react-router-dom";

const Hero = () => {

    const navigate = useNavigate();

    const handleStartChat = () => {

        const token =
            localStorage.getItem("token");

        if (token) {
            navigate("/workspace");
        } else {
            navigate("/SignIn");
        }

    };

    return (

        <section
            className="
                w-full
                mt-18
                bg-white
                text-slate-900
                transition-colors
                duration-300
                dark:bg-[#171717]
                dark:text-white
            "
        >

            <div
                className="
                    mx-auto
                    max-w-7xl
                    px-5
                    py-8
                    sm:px-8
                    lg:px-12
                    lg:py-10
                "
            >

                <div
                    className="
                        grid
                        items-center
                        gap-10
                        lg:grid-cols-2
                        lg:gap-15
                    "
                >

                    {/* ================= LEFT ================= */}

                    <div>

                        <p
                            className="
                                mb-5
                                text-xs
                                font-medium
                                uppercase
                                tracking-[5px]
                                text-slate-500
                                dark:text-slate-400
                                sm:text-sm
                                sm:tracking-[6px]
                            "
                        >
                            YOUR SECOND BRAIN
                        </p>


                        <h1
                            className="
                                text-5xl
                                font-black
                                leading-[1.05]
                                tracking-tight
                                text-slate-900
                                dark:text-white
                                sm:text-6xl
                                lg:text-7xl
                            "
                        >

                            Understand
                            <br />

                            Everything.
                            <br />

                            <span
                                className="
                                    bg-gradient-to-r
                                    from-blue-600
                                    via-cyan-500
                                    to-indigo-600
                                    bg-clip-text
                                    text-transparent
                                "
                            >
                                Ask Anything.
                            </span>

                        </h1>


                        <p
                            className="
                                mt-7
                                max-w-xl
                                text-base
                                leading-7
                                text-slate-500
                                dark:text-slate-400
                                sm:mt-8
                                sm:text-lg
                                sm:leading-8
                            "
                        >
                            AXEL is your AI workspace for understanding
                            documents, websites, GitHub repositories,
                            images, YouTube videos, folders and more —
                            all in one intelligent conversation.
                        </p>


                        {/* ================= BUTTONS ================= */}

                        <div
                            className="
                                mt-8
                                flex
                                flex-wrap
                                gap-4
                                sm:mt-10
                                sm:gap-5
                            "
                        >

                            {/* Start Chat */}

                            <button
                                type="button"
                                onClick={handleStartChat}
                                className="
                                    rounded-full
                                    bg-slate-900
                                    px-7
                                    py-3.5
                                    text-sm
                                    font-semibold
                                    text-white
                                    shadow-lg
                                    transition-all
                                    duration-300
                                    hover:scale-105
                                    hover:bg-blue-600
                                    dark:bg-white
                                    dark:text-slate-900
                                    dark:hover:bg-blue-500
                                    dark:hover:text-white
                                    sm:px-8
                                    sm:py-4
                                "
                            >
                                Start Chat
                            </button>


                            {/* Documentation */}

                            <button
                                type="button"
                                className="
                                    rounded-full
                                    border
                                    border-slate-300
                                    bg-white
                                    px-7
                                    py-3.5
                                    text-sm
                                    font-semibold
                                    text-slate-900
                                    transition-all
                                    duration-300
                                    hover:border-blue-500
                                    hover:text-blue-600
                                    hover:shadow-md
                                    dark:border-slate-700
                                    dark:bg-[#202020]
                                    dark:text-slate-200
                                    dark:hover:border-blue-500
                                    dark:hover:text-blue-400
                                    sm:px-8
                                    sm:py-4
                                "
                            >
                                Documentation
                            </button>

                        </div>

                    </div>


                    {/* ================= RIGHT ================= */}

                    <div
                        className="
                            flex
                            h-[420px]
                            w-full
                            items-center
                            justify-center
                            sm:h-[550px]
                            lg:h-[700px]
                        "
                    >
                        <ParticleBlob />
                    </div>

                </div>

            </div>

        </section>
    );
};

export default Hero;