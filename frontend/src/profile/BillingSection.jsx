import { Crown, ArrowUpRight } from "lucide-react";

const BillingSection = ({ onUpgrade }) => {

    return (
        <button
            type="button"
            onClick={onUpgrade}
            className="
                group
                mb-3
                flex
                w-full
                items-center
                justify-between
                rounded-2xl
                border
                border-blue-500/20
                bg-blue-500/5
                p-4
                text-left
                transition-all
                duration-200
                hover:border-blue-500/40
                hover:bg-blue-500/10

                dark:border-blue-500/20
                dark:bg-blue-500/5
                dark:hover:bg-blue-500/10
            "
        >

            <div className="flex items-center gap-3">

                <div
                    className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-500/10
                    "
                >
                    <Crown
                        size={20}
                        className="text-blue-500"
                    />
                </div>

                <div>

                    <p className="
                        font-medium
                        text-slate-900
                        dark:text-white
                    ">
                        Free Plan
                    </p>

                    <p className="
                        text-sm
                        text-slate-500
                        dark:text-slate-400
                    ">
                        Upgrade your AXEL experience
                    </p>

                </div>

            </div>

            <ArrowUpRight
                size={18}
                className="
                    text-blue-500
                    transition-transform
                    duration-200
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                "
            />

        </button>
    );
};

export default BillingSection;