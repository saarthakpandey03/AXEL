import { motion } from "framer-motion";
import { Check } from "lucide-react";

const WorkflowCard = ({ step, index, activeIndex }) => {
  const completed = index < activeIndex;
  const active = index === activeIndex;

  return (
    <div className="relative flex gap-8">
      <div className="relative flex flex-col items-center">
        <motion.div
          animate={{
            scale: active ? 1.18 : 1,
            backgroundColor: completed ? "#3f3f46" : active ? "#111111" : "#ffffff",
            borderColor: completed || active ? "#111111" : "#d4d4d8",
          }}
          transition={{ duration: 0.35 }}
          className="relative z-20 flex h-12 w-12 items-center justify-center rounded-full border-[3px] bg-white shadow-md"
        >
          {completed ? (
            <Check size={20} className="text-white" />
          ) : (
            <span className={active ? "font-bold text-white" : "font-bold text-slate-500"}>{step.id}</span>
          )}
        </motion.div>
        {index !== 6 && <div className="w-[3px] h-36 bg-slate-200" />}
      </div>

      <motion.div
        animate={{ opacity: active ? 1 : 0.65, y: active ? 0 : 18, scale: active ? 1 : 0.98 }}
        transition={{ duration: 0.35 }}
        className="flex-1 rounded-3xl border p-8 bg-white shadow-sm transition-all duration-300"
      >
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">{step.emoji}</div>
        <h3 className="text-2xl font-bold text-slate-900">{step.title}</h3>
        <p className="mt-4 leading-8 text-slate-500 text-[15px]">{step.desc}</p>
        {active && <div className="mt-6 inline-flex w-fit rounded-full bg-zinc-100 text-zinc-800 px-4 py-2 text-sm font-semibold">Current Step</div>}
        <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-black/10 blur-[90px] opacity-0 transition-all duration-500 group-hover:opacity-100" />
      </motion.div>
    </div>
  );
};

export default WorkflowCard;
