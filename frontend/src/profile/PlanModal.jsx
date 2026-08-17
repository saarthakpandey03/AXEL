import {
    X,
    Check,
    Sparkles,
} from "lucide-react";

const plans = [
    {
        name: "Free",
        price: "₹0",
        description: "For trying AXEL",
        features: [
            "Basic AI Chat",
            "Limited conversations",
            "PDF support",
        ],
    },
    {
        name: "Pro",
        price: "₹499",
        description: "For serious AI workspace usage",
        features: [
            "Unlimited AI Chat",
            "PDF & Website analysis",
            "YouTube Assistant",
            "GitHub analysis",
            "Long-term memory",
        ],
        popular: true,
    },
];

const PlanModal = ({ onClose }) => {

    return (
        <div
            className="
                fixed inset-0 z-[10000]
                flex items-center justify-center
                bg-black/50
                p-4
                backdrop-blur-sm
            "
            onClick={onClose}
        >

            <div
                className="
                    relative
                    w-full max-w-2xl
                    max-h-[90dvh]
                    overflow-y-auto
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    p-6
                    text-slate-900
                    shadow-2xl
                    dark:border-slate-700
                    dark:bg-[#202020]
                    dark:text-white
                "
                onClick={(e) => e.stopPropagation()}
            >

                {/* Close */}

                <button
                    type="button"
                    onClick={onClose}
                    className="
                        absolute right-4 top-4
                        rounded-xl p-2
                        text-slate-500
                        hover:bg-slate-100
                        dark:text-slate-400
                        dark:hover:bg-[#303030]
                    "
                >
                    <X size={20} />
                </button>


                {/* Heading */}

                <div className="mb-8 text-center">

                    <div
                        className="
                            mx-auto mb-4
                            flex h-12 w-12
                            items-center justify-center
                            rounded-2xl
                            bg-blue-100
                            text-blue-600
                            dark:bg-blue-500/10
                            dark:text-blue-400
                        "
                    >
                        <Sparkles size={24} />
                    </div>

                    <h2 className="text-3xl font-bold">
                        Choose your AXEL plan
                    </h2>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Upgrade your workspace when you need more.
                    </p>

                </div>


                {/* Plans */}

                <div className="grid gap-5 sm:grid-cols-2">

                    {plans.map((plan) => (

                        <div
                            key={plan.name}
                            className={`
                                relative
                                rounded-2xl
                                border
                                p-6
                                ${
                                    plan.popular
                                        ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10"
                                        : "border-slate-200 dark:border-slate-700"
                                }
                            `}
                        >

                            {plan.popular && (
                                <span
                                    className="
                                        absolute right-4 top-4
                                        rounded-full
                                        bg-blue-600
                                        px-3 py-1
                                        text-xs font-semibold
                                        text-white
                                    "
                                >
                                    Popular
                                </span>
                            )}


                            <h3 className="text-xl font-bold">
                                {plan.name}
                            </h3>

                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                {plan.description}
                            </p>

                            <div className="mt-5">

                                <span className="text-4xl font-black">
                                    {plan.price}
                                </span>

                                {plan.name === "Pro" && (
                                    <span className="text-sm text-slate-500">
                                        /month
                                    </span>
                                )}

                            </div>


                            {/* Features */}

                            <div className="mt-6 space-y-3">

                                {plan.features.map((feature) => (

                                    <div
                                        key={feature}
                                        className="flex items-center gap-2"
                                    >

                                        <Check
                                            size={17}
                                            className="shrink-0 text-blue-600"
                                        />

                                        <span className="text-sm text-slate-600 dark:text-slate-300">
                                            {feature}
                                        </span>

                                    </div>

                                ))}

                            </div>


                            <button
                                type="button"
                                className={`
                                    mt-7
                                    w-full
                                    rounded-xl
                                    px-4 py-3
                                    text-sm font-semibold
                                    transition
                                    ${
                                        plan.popular
                                            ? "bg-blue-600 text-white hover:bg-blue-700"
                                            : "border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-white dark:hover:bg-[#303030]"
                                    }
                                `}
                            >
                                {plan.name === "Free"
                                    ? "Current Plan"
                                    : "Upgrade to Pro"}
                            </button>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
};

export default PlanModal;