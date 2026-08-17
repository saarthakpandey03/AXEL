const MenuItem = ({
    icon: Icon,
    title,
    description,
    onClick,
}) => {

    return (
        <button
            onClick={onClick}
            className="
                flex w-full items-center gap-4
                rounded-2xl px-4 py-4
                text-left
                text-white
                transition
                hover:bg-slate-800
            "
        >

            <div className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-xl
                bg-slate-700/50
            ">

                <Icon
                    size={20}
                    className="text-slate-300"
                />

            </div>

            <div className="min-w-0">

                <p className="font-medium">
                    {title}
                </p>

                <p className="mt-0.5 text-sm text-slate-400">
                    {description}
                </p>

            </div>

        </button>
    );
};

export default MenuItem;
