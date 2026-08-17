import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

const oldAI = [
  "Single document only",
  "No long-term memory",
  "Limited context window",
  "Hallucinated answers",
  "No GitHub understanding",
  "No agent workflow",
];

const axel = [
  "Multi-source reasoning",
  "Long-term memory",
  "AI Agent workflow",
  "RAG-powered answers",
  "GitHub + PDF support",
  "Images + Websites + YouTube",
];

function ComparisonCard({
  title,
  items,
  positive,
}) {

  const Icon = positive
    ? CheckCircle2
    : XCircle;

  return (

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
        duration: 0.6,
      }}
      className={`
        group
        relative
        overflow-hidden
        rounded-[32px]
        border
        p-7
        transition-all
        duration-500

        sm:p-10

        ${
          positive
            ? `
              border-blue-200
              bg-white
              hover:shadow-[0_25px_70px_rgba(59,130,246,.15)]

              dark:border-blue-900
              dark:bg-[#202020]
              dark:hover:shadow-[0_25px_70px_rgba(37,99,235,.18)]
            `
            : `
              border-gray-200
              bg-gray-50

              dark:border-slate-800
              dark:bg-[#1d1d1d]
            `
        }
      `}
    >

      {/* =================================================
          GLOW
      ================================================= */}

      <div
        className={`
          absolute
          -right-24
          -top-24
          h-60
          w-60
          rounded-full
          blur-[110px]
          opacity-0
          transition-all
          duration-700
          group-hover:opacity-100

          ${
            positive
              ? "bg-blue-500/15 dark:bg-blue-500/20"
              : "bg-gray-300/20 dark:bg-slate-500/10"
          }
        `}
      />


      {/* =================================================
          TITLE
      ================================================= */}

      <h3
        className="
          relative
          text-2xl
          font-black
          text-slate-900
          transition-colors
          duration-300

          dark:text-white

          sm:text-3xl
        "
      >
        {title}
      </h3>


      {/* =================================================
          ITEMS
      ================================================= */}

      <div className="relative mt-8 space-y-5 sm:mt-10 sm:space-y-6">

        {items.map((item, index) => (

          <motion.div
            key={index}
            initial={{
              opacity: 0,
              x: 20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: index * 0.08,
            }}
            className="
              flex
              items-start
              gap-3

              sm:gap-4
            "
          >

            <Icon
              size={24}
              className={`
                mt-1
                shrink-0

                ${
                  positive
                    ? `
                      text-blue-600
                      dark:text-blue-400
                    `
                    : `
                      text-gray-400
                      dark:text-slate-600
                    `
                }
              `}
            />

            <p
              className={`
                text-base
                leading-7

                sm:text-lg
                sm:leading-8

                ${
                  positive
                    ? `
                      text-slate-700
                      dark:text-slate-300
                    `
                    : `
                      text-slate-500
                      dark:text-slate-400
                    `
                }
              `}
            >
              {item}
            </p>

          </motion.div>

        ))}

      </div>

    </motion.div>
  );
}


export default function Comparison() {

  return (

    <section
      className="
        bg-[#fafafa]
        py-24
        transition-colors
        duration-300

        dark:bg-[#171717]

        sm:py-28
      "
    >

      <div
        className="
          mx-auto
          max-w-7xl
          px-5

          sm:px-8
          lg:px-12
        "
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="text-center">

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
            WHY AXEL
          </span>


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
            Built for{" "}

            <span
              className="
                text-blue-600
                dark:text-blue-400
              "
            >
              Understanding
            </span>

          </h2>


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
            AXEL doesn't just answer questions. It understands
            your data, reasons across multiple sources and
            responds with accurate context-aware answers.
          </p>

        </div>


        {/* =================================================
            COMPARISON CARDS
        ================================================= */}

        <div
          className="
            mt-14
            grid
            gap-6

            sm:mt-20
            sm:gap-8

            lg:grid-cols-2
          "
        >

          <ComparisonCard
            title="Traditional AI"
            items={oldAI}
            positive={false}
          />

          <ComparisonCard
            title="AXEL AI"
            items={axel}
            positive
          />

        </div>

      </div>

    </section>
  );
}