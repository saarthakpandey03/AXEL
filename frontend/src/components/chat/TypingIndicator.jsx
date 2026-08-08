const TypingIndicator = () => {

    return (

        <div className="mb-8 flex gap-3 sm:gap-4">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                A
            </div>

            <div>

                <p className="mb-2 text-sm font-semibold text-white">
                    AXEL
                </p>

                <div className="flex items-center gap-1.5 py-2">

                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />

                    <span
                        className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                        style={{ animationDelay: "0.15s" }}
                    />

                    <span
                        className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                        style={{ animationDelay: "0.3s" }}
                    />

                </div>

            </div>

        </div>
    );
};

export default TypingIndicator;