import { motion } from "framer-motion";
import ChatBubble from "./ChatBubble";
import { FileText, Globe, Folder, Image } from "lucide-react";
import { FaGithub, FaYoutube } from "react-icons/fa";

export default function LiveDemo() {
  const icons = [
    { icon: FileText, top: "12%", left: "5%" },
    { icon: FaGithub, top: "28%", left: "12%" },
    { icon: Globe, top: "68%", left: "8%" },
    { icon: Image, top: "18%", right: "8%" },
    { icon: FaYoutube, top: "52%", right: "6%" },
    { icon: Folder, top: "82%", right: "12%" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#fafafa] py-32">
      {icons.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={index}
            animate={{ y: [0, -18, 0], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 5 + index, repeat: Infinity }}
            style={{ top: item.top, left: item.left, right: item.right }}
            className="absolute hidden lg:flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-xl"
          >
            <Icon size={28} className="text-blue-600" />
          </motion.div>
        );
      })}

      <div className="mx-auto max-w-7xl px-8">
        <div className="text-center">
          <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold tracking-wide text-blue-600">
            LIVE DEMO
          </span>
          <h2 className="mt-6 text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
            See AXEL <span className="text-blue-600">in Action</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-500">
            Upload anything. Ask naturally. Watch AXEL retrieve, reason and answer in seconds.
          </p>

          <div className="mt-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto max-w-5xl"
            >
              <div className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
              <div className="absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />
              <ChatBubble />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
