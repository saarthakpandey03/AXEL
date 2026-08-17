const SettingRow = ({
    title,
    description,
    children,
}) => {

    return (
        <div className="
            flex items-center justify-between
            gap-4 rounded-2xl px-4 py-4
            transition hover:bg-slate-100
            dark:hover:bg-[#2d2d2d]
        ">

            <div className="min-w-0">

                <p className="font-medium text-slate-900 dark:text-white">
                    {title}
                </p>

                {description && (
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {description}
                    </p>
                )}

            </div>

            <div className="shrink-0">
                {children}
            </div>

        </div>
    );
};

export default SettingRow;