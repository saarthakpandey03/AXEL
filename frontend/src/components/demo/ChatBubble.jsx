import { motion } from "framer-motion";
import {
  Bot,
  User,
  CheckCircle2,
} from "lucide-react";

const steps = [
  "Reading Repository",
  "Extracting Files",
  "Creating Embeddings",
  "Searching ChromaDB",
  "AI Agent Thinking",
  "Generating Response",
];

const ChatBubble = () => {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[36px]
        border
        border-slate-200
        bg-white
        text-slate-900
        shadow-[0_20px_80px_rgba(15,23,42,.08)]
        transition-colors
        duration-300

        dark:border-slate-800
        dark:bg-[#202020]
        dark:text-white
        dark:shadow-[0_20px_80px_rgba(0,0,0,.35)]
      "
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          border-b
          border-slate-100
          px-5
          py-5
          transition-colors
          duration-300

          dark:border-slate-800

          sm:px-8
          sm:py-6
        "
      >

        <h3
          className="
            text-xl
            font-black
            text-slate-900

            dark:text-white

            sm:text-2xl
          "
        >
          Live Demo
        </h3>

        <p
          className="
            mt-2
            text-sm
            text-slate-500

            dark:text-slate-400

            sm:text-base
          "
        >
          See how AXEL reasons before answering.
        </p>

      </div>


      {/* =================================================
          CONTENT
      ================================================= */}

      <div
        className="
          space-y-7
          p-5

          sm:space-y-8
          sm:p-8
        "
      >

        {/* =================================================
            USER MESSAGE
        ================================================= */}

        <div className="flex justify-end">

          <div
            className="
              max-w-lg
              rounded-3xl
              bg-slate-900
              px-5
              py-4
              text-white
              shadow-sm

              dark:bg-white
              dark:text-slate-900

              sm:px-6
              sm:py-5
            "
          >

            <div className="mb-3 flex items-center gap-3">

              <User size={18} />

              <span className="font-semibold">
                You
              </span>

            </div>

            <p className="text-sm sm:text-base">
              Summarize this GitHub repository.
            </p>

          </div>

        </div>


        {/* =================================================
            AXEL RESPONSE
        ================================================= */}

        <div className="flex justify-start">

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            viewport={{
              once: true,
            }}

            transition={{
              duration: 0.6,
            }}

            className="
              w-full
              max-w-xl
              rounded-3xl
              bg-slate-50
              px-5
              py-5
              transition-colors
              duration-300

              dark:bg-[#292929]

              sm:px-6
              sm:py-6
            "
          >

            {/* =================================================
                AXEL HEADER
            ================================================= */}

            <div className="mb-5 flex items-center gap-3">

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-blue-600
                  text-white
                "
              >
                <Bot size={18} />
              </div>

              <div>

                <h4
                  className="
                    font-bold
                    text-slate-900

                    dark:text-white
                  "
                >
                  AXEL
                </h4>

                <p
                  className="
                    text-sm
                    text-slate-500

                    dark:text-slate-400
                  "
                >
                  AI Workspace
                </p>

              </div>

            </div>


            {/* =================================================
                PROCESSING STEPS
            ================================================= */}

            <div className="space-y-4">

              {steps.map((step, index) => (

                <motion.div
                  key={step}

                  initial={{
                    opacity: 0,
                    x: -20,
                  }}

                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}

                  viewport={{
                    once: true,
                  }}

                  transition={{
                    delay: index * 0.25,
                  }}

                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <CheckCircle2
                    size={18}
                    className="
                      shrink-0
                      text-green-500
                      dark:text-green-400
                    "
                  />

                  <span
                    className="
                      text-sm
                      text-slate-600

                      dark:text-slate-300

                      sm:text-base
                    "
                  >
                    {step}...
                  </span>

                </motion.div>

              ))}


              {/* =================================================
                  THINKING
              ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                }}

                whileInView={{
                  opacity: 1,
                }}

                transition={{
                  delay: 1.8,
                }}

                className="
                  flex
                  items-center
                  gap-2
                  py-2
                "
              >

                <div
                  className="
                    h-2
                    w-2
                    animate-bounce
                    rounded-full
                    bg-blue-500
                  "
                />

                <div
                  className="
                    h-2
                    w-2
                    animate-bounce
                    rounded-full
                    bg-blue-500
                  "
                  style={{
                    animationDelay: ".15s",
                  }}
                />

                <div
                  className="
                    h-2
                    w-2
                    animate-bounce
                    rounded-full
                    bg-blue-500
                  "
                  style={{
                    animationDelay: ".3s",
                  }}
                />

                <span
                  className="
                    ml-2
                    text-sm
                    text-slate-500

                    dark:text-slate-400
                  "
                >
                  Thinking...
                </span>

              </motion.div>


              {/* =================================================
                  FINAL ANSWER
              ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: 2.2,
                  duration: 0.6,
                }}

                className="
                  mt-6
                  rounded-2xl
                  border
                  border-blue-100
                  bg-blue-50
                  p-4
                  transition-colors
                  duration-300

                  dark:border-blue-900/60
                  dark:bg-blue-950/40

                  sm:p-5
                "
              >

                <p
                  className="
                    text-sm
                    leading-7
                    text-slate-700

                    dark:text-slate-300

                    sm:text-base
                    sm:leading-8
                  "
                >
                  This repository is a full-stack MERN
                  application using JWT authentication,
                  protected routes, MongoDB as the database
                  and Express APIs. It follows a modular
                  architecture with reusable React components
                  and demonstrates clean state management and
                  scalable project structure.
                </p>

              </motion.div>

            </div>

          </motion.div>

        </div>

      </div>

    </div>
  );
};

export default ChatBubble;