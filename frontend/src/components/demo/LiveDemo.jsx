import { motion } from "framer-motion";
import ChatBubble from "./ChatBubble";
import {
  FileText,
  Globe,
  Folder,
  Image,
} from "lucide-react";
import {
  FaGithub,
  FaYoutube,
} from "react-icons/fa";

export default function LiveDemo() {

  const icons = [
    {
      icon: FileText,
      top: "12%",
      left: "5%",
    },
    {
      icon: FaGithub,
      top: "28%",
      left: "12%",
    },
    {
      icon: Globe,
      top: "68%",
      left: "8%",
    },
    {
      icon: Image,
      top: "18%",
      right: "8%",
    },
    {
      icon: FaYoutube,
      top: "52%",
      right: "6%",
    },
    {
      icon: Folder,
      top: "82%",
      right: "12%",
    },
  ];


  return (

    <section
      className="
        relative
        overflow-hidden
        bg-[#fafafa]
        py-24
        transition-colors
        duration-300

        dark:bg-[#171717]

        sm:py-28
        lg:py-32
      "
    >

      {/* =================================================
          FLOATING ICONS
      ================================================= */}

      {icons.map((item, index) => {

        const Icon = item.icon;

        return (

          <motion.div
            key={index}

            animate={{
              y: [0, -18, 0],
              rotate: [0, 8, -8, 0],
            }}

            transition={{
              duration: 5 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}

            style={{
              top: item.top,
              left: item.left,
              right: item.right,
            }}

            className="
              absolute
              hidden
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              border
              border-slate-100
              bg-white
              shadow-xl
              transition-colors
              duration-300

              dark:border-slate-800
              dark:bg-[#242424]
              dark:shadow-[0_15px_40px_rgba(0,0,0,0.35)]

              lg:flex
            "
          >

            <Icon
              size={28}
              className="
                text-blue-600
                dark:text-blue-400
              "
            />

          </motion.div>

        );

      })}


      {/* =================================================
          CONTENT
      ================================================= */}

      <div
        className="
          mx-auto
          max-w-7xl
          px-5

          sm:px-8
          lg:px-12
        "
      >

        <div className="text-center">


          {/* Badge */}

          <span
            className="
              inline-flex
              rounded-full
              bg-blue-100
              px-5
              py-2
              text-sm
              font-semibold
              tracking-wide
              text-blue-600

              dark:bg-blue-500/10
              dark:text-blue-400
            "
          >
            LIVE DEMO
          </span>


          {/* Heading */}

          <h2
            className="
              mt-6
              text-4xl
              font-black
              tracking-tight
              text-slate-900
              transition-colors
              duration-300

              dark:text-white

              sm:text-5xl
              lg:text-6xl
            "
          >
            See AXEL{" "}

            <span
              className="
                text-blue-600
                dark:text-blue-400
              "
            >
              in Action
            </span>

          </h2>


          {/* Description */}

          <p
            className="
              mx-auto
              mt-6
              max-w-3xl
              text-base
              leading-7
              text-slate-500

              dark:text-slate-400

              sm:text-lg
              sm:leading-8
            "
          >
            Upload anything. Ask naturally. Watch AXEL
            retrieve, reason and answer in seconds.
          </p>


          {/* =================================================
              CHAT DEMO
          ================================================= */}

          <div className="mt-14 sm:mt-20">

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              viewport={{
                once: true,
              }}

              transition={{
                duration: 0.8,
              }}

              className="
                relative
                mx-auto
                max-w-5xl
              "
            >

              {/* Blue Glow */}

              <div
                className="
                  absolute
                  -left-24
                  top-1/2
                  h-72
                  w-72
                  -translate-y-1/2
                  rounded-full
                  bg-blue-500/10
                  blur-[120px]

                  dark:bg-blue-500/15
                "
              />


              {/* Cyan Glow */}

              <div
                className="
                  absolute
                  -right-24
                  top-1/2
                  h-72
                  w-72
                  -translate-y-1/2
                  rounded-full
                  bg-cyan-400/10
                  blur-[120px]

                  dark:bg-cyan-400/15
                "
              />


              {/* Chat UI */}

              <div className="relative z-10">

                <ChatBubble />

              </div>

            </motion.div>

          </div>

        </div>

      </div>


      {/* =================================================
          BOTTOM FADE
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          h-40
          w-full
          bg-gradient-to-t
          from-white
          to-transparent

          dark:from-[#171717]
        "
      />

    </section>

  );
}