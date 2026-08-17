const Shortcut = ({
    darkMode,
    keys,
    title,
}) => {
    return (
        <div
            className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                darkMode
                    ? "border-slate-800 bg-slate-900/40"
                    : "border-slate-200 bg-slate-50"
            }`}
        >
            <span
                className={`text-sm ${
                    darkMode
                        ? "text-slate-300"
                        : "text-slate-700"
                }`}
            >
                {title}
            </span>

            <div className="flex gap-1">
                {keys.map((key) => (
                    <kbd
                        key={key}
                        className={`rounded-md border px-2 py-1 text-xs ${
                            darkMode
                                ? "border-slate-700 bg-slate-800 text-slate-300"
                                : "border-slate-200 bg-white text-slate-600"
                        }`}
                    >
                        {key}
                    </kbd>
                ))}
            </div>
        </div>
    );
};

const KeyboardSection = ({
    darkMode,
}) => {
    return (
        <div className="space-y-3 p-5 sm:p-6">

            <Shortcut
                darkMode={darkMode}
                keys={["⌘", "K"]}
                title="Search"
            />

            <Shortcut
                darkMode={darkMode}
                keys={["⌘", "N"]}
                title="New conversation"
            />

            <Shortcut
                darkMode={darkMode}
                keys={["Enter"]}
                title="Send message"
            />

            <Shortcut
                darkMode={darkMode}
                keys={["Shift", "Enter"]}
                title="New line"
            />

        </div>
    );
};

export default KeyboardSection;